// sunucuban.js
module.exports = {
    name: 'sunucuban',
    aliases: ['serverban', 'sunucuyasakla'],
    category: 'Bilgi',
    description: 'Belirtilen üyeyi sunucudan yasaklar',
    execute(message, args, client) {
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('❌ Bu komutu kullanmak için **Üyeleri Yasakla** iznine sahip olmalısın!');
        }

        if (!message.guild.members.me.permissions.has('BanMembers')) {
            return message.reply('❌ Botun **Üyeleri Yasakla** izni yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) {
            return message.reply('Lütfen yasaklanacak üyeyi belirt! Örnek: `!sunucuban @üye sebep`');
        }

        if (target.id === message.author.id) {
            return message.reply('❌ Kendini yasaklayamazsın!');
        }

        if (target.id === client.user.id) {
            return message.reply('❌ Beni yasaklayamazsın!');
        }

        if (!target.bannable) {
            return message.reply('❌ Bu üyeyi yasaklayamıyorum. (Rol hiyerarşisi veya izin sorunu)');
        }

        const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';

        target.ban({ reason: reason })
            .then(() => {
                message.reply(`✅ **${target.user.tag}** sunucudan yasaklandı!\nSebep: \`${reason}\``);
            })
            .catch(err => {
                console.error(err);
                message.reply('❌ Üye yasaklanırken bir hata oluştu.');
            });
    }
};