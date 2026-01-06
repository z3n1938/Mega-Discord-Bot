// destek.js
module.exports = {
    name: 'destek',
    aliases: ['support', 'yardımcı', 'desteksunucusu'],
    category: 'Bilgi',
    description: 'Botun destek sunucusunun davet linkini gönderir',
    execute(message, args, client) {
        // Buraya kendi destek sunucunun davet linkini yaz
        const supportServer = 'https://discord.gg/DESTEK_SUNUCU_LINKİN_BURAYA';

        message.reply(`🆘 **Destek Sunucusu**\n` +
            `Botla ilgili yardım almak, öneride bulunmak veya hata bildirmek için destek sunucumuza katılabilirsin!\n` +
            `🔗 ${supportServer}`);
    }
};