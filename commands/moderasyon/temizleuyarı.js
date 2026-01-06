// temizleuyarı.js - Moderasyon
module.exports = {
    name: 'temizleuyarı',
    aliases: ['uyarıtemizle', 'clearwarns'],
    description: 'Belirtilen üyenin tüm uyarılarını temizler',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) return message.reply('❌ **Mesajları Yönet** iznin yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen uyarıları temizlenecek üyeyi belirt!');

        if (!client.uyarılar) client.uyarılar = new Map();

        const oldCount = (client.uyarılar.get(target.id) || []).length;
        client.uyarılar.delete(target.id);

        message.reply(`✅ **${target.user.tag}**'ın tüm uyarıları temizlendi!\nSilinen uyarı sayısı: **${oldCount}**`);
    }
};