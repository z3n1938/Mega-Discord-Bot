// editsnipe.js - Utility
module.exports = {
    name: 'editsnipe',
    aliases: ['esnipe', 'editsn', 'düzenlenenmesaj'],
    description: 'Son düzenlenen mesajın eski halini gösterir',
    category: 'Utility',
    execute(message, args, client) {
        const edited = client.editedMessages?.get(message.channel.id);
        if (!edited) {
            return message.reply('❌ Bu kanalda henüz düzenlenen mesaj yok!');
        }

        const { author, oldContent, newContent, time } = edited;

        const embed = {
            color: 0xFFA500,
            author: { name: `${author.tag} tarafından düzenlenen mesaj`, icon_url: author.displayAvatarURL({ dynamic: true }) },
            fields: [
                { name: 'Eski Mesaj', value: oldContent || '[Medya / Embed]', inline: false },
                { name: 'Yeni Mesaj', value: newContent || '[Medya / Embed]', inline: false }
            ],
            footer: { text: `Düzenlenme zamanı: ${time}` }
        };

        message.reply({ embeds: [embed] });
    }
};