// herkesten-rol.js - Moderasyon
module.exports = {
    name: 'herkesten-rol',
    aliases: ['herkestenrol', 'toplurolal', 'allroleremove'],
    description: 'Sunucudaki herkesten belirtilen rolü alır',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) return message.reply('❌ **Rolleri Yönet** iznin yok!');
        if (!message.guild.members.me.permissions.has('ManageRoles')) return message.reply('❌ Botun **Rolleri Yönet** izni yok!');

        const role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
        if (!role) return message.reply('Lütfen alınacak rolü belirt! (etiketle veya ID yaz)');

        if (role.position >= message.guild.members.me.roles.highest.position) {
            return message.reply('❌ Bu rol botun en yüksek rolünden yüksek veya eşit, herkesten alamam!');
        }

        if (role.managed) return message.reply('❌ Yönetilen (bot/integration) roller kaldırılamaz!');

        message.guild.members.cache.forEach(member => {
            if (member.roles.cache.has(role.id) && member.manageable) {
                member.roles.remove(role).catch(() => {});
            }
        });

        message.reply(`✅ **${role.name}** rolü sunucudaki tüm üyelerden alınıyor... (İşlem arka planda devam ediyor)`);
    }
};