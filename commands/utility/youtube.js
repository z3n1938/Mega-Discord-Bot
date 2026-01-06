// youtube.js - Utility
module.exports = {
    name: 'youtube',
    aliases: ['yt', 'youtube-ara', 'videoara'],
    description: 'YouTube\'da arama yapar ve ilk sonuçları gösterir',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen aranacak kelimeyi yaz! Örnek: `!youtube Never Gonna Give You Up` veya `!yt kedi videoları`');
        }

        const query = args.join(' ');

        // YouTube arama linki (gerçek arama sonuçları sayfası)
        const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;

        // İlk video linki için basit bir tahmin (gerçek API yerine)
        // Not: Gerçek video linki almak için YouTube Data API v3 gerekir (API key gerekli)
        // Burada güvenli ve basit bir şekilde sadece arama linki veriyoruz
        message.reply(`🔍 **YouTube Arama Sonuçları**\n` +
            `Aranan: **${query}**\n` +
            `📺 Direkt arama sayfasına git: ${searchUrl}\n\n` +
            `💡 İpucu: İlk sonuç genellikle en üstte çıkar. Tıkla ve izle! 🎥`);
    }
};