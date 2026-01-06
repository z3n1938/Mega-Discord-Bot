// choose.js
module.exports = {
    name: 'choose',
    aliases: ['seç', 'kararver'],
    category: 'Eğlence',
    description: 'Seçenekler arasından rastgele seçer',
    execute(message, args, client) {
        if (args.length < 2) return message.reply('En az 2 seçenek gir! Örnek: `!choose elma armut`');
        const choice = args[Math.floor(Math.random() * args.length)];
        message.reply(`🤔 Karar verdim: **${choice}** en iyisi!`);
    }
};