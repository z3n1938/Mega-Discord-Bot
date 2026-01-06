module.exports = {
    name: 'kanalinfo',
    aliases: ['channelinfo', 'kanalbilgi'],
    category: 'Bilgi',
    description: 'Belirtilen kanalın bilgilerini gösterir',
    execute(message, args, client) {
        // Kanalı mention, ID veya isimle bulmaya çalış
        let channel = message.mentions.channels.first() ||
                      message.guild.channels.cache.get(args[0]) ||
                      message.guild.channels.cache.find(c => c.name.toLowerCase() === args.join(' ').toLowerCase()) ||
                      message.channel; // Eğer hiçbir şey belirtilmemişse mevcut kanal

        if (!channel) {
            return message.reply('Lütfen geçerli bir kanal belirtin. (Mention, ID veya tam kanal adı)');
        }

        const createdAt = channel.createdAt.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        let channelType = '';
        switch (channel.type) {
            case 'GUILD_TEXT': channelType = 'Metin Kanalı'; break;
            case 'GUILD_VOICE': channelType = 'Ses Kanalı'; break;
            case 'GUILD_CATEGORY': channelType = 'Kategori'; break;
            case 'GUILD_NEWS': channelType = 'Duyuru Kanalı'; break;
            case 'GUILD_STAGE_VOICE': channelType = 'Sahne Kanalı'; break;
            case 'GUILD_STORE': channelType = 'Mağaza Kanalı'; break;
            case 'GUILD_THREAD': channelType = 'Konu (Thread)'; break;
            default: channelType = 'Bilinmiyor';
        }

        let extraInfo = '';
        if (channel.type === 'GUILD_TEXT' || channel.type === 'GUILD_NEWS') {
            extraInfo = `Konu: ${channel.topic ? channel.topic : 'Yok'}\nYavaş Mod: ${channel.rateLimitPerUser ? `${channel.rateLimitPerUser} saniye` : 'Kapalı'}\nNSFW: ${channel.nsfw ? 'Evet' : 'Hayır'}`;
        } else if (channel.type === 'GUILD_VOICE' || channel.type === 'GUILD_STAGE_VOICE') {
            extraInfo = `Üye Limiti: ${channel.userLimit === 0 ? 'Sınırsız' : channel.userLimit}\nBitrate: ${channel.bitrate / 1000}kbps\nBağlı Üye: ${channel.members ? channel.members.size : 0}`;
        } else if (channel.type === 'GUILD_CATEGORY') {
            extraInfo = `Alt Kanal Sayısı: ${channel.children.size}`;
        }

        message.reply(`📢 **Kanal Bilgileri**\n` +
            `Kanal Adı: **${channel.name}**\n` +
            `ID: **${channel.id}**\n` +
            `Tür: **${channelType}**\n` +
            `Pozisyon: **${channel.position}**\n` +
            `Oluşturulma Tarihi: **${createdAt}**\n` +
            `${extraInfo ? extraInfo : ''}`);
    }
};