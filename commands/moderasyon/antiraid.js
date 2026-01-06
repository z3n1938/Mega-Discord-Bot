// antiraid.js - Moderasyon
module.exports = {
    name: 'antiraid',
    aliases: ['antiraidayarla', 'raidkoruma', 'raidmod'],
    description: 'Anti-Raid (yeni üye akını) korumasını açar/kapatır',
    category: 'Moderasyon',
    execute(message, args, client) { // <-- client parametresi eklendi (en önemli kısım!)
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ Bu komutu sadece **Yönetici** kullanabilir!');
        }

        // Varsayılan ayarlar (ilk kullanımda oluştur)
        if (!client.antiraid) {
            client.antiraid = {
                enabled: false,
                limit: 10,      // 10 saniyede 10+ yeni üye
                time: 10000,    // 10 saniye
                action: 'kick'  // 'kick' veya 'ban'
            };
        }

        const action = args[0]?.toLowerCase();

        if (action === 'aç' || action === 'on' || action === 'enable') {
            client.antiraid.enabled = true;
            message.reply(`🛡️ **Anti-Raid Koruması Aktif Edildi!**\n` +
                `Limit: 10 saniyede ${client.antiraid.limit} yeni üye\n` +
                `Eylem: ${client.antiraid.action === 'ban' ? 'Ban' : 'Kick'}`);
        } else if (action === 'kapat' || action === 'off' || action === 'disable') {
            client.antiraid.enabled = false;
            message.reply('⚠️ **Anti-Raid Koruması Devre Dışı Bırakıldı!**');
        } else if (action === 'ban') {
            client.antiraid.action = 'ban';
            message.reply('🔨 Anti-Raid eylemi **Ban** olarak ayarlandı.');
        } else if (action === 'kick') {
            client.antiraid.action = 'kick';
            message.reply('👢 Anti-Raid eylemi **Kick** olarak ayarlandı.');
        } else {
            message.reply(`🛡️ **Anti-Raid Durumu:** ${client.antiraid.enabled ? '✅ Açık' : '❌ Kapalı'}\n` +
                `Limit: ${client.antiraid.limit} üye / 10 sn\n` +
                `Eylem: **${client.antiraid.action.toUpperCase()}**\n\n` +
                `Kullanım:\n` +
                `\`!antiraid aç\` - Korumayı açar\n` +
                `\`!antiraid kapat\` - Korumayı kapatır\n` +
                `\`!antiraid ban\` - Raid durumunda banlar\n` +
                `\`!antiraid kick\` - Raid durumunda kickler`);
        }
    }
};