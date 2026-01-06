// mute.js - Moderasyon (Timeout tabanlı)
module.exports = {
    name: 'mute',
    aliases: ['sustur', 'timeout'],
    description: 'Belirtilen üyeyi susturur (timeout)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ModerateMembers')) return message.reply('❌ **Üyeleri Zaman Aşımına Uğrat** iznin yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen susturulacak üyeyi belirt!');

        const süre = args[1] ? parseInt(args[1]) : 60; // dakika
        if (isNaN(süre) || süre < 1 || süre > 40320) return message.reply('Süre 1 dakika ile 28 gün arasında olmalı!');

        const reason = args.slice(2).join(' ') || 'Sebep belirtilmedi';

        target.timeout(süre * 60 * 1000, reason)
            .then(() => message.reply(`✅ **${target.user.tag}** ${süre} dakika susturuldu!\nSebep: \`${reason}\``))
            .catch(() => message.reply('❌ Susturma başarısız.'));
    }
};