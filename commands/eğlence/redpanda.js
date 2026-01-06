// redpanda.js
module.exports = {
    name: 'redpanda',
    aliases: ['kırmızıpanda', 'redpandapic', 'firefox'],
    category: 'Eğlence',
    description: 'Rastgele sevimli bir kırmızı panda resmi gönderir',
    execute(message, args, client) {
        // Some-random-api - Red Panda için
        const redpandaUrl = 'https://some-random-api.com/animal/red_panda';

        fetch(redpandaUrl)
            .then(res => res.json())
            .then(data => {
                message.reply({
                    content: `🦝 **Sevimli Kırmızı Panda**\nİşte sana dünyanın en tatlı hayvanı! ❤️`,
                    files: [data.image]
                });
            })
            .catch(() => {
                message.reply('🦝 Kırmızı panda resmi yüklenirken bir sorun oluştu, tekrar dene!');
            });
    }
};