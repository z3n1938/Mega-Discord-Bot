module.exports = {
    name: 'sunucuinfo',
    aliases: ['serverinfo', 'guildinfo'],
    category: 'Bilgi',
    description: 'Sunucunun bilgilerini gösterir',
    execute(message, args, client) {
        const guild = message.guild;
        const createdAt = guild.createdAt.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
        const owner = guild.owner ? guild.owner.user.tag : 'Bilinmiyor';

        message.reply(`ℹ️ **Sunucu Bilgileri**\nSunucu Adı: ${guild.name}\nID: ${guild.id}\nSahibi: ${owner}\nÜye Sayısı: ${guild.memberCount}\nKanal Sayısı: ${guild.channels.cache.size}\nRol Sayısı: ${guild.roles.cache.size}\nOluşturulma Tarihi: ${createdAt}`);
    }
};