module.exports = {
    name: 'üyesayı',
    aliases: ['üyesayısı', 'membercount', 'üyeler'],
    category: 'Bilgi',
    description: 'Sunucudaki üye istatistiklerini gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        // Toplam üye sayısı
        const totalMembers = guild.memberCount;

        // İnsan ve bot ayrımı
        const humans = guild.members.cache.filter(member => !member.user.bot).size;
        const bots = guild.members.cache.filter(member => member.user.bot).size;

        // Çevrimiçi durumlar (sadece insanlar için genellikle bakılır)
        const online = guild.members.cache.filter(member => 
            member.presence?.status === 'online' || member.presence?.status === 'idle' || member.presence?.status === 'dnd'
        ).size;

        const offline = guild.members.cache.filter(member => 
            !member.presence || member.presence.status === 'offline'
        ).size;

        message.reply(`👥 **Üye İstatistikleri**\n` +
            `Toplam Üye: **${totalMembers}**\n` +
            `İnsan: **${humans}**\n` +
            `Bot: **${bots}**\n` +
            `Çevrimiçi: **${online}**\n` +
            `Çevrimdışı: **${offline}**`);
    }
};