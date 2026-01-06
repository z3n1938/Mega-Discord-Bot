// voicemute.js - Moderasyon
module.exports = {
    name: 'voicemute',
    aliases: ['vmut', 'sesmute', 'voicemute'],
    description: 'Belirtilen üyenin sesini susturur (mikrofonunu kapatır)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('MuteMembers')) {
            return message.reply('❌ **Üyeleri Sustur** iznin yok!');
        }
        if (!message.guild.members.me.permissions.has('MuteMembers')) {
            return message.reply('❌ Botun **Üyeleri Sustur** izni yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen sesi susturulacak üyeyi belirt!');

        if (!target.voice.channel) return message.reply('❌ Bu üye herhangi bir ses kanalında değil!');

        if (target.voice.serverMute) return message.reply('❌ Bu üyenin sesi zaten susturulmuş!');

        target.voice.setMute(true, `${message.author.tag} tarafından susturuldu`)
            .then(() => {
                message.reply(`🔇 **${target.user.tag}** üyesinin sesi susturuldu!`);
            })
            .catch(() => {
                message.reply('❌ Ses susturma başarısız. Üye benden yüksek bir rolde olabilir.');
            });
    }
};