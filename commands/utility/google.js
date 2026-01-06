// google.js - Utility
module.exports = {
    name: 'google',
    aliases: ['ara', 'google-ara', 'search'],
    description: 'Google\'da arama yapar',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen aranacak kelimeyi yaz! Örnek: `!google Discord bot nasıl yapılır`');
        }

        const query = args.join(' ');
        const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`;

        message.reply(`🔍 **Google Arama**\nAranan: **${query}**\n🔗 Sonuçlar: ${searchUrl}\n\n💡 İpucu: İlk sonuç genellikle en üstte çıkar!`);
    }
};