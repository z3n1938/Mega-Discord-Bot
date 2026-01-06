// jail.js - Moderasyon
module.exports = {
    name: 'jail',
    aliases: ['karantinayaal', 'haps', 'cezalandır'],
    description: 'Belirtilen üyeyi jail rolüne atar (tüm kanallardan izole eder)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageRoles')) return message.reply('❌ **Rolleri Yönet** iznin yok!');
        if (!message.guild.members.me.permissions.has('ManageRoles')) return message.reply('❌ Botun **Rolleri Yönet** izni yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen jail\'e atılacak üyeyi belirt!');

        // JAIL ROL ID'SİNİ BURAYA YAZ (önce sunucunda bir jail rolü oluştur)
        const jailRoleId = 'JAIL_ROL_ID_BURAYA'; // Örnek: '123456789012345678'

        const jailRole = message.guild.roles.cache.get(jailRoleId);
        if (!jailRole) return message.reply('❌ Jail rolü bulunamadı! Lütfen doğru rol ID\'sini kontrol et.');

        if (target.roles.cache.has(jailRole.id)) return message.reply('❌ Bu üye zaten jail\'de!');

        if (jailRole.position >= message.guild.members.me.roles.highest.position) {
            return message.reply('❌ Jail rolü botun en yüksek rolünden yüksek veya eşit, veremiyorum!');
        }

        // Üyenin tüm rollerini kaydet (unjail için)
        const memberRoles = target.roles.cache.filter(r => r.id !== message.guild.id).map(r => r.id);

        // Tüm rollerini al, jail rolünü ver
        target.roles.set([jailRole])
            .then(() => {
                // Hafızada sakla (bot yeniden başlatılınca kaybolur, veritabanı istersen eklerim)
                if (!client.jailed) client.jailed = new Map();
                client.jailed.set(target.id, { roles: memberRoles, moderator: message.author.tag });

                message.reply(`🔒 **${target.user.tag}** jail'e atıldı!\nTüm rolleri alındı, sadece jail rolü kaldı.`);
            })
            .catch(() => message.reply('❌ Jail işlemi başarısız. Rol hiyerarşisi sorunu olabilir.'));
    }
};