// kick.js - Moderasyon
module.exports = {
    name: 'kick',
    aliases: ['at', 'kickat'],
    description: 'Belirtilen üyeyi sunucudan atar',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('KickMembers')) return message.reply('❌ **Üyeleri At** iznin yok!');
        if (!message.guild.members.me.permissions.has('KickMembers')) return message.reply('❌ Botun **Üyeleri At** izni yok!');

        const target = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
        if (!target) return message.reply('Lütfen atılacak üyeyi belirt!');

        if (target.id === message.author.id) return message.reply('❌ Kendini atamazsın!');
        if (target.id === client.user.id) return message.reply('❌ Beni atamazsın!');
        if (!target.kickable) return message.reply('❌ Bu üyeyi atamıyorum.');

        const reason = args.slice(1).join(' ') || 'Sebep belirtilmedi';

        target.kick(`${message.author.tag} tarafından: ${reason}`)
            .then(() => message.reply(`✅ **${target.user.tag}** sunucudan atıldı!\nSebep: \`${reason}\``))
            .catch(() => message.reply('❌ Kick işlemi başarısız.'));
    }
};