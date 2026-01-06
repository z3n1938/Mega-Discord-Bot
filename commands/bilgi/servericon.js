module.exports = {
    name: 'servericon',
    aliases: ['sunucuikon', 'guildicon', 'serverpp'],
    category: 'Bilgi',
    description: 'Sunucunun ikonunu (profil fotoğrafını) gösterir',
    execute(message, args, client) {
        const guild = message.guild;
        
        if (!guild.iconURL()) {
            return message.reply('Bu sunucunun ikonu yok.');
        }

        const iconURL = guild.iconURL({ dynamic: true, size: 1024 });

        message.reply({
            content: `🌐 **${guild.name} Sunucusunun İkonu**`,
            files: [iconURL]
        });
    }
};