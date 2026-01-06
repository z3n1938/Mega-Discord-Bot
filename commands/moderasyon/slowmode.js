// slowmode.js - Moderasyon
module.exports = {
    name: 'slowmode',
    aliases: ['yavaşmod', 'slow'],
    description: 'Kanala yavaş mod uygular',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageChannels')) return message.reply('❌ **Kanalları Yönet** iznin yok!');

        const süre = parseInt(args[0]);
        if (isNaN(süre) || süre < 0 || süre > 21600) return message.reply('0-21600 saniye arasında bir değer gir! (0 = kapat)');

        message.channel.setRateLimitPerUser(süre)
            .then(() => message.reply(`✅ Yavaş mod **${süre === 0 ? 'kapatıldı' : süre + ' saniye'}** olarak ayarlandı!`))
            .catch(() => message.reply('❌ Yavaş mod ayarlanamadı.'));
    }
};