// rep.js - oyunlar
module.exports = {
    name: 'rep',
    aliases: ['itibar', 'repgive', '+rep'],
    description: 'Bir üyeye +rep verir (24 saatte bir)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.rep) client.rep = new Map();
        if (!client.lastRep) client.lastRep = new Map();

        const target = message.mentions.members.first();
        if (!target || target.user.bot) {
            return message.reply('❌ Geçerli bir üye etiketle! (+rep vermek için)');
        }
        if (target.id === message.author.id) {
            return message.reply('❌ Kendine +rep veremezsin! 😏');
        }

        const userId = message.author.id;
        const now = Date.now();
        const last = client.lastRep.get(userId) || 0;

        if (now - last < 86400000) { // 24 saat
            const kalan = formatTime(86400000 - (now - last));
            return message.reply(`⏰ Bugün zaten +rep verdin!\nTekrar vermek için **${kalan}** beklemelisin.`);
        }

        const currentRep = client.rep.get(target.id) || 0;
        client.rep.set(target.id, currentRep + 1);
        client.lastRep.set(userId, now);

        message.reply(`✅ **+rep!**\n${message.author} → ${target} (+1 itibar)\n${target}'nin toplam itibarı: **${currentRep + 1}** 🌟`);
    }
};