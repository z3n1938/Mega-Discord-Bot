// afkset.js - Utility
module.exports = {
    name: 'afkset',
    aliases: ['afk', 'afkyap', 'afkol'],
    description: 'AFK moduna girer ve sebep belirtir',
    category: 'Utility',
    execute(message, args, client) {
        const reason = args.join(' ') || 'AFK';

        if (!client.afk) client.afk = new Map();

        client.afk.set(message.author.id, {
            reason: reason,
            time: Date.now(),
            guild: message.guild.id
        });

        message.reply(`😴 **AFK Moduna Girildi!**\nSebep: \`${reason}\`\nEtiketlendiğinde bu gösterilecek.`)
            .then(msg => setTimeout(() => msg.delete().catch(() => {}), 8000));

        // Nick değiştirme (eğer izin varsa)
        if (message.member.manageable && !message.member.displayName.startsWith('[AFK]')) {
            message.member.setNickname(`[AFK] ${message.member.displayName.substring(0, 32 - 6)}`).catch(() => {});
        }
    }
};