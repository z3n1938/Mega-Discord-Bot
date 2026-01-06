// poll.js
module.exports = {
    name: 'poll',
    aliases: ['anket', 'oylama'],
    category: 'Eğlence',
    description: 'Basit anket oluşturur',
    execute(message, args, client) {
        if (args.length === 0) return message.reply('Anket sorusu ne olacak?');
        const question = args.join(' ');
        message.channel.send(`📊 **Anket**\n${question}\n\n✅ = Evet\n❌ = Hayır`).then(sent => {
            sent.react('✅');
            sent.react('❌');
        });
        message.delete().catch(() => {});
    }
};