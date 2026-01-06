// website.js
module.exports = {
    name: 'website',
    aliases: ['site', 'web', 'websitesi'],
    category: 'Bilgi',
    description: 'Botun web sitesini gösterir',
    execute(message, args, client) {
        // Buraya botunun web sitesi linkini yaz (yoksa geçici bir yer tutucu koy)
        const website = 'https://botunsitesi.com'; // Gerçek linkini buraya yaz

        message.reply(`🌐 **Web Sitemiz**\n` +
            `Bot hakkında daha fazla bilgi, komut listesi ve ekstra özellikler için web sitemizi ziyaret edebilirsin!\n` +
            `🔗 ${website}`);
    }
};