// countdown.js - Utility
module.exports = {
    name: 'countdown',
    aliases: ['geri sayım', 'sayac', 'countdownstart'],
    description: 'Belirtilen süreye geri sayım yapar (saniye saniye gösterir)',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Kullanım: `!countdown <süre>`\nÖrnek: `!countdown 10s` veya `!countdown 2m`');
        }

        const time = args[0];
        let seconds = parseInt(time);

        // s, m, h desteği
        if (time.endsWith('s')) seconds = parseInt(time.slice(0, -1));
        else if (time.endsWith('m')) seconds = parseInt(time.slice(0, -1)) * 60;
        else if (time.endsWith('h')) seconds = parseInt(time.slice(0, -1)) * 3600;
        else seconds = parseInt(time);

        if (isNaN(seconds) || seconds < 1 || seconds > 600) { // Max 10 dakika
            return message.reply('❌ Süre 1 saniye ile 10 dakika arasında olmalı! (s/m/h destekler)');
        }

        let remaining = seconds;
        message.reply(`⏳ **Geri Sayım Başladı!**\n${remaining} saniye...`).then(msg => {
            const interval = setInterval(() => {
                remaining--;
                if (remaining <= 0) {
                    clearInterval(interval);
                    msg.edit(`🎉 **SÜRE DOLDU!** 🔔\n0 saniye kaldı!`);
                } else {
                    msg.edit(`⏳ **Geri Sayım**\n${remaining} saniye...`);
                }
            }, 1000);
        });
    }
};