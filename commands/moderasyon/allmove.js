// allmove.js - Moderasyon
module.exports = {
    name: 'allmove',
    aliases: ['herkestaşı', 'toplutaşı', 'sesherkes'],
    description: 'Bir ses kanalındaki tüm üyeleri başka bir kanala taşır',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('MoveMembers')) {
            return message.reply('❌ **Üyeleri Taşı** iznin yok!');
        }
        if (!message.guild.members.me.permissions.has('MoveMembers')) {
            return message.reply('❌ Botun **Üyeleri Taşı** izni yok!');
        }

        const sourceChannel = message.member.voice.channel || 
                             message.mentions.channels.filter(c => c.type === 'GUILD_VOICE').first();

        if (!sourceChannel || sourceChannel.type !== 'GUILD_VOICE') {
            return message.reply('Lütfen kaynak ses kanalında ol veya etiketle!');
        }

        const targetChannel = message.mentions.channels.filter(c => c.type === 'GUILD_VOICE').last() ||
                             message.guild.channels.cache.get(args[args.length - 1]);

        if (!targetChannel || targetChannel.type !== 'GUILD_VOICE') {
            return message.reply('Lütfen hedef ses kanalını belirt! (etiketle veya ID yaz)');
        }

        if (sourceChannel.id === targetChannel.id) {
            return message.reply('❌ Kaynak ve hedef kanal aynı olamaz!');
        }

        if (sourceChannel.members.size === 0) {
            return message.reply('❌ Kaynak kanalda taşınacak üye yok!');
        }

        let moved = 0;
        sourceChannel.members.forEach(member => {
            if (member.voice.channel) {
                member.voice.setChannel(targetChannel).then(() => moved++).catch(() => {});
            }
        });

        message.reply(`✅ **${sourceChannel.name}** kanalındaki üyeler **${targetChannel.name}** kanalına taşınıyor...\n(Toplam: ${sourceChannel.members.size} üye, taşınan: arka planda)`);
    }
};