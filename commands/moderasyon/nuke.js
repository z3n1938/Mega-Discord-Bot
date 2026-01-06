// nuke.js - Moderasyon
module.exports = {
    name: 'nuke',
    aliases: ['nukekanal', 'kanalnuke', 'temizlekanal'],
    description: 'Mevcut kanalı siler ve aynı ayarlarla yeniden oluşturur (tüm mesajları temizler)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageChannels')) return message.reply('❌ **Kanalları Yönet** iznin yok!');
        if (!message.guild.members.me.permissions.has('ManageChannels')) return message.reply('❌ Botun **Kanalları Yönet** izni yok!');

        const channel = message.channel;
        const position = channel.position;
        const topic = channel.topic;
        const nsfw = channel.nsfw;
        const parent = channel.parent;
        const rateLimit = channel.rateLimitPerUser;

        message.reply('💣 **Kanal nuke ediliyor...** Tüm mesajlar silinecek!')

        channel.clone({
            name: channel.name,
            topic: topic,
            nsfw: nsfw,
            parent: parent,
            rateLimitPerUser: rateLimit,
            position: position,
            permissionOverwrites: channel.permissionOverwrites.cache
        }).then(newChannel => {
            channel.delete().catch(() => {});
            newChannel.send(`💥 **Kanal nuke edildi!**\nBu kanal ${message.author} tarafından temizlendi.`)
                .then(msg => msg.pin());
        }).catch(() => {
            message.reply('❌ Kanal nuke edilemedi. İzin veya hiyerarşi sorunu olabilir.');
        });
    }
};