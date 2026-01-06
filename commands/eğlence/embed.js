// embed.js
module.exports = {
    name: 'embed',
    aliases: ['göm', 'embedyazı'],
    category: 'Eğlence',
    description: 'Embed mesaj gönderir',
    execute(message, args, client) {
        if (args.length === 0) return message.reply('Embed mesajı için metin gir!');
        const embed = {
            color: 0x0099ff,
            description: args.join(' '),
            timestamp: new Date(),
            footer: { text: `Gönderen: ${message.author.tag}` }
        };
        message.channel.send({ embeds: [embed] });
        message.delete().catch(() => {});
    }
};