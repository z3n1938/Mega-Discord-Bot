// remove.js - Moderasyon
module.exports = {
    name: 'remove',
    aliases: ['çıkar', 'ticketçıkar', 'at'],
    description: 'Ticket kanalından üye çıkarır',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.channel.name.startsWith('ticket-')) {
            return message.reply('❌ Bu komut sadece ticket kanallarında kullanılabilir!');
        }

        const target = message.mentions.members.first();
        if (!target) return message.reply('Lütfen kanaldan çıkarılacak üyeyi etiketle!');

        if (target.id === message.channel.topic) { // topic'te ticket sahibi ID'si varsa
            return message.reply('❌ Ticket sahibini çıkaramazsın!');
        }

        message.channel.permissionOverwrites.edit(target, {
            ViewChannel: false,
            SendMessages: false
        }).then(() => {
            message.reply(`✅ **${target}** ticket kanalından çıkarıldı!`);
        }).catch(() => {
            message.reply('❌ Üye çıkarılamadı. İzin sorunu olabilir.');
        });
    }
};