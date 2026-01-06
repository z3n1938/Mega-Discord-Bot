// zar.js
module.exports = {
    name: 'zar',
    aliases: ['zarat', 'dice', 'zarat'],
    category: 'Eğlence',
    description: '1-6 arasında rastgele zar atar',
    execute(message, args, client) {
        const result = Math.floor(Math.random() * 6) + 1;
        const diceEmojis = ['⚀', '⚁', '⚂', '⚃', '⚄', '⚅'];

        message.reply(`🎲 **Zar Atıldı!**\nSonuç: ${diceEmojis[result - 1]} **${result}**`);
    }
};