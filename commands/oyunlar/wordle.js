// wordle.js - oyunlar
module.exports = {
    name: 'wordle',
    aliases: ['kelimeoyunu', 'wordletr'],
    description: 'Wordle oyunu (5 harfli Türkçe kelime tahmin et)',
    category: 'oyunlar',
    execute(message, args, client) {
        const kelimeler = ['elma', 'armut', 'kiraz', 'muzlu', 'üzümü', 'portakal', 'limon', 'çilek', 'karpuz', 'kavun', 'ananas', 'narlı', 'incir', 'üzüm', 'şeftali'];
        const hedef = kelimeler[Math.floor(Math.random() * kelimeler.length)];
        let deneme = 0;
        const maxDeneme = 6;

        message.reply(`🎯 **Wordle Oyunu Başladı!**\n5 harfli bir kelime tahmin et (Türkçe)\n6 deneme hakkın var!\nYeşil: Doğru harf doğru yer\nSarı: Doğru harf yanlış yer\nGri: Yanlış harf`);

        const filter = m => m.author.id === message.author.id && m.content.length === 5 && /^[a-zA-Zğüşöçİı]+$/.test(m.content.toLowerCase());
        const collector = message.channel.createMessageCollector({ filter, time: 120000, max: maxDeneme });

        collector.on('collect', m => {
            deneme++;
            const tahmin = m.content.toLowerCase();
            let sonuç = '';

            for (let i = 0; i < 5; i++) {
                if (tahmin[i] === hedef[i]) {
                    sonuç += '🟩';
                } else if (hedef.includes(tahmin[i])) {
                    sonuç += '🟨';
                } else {
                    sonuç += '⬜';
                }
            }

            m.reply(`Deneme ${deneme}/${maxDeneme}: ${tahmin.toUpperCase()}\n${sonuç}`);

            if (tahmin === hedef) {
                collector.stop('won');
            } else if (deneme === maxDeneme) {
                collector.stop('lost');
            }
        });

        collector.on('end', (collected, reason) => {
            if (reason === 'won') {
                message.channel.send(`🎉 **Tebrikler!** Kelimeyi ${deneme} denemede buldun: **${hedef.toUpperCase()}**`);
            } else if (reason === 'lost') {
                message.channel.send(`😔 **Kaybettin!** Kelime: **${hedef.toUpperCase()}** idi.`);
            } else {
                message.channel.send(`⏰ Zaman doldu! Kelime: **${hedef.toUpperCase()}** idi.`);
            }
        });
    }
};