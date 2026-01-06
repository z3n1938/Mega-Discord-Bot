// random.js
module.exports = {
    name: 'random',
    aliases: ['rastgele', 'rasgele'],
    category: 'Eğlence',
    description: 'Belirtilen aralıkta rastgele sayı üretir',
    execute(message, args, client) {
        const min = parseInt(args[0]) || 1;
        const max = parseInt(args[1]) || 100;
        const num = Math.floor(Math.random() * (max - min + 1)) + min;
        message.reply(`🎲 Rastgele sayı (${min}-${max}): **${num}**`);
    }
};