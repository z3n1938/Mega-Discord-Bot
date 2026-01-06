// work.js - oyunlar
module.exports = {
    name: 'work',
    aliases: ['çalış', 'iş', 'calis'],
    description: 'Çalışarak coin kazanırsın (soğuma süresi: 1 saat)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();
        if (!client.lastWork) client.lastWork = new Map();

        const userId = message.author.id;
        const now = Date.now();
        const last = client.lastWork.get(userId) || 0;

        if (now - last < 3600000) { // 1 saat
            const kalan = formatTime(3600000 - (now - last));
            return message.reply(`😓 Yorgunsun, biraz dinlen!\nTekrar çalışmak için **${kalan}** beklemelisin.`);
        }

        const işler = [
            "Garsonluk yaptın ve bahşiş aldın",
            "Freelance iş bitirdin",
            "YouTube videosu çektin",
            "Kafe'de çalıştın",
            "Teslimat yaptın",
            "Kod yazdın (bot gibi!)",
            "Market'te kasiyerlik yaptın",
            "Oyun test ettin"
        ];

        const iş = işler[Math.floor(Math.random() * işler.length)];
        const kazanç = Math.floor(Math.random() * 151) + 50; // 50-200 coin arası

        const current = client.coins.get(userId) || 0;
        client.coins.set(userId, current + kazanç);
        client.lastWork.set(userId, now);

        message.reply(`💼 **Çalıştın!**\n${iş} → **+${kazanç}** coin kazandın!\nYeni bakiyen: **${current + kazanç}** coin\n1 saat sonra tekrar çalışabilirsin.`);
    }
};