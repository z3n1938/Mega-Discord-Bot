// blackjack.js - oyunlar
module.exports = {
    name: 'blackjack',
    aliases: ['bj', '21', 'blackjackoyunu'],
    description: 'Blackjack (21) oynarsın (bahis miktarı gir)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();

        const bahis = parseInt(args[0]);
        if (!bahis || bahis < 50) {
            return message.reply('❌ Minimum bahis **50 coin**!\nÖrnek: `!blackjack 200`');
        }

        const current = client.coins.get(message.author.id) || 0;
        if (current < bahis) {
            return message.reply(`❌ Yeterli coinin yok!\nSahip olduğun: **${current}** coin`);
        }

        // Basit kart destesi
        const kartlar = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
        const değerler = { 'J': 10, 'Q': 10, 'K': 10, 'A': 11 };

        function kartÇek() {
            const kart = kartlar[Math.floor(Math.random() * kartlar.length)];
            return { kart, değer: değerler[kart] || parseInt(kart) };
        }

        function toplamHesapla(el) {
            let toplam = 0;
            let asSayısı = 0;
            for (const k of el) {
                toplam += k.değer;
                if (k.kart === 'A') asSayısı++;
            }
            while (toplam > 21 && asSayısı > 0) {
                toplam -= 10;
                asSayısı--;
            }
            return toplam;
        }

        const oyuncuEl = [kartÇek(), kartÇek()];
        const krupiyeEl = [kartÇek(), kartÇek()];

        let oyunDevam = true;
        let mesaj = `🎲 **Blackjack!**\nBahis: **${bahis}** coin\n\n` +
                    `Senin elin: ${oyuncuEl.map(k => k.kart).join(' ')} (Toplam: ${toplamHesapla(oyuncuEl)})\n` +
                    `Krupiye: ${krupiyeEl[0].kart} ? (Gizli kart)\n\n` +
                    `Hit (kart çek) için: \`hit\`\nStand (dur) için: \`stand\``;

        message.reply(mesaj).then(msg => {
            const filter = m => m.author.id === message.author.id && ['hit', 'stand'].includes(m.content.toLowerCase());
            const collector = message.channel.createMessageCollector({ filter, time: 30000, max: 1 });

            collector.on('collect', m => {
                const seçim = m.content.toLowerCase();

                if (seçim === 'hit') {
                    oyuncuEl.push(kartÇek());
                    const oyuncuToplam = toplamHesapla(oyuncuEl);

                    if (oyuncuToplam > 21) {
                        client.coins.set(message.author.id, current - bahis);
                        msg.reply(`💥 **Patladın!** Toplam: ${oyuncuToplam}\n-${bahis} coin kaybettin!\nYeni bakiye: **${current - bahis}**`);
                        return;
                    }

                    // Devam etsin mi diye sor
                    msg.reply(`Yeni kart: ${oyuncuEl[oyuncuEl.length - 1].kart}\nToplam: ${oyuncuToplam}\n\nHit mi stand mı?`);
                    // Tekrar collector başlat (basitlik için 1 tur daha)
                } else if (seçim === 'stand') {
                    let krupiyeToplam = toplamHesapla(krupiyeEl);
                    while (krupiyeToplam < 17) {
                        krupiyeEl.push(kartÇek());
                        krupiyeToplam = toplamHesapla(krupiyeEl);
                    }

                    const oyuncuToplam = toplamHesapla(oyuncuEl);
                    let sonuç = '';

                    if (krupiyeToplam > 21 || oyuncuToplam > krupiyeToplam) {
                        const kazanç = bahis * 2;
                        client.coins.set(message.author.id, current + bahis);
                        sonuç = `🎉 **Kazandın!** +${kazanç} coin!\nKrupiye: ${krupiyeToplam} | Sen: ${oyuncuToplam}`;
                    } else if (oyuncuToplam === krupiyeToplam) {
                        sonuç = `🤝 **Berabere!** Coinler iade edildi.\nKrupiye: ${krupiyeToplam} | Sen: ${oyuncuToplam}`;
                    } else {
                        client.coins.set(message.author.id, current - bahis);
                        sonuç = `😭 **Kaybettin!** -${bahis} coin\nKrupiye: ${krupiyeToplam} | Sen: ${oyuncuToplam}`;
                    }

                    msg.reply(`🎴 **Oyun Bitti!**\nKrupiye eli: ${krupiyeEl.map(k => k.kart).join(' ')} (${krupiyeToplam})\nSenin elin: ${oyuncuEl.map(k => k.kart).join(' ')} (${oyuncuToplam})\n\n${sonuç}\nYeni bakiye: **${client.coins.get(message.author.id) || 0}** coin`);
                }
            });

            collector.on('end', collected => {
                if (collected.size === 0) {
                    client.coins.set(message.author.id, current - bahis);
                    msg.reply(`⏰ Zaman doldu! Otomatik kaybettin.\n-${bahis} coin kaybettin!\nYeni bakiye: **${current - bahis}**`);
                }
            });
        });
    }
};