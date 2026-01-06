// uyarılar.js - Moderasyon
module.exports = {
    name: 'uyarılar',
    aliases: ['warns', 'uyarılistesi'],
    description: 'Belirtilen üyenin uyarılarını gösterir',
    category: 'Moderasyon',
    execute(message, args, client) {
        const target = message.mentions.members.first() || message.member;

        if (!client.uyarılar) client.uyarılar = new Map();
        const warnings = client.uyarılar.get(target.id) || [];

        if (warnings.length === 0) {
            return message.reply(`✅ **${target.user.tag}**'ın hiç uyarısı yok!`);
        }

        let warningList = warnings.map((w, i) => 
            `**${i + 1}.** ${w.reason}\n   ↳ Yetkili: ${w.moderator} | Tarih: ${w.date}`
        ).join('\n\n');

        if (warningList.length > 1800) warningList = warningList.substring(0, 1800) + '\n...';

        message.reply(`⚠️ **${target.user.tag}**'ın Uyarıları (Toplam: ${warnings.length})\n\n${warningList}`);
    }
};