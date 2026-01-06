module.exports = {
    name: 'uptime',
    aliases: ['çalışmasüresi', 'ne kadardır çalışıyor'],
    category: 'Bilgi',
    description: 'Botun ne kadar süredir çalıştığını gösterir',
    execute(message, args, client) {
        const uptime = client.uptime; // milisaniye cinsinden

        const days = Math.floor(uptime / 86400000);
        const hours = Math.floor(uptime / 3600000) % 24;
        const minutes = Math.floor(uptime / 60000) % 60;
        const seconds = Math.floor(uptime / 1000) % 60;

        message.reply(`⏰ **Bot Çalışma Süresi**\n${days} gün, ${hours} saat, ${minutes} dakika, ${seconds} saniye`);
    }
};