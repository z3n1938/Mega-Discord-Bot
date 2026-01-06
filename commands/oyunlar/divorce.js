// divorce.js - oyunlar
module.exports = {
    name: 'divorce',
    aliases: ['boşan', 'boşanma', 'divorce'],
    description: 'Eşinden boşanır',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.marriages) client.marriages = new Map();

        const eşId = client.marriages.get(message.author.id);
        if (!eşId) {
            return message.reply('❌ Evli değilsin ki boşanasın! 😅');
        }

        const eş = client.users.cache.get(eşId);
        client.marriages.delete(message.author.id);
        client.marriages.delete(eşId);

        message.reply(`💔 **BOŞANDIN!**\n${eş ? eş.tag : 'Eski eşin'} ile evliliğin sona erdi.\nArtık özgürsün! 🕊️`);
    }
};