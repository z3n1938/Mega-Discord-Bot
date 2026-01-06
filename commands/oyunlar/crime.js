// crime.js - oyunlar
module.exports = {
    name: 'crime',
    aliases: ['suç', 'suçişle', 'crime'],
    description: 'Suç işleyerek coin kazanmaya çalışırsın (riskli!)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();
        if (!client.lastCrime) client.lastCrime = new Map();

        const userId = message.author.id;
        const now = Date.now();
        const last = client.lastCrime.get(userId) || 0;

        if (now - last < 7200000) { // 2 saat soğuma
            const kalan = formatTime(7200000 - (now - last));
            return message.reply(`🚔 Polis peşinde! Biraz saklan.\nTekrar suç işlemek için **${kalan}** beklemelisin.`);
        }

        const başarı = Math.random() < 0.55; // %55 başarı şansı
        const miktar = Math.floor(Math.random() * 401) + 200; // 200-600 coin

        if (başarı) {
            const current = client.coins.get(userId) || 0;
            client.coins.set(userId, current + miktar);
            client.lastCrime.set(userId, now);

            const başarıMesajları = [
                "Banka soydun ve kaçtın! 💰",
                "Hırsızlık yaptın, kimse fark etmedi! 🕶️",
                "Yasa dışı iş çevirdin, kâr ettin! 😈",
                "Kumarhaneyi dolandırdın! 🎰",
                "Karaborsa ticaretinden kazandın! 🤑"
            ];

            const mesaj = başarıMesajları[Math.floor(Math.random() * başarıMesajları.length)];
            message.reply(`✅ **Suç Başarılı!**\n${mesaj}\n**+${miktar}** coin kazandın!\nYeni bakiye: **${current + miktar}** coin`);
        } else {
            const ceza = Math.floor(Math.random() * 301) + 100; // 100-400 coin ceza
            const current = client.coins.get(userId) || 0;
            const yeniBakiye = Math.max(0, current - ceza);
            client.coins.set(userId, yeniBakiye);
            client.lastCrime.set(userId, now);

            const başarısızlıkMesajları = [
                "Polis seni yakaladı! Ceza ödedin! 👮",
                "Planın ters tepti, para kaybettin! 😭",
                "Hırsızlık yaparken güvenlik kamerasına yakalandın! 📹",
                "Kumarhanede güvenlik seni attı! 🚪",
                "Kaçarken düşüp paralarını döktün! 💸"
            ];

            const mesaj = başarısızlıkMesajları[Math.floor(Math.random() * başarısızlıkMesajları.length)];
            message.reply(`❌ **Suç Başarısız!**\n${mesaj}\n**-${ceza}** coin kaybettin!\nYeni bakiye: **${yeniBakiye}** coin`);
        }
    }
};