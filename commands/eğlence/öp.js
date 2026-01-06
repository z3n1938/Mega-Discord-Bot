// öp.js
module.exports = {
    name: 'öp',
    aliases: ['öpücük', 'buse'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye öpücük gönderir',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) return message.reply(`😘 ${message.author} havaya öpücük gönderdi! 💨`);
        if (member.id === client.user.id) return message.reply(`Aww, teşekkürler ${message.author}! 💕`);
        message.reply(`😘 ${message.author} ${member}'a tatlı bir öpücük gönderdi! 💋`);
    }
};