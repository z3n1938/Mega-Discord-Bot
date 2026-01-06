// uyarı.js - Moderasyon
module.exports = {
    name: 'uyarı',
    aliases: ['warn', 'uyar'],
    description: 'Belirtilen üyeye uyarı verir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) return message.reply('❌ **Mesajları Yönet** iznin yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen uyarılacak üyeyi belirt!');

        if (target.id === message.author.id) return message.reply('❌ Kendine uyarı veremezsin!');
        if (target.id === client.user.id) return message.reply('❌ Bota uyarı veremezsin!');

        const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';

        // Basit hafıza tabanlı uyarı sistemi (veritabanı yoksa)
        if (!client.uyarılar) client.uyarılar = new Map();

        const userWarnings = client.uyarılar.get(target.id) || [];
        userWarnings.push({
            moderator: message.author.tag,
            reason: reason,
            date: new Date().toLocaleString('tr-TR')
        });
        client.uyarılar.set(target.id, userWarnings);

        message.reply(`⚠️ **${target.user.tag}** uyarıldı!\nSebep: \`${reason}\`\nToplam uyarı: **${userWarnings.length}**`);
    }
};