// wikipedia.js - Utility
module.exports = {
    name: 'wikipedia',
    aliases: ['wiki', 'vikipedi', 'ara'],
    description: 'Wikipedia\'dan belirtilen konuda kısa özet getirir',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen aranacak konuyu yaz! Örnek: `!wiki Albert Einstein` veya `!wiki İstanbul`');
        }

        const query = args.join(' ');

        // Türkçe Wikipedia API (tr.wikipedia.org)
        const searchUrl = `https://tr.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(query)}`;

        fetch(searchUrl)
            .then(res => res.json())
            .then(data => {
                if (data.type === 'disambiguation' || data.type === 'standard' || data.type === 'https://tr.wikipedia.org/api/rest_v1/page/summary/') {
                    if (!data.extract || data.extract.trim() === '') {
                        return message.reply(`❌ **"${query}"** için Wikipedia'da yeterli bilgi bulunamadı. Farklı bir kelime dene.`);
                    }

                    const title = data.title || query;
                    const description = data.extract.length > 500 ? data.extract.substring(0, 500) + '...' : data.extract;
                    const url = data.content_urls.desktop.page;

                    message.reply(`📖 **Wikipedia - ${title}**\n\n${description}\n\nDevamı için: ${url}`);
                } else {
                    message.reply(`❌ **"${query}"** için sonuç bulunamadı. Daha spesifik bir arama yapmayı dene.`);
                }
            })
            .catch(err => {
                console.error(err);
                message.reply('❌ Wikipedia sorgusu sırasında bir hata oluştu. Daha sonra tekrar dene.');
            });
    }
};