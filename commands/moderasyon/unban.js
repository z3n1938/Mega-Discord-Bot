// unban.js - Moderasyon
module.exports = {
    name: 'unban',
    aliases: ['banaç', 'unyasa'],
    description: 'Yasaklanmış bir üyenin yasağını kaldırır',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('BanMembers')) return message.reply('❌ **Üyeleri Yasakla** iznin yok!');

        const id = args[0];
        if (!id) return message.reply('Lütfen yasak kaldırılacak üyenin ID\'sini gir!');

        message.guild.bans.fetch(id)
            .then(ban => {
                message.guild.members.unban(id)
                    .then(user => message.reply(`✅ **${user.tag}** üyesinin yasağı kaldırıldı!`))
                    .catch(() => message.reply('❌ Yasak kaldırma başarısız.'));
            })
            .catch(() => message.reply('❌ Bu ID\'ye ait yasaklanmış üye bulunamadı.'));
    }
};