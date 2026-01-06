// ceza-info.js - Moderasyon
module.exports = {
    name: 'ceza-info',
    aliases: ['cezabilgi', 'cezaid', 'cezano'],
    description: 'Belirtilen ceza numarasıyla ceza bilgisini gösterir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!client.cezalar) client.cezalar = [];

        const cezaNo = parseInt(args[0]);
        if (isNaN(cezaNo) || cezaNo < 1 || cezaNo > client.cezalar.length) {
            return message.reply('❌ Geçerli bir ceza numarası gir! (`!cezalar` ile listeleyebilirsin)');
        }

        const ceza = client.cezalar[cezaNo - 1];

        message.reply(`📋 **Ceza No: #${cezaNo}**\n` +
            `👤 **Üye:** ${ceza.user}\n` +
            `⚔️ **Tür:** ${ceza.type}\n` +
            `📝 **Sebep:** ${ceza.reason}\n` +
            `👮 **Yetkili:** ${ceza.moderator}\n` +
            `📅 **Tarih:** ${ceza.date}`);
    }
};