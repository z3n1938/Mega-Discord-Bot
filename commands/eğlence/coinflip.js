// coinflip.js
module.exports = {
    name: 'coinflip',
    aliases: ['yazıtura', 'cf'],
    category: 'Eğlence',
    description: 'Yazı tura atar',
    execute(message, args, client) {
        const result = Math.random() < 0.5 ? 'Yazı' : 'Tura';
        message.reply(`🪙 **Yazı Tura**: **${result}** çıktı!`);
    }
};