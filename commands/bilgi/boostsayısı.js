// boostsayısı.js
module.exports = {
    name: 'boostsayısı',
    aliases: ['boostsayı', 'boost', 'nitroboost'],
    category: 'Bilgi',
    description: 'Sunucudaki boost sayısını ve seviyesini gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        const boostCount = guild.premiumSubscriptionCount || 0;
        const boostLevel = guild.premiumTier === 0 ? 'Yok' : `Seviye ${guild.premiumTier}`;

        message.reply(`💎 **Sunucu Boost Bilgileri**\n` +
            `Boost Sayısı: **${boostCount}**\n` +
            `Boost Seviyesi: **${boostLevel}**`);
    }
};