// sarıl.js
module.exports = {
    name: 'sarıl',
    aliases: ['hug', 'kucakla'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye sarılır',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) return message.reply(`🤗 ${message.author} sana sarılıyorum! 🫂`);
        if (member.id === client.user.id) return message.reply(`🤗 Teşekkürler ${message.author}! Ben de sana sarılıyorum! ❤️`);
        message.reply(`🤗 ${message.author} ${member}'a sıcacık sarıldı! 🫂`);
    }
};