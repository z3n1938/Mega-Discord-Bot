// koala.js
module.exports = {
    name: 'koala',
    aliases: ['koalaresmi', 'koalapicture'],
    category: 'Eğlence',
    description: 'Rastgele sevimli bir koala resmi gönderir',
    execute(message, args, client) {
        // Some-random-api - Koala için
        const koalaUrl = 'https://some-random-api.com/animal/koala';

        fetch(koalaUrl)
            .then(res => res.json())
            .then(data => {
                message.reply({
                    content: `🦥 **Sevimli Koala**\nİşte sana tatlı bir koala!`,
                    files: [data.image]
                });
            })
            .catch(() => {
                message.reply('🦥 Koala resmi yüklenirken bir sorun oluştu, tekrar dene!');
            });
    }
};