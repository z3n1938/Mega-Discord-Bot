// buy.js - oyunlar
module.exports = {
    name: 'buy',
    aliases: ['satınal', 'purchase', 'al'],
    description: 'Mağazadan bir şey satın alır',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();

        const userCoins = client.coins.get(message.author.id) || 0;
        const itemNo = parseInt(args[0]);

        const items = {
            1: { name: 'VIP Rolü', price: 5000, role: 'VIP_ROL_ID_BURAYA' },
            2: { name: 'Özel Renk Rolü', price: 3000, role: 'RENK_ROL_ID_BURAYA' },
            3: { name: 'Profil Bannerı', price: 2000, role: 'BANNER_ROL_ID_BURAYA' },
            4: { name: 'Nitro Boost Etkisi', price: 10000, role: 'NITRO_ROL_ID_BURAYA' },
            5: { name: 'Özel Emoji Kullanma Hakkı', price: 4000, role: 'EMOJI_ROL_ID_BURAYA' }
        };

        if (!itemNo || !items[itemNo]) {
            return message.reply('❌ Geçerli bir ürün numarası gir! Mağaza için: `!shop`');
        }

        const item = items[itemNo];

        if (userCoins < item.price) {
            return message.reply(`❌ Yeterli coinin yok!\nGerekli: **${item.price}** coin\nSahip olduğun: **${userCoins}** coin`);
        }

        // Rol ID'si belirtilmemişse sadece coin kes
        if (item.role && item.role !== 'ROL_ID_BURAYA') {
            const role = message.guild.roles.cache.get(item.role);
            if (role) {
                message.member.roles.add(role).catch(() => {});
            }
        }

        client.coins.set(message.author.id, userCoins - item.price);

        message.reply(`✅ **Satın Alım Başarılı!**\n**${item.name}** satın aldın!\nHarcanan: **${item.price}** coin\nKalan bakiye: **${userCoins - item.price}** coin`);
    }
};