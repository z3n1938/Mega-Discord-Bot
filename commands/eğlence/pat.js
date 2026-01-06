// pat.js
module.exports = {
    name: 'pat',
    aliases: ['okşa', 'kafasınıokşa'],
    category: 'Eğlence',
    description: 'Belirtilen üyenin kafasını okşar',
    execute(message, args, client) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`🥰 ${message.author} kafasını okşuyorum, iyi çocuk! 🐶`);
        }

        if (member.id === message.author.id) {
            return message.reply(`🥰 ${message.author} kendi kafasını okşadı... biraz şefkat mi arıyorsun? ❤️`);
        }

        if (member.id === client.user.id) {
            return message.reply(`Aww, teşekkürler ${message.author}! Seni de okşuyorum~ 🥰`);
        }

        message.reply(`🥰 **Kafa Okşama Zamanı!**\n${message.author} ${member}'ın kafasını nazikçe okşadı! 🖐️`);
    }
};