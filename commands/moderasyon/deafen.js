// deafen.js - Moderasyon
module.exports = {
    name: 'deafen',
    aliases: ['vkulaklık', 'seskapat', 'deaf'],
    description: 'Belirtilen üyenin kulaklığını kapatır (sunucu sesini duymaz)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('DeafenMembers')) {
            return message.reply('❌ **Üyeleri Sağırlaştır** iznin yok!');
        }
        if (!message.guild.members.me.permissions.has('DeafenMembers')) {
            return message.reply('❌ Botun **Üyeleri Sağırlaştır** izni yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen sağırlaştırılacak üyeyi belirt!');

        if (!target.voice.channel) return message.reply('❌ Bu üye herhangi bir ses kanalında değil!');

        if (target.voice.serverDeaf) return message.reply('❌ Bu üyenin kulaklığı zaten kapalı!');

        target.voice.setDeaf(true, `${message.author.tag} tarafından sağırlaştırıldı`)
            .then(() => {
                message.reply(`🔇 **${target.user.tag}** üyesinin kulaklığı kapatıldı! (Sunucu sesini duymuyor)`);
            })
            .catch(() => {
                message.reply('❌ Sağırlaştırma başarısız. Üye benden yüksek bir rolde olabilir.');
            });
    }
};