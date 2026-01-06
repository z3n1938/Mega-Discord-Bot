// happy.js
module.exports = {
    name: 'happy',
    aliases: ['mutlu', 'sevinçli'],
    category: 'Eğlence',
    description: 'Mutlu olur veya belirtilen üyeye mutlu olur',
    execute(message, args, client) {
        const member = message.mentions.members.first();
        if (!member) {
            return message.reply(`😊 ${message.author} çok mutlu! Bugün güzel bir gün galiba! ✨`);
        }
        message.reply(`🥳 ${message.author} ${member}'dan dolayı çok mutlu! Harika bir şey mi oldu? 🎉`);
    }
};