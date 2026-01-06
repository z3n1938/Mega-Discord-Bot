// profile.js - oyunlar
module.exports = {
    name: 'profile',
    aliases: ['profil', 'bilgi', 'userprofile'],
    description: 'Kullanıcının ekonomi ve seviye profilini gösterir',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();
        if (!client.levels) client.levels = new Map();

        const target = message.mentions.users.first() || message.author;
        const userId = target.id;

        const coins = client.coins.get(userId) || 0;
        const userData = client.levels.get(userId) || { level: 1, xp: 0 };
        const xpNeeded = userData.level * 100;
        const progress = Math.floor((userData.xp / xpNeeded) * 20);
        const bar = '█'.repeat(progress) + '░'.repeat(20 - progress);

        const embed = {
            color: 0x00FFFF,
            title: `👤 ${target.username} Profili`,
            thumbnail: { url: target.displayAvatarURL({ dynamic: true }) },
            fields: [
                { name: '💰 Coin', value: `**${coins}** coin`, inline: true },
                { name: '📈 Seviye', value: `**${userData.level}**`, inline: true },
                { name: '✨ XP', value: `${userData.xp}/${xpNeeded}`, inline: true },
                { name: 'İlerleme', value: `[${bar}] %${Math.floor((userData.xp / xpNeeded) * 100)}`, inline: false }
            ],
            footer: { text: 'Mesaj atarak seviye atla, oyunlarla coin kazan!' }
        };

        message.reply({ embeds: [embed] });
    }
};