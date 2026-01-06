// nick.js
module.exports = {
    name: 'nick',
    aliases: ['takmaad', 'isimdeğiştir', 'nickname'],
    category: 'Bilgi',
    description: 'Kendi veya belirtilen üyenin takma adını değiştirir',
    execute(message, args, client) {
        if (!message.member.permissions.has('ChangeNickname') && !message.member.permissions.has('ManageNicknames')) {
            return message.reply('❌ Takma ad değiştirmek için iznin yok!');
        }

        const target = message.mentions.members.first() || message.member;
        const newNick = args.slice(target === message.member ? 0 : 1).join(' ');

        if (!newNick) {
            return message.reply('Lütfen yeni bir takma ad belirt. Örnek: `!nick Yeni İsim`');
        }

        if (newNick.length > 32) {
            return message.reply('❌ Takma ad 32 karakterden uzun olamaz!');
        }

        // Yönetici ise başkalarının, değilse sadece kendi nickini değiştirebilir
        if (target !== message.member && !message.member.permissions.has('ManageNicknames')) {
            return message.reply('❌ Başkalarının takma adını değiştirmek için **Takma Adları Yönet** iznine ihtiyacın var!');
        }

        target.setNickname(newNick)
            .then(() => {
                message.reply(`✅ **Takma ad değiştirildi!**\n${target.user.tag} → \`${newNick}\``);
            })
            .catch(err => {
                message.reply('❌ Takma ad değiştirilemedi. Botun izinleri veya hiyerarşi sorunu olabilir.');
            });
    }
};