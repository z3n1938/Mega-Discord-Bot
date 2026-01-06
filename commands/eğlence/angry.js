// angry.js
module.exports = {
    name: 'angry',
    aliases: ['sinirli', 'kızgın'],
    category: 'Eğlence',
    description: 'Sinirlenir veya belirtilen üyeye sinirlenir',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(`😡 ${message.author} çok sinirlendi! Kim kızdırdı seni? 🔥`);
        }
        if (member.id === message.author.id) {
            return message.reply(`😤 ${message.author} kendine sinirlendi... sakin ol biraz!`);
        }
        message.reply(`😡 ${message.author} ${member}'a çok sinirlendi! Ne yaptın sen ona?! 💢`);
    }
};