// spoiler.js
module.exports = {
    name: 'spoiler',
    aliases: ['gizle', 'spoilertext'],
    category: 'Eğlence',
    description: 'Metni spoiler yapar',
    execute(message, args, client) {
        if (args.length === 0) return message.reply('Spoiler yapılacak metin gir!');
        message.channel.send(`||${args.join(' ')}||`);
        message.delete().catch(() => {});
    }
};