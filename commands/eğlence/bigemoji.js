// bigemoji.js
module.exports = {
    name: 'bigemoji',
    aliases: ['büyüt', 'bigemo'],
    category: 'Eğlence',
    description: 'Emojiyi büyütür',
    execute(message, args, client) {
        const emoji = args[0];
        if (!emoji) return message.reply('Lütfen bir emoji gir!');
        message.reply(emoji + emoji + emoji + '\n' + emoji + ' ' + emoji + '\n' + emoji + emoji + emoji);
    }
};