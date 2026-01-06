// disconnect.js - Moderasyon
module.exports = {
    name: 'disconnect',
    aliases: ['dc', 'sesat', 'seskapat'],
    description: 'Belirtilen üyenin ses bağlantısını keser',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('MoveMembers')) {
            return message.reply('❌ **Üyeleri Taşı** iznin yok!');
        }
        if (!message.guild.members.me.permissions.has('MoveMembers')) {
            return message.reply('❌ Botun **Üyeleri Taşı** izni yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen bağlantısı kesilecek üyeyi belirt!');

        if (!target.voice.channel) return message.reply('❌ Bu üye herhangi bir ses kanalında değil!');

        target.voice.disconnect(`${message.author.tag} tarafından bağlantısı kesildi`)
            .then(() => {
                message.reply(`🔌 **${target.user.tag}** üyesinin ses bağlantısı kesildi!`);
            })
            .catch(() => {
                message.reply('❌ Bağlantı kesme başarısız.');
            });
    }
};