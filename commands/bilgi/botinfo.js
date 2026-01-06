module.exports = {
    name: 'botinfo',
    aliases: ['botbilgi', 'info'],
    category: 'Bilgi',
    description: 'Botun bilgilerini gösterir',
    execute(message, args, client) {
        const totalGuilds = client.guilds.cache.size;
        const totalMembers = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0);
        const uptime = client.uptime;
        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600000) % 24;
        const minutes = Math.floor(uptime / 60000) % 60;
        const seconds = Math.floor(uptime / 1000) % 60;

        message.reply(`🤖 **Bot Bilgileri**\nSunucu Sayısı: ${totalGuilds}\nKullanıcı Sayısı: ${totalMembers}\nÇalışma Süresi: ${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye\nAPI Ping: ${Math.round(client.ws.ping)}ms`);
    }
};