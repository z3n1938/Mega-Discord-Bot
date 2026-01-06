// ban.js - Moderasyon
module.exports = {
    name: 'ban',
    aliases: ['yasakla', 'banla'],
    description: 'Belirtilen üyeyi sunucudan yasaklar',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('BanMembers')) return message.reply('❌ **Üyeleri Yasakla** iznin yok!');
        if (!message.guild.members.me.permissions.has('BanMembers')) return message.reply('❌ Botun **Üyeleri Yasakla** izni yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen yasaklanacak üyeyi belirt!');

        if (target.id === message.author.id) return message.reply('❌ Kendini yasaklayamazsın!');
        if (target.id === client.user.id) return message.reply('❌ Beni yasaklayamazsın!');
        if (!target.bannable) return message.reply('❌ Bu üyeyi yasaklayamıyorum (rol hiyerarşisi veya izin sorunu).');

        const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';

        target.ban({ reason: `${message.author.tag} tarafından: ${reason}` })
            .then(() => {
                message.reply(`✅ **${target.user.tag}** sunucudan yasaklandı!\nSebep: \`${reason}\``);
            })
            .catch(() => message.reply('❌ Ban işlemi başarısız oldu.'));
    }
};