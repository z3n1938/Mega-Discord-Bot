// suggest.js - Eğlence / Utility
module.exports = {
    name: 'suggest',
    aliases: ['öneri', 'öner', 'suggestyon'],
    description: 'Sunucuya öneri gönderir (belirtilen kanala)',
    category: 'Eğlence',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen önerini yaz!\nÖrnek: `!suggest Yeni bir rol ekleyelim`');
        }

        const suggestion = args.join(' ');

        // Öneri kanal ID'sini buraya yaz (sunucuna göre değiştir)
        const suggestChannelId = 'ÖNERİ_KANALI_ID_BURAYA'; // Örnek: '123456789012345678'

        const channel = message.guild.channels.cache.get(suggestChannelId);
        if (!channel) {
            return message.reply('❌ Öneri kanalı ayarlanmamış! Bot sahibine söyle.');
        }

        const embed = {
            color: 0x00FF00,
            title: '💡 YENİ ÖNERİ',
            description: suggestion,
            author: {
                name: message.author.tag,
                icon_url: message.author.displayAvatarURL({ dynamic: true })
            },
            timestamp: new Date(),
            footer: { text: `Öneren ID: ${message.author.id}` }
        };

        channel.send({ embeds: [embed] })
            .then(sent => {
                sent.react('👍');
                sent.react('👎');
                message.reply('✅ Önerin başarıyla gönderildi! Teşekkürler! 💡');
            })
            .catch(() => {
                message.reply('❌ Öneri gönderilemedi. Kanal izinlerini kontrol et.');
            });

        // Orijinal mesajı sil (temizlik için)
        message.delete().catch(() => {});
    }
};