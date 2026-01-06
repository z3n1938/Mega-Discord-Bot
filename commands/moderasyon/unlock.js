// unlock.js - Moderasyon
module.exports = {
    name: 'unlock',
    aliases: ['kilitaç', 'unlockkanal'],
    description: 'Kilitli kanalı açar',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageChannels')) return message.reply('❌ **Kanalları Yönet** iznin yok!');

        message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: null })
            .then(() => message.reply('🔓 Kanal kilidi açıldı! Herkes yazabilir.'))
            .catch(() => message.reply('❌ Kanal kilidi açılamadı.'));
    }
};