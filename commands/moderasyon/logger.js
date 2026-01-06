// logger.js - Moderasyon
module.exports = {
    name: 'logger',
    aliases: ['logayarla', 'logkanal', 'logset'],
    description: 'Genel log kanalını ayarlar (mesaj silme, düzenleme, rol değişiklikleri vb.)',
    category: 'Moderasyon',
    execute(message, args, client) { // client parametresi eklendi
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ Bu komutu sadece **Yönetici** kullanabilir!');
        }

        const channel = message.mentions.channels.first();

        if (!channel) {
            const current = client.loggerChannel ? `<#${client.loggerChannel}>` : 'Ayarlanmamış';
            return message.reply(`📜 **Genel Log Kanalı:** ${current}\nAyarlamak için: \`!logger #kanal\``);
        }

        client.loggerChannel = channel.id;
        message.reply(`📜 Genel log kanalı **${channel}** olarak ayarlandı!\nArtık mesaj silme/düzenleme ve rol değişiklikleri burada loglanacak.`);
    }
};