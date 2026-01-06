// kiss.js
module.exports = {
    name: 'kiss',
    aliases: ['öp', 'öpücük', 'buse'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye öpücük gönderir',
    execute(message, args, client) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`😘 ${message.author} havaya öpücük gönderdi! 💨`);
        }

        if (member.id === message.author.id) {
            return message.reply(`😘 ${message.author} kendini öptü... narsist modu aktif! 😏`);
        }

        if (member.id === client.user.id) {
            return message.reply(`😊 Aww, teşekkürler ${message.author}! Sana da kocaman bir öpücük! 😘❤️`);
        }

        message.reply(`😘 **Öpücük Zamanı!**\n${message.author} ${member}'a tatlı bir öpücük gönderdi! 💋`);
    }
};