// twitch.js - Utility
module.exports = {
    name: 'twitch',
    aliases: ['twitchara', 'canlı', 'stream'],
    description: 'Twitch\'te kanal veya oyun arar',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen kanal veya oyun adını yaz! Örnek: `!twitch xQc` veya `!twitch Valorant`');
        }

        const query = args.join(' ');
        const searchUrl = `https://www.twitch.tv/search?term=${encodeURIComponent(query)}`;

        message.reply(`📺 **Twitch Arama**\nAranan: **${query}**\n🔗 Canlı Yayınlar: ${searchUrl}\n\n🔴 Kim canlı bak bakalım!`);
    }
};