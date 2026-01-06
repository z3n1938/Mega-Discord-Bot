// modlog.js - Moderasyon (Genel Log Kanalı Ayarı + Log Fonksiyonu)
module.exports = {
    name: 'modlog',
    aliases: ['mod-log', 'logayarla', 'logkanal'],
    description: 'Moderasyon log kanalını ayarlar veya gösterir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ Bu komutu sadece **Yönetici** kullanabilir!');
        }

        const channel = message.mentions.channels.first();

        if (!channel) {
            const current = client.modlogChannel || 'Ayarlanmamış';
            return message.reply(`📢 **Mevcut ModLog Kanalı:** ${current}\nAyarlamak için: \`!modlog #kanal\``);
        }

        client.modlogChannel = channel.id;
        message.reply(`✅ Moderasyon log kanalı **${channel}** olarak ayarlandı!\nArtık tüm cezalar burada loglanacak.`);
    }
};

// Log fonksiyonu (tüm ceza komutlarında kullanmak için - ana dosyaya ekle)
function sendLog(client, guild, embed) {
    if (!client.modlogChannel) return;
    const channel = guild.channels.cache.get(client.modlogChannel);
    if (channel) channel.send({ embeds: [embed] }).catch(() => {});
}

// Örnek kullanım (ban komutunda):
// const logEmbed = new Discord.EmbedBuilder()
//     .setColor('Red')
//     .setTitle('Üye Banlandı')
//     .addFields({ name: 'Üye', value: `${target.user.tag} (${target.id})` }, { name: 'Yetkili', value: message.author.tag }, { name: 'Sebep', value: reason });
// client.cezalar.push({ type: 'Ban', user: target.user.tag, reason, moderator: message.author.tag, date: new Date().toLocaleString('tr-TR') });
// sendLog(client, message.guild, logEmbed);