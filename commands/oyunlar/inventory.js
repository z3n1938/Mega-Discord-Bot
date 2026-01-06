// inventory.js - oyunlar
module.exports = {
    name: 'inventory',
    aliases: ['envanter', 'eşyalar', 'items'],
    description: 'Satın aldığın eşyaları gösterir',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.inventory) client.inventory = new Map();

        const userInv = client.inventory.get(message.author.id) || [];

        if (userInv.length === 0) {
            return message.reply('📭 **Envanterin Boş!**\nMağazadan bir şeyler satın al: `!shop`');
        }

        const itemNames = {
            1: 'VIP Rolü (1 ay)',
            2: 'Özel Renk Rolü',
            3: 'Profil Bannerı',
            4: 'Nitro Boost Etkisi',
            5: 'Özel Emoji Kullanma Hakkı'
        };

        const liste = userInv.map((item, i) => `**${i + 1}.** ${itemNames[item] || 'Bilinmeyen Eşya'}`).join('\n');

        message.reply(`🎒 **${message.author.username}'nin Envanteri**\n\n${liste}\nToplam eşya: **${userInv.length}**`);
    }
};