// move.js - Moderasyon
module.exports = {
    name: 'move',
    aliases: ['taşı', 'sesmove', 'kanaltaşı'],
    description: 'Belirtilen üyeyi başka bir ses kanalına taşır',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('MoveMembers')) {
            return message.reply('❌ **Üyeleri Taşı** iznin yok!');
        }
        if (!message.guild.members.me.permissions.has('MoveMembers')) {
            return message.reply('❌ Botun **Üyeleri Taşı** izni yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen taşınacak üyeyi belirt!');

        if (!target.voice.channel) return message.reply('❌ Bu üye herhangi bir ses kanalında değil!');

        const targetChannel = message.mentions.channels.filter(c => c.type === 'GUILD_VOICE').first() ||
                             message.guild.channels.cache.get(args[1]);

        if (!targetChannel || targetChannel.type !== 'GUILD_VOICE') {
            return message.reply('Lütfen hedef ses kanalını belirt! (etiketle veya ID yaz)');
        }

        target.voice.setChannel(targetChannel)
            .then(() => {
                message.reply(`✅ **${target.user.tag}** üyesi **${targetChannel.name}** kanalına taşındı!`);
            })
            .catch(() => {
                message.reply('❌ Taşıma başarısız. Hedef kanal dolu veya izin sorunu olabilir.');
            });
    }
};