// imdb.js - Utility
module.exports = {
    name: 'imdb',
    aliases: ['film', 'movie', 'dizi'],
    description: 'IMDB\'de film/dizi arar',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen film veya dizi adını yaz! Örnek: `!imdb Inception`');
        }

        const query = args.join(' ');
        const searchUrl = `https://www.imdb.com/find?q=${encodeURIComponent(query)}`;

        message.reply(`🎬 **IMDB Arama**\nAranan: **${query}**\n🔗 Sonuçlar: ${searchUrl}\n\n🍿 En iyi eşleşme genellikle ilk sıradadır!`);
    }
};