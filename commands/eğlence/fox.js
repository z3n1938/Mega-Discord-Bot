// fox.js
module.exports = {
    name: 'fox',
    aliases: ['tilki', 'foxpic', 'tilkiresmi'],
    category: 'Eğlence',
    description: 'Rastgele sevimli bir tilki resmi gönderir',
    execute(message, args, client) {
        // Random Fox API - Her çağrıda yeni tilki resmi döner
        const foxUrl = 'https://randomfox.ca/floof/';

        fetch(foxUrl)
            .then(res => res.json())
            .then(data => {
                message.reply({
                    content: `🦊 **Sevimli Tilki**\nİşte sana tatlı bir tilki!`,
                    files: [data.image]
                });
            })
            .catch(() => {
                message.reply('🦊 Tilki resmi yüklenirken bir sorun oluştu, tekrar dene!');
            });
    }
};