// kurallar.js
module.exports = {
    name: 'kurallar',
    aliases: ['rules', 'sunucukuralları'],
    category: 'Bilgi',
    description: 'Sunucunun kurallar kanalını veya genel kuralları gösterir',
    execute(message, args, client) {
        const rulesChannel = message.guild.rulesChannel;

        if (!rulesChannel) {
            return message.reply('Bu sunucuda kurallar kanalı ayarlanmamış.');
        }

        message.reply(`📜 **Sunucu Kuralları**\n` +
            `Kurallar burada: ${rulesChannel}\n` +
            `Lütfen kuralları okuyup uymayı unutma!`);
    }
};