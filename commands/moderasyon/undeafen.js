// undeafen.js - Moderasyon
module.exports = {
    name: 'undeafen',
    aliases: ['vkulaklığaçar', 'sesduy', 'undeaf'],
    description: 'Belirtilen üyenin kulaklığını açar',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('DeafenMembers')) {
            return message.reply('❌ **Üyeleri Sağırlaştır** iznin yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen kulaklığı açılacak üyeyi belirt!');

        if (!target.voice.channel) return message.reply('❌ Bu üye herhangi bir ses kanalında değil!');

        if (!target.voice.serverDeaf) return message.reply('❌ Bu üyenin kulaklığı zaten açık!');

        target.voice.setDeaf(false)
            .then(() => {
                message.reply(`🔊 **${target.user.tag}** üyesinin kulaklığı açıldı! (Artık sunucu sesini duyuyor)`);
            })
            .catch(() => {
                message.reply('❌ Kulaklık açma başarısız.');
            });
    }
};