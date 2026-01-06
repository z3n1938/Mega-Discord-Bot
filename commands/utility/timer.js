// timer.js - Utility
module.exports = {
    name: 'timer',
    aliases: ['zamanlayıcı', 'sayac', 'timerstart'],
    description: 'Belirtilen süre sonunda bildirim gönderir',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Kullanım: `!timer <süre>`\nÖrnek: `!timer 5m` veya `!timer 30s`');
        }

        const time = args[0];
        const ms = parseTime(time);
        if (!ms || ms < 1000) {
            return message.reply('❌ Geçerli bir süre gir! (s: saniye, m: dakika, h: saat)\nÖrnek: 10s, 2m, 1h');
        }

        message.reply(`⏱️ **Zamanlayıcı başlatıldı!**\nSüre: **${time}**\nBittiğinde bildireceğim.`);

        setTimeout(() => {
            message.reply(`⏰ **ZAMAN DOLDU!** <@${message.author.id}>\n**${time}** süre bitti! 🔔`);
        }, ms);
    }
};

// parseTime ve formatTime aynı fonksiyonları yukarıdaki remind'de olduğu gibi kullan