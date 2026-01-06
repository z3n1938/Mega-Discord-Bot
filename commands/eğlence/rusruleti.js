// rusruleti.js
module.exports = {
    name: 'rusruleti',
    aliases: ['rusrulet', 'rusruleti'],
    category: 'Eğlence',
    description: 'Rus ruleti oynar (şaka amaçlı)',
    execute(message, args, client) {
        const chance = Math.random() < 0.166; // 1/6 şans
        message.reply(chance ? `🔫 **BANG!** ${message.author} vuruldu... 💀` : `🔫 *Tık!* ${message.author} şanslı, hayatta kaldı! 😅`);
    }
};