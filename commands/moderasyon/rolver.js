// rolver.js - Moderasyon
module.exports = {
    name: 'rolver',
    aliases: ['rol-ekle', 'addrole'],
    description: 'Belirtilen üyeye rol verir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) return message.reply('❌ **Rolleri Yönet** iznin yok!');
        if (!message.guild.members.me.permissions.has('ManageRoles')) return message.reply('❌ Botun **Rolleri Yönet** izni yok!');

        const target = message.mentions.members.first();
        if (!target) return message.reply('Lütfen rol verilecek üyeyi etiketle!');

        const role = message.mentions.roles.first() || message.guild.roles.cache.find(r => r.name.toLowerCase() === args.slice(1).join(' ').toLowerCase());
        if (!role) return message.reply('Lütfen geçerli bir rol belirt!');

        if (target.roles.cache.has(role.id)) return message.reply('❌ Bu üyenin zaten bu rolü var!');

        if (message.guild.members.me.roles.highest.position <= role.position) return message.reply('❌ Bu rol botun en yüksek rolünden yüksek veya eşit, veremem!');

        target.roles.add(role)
            .then(() => message.reply(`✅ **${target.user.tag}**'a **${role.name}** rolü verildi!`))
            .catch(() => message.reply('❌ Rol verme başarısız (hiyerarşi sorunu olabilir).'));
    }
};