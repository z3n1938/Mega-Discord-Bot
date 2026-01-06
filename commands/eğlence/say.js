// say.js
module.exports = {
    name: 'say',
    aliases: ['söyle', 'tekrarla'],
    category: 'Eğlence',
    description: 'Bot senin yerine yazar',
    execute(message, args, client) {
        if (args.length === 0) return message.reply('Ne söylememi istiyorsun?');
        message.channel.send(args.join(' '));
        message.delete().catch(() => {});
    }
};