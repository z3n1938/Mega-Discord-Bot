// thumbsup.js
module.exports = {
    name: 'thumbsup',
    aliases: ['beğen', 'onayla', 'başparmak'],
    category: 'Eğlence',
    description: 'Başparmak yukarı yapar',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(`👍 ${message.author} onayladı! Harika fikir!`);
        }
        message.reply(`👍 ${message.author} ${member}'ı onayladı! İyi iş!`);
    }
};