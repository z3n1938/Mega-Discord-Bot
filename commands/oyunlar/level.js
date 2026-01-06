// level.js - oyunlar
module.exports = {
    name: 'level',
    aliases: ['seviye', 'lvl', 'xp'],
    description: 'Seviye sistemini gösterir (mesaj başına XP)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.levels) client.levels = new Map();

        const target = message.mentions.users.first() || message.author;
        const userId = target.id;

        const userData = client.levels.get(userId) || { level: 1, xp: 0 };
        const xpNeeded = userData.level * 100; // Her seviye 100 XP daha fazla

        message.reply(`📊 **${target.username} Seviye Bilgisi**\n` +
            `Seviye: **${userData.level}**\n` +
            `XP: **${userData.xp}/${xpNeeded}**\n` +
            `İlerleme: **${Math.floor((userData.xp / xpNeeded) * 100)}%**`);
    }
};