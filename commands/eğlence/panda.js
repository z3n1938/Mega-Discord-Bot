// panda.js
module.exports = {
    name: 'panda',
    aliases: ['pandaresmi', 'pandapicture'],
    category: 'Eğlence',
    description: 'Rastgele sevimli bir panda resmi gönderir',
    execute(message, args, client) {
        // Some-random-api - Panda için
        const pandaUrl = 'https://some-random-api.com/animal/panda';

        fetch(pandaUrl)
            .then(res => res.json())
            .then(data => {
                message.reply({
                    content: `🐼 **Sevimli Panda**\nİşte sana tatlı bir panda!`,
                    files: [data.image]
                });
            })
            .catch(() => {
                message.reply('🐼 Panda resmi yüklenirken bir sorun oluştu, tekrar dene!');
            });
    }
};