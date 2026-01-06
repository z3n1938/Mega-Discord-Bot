// weekly.js - oyunlar
module.exports = {
    name: 'weekly',
    aliases: ['haftalık', 'weeklyödül', 'haftalıkpara'],
    description: 'Haftalık coin ödülü alır (7 günde bir)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();
        if (!client.lastWeekly) client.lastWeekly = new Map();

        const userId = message.author.id;
        const now = Date.now();
        const last = client.lastWeekly.get(userId) || 0;

        if (now - last < 604800000) { // 7 gün
            const kalan = formatTime(604800000 - (now - last));
            return message.reply(`⏰ Haftalık ödülü zaten aldın!\nTekrar almak için **${kalan}** beklemelisin.`);
        }

        const ödül = Math.floor(Math.random() * 1001) + 500; // 500-1500 coin arası
        const current = client.coins.get(userId) || 0;
        client.coins.set(userId, current + ödül);
        client.lastWeekly.set(userId, now);

        message.reply(`🎊 **Haftalık Ödül!**\n${ödül} coin kazandın! 💰\nYeni bakiyen: **${current + ödül}** coin\nHaftaya tekrar gel!`);
    }
};