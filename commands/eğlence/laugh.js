// laugh.js
module.exports = {
    name: 'laugh',
    aliases: ['gül', 'kahkaha', 'lol'],
    category: 'Eğlence',
    description: 'Güler veya belirtilen üyeye güler',
    execute(message, args, client) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`😂 ${message.author} kahkahalara boğuldu! Ne oldu çok mu komik bir şey mi gördün?`);
        }

        if (member.id === message.author.id) {
            return message.reply(`🤣 ${message.author} kendine gülüyor... çok mu komiksin bugün? 😏`);
        }

        message.reply(`😂 **Kahkaha Zamanı!**\n${message.author} ${member}'a gülüyor... ne yaptın yine? 🤭`);
    }
};