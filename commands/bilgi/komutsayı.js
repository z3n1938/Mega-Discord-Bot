// komutsayı.js
module.exports = {
    name: 'komutsayı',
    aliases: ['komutsayısı', 'commandcount', 'toplamkomut'],
    category: 'Bilgi',
    description: 'Botta yüklü olan toplam komut sayısını gösterir',
    execute(message, args, client) {
        const totalCommands = client.commands.size;

        message.reply(`📋 **Komut İstatistiği**\n` +
            `Toplam Yüklü Komut: **${totalCommands} adet**\n` +
            `Yardım için: \`${client.prefix || process.env.PREFIX}yardım\``);
    }
};