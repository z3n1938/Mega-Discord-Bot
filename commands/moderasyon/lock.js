// lock.js - Moderasyon
module.exports = {
    name: 'lock',
    aliases: ['kilitle', 'kilit'],
    description: 'Kanalı kilitler (@everyone yazamaz)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageChannels')) return message.reply('❌ **Kanalları Yönet** iznin yok!');

        message.channel.permissionOverwrites.edit(message.guild.roles.everyone, { SendMessages: false })
            .then(() => message.reply('🔒 Kanal kilitlendi! Sadece yetkililer yazabilir.'))
            .catch(() => message.reply('❌ Kanal kilitlenemedi.'));
    }
};