// timeout.js - Moderasyon (Zaten var ama güncellenmiş hali)
module.exports = {
    name: 'timeout',
    aliases: ['zaman aşımı', 'mute', 'sustur'],
    description: 'Belirtilen üyeye zaman aşımı (timeout) uygular',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply('❌ **Üyeleri Zaman Aşımına Uğrat** iznin yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen zaman aşımı uygulanacak üyeyi belirt!');

        const süre = parseInt(args[1]) || 10; // dakika, varsayılan 10
        if (isNaN(süre) || süre < 1 || süre > 40320) { // 28 gün = 40320 dakika
            return message.reply('❌ Süre 1 dakika ile 28 gün arasında olmalı!');
        }

        const reason = args.slice(2).join(' ') || 'Sebep belirtilmedi';

        target.timeout(süre * 60 * 1000, reason)
            .then(() => {
                message.reply(`⏰ **${target.user.tag}** ${süre} dakika zaman aşımına uğradı!\nSebep: \`${reason}\``);
            })
            .catch(() => {
                message.reply('❌ Zaman aşımı uygulanamadı. Üye benden yüksek olabilir.');
            });
    }
};