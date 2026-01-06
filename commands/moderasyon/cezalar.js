// cezalar.js - Moderasyon
module.exports = {
    name: 'cezalar',
    aliases: ['cezalistesi', 'ceza-list', 'punishments'],
    description: 'Sunucudaki tüm cezaları listeler',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!client.cezalar) client.cezalar = [];

        if (client.cezalar.length === 0) {
            return message.reply('✅ Sunucuda henüz ceza kaydı yok!');
        }

        let liste = client.cezalar.slice(-20).map((ceza, i) => 
            `**#${client.cezalar.length - 19 + i}** | ${ceza.type} | ${ceza.user} | ${ceza.moderator} | ${ceza.date.split(' ')[0]}`
        ).join('\n');

        message.reply(`⚔️ **Son 20 Ceza Kaydı** (Toplam: ${client.cezalar.length})\n\n${liste}\n\nDetay için: \`!ceza-info <numara>\``);
    }
};