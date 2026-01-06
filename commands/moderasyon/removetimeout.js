// removetimeout.js - Moderasyon
module.exports = {
    name: 'removetimeout',
    aliases: ['untimeout', 'zaman aşımı kaldır', 'unmute'],
    description: 'Belirtilen üyenin zaman aşımını (timeout) kaldırır',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ModerateMembers')) {
            return message.reply('❌ **Üyeleri Zaman Aşımına Uğrat** iznin yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen zaman aşımı kaldırılacak üyeyi belirt!');

        if (!target.isCommunicationDisabled()) {
            return message.reply('❌ Bu üyenin zaten zaman aşımı yok!');
        }

        target.timeout(null)
            .then(() => {
                message.reply(`✅ **${target.user.tag}** üyesinin zaman aşımı kaldırıldı! Artık yazabilir.`);
            })
            .catch(() => {
                message.reply('❌ Zaman aşımı kaldırma başarısız. Üye benden yüksek olabilir.');
            });
    }
};