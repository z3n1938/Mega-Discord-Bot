// nickdeğiştir.js - Moderasyon
module.exports = {
    name: 'nickdeğiştir',
    aliases: ['nick', 'isimdeğiştir', 'takmaad'],
    description: 'Belirtilen üyenin sunucu takma adını değiştirir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageNicknames')) {
            return message.reply('❌ **Takma Adları Yönet** iznin yok!');
        }
        if (!message.guild.members.me.permissions.has('ManageNicknames')) {
            return message.reply('❌ Botun **Takma Adları Yönet** izni yok!');
        }

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen takma adı değiştirilecek üyeyi belirt!');

        const newNick = args.slice(target.id ? 1 : 1).join(' ');
        if (!newNick) return message.reply('Lütfen yeni takma adı yaz!');

        if (newNick.length > 32) return message.reply('❌ Takma ad 32 karakterden uzun olamaz!');

        if (!target.manageable) return message.reply('❌ Bu üyenin takma adını değiştiremiyorum (rol hiyerarşisi).');

        const oldNick = target.displayName;

        target.setNickname(newNick)
            .then(() => {
                message.reply(`✅ **${target.user.tag}** üyesinin takma adı değiştirildi!\nEski: \`${oldNick}\`\nYeni: \`${newNick}\``);
            })
            .catch(() => {
                message.reply('❌ Takma ad değiştirilemedi. İzin veya hiyerarşi sorunu olabilir.');
            });
    }
};