// kısalt.js - Utility
module.exports = {
    name: 'kısalt',
    aliases: ['shorten', 'urlkısalt', 'linkkısalt'],
    description: 'Uzun URL\'yi kısa hale getirir (is.gd API ile)',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen kısaltılacak URL\'yi yaz! Örnek: `!kısalt https://www.youtube.com/watch?v=dQw4w9WgXcQ`');
        }

        const url = args[0];
        if (!url.startsWith('http://') && !url.startsWith('https://')) {
            return message.reply('❌ Geçerli bir URL gir! (http veya https ile başlamalı)');
        }

        const apiUrl = `https://is.gd/create.php?format=simple&url=${encodeURIComponent(url)}`;

        fetch(apiUrl)
            .then(res => res.text())
            .then(shortUrl => {
                if (shortUrl.includes('Error')) {
                    message.reply('❌ URL kısaltılamadı. Geçerli bir link olduğundan emin ol.');
                } else {
                    message.reply(`🔗 **URL Kısaltıldı!**\nOrijinal: ${url}\nKısa: ${shortUrl}`);
                }
            })
            .catch(() => {
                message.reply('❌ Kısaltma servisi şu an yanıt vermiyor. Daha sonra dene.');
            });
    }
};