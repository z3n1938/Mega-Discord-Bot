// herkese-rol.js - Moderasyon
module.exports = {
    name: 'herkese-rol',
    aliases: ['herkeserol', 'toplurolver', 'allrole'],
    description: 'Sunucudaki herkese belirtilen rolü verir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) return message.reply('❌ **Rolleri Yönet** iznin yok!');
        if (!message.guild.members.me.permissions.has('ManageRoles')) return message.reply('❌ Botun **Rolleri Yönet** izni yok!');

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.reply('Lütfen verilecek rolü belirt! (etiketle veya ID yaz)');

        if (role.position >= message.guild.members.me.roles.highest.position) {
            return message.reply('❌ Bu rol botun en yüksek rolünden yüksek veya eşit, herkese veremem!');
        }

        if (role.managed) return message.reply('❌ Yönetilen (bot/integration) roller herkese verilemez!');

        message.guild.members.cache.forEach(member => {
            if (!member.roles.cache.has(role.id) && member.manageable) {
                member.roles.add(role).catch(() => {});
            }
        });

        message.reply(`✅ **${role.name}** rolü sunucudaki tüm üyelere veriliyor... (İşlem arka planda devam ediyor)`);
    }
};