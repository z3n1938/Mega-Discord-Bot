// rank.js - oyunlar
module.exports = {
    name: 'rank',
    aliases: ['seviyekartı', 'rankcard'],
    description: 'Seviye kartı gösterir (basit metin tabanlı)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.levels) client.levels = new Map();

        const target = message.mentions.users.first() || message.author;
        const userId = target.id;

        const userData = client.levels.get(userId) || { level: 1, xp: 0 };
        const xpNeeded = userData.level * 100;
        const progress = Math.floor((userData.xp / xpNeeded) * 20);
        const bar = '█'.repeat(progress) + '░'.repeat(20 - progress);

        message.reply(`🎴 **${target.username} Rank Kartı**\n` +
            `Seviye: **${userData.level}** | XP: **${userData.xp}/${xpNeeded}**\n` +
            `İlerleme: [${bar}] %${Math.floor((userData.xp / xpNeeded) * 100)}\n` +
            `Mesaj atmaya devam et, seviye atla! 🚀`);
    }
};