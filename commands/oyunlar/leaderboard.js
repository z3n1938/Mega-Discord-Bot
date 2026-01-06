// leaderboard.js - oyunlar
module.exports = {
    name: 'leaderboard',
    aliases: ['sıralama', 'lb', 'top'],
    description: 'Sunucunun coin veya seviye sıralamasını gösterir',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();
        if (!client.levels) client.levels = new Map(); // seviye sistemi

        const type = args[0]?.toLowerCase() || 'coin';

        let sıralama = [];

        if (type === 'coin' || type === 'para') {
            const entries = [...client.coins.entries()];
            sıralama = entries
                .sort((a, b) => b[1] - a[1])
                .slice(0, 10)
                .map((entry, i) => {
                    const user = client.users.cache.get(entry[0]);
                    return `**${i + 1}.** ${user ? user.tag : 'Bilinmeyen Üye'} — **${entry[1]}** coin`;
                });
            message.reply(`💰 **Coin Sıralaması** (Top 10)\n\n${sıralama.join('\n') || 'Henüz kimse coin kazanmamış!'}`);
        } else if (type === 'level' || type === 'seviye') {
            const entries = [...client.levels.entries()];
            sıralama = entries
                .sort((a, b) => (b[1].level - a[1].level) || (b[1].xp - a[1].xp))
                .slice(0, 10)
                .map((entry, i) => {
                    const user = client.users.cache.get(entry[0]);
                    return `**${i + 1}.** ${user ? user.tag : 'Bilinmeyen Üye'} — Seviye **${entry[1].level}** (${entry[1].xp} XP)`;
                });
            message.reply(`📈 **Seviye Sıralaması** (Top 10)\n\n${sıralama.join('\n') || 'Henüz kimse seviye atlamamış!'}`);
        } else {
            message.reply('❌ Geçersiz sıralama tipi! `!leaderboard coin` veya `!leaderboard level`');
        }
    }
};