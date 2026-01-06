// sad.js
module.exports = {
    name: 'sad',
    aliases: ['üzgün', 'üzül'],
    category: 'Eğlence',
    description: 'Üzülür veya belirtilen üyeye üzülür',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(`😢 ${message.author} üzgün... Sarılalım mı? 🫂`);
        }
        message.reply(`😭 ${message.author} ${member}'a üzüldü... Ne oldu, anlatmak ister misin? 💔`);
    }
};