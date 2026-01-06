// add.js - Moderasyon
module.exports = {
    name: 'add',
    aliases: ['ekle', 'ticketekle', 'katıl'],
    description: 'Ticket kanalına üye ekler',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.channel.name.startsWith('ticket-')) {
            return message.reply('❌ Bu komut sadece ticket kanallarında kullanılabilir!');
        }

        const target = message.mentions.members.first();
        if (!target) return message.reply('Lütfen kanala eklenecek üyeyi etiketle!');

        message.channel.permissionOverwrites.edit(target, {
            ViewChannel: true,
            SendMessages: true
        }).then(() => {
            message.reply(`✅ **${target}** ticket kanalına eklendi!`);
        }).catch(() => {
            message.reply('❌ Üye eklenemedi. İzin sorunu olabilir.');
        });
    }
};