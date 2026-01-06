// botdurum.js
module.exports = {
    name: 'botdurum',
    aliases: ['durum', 'botstatus', 'status'],
    category: 'Bilgi',
    description: 'Botun mevcut durum bilgilerini gösterir',
    execute(message, args, client) {
        const uptime = client.uptime;
        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600000) % 24;
        const minutes = Math.floor(uptime / 60000) % 60;
        const seconds = Math.floor(uptime / 1000) % 60;

        const ping = Math.round(client.ws.ping);
        const guildCount = client.guilds.cache.size;
        const userCount = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);

        message.reply(`🤖 **Bot Durumu**\n` +
            `Çalışma Süresi: **${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye**\n` +
            `Ping: **${ping}ms**\n` +
            `Sunucu Sayısı: **${guildCount}**\n` +
            `Toplam Kullanıcı: **${userCount}**\n` +
            `Durum: **Aktif ve Çalışıyor** ✅`);
    }
};