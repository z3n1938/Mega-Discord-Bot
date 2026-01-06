// fırlama.js
module.exports = {
    name: 'fırlama',
    aliases: ['fırlat', 'at'],
    category: 'Eğlence',
    description: 'Bir şeyi fırlatır',
    execute(message, args, client) {
        const things = ['ayakkabı', 'terlik', 'top', 'taş', 'telefon', 'pizza'];
        const thing = things[Math.floor(Math.random() * things.length)];
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(`🤾 ${message.author} bir ${thing} fırlattı! Havada kaldı!`);
        }
        message.reply(`🤾 ${message.author} ${member}'a bir ${thing} fırlattı! Kaç!`);
    }
};