module.exports = {
    name: 'antinuke',
    aliases: ['antinukeayarla', 'antiraid', 'koruma'],
    description: 'AntiNuke (sunucu koruma) sistemini açar/kapatır',
    category: 'Moderasyon',
    execute(message, args, client) { // <-- client parametresi eklendi
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ Bu komutu sadece **Yönetici** kullanabilir!');
        }

        if (!client.antinuke) client.antinuke = { enabled: false, limit: 5, time: 10000 };

        const action = args[0]?.toLowerCase();

        if (action === 'aç' || action === 'on' || action === 'enable') {
            client.antinuke.enabled = true;
            message.reply('🛡️ **AntiNuke koruması aktif edildi!**');
        } else if (action === 'kapat' || action === 'off' || action === 'disable') {
            client.antinuke.enabled = false;
            message.reply('⚠️ **AntiNuke koruması devre dışı bırakıldı!**');
        } else {
            message.reply(`🛡️ **AntiNuke Durumu:** ${client.antinuke.enabled ? 'Açık' : 'Kapalı'}`);
        }
    }
};