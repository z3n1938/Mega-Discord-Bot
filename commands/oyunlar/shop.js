// shop.js - oyunlar
module.exports = {
    name: 'shop',
    aliases: ['mağaza', 'dükkan', 'market'],
    description: 'Ekonomi mağazasını gösterir',
    category: 'oyunlar',
    execute(message, args, client) {
        const embed = {
            color: 0x00FF00,
            title: '🛒 EKONOMİ MAĞAZASI',
            description: 'Coinlerini harca ve özel şeyler satın al!\n\n' +
                '**1.** VIP Rolü - `5000 coin` (1 ay)\n' +
                '**2.** Özel Renk Rolü - `3000 coin`\n' +
                '**3.** Profil Bannerı - `2000 coin`\n' +
                '**4.** Nitro Boost Etkisi - `10000 coin` (gerçek nitro değil)\n' +
                '**5.** Özel Emoji Kullanma Hakkı - `4000 coin`\n\n' +
                `Satın almak için: \`!buy <numara>\``,
            footer: { text: 'Yeni ürünler yakında eklenecek!' }
        };

        message.reply({ embeds: [embed] });
    }
};