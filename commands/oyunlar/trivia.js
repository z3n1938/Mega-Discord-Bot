// trivia.js - oyunlar
module.exports = {
    name: 'trivia',
    aliases: ['bilgi', 'quiz', 'soru'],
    description: 'Rastgele bir bilgi sorusu sorar',
    category: 'oyunlar',
    execute(message, args, client) {
        const sorular = [
            { soru: "Dünyanın en uzun nehri hangisidir?", cevap: "nil" },
            { soru: "İnsan vücudunda kaç kemik bulunur?", cevap: "206" },
            { soru: "Python programlama dili hangi yıl yayınlandı?", cevap: "1991" },
            { soru: "Güneş sistemindeki en büyük gezegen hangisidir?", cevap: "jüpiter" },
            { soru: "Periyodik tablodaki ilk element hangisidir?", cevap: "hidrojen" },
            { soru: "Türkiye'nin başkenti neresidir?", cevap: "ankara" },
            { soru: "Pi sayısı yaklaşık kaçtır?", cevap: "3.14" },
            { soru: "En hızlı kara hayvanı hangisidir?", cevap: "çita" },
            { soru: "Dünya'nın uydusunun adı nedir?", cevap: "ay" },
            { soru: "En yüksek dağ hangisidir?", cevap: "everest" }
        ];

        const soru = sorular[Math.floor(Math.random() * sorular.length)];

        message.reply(`❓ **Bilgi Yarışması!**\nSoru: ${soru.soru}\n\nCevabını yaz, 15 saniyen var! ⏰`)
            .then(() => {
                const filter = m => m.author.id === message.author.id;
                message.channel.awaitMessages({ filter, max: 1, time: 15000, errors: ['time'] })
                    .then(collected => {
                        const cevap = collected.first().content.toLowerCase().replace(/[^a-z0-9ğüşöçİı]/g, '');
                        if (cevap.includes(soru.cevap) || soru.cevap.includes(cevap)) {
                            message.reply(`✅ **Doğru cevap!** 🎉\nCevap: **${soru.cevap.charAt(0).toUpperCase() + soru.cevap.slice(1)}**`);
                        } else {
                            message.reply(`❌ **Yanlış cevap!**\nDoğru cevap: **${soru.cevap.charAt(0).toUpperCase() + soru.cevap.slice(1)}** idi 😔`);
                        }
                    })
                    .catch(() => {
                        message.reply(`⏰ Zaman doldu!\nDoğru cevap: **${soru.cevap.charAt(0).toUpperCase() + soru.cevap.slice(1)}** idi ⏳`);
                    });
            });
    }
};