// yazı-tura.js
module.exports = {
    name: 'yazı-tura',
    aliases: ['yazıtura', 'coin', 'yt'],
    category: 'Eğlence',
    description: 'Yazı mı tura mı atar',
    execute(message, args, client) {
        const result = Math.random() < 0.5 ? 'Yazı' : 'Tura';
        const emoji = result === 'Yazı' ? '🪙' : '🪙';

        message.reply(`🪙 **Yazı-Tura Atıldı!**\nSonuç: **${result}** ${emoji}`);
    }
};