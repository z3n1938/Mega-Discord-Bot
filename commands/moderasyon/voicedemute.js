// voicedemute.js - Moderasyon
module.exports = {
    name: 'voicedemute',
    aliases: ['vunmute', 'sesaç', 'voiceunmute'],
    description: 'Belirtilen üyenin ses susturmasını kaldırır',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('MuteMembers')) {
            return message.reply('❌ **Üyeleri Sustur** iznin yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen sesi açılacak üyeyi belirt!');

        if (!target.voice.channel) return message.reply('❌ Bu üye herhangi bir ses kanalında değil!');

        if (!target.voice.serverMute) return message.reply('❌ Bu üyenin sesi zaten açık!');

        target.voice.setMute(false)
            .then(() => {
                message.reply(`🔊 **${target.user.tag}** üyesinin sesi açıldı!`);
            })
            .catch(() => {
                message.reply('❌ Ses açma başarısız.');
            });
    }
};