module.exports = {
    name: 'rolinfo',
    aliases: ['roleinfo', 'rolbilgi'],
    category: 'Bilgi',
    description: 'Belirtilen rolün bilgilerini gösterir',
    execute(message, args, client) {
        // Rolü mention, ID veya isimle bulmaya çalış
        let role = message.mentions.roles.first() ||
                   message.guild.roles.cache.get(args[0]) ||
                   message.guild.roles.cache.find(r => r.name.toLowerCase() === args.join(' ').toLowerCase());

        if (!role) {
            return message.reply('Lütfen geçerli bir rol belirtin. (Mention, ID veya tam rol adı)');
        }

        const createdAt = role.createdAt.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' });

        const permissions = role.permissions.toArray()
            .map(perm => perm.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase()))
            .join(', ') || 'Yok';

        const memberCount = role.members.size;

        message.reply(`📰 **Rol Bilgileri**\n` +
            `Rol Adı: **${role.name}**\n` +
            `ID: **${role.id}**\n` +
            `Renk: **${role.hexColor.toUpperCase()}** (███)\n` +
            `Üye Sayısı: **${memberCount}**\n` +
            `Pozisyon: **${role.position}** (En üst: ${message.guild.roles.cache.size - 1})\n` +
            `Mention Edilebilir: **${role.mentionable ? 'Evet' : 'Hayır'}**\n` +
            `Ayrı Göster: **${role.hoist ? 'Evet' : 'Hayır'}**\n` +
            `Oluşturulma Tarihi: **${createdAt}**\n` +
            `İzinler: **${permissions.length > 500 ? permissions.substring(0, 500) + '...' : permissions}**`);
    }
};