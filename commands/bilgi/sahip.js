// sahip.js
module.exports = {
    name: 'sahip',
    aliases: ['owner', 'botsahip', 'developer'],
    category: 'Bilgi',
    description: 'Bot sahibini gösterir',
    execute(message, args, client) {
        // Bot sahibinin ID'sini buraya yaz (kendi Discord ID'n)
        const ownerId = 'SAHİP_DISCORD_ID_BURAYA'; // Örnek: '123456789012345678'
        const ownerTag = 'SahipKullanıcı#0001'; // İstersen tag yazabilirsin

        const owner = client.users.cache.get(ownerId);

        message.reply(`👑 **Bot Sahibi**\n` +
            `Sahip: **${owner ? owner.tag : ownerTag}**\n` +
            `Herhangi bir sorun için sahibiyle iletişime geçebilirsin!`);
    }
};