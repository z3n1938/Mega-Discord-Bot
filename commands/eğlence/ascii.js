// ascii.js
module.exports = {
    name: 'ascii',
    aliases: ['asciiart', 'ascii sanat'],
    category: 'Eğlence',
    description: 'Basit ASCII sanatı yapar',
    execute(message, args, client) {
        const text = args.join(' ') || 'hello';
        const arts = [
            `(${text})`,
            `> ${text} <`,
            `${text.toUpperCase()}!!!`,
            `~ ${text} ~`
        ];
        message.reply('```\n' + arts[Math.floor(Math.random() * arts.length)] + '\n```');
    }
};