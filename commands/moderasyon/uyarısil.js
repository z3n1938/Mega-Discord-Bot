// uyarısil.js - Moderasyon
module.exports = {
    name: 'uyarısil',
    aliases: ['warnsil', 'uyarıtemizle'],
    description: 'Belirtilen üyenin belirli bir uyarısını siler',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) return message.reply('❌ **Mesajları Yönet** iznin yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen uyarısı silinecek üyeyi belirt!');

        const index = parseInt(args[1]) - 1;
        if (isNaN(index)) return message.reply('Lütfen silinecek uyarının numarasını gir! (!uyarılar ile bak)');

        if (!client.uyarılar) client.uyarılar = new Map();
        const warnings = client.uyarılar.get(target.id) || [];

        if (warnings.length === 0 || index < 0 || index >= warnings.length) {
            return message.reply('❌ Geçersiz uyarı numarası!');
        }

        warnings.splice(index, 1);
        if (warnings.length === 0) {
            client.uyarılar.delete(target.id);
        } else {
            client.uyarılar.set(target.id, warnings);
        }

        message.reply(`✅ **${target.user.tag}**'ın ${index + 1}. uyarısı silindi!\nKalan uyarı: **${warnings.length}**`);
    }
};