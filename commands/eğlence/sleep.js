// sleep.js
module.exports = {
    name: 'sleep',
    aliases: ['uyu', 'uyuma'],
    category: 'Eğlence',
    description: 'Uyur veya belirtilen üyeyi uyutur',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(`😴 ${message.author} uyumaya gitti... İyi geceler! 🌙`);
        }
        if (member.id === message.author.id) {
            return message.reply(`😴 ${message.author} kendini uyuttu... biraz dinlenmeye ihtiyacın var galiba. 🛌`);
        }
        message.reply(`😴 ${message.author} ${member}'ı uyuttu! Hadi yat uyu artık. 🛏️`);
    }
};