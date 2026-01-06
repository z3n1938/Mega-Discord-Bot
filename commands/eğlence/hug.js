// hug.js
module.exports = {
    name: 'hug',
    aliases: ['sarıl', 'kucakla'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye sarılır',
    execute(message, args, client) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`🤗 **Sanal Sarılma**\n${message.author} sana sıkı sıkı sarılıyorum! ❤️`);
        }

        if (member.id === message.author.id) {
            return message.reply(`🤗 ${message.author} kendine sarıldı... biraz yalnız mı hissediyorsun? ❤️`);
        }

        message.reply(`🤗 **Sarılma Zamanı!**\n${message.author} ${member}'a sıcacık sarıldı! 🫂`);
    }
};