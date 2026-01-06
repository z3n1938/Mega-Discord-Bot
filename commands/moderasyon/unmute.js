// unmute.js - Moderasyon
module.exports = {
    name: 'unmute',
    aliases: ['susturkaldır', 'untimeout'],
    description: 'Susturulmuş üyenin susturmasını kaldırır',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ModerateMembers')) return message.reply('❌ **Üyeleri Zaman Aşımına Uğrat** iznin yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen susturması kaldırılacak üyeyi belirt!');

        target.timeout(null)
            .then(() => message.reply(`✅ **${target.user.tag}** susturması kaldırıldı!`))
            .catch(() => message.reply('❌ Susturma kaldırma başarısız.'));
    }
};