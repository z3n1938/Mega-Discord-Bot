// tarih.js
module.exports = {
    name: 'tarih',
    aliases: ['zaman', 'date', 'saat'],
    category: 'Bilgi',
    description: 'Şu anki tarih ve saati gösterir',
    execute(message, args, client) {
        const now = new Date();

        const dateTR = now.toLocaleDateString('tr-TR', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });

        const timeTR = now.toLocaleTimeString('tr-TR', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        message.reply(`📅 **Tarih ve Saat**\n` +
            `Tarih: **${dateTR}**\n` +
            `Saat: **${timeTR}** (Türkiye Saati)\n` +
            `Bugün: **${now.toLocaleDateString('tr-TR', { weekday: 'long' })}**`);
    }
};