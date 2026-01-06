// pp.js
module.exports = {
    name: 'pp',
    aliases: ['profil', 'avatar', 'profilfoto'],
    category: 'Eğlence',
    description: 'Belirtilen üyenin profil fotoğrafını büyütür',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const avatarURL = member.user.displayAvatarURL({ dynamic: true, size: 1024 });

        message.reply({
            content: `🖼️ **${member.user.tag}'nin Profil Fotoğrafı**\nBüyütülmüş hali aşağıda!`,
            files: [avatarURL]
        });
    }
};