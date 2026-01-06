// oyver.js
module.exports = {
    name: 'oyver',
    aliases: ['vote', 'oy', 'destekle'],
    category: 'Bilgi',
    description: 'Bot için oy verme (vote) linklerini gösterir',
    execute(message, args, client) {
        message.reply(`❤️ **Bota Oy Vererek Destek Ol!**\n` +
            `Oy verirsen bot daha fazla kişiye ulaşır ve gelişmeye devam eder. Teşekkürler!\n\n` +
            `🔹 **top.gg:** https://top.gg/bot/BOT_ID\n` +
            `🔹 **discord.botlist:** https://discord.botlist.co/bot/BOT_ID\n` +
            `🔹 **discords.com:** https://discords.com/bot/BOT_ID\n\n` +
            `Oy verdikten sonra teşekkürler! 💖`);
    }
};