// announce.js - Moderasyon / Utility
module.exports = {
    name: 'announce',
    aliases: ['duyuru', 'broadcast', 'yayınla'],
    description: 'Belirtilen kanala duyuru yapar (embed formatında)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages') && !message.member.permissions.has('Administrator')) {
            return message.reply('❌ **Mesajları Yönet** veya **Yönetici** iznin yok!');
        }

        const channel = message.mentions.channels.first() || message.channel;
        if (!channel.permissionsFor(message.guild.members.me).has('SendMessages')) {
            return message.reply('❌ Belirtilen kanalda mesaj gönderme iznim yok!');
        }

        const announcement = args.slice(channel === message.channel ? 0 : 1).join(' ');
        if (!announcement) {
            return message.reply('❌ Lütfen duyuru metnini yaz!\nÖrnek: `!announce #genel Bot güncellendi!`');
        }

        const embed = {
            color: 0x00AE86,
            title: '📢 DUYURU',
            description: announcement,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL({ dynamic: true })
            },
            timestamp: new Date(),
            footer: { text: message.guild.name }
        };

        channel.send({ embeds: [embed] })
            .then(() => {
                message.reply(`✅ Duyuru başarıyla **${channel}** kanalına gönderildi!`);
            })
            .catch(() => {
                message.reply('❌ Duyuru gönderilemedi. Kanal izinlerini kontrol et.');
            });
    }
};