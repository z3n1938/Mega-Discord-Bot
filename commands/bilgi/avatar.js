module.exports = {
    name: 'avatar',
    aliases: ['pp', 'profilfoto'],
    category: 'Bilgi',
    description: 'Belirtilen kullanıcının avatarını gösterir',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const user = member.user;

        const avatarURL = user.displayAvatarURL({ dynamic: true, size: 1024 });

        message.reply({
            content: `👤 **${user.tag}'nin Avatarı**`,
            files: [avatarURL]
        });
    }
};