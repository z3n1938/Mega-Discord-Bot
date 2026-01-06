// cat.js
module.exports = {
    name: 'cat',
    aliases: ['kedi', 'kediresmi', 'catpic'],
    category: 'Eğlence',
    description: 'Rastgele sevimli bir kedi resmi gönderir',
    execute(message, args, client) {
        // Ücretsiz cat API'leri veya kalıcı linkler
        // TheCatAPI'den rastgele kedi (API gerektirmez, direkt link)
        const catId = Math.floor(Math.random() * 1000); // Rastgele ID
        const catUrl = `https://cataas.com/cat?${catId}`; // Cats as a Service - Rastgele kedi

        message.reply({
            content: `🐱 **Sevimli Kedi**\nİşte sana tatlı bir kedi!`,
            files: [catUrl]
        });
    }
};