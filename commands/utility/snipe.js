// snipe.js - Utility
module.exports = {
    name: 'snipe',
    aliases: ['sn', 'snipe', 'silinenmesaj'],
    description: 'Son silinen mesajı gösterir',
    category: 'Utility',
    execute(message, args, client) {
        const sniped = client.snipedMessages?.get(message.channel.id);
        if (!sniped) {
            return message.reply('❌ Bu kanalda henüz silinen mesaj yok!');
        }

        const { author, content, time, image } = sniped;

        const embed = {
            color: 0xFF0000,
            author: { name: `${author.tag} tarafından silinen mesaj`, icon_url: author.displayAvatarURL({ dynamic: true }) },
            description: content || '[Medya / Embed]',
            footer: { text: `Silinme zamanı: ${time}` },
            image: image ? { url: image } : null
        };

        message.reply({ embeds: [embed] });
    }
};