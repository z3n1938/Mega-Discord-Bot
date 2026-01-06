// balance.js - oyunlar
module.exports = {
    name: 'balance',
    aliases: ['bakiye', 'para', 'coin'],
    description: 'Bakiyeni gösterir',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();

        const target = message.mentions.users.first() || message.author;
        const userId = target.id;

        const coins = client.coins.get(userId) || 0;

        if (target.id === message.author.id) {
            message.reply(`💰 **Bakiyen:** ${coins} coin\nGünlük ödül için \`!daily\` kullanabilirsin!`);
        } else {
            message.reply(`💰 **${target.username}**'nin bakiyesi: ${coins} coin`);
        }
    }
};