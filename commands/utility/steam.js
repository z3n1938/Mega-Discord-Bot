// steam.js - Utility
module.exports = {
    name: 'steam',
    aliases: ['steamara', 'oyun', 'game'],
    description: 'Steam mağazasında oyun arar',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen oyun adını yaz! Örnek: `!steam Counter Strike 2`');
        }

        const query = args.join(' ');
        const searchUrl = `https://store.steampowered.com/search/?term=${encodeURIComponent(query)}`;

        message.reply(`🎮 **Steam Arama**\nAranan: **${query}**\n🔗 Mağaza Sonuçları: ${searchUrl}\n\n💨 İndirim var mı kontrol et!`);
    }
};