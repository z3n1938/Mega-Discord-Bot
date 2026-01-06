// slap.js
module.exports = {
    name: 'slap',
    aliases: ['tokla', 'tokatlama'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye tokat atar',
    execute(message, args, client) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`🖐️ ${message.author} havaya tokat attı! Kimse kaçamaz!`);
        }

        if (member.id === message.author.id) {
            return message.reply(`🖐️ ${message.author} kendine tokat attı... niye ki? 😅`);
        }

        if (member.id === client.user.id) {
            return message.reply(`Heyy! ${message.author} beni tokatlamaya çalıştı ama kaçtım! 😝`);
        }

        message.reply(`🖐️ **Tokat Zamanı!**\n${message.author} ${member}'a şak diye bir tokat attı! 💥`);
    }
};