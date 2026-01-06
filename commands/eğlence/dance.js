// dance.js
module.exports = {
    name: 'dance',
    aliases: ['dans', 'danset'],
    category: 'Eğlence',
    description: 'Dans eder veya belirtilen üye ile dans eder',
    execute(message, args, client) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`🕺 ${message.author} tek başına deli gibi dans ediyor! 💃`);
        }

        if (member.id === message.author.id) {
            return message.reply(`💃 ${message.author} aynanın önünde dans ediyor, harika görünüyor! ✨`);
        }

        if (member.id === client.user.id) {
            return message.reply(`🕺 Haydi ${message.author}! Ben de geliyorum, dans edelim! 🎶`);
        }

        message.reply(`🎉 **Dans Zamanı!**\n${message.author} ${member}'ı dansa kaldırdı! 🕺💃`);
    }
};