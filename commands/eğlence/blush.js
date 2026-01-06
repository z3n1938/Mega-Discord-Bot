// blush.js
module.exports = {
    name: 'blush',
    aliases: ['utangaç', 'kızar'],
    category: 'Eğlence',
    description: 'Utangaç olur veya belirtilen üyeden utangaç olur',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(`🥰 ${message.author} utangaç oldu... Çok mu tatlı bir şey mi söyledin? 😊`);
        }
        message.reply(`🥰 ${message.author} ${member}'dan dolayı kızardı! Ne dedin sen ona?! 😳`);
    }
};