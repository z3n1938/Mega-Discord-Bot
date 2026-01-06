// wave.js
module.exports = {
    name: 'wave',
    aliases: ['el salla', 'selamver'],
    category: 'Eğlence',
    description: 'El sallar',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(`👋 ${message.author} herkese el sallıyor! Selamlar! 😄`);
        }
        message.reply(`👋 ${message.author} ${member}'a el salladı! Merhaba!`);
    }
};