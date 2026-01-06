// bird.js
module.exports = {
    name: 'bird',
    aliases: ['kuş', 'birdpic', 'kuşresmi'],
    category: 'Eğlence',
    description: 'Rastgele sevimli bir kuş resmi gönderir',
    execute(message, args, client) {
        // Shibe.online API - Kuş resimleri için
        const birdUrl = 'https://shibe.online/api/birds?count=1&urls=true&httpsUrls=true';

        fetch(birdUrl)
            .then(res => res.json())
            .then(data => {
                message.reply({
                    content: `🐦 **Sevimli Kuş**\nİşte sana güzel bir kuş!`,
                    files: [data[0]]
                });
            })
            .catch(() => {
                message.reply('🐦 Kuş resmi yüklenirken bir sorun oluştu, tekrar dene!');
            });
    }
};