// boostlevel.js
module.exports = {
    name: 'boostlevel',
    aliases: ['boostseviye', 'serverboostlevel'],
    category: 'Bilgi',
    description: 'Sunucunun boost seviyesini gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        const tier = guild.premiumTier;
        let levelText = '';
        let perks = '';

        switch (tier) {
            case 0: levelText = 'Seviye Yok'; perks = 'Hiçbir ek özellik yok.'; break;
            case 1: levelText = 'Seviye 1'; perks = '50 Emoji Slotu (Toplam 100)\n+ Daha iyi ses kalitesi'; break;
            case 2: levelText = 'Seviye 2'; perks = '100 Emoji Slotu (Toplam 150)\n+ Animasyonlu sunucu ikonu\n+ Özel davet arka planı'; break;
            case 3: levelText = 'Seviye 3'; perks = '150 Emoji Slotu (Toplam 250)\n+ Vanitya URL\n+ Sunucu bannerı\n+ 100 Mbps ses kalitesi'; break;
        }

        message.reply(`🏆 **Sunucu Boost Seviyesi**\n` +
            `Mevcut Seviye: **${levelText}**\n` +
            `Avantajlar:\n${perks}`);
    }
};