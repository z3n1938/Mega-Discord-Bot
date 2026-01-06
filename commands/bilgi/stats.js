module.exports = {
    name: 'stats',
    aliases: ['istatistik', 'botstats'],
    category: 'Bilgi',
    description: 'Botun detaylı istatistiklerini gösterir',
    execute(message, args, client) {
        const totalGuilds = client.guilds.cache.size;
        const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const totalChannels = client.channels.cache.size;
        const uptime = client.uptime;

        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600000) % 24;
        const minutes = Math.floor(uptime / 60000) % 60;
        const seconds = Math.floor(uptime / 1000) % 66;

        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);
        const ping = Math.round(client.ws.ping);

        message.reply(`📊 **Bot İstatistikleri**\n` +
            `Sunucu Sayısı: **${totalGuilds}**\n` +
            `Toplam Kullanıcı: **${totalMembers}**\n` +
            `Kanal Sayısı: **${totalChannels}**\n` +
            `Çalışma Süresi: **${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye**\n` +
            `RAM Kullanımı: **${memoryUsage} MB**\n` +
            `Ping: **${ping}ms**`);
    }
};