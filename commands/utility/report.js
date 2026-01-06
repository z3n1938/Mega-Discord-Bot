// report.js - Utility
module.exports = {
    name: 'report',
    aliases: ['bugreport', 'hata', 'bildir'],
    description: 'Bot ile ilgili bir bug veya sorunu bildirir',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen bildirmek istediğin bug/hata/öneri detayını yaz!\nÖrnek: `!report Ping komutu çalışmıyor`');
        }

        const reportContent = args.join(' ');

        // Bug rapor kanalının ID'sini buraya yaz (bot sahibinin sunucusu için)
        const reportChannelId = 'BUG_RAPOR_KANALI_ID_BURAYA'; // Örnek: '123456789012345678'

        const channel = client.channels.cache.get(reportChannelId);
        if (!channel) {
            return message.reply('❌ Bug rapor kanalı ayarlanmamış. Bot sahibine ulaş!');
        }

        const embed = {
            color: 0xFF0000,
            title: '🐞 YENİ BUG / HATA RAPORU',
            description: reportContent,
            author: {
                name: `${message.author.tag} (${message.author.id})`,
                icon_url: message.author.displayAvatarURL({ dynamic: true })
            },
            fields: [
                { name: 'Sunucu', value: message.guild ? message.guild.name : 'DM', inline: true },
                { name: 'Kanal', value: message.channel.name || 'DM', inline: true },
                { name: 'Tarih', value: new Date().toLocaleString('tr-TR'), inline: true }
            ],
            footer: { text: 'Teşekkürler! En kısa sürede incelenecek.' }
        };

        channel.send({ embeds: [embed] })
            .then(() => {
                message.reply('✅ **Bug/hata raporun başarıyla gönderildi!**\nTeşekkür ederiz, en kısa sürede incelenecek. 🛠️');
            })
            .catch(() => {
                message.reply('❌ Rapor gönderilemedi. Bot sahibine manuel ulaşmayı dene.');
            });

        // Orijinal mesajı sil (gizlilik için)
        message.delete().catch(() => {});
    }
};