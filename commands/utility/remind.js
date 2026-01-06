// remind.js - Utility
module.exports = {
    name: 'remind',
    aliases: ['hatırlat', 'hatırlatma', 'reminder'],
    description: 'Belirtilen sürede hatırlatma yapar',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length < 2) {
            return message.reply('❌ Kullanım: `!remind <süre> <metin>`\nÖrnek: `!remind 10m Su iç`');
        }

        const time = args[0];
        const reminder = args.slice(1).join(' ');

        const ms = parseTime(time);
        if (!ms || ms < 1000) {
            return message.reply('❌ Geçerli bir süre gir! (saniye: s, dakika: m, saat: h)\nÖrnek: 30s, 5m, 2h');
        }

        message.reply(`⏰ **Hatırlatma ayarlandı!**\n**${reminder}**\nSüre: **${time}** sonra hatırlatacağım.`);

        setTimeout(() => {
            message.reply(`⏰ **Hatırlatma!** <@${message.author.id}>\n**${reminder}**\n${formatTime(ms)} önce ayarlanmıştı.`);
        }, ms);
    }
};

// Zaman dönüştürücü (yardımcı fonksiyon)
function parseTime(time) {
    const regex = /^(\d+)(s|m|h)$/;
    const match = time.match(regex);
    if (!match) return null;

    const value = parseInt(match[1]);
    const unit = match[2];

    if (unit === 's') return value * 1000;
    if (unit === 'm') return value * 60 * 1000;
    if (unit === 'h') return value * 60 * 60 * 1000;
}

function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds} saniye`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika`;
    return `${Math.floor(seconds / 3600)} saat`;
}