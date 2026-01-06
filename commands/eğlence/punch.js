// punch.js
module.exports = {
    name: 'punch',
    aliases: ['yumruk', 'yumrukat'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye yumruk atar',
    execute(message, args, client) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`👊 ${message.author} gölge boksu yapıyor!`);
        }

        if (member.id === message.author.id) {
            return message.reply(`👊 ${message.author} kendine yumruk attı... acı çekmek mi istiyorsun? 😬`);
        }

        if (member.id === client.user.id) {
            return message.reply(`👊 ${message.author} bana yumruk atmaya çalıştı ama blokladım! 🛡️`);
        }

        message.reply(`👊 **Yumruk Zamanı!**\n${message.author} ${member}'a sağlam bir yumruk attı! 🤜💥`);
    }
};