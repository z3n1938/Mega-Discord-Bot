// daily.js - oyunlar
module.exports = {
    name: 'daily',
    aliases: ['günlük', 'dailyödül', 'günlükpara'],
    description: 'Günlük coin ödülü alır (24 saatte bir)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();
        if (!client.lastDaily) client.lastDaily = new Map();

        const userId = message.author.id;
        const now = Date.now();
        const last = client.lastDaily.get(userId) || 0;

        if (now - last < 86400000) { // 24 saat
            const kalan = formatTime(86400000 - (now - last));
            return message.reply(`⏰ Günlük ödülü zaten aldın!\nTekrar almak için **${kalan}** beklemelisin.`);
        }

        const ödül = Math.floor(Math.random() * 201) + 100; // 100-300 coin arası
        const current = client.coins.get(userId) || 0;
        client.coins.set(userId, current + ödül);
        client.lastDaily.set(userId, now);

        message.reply(`🎉 **Günlük Ödül!**\n${ödül} coin kazandın! 💰\nYeni bakiyen: **${current + ödül}** coin`);
    }
};