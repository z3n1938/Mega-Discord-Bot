// versiyon.js
module.exports = {
    name: 'versiyon',
    aliases: ['version', 'sürüm', 'botversiyon'],
    category: 'Bilgi',
    description: 'Botun mevcut sürüm bilgisini gösterir',
    execute(message, args, client) {
        // Botunun güncel sürüm numarasını buraya yaz (değiştikçe güncelleyebilirsin)
        const version = '1.5.2'; // Örnek: Yeni komutlar eklendikçe artır

        message.reply(`🔖 **Bot Versiyonu**\n` +
            `Mevcut Sürüm: **v${version}**\n` +
            `Son Güncelleme: Yeni bilgi komutları ve moderasyon özellikleri eklendi.\n` +
            `Güncellemeler için \`${process.env.PREFIX}botdurum\` veya destek sunucusunu kontrol et!`);
    }
};