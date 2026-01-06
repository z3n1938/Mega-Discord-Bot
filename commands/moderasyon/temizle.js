// temizle.js - Moderasyon
module.exports = {
    name: 'temizle',
    aliases: ['sil', 'clear', 'purge'],
    description: 'Belirtilen miktarda mesaj siler',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) return message.reply('❌ **Mesajları Yönet** iznin yok!');

        const miktar = parseInt(args[0]);
        if (isNaN(miktar) || miktar < 1 || miktar > 100) return message.reply('1-100 arasında bir sayı gir!');

        message.channel.bulkDelete(miktar, true)
            .then(deleted => message.reply(`✅ **${deleted.size}** mesaj silindi!`).then(m => setTimeout(() => m.delete(), 3000)))
            .catch(() => message.reply('❌ Mesajlar silinirken hata oluştu.'));
    }
};