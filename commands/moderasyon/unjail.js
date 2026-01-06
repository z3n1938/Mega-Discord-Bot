// unjail.js - Moderasyon
module.exports = {
    name: 'unjail',
    aliases: ['jaildençıkar', 'unkarantina', 'affet'],
    description: 'Jail\'deki üyenin cezasını kaldırır ve eski rollerini geri verir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) return message.reply('❌ **Rolleri Yönet** iznin yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen jail\'den çıkarılacak üyeyi belirt!');

        const jailRoleId = 'JAIL_ROL_ID_BURAYA'; // Aynı ID'yi kullan
        const jailRole = message.guild.roles.cache.get(jailRoleId);

        if (!jailRole || !target.roles.cache.has(jailRole.id)) {
            return message.reply('❌ Bu üye jail\'de değil!');
        }

        if (!client.jailed) client.jailed = new Map();
        const savedData = client.jailed.get(target.id);

        const oldRoles = savedData ? savedData.roles : [];

        target.roles.set(oldRoles.length > 0 ? oldRoles : [])
            .then(() => {
                client.jailed.delete(target.id);
                message.reply(`🔓 **${target.user.tag}** jail\'den çıkarıldı!\nEski rolleri geri verildi.`);
            })
            .catch(() => {
                target.roles.remove(jailRole);
                client.jailed.delete(target.id);
                message.reply(`🔓 **${target.user.tag}** jail\'den çıkarıldı!\nEski roller geri verilemedi (kayıtlı değil), sadece jail rolü alındı.`);
            });
    }
};