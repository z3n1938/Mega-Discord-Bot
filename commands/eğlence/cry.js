// cry.js
module.exports = {
    name: 'cry',
    aliases: ['ağla', 'ağlama'],
    category: 'Eğlence',
    description: 'Ağlar veya belirtilen üyeyi ağlatır',
    execute(message, args, client) {
        const member = message.mentions.members.first();

        if (!member) {
            return message.reply(`😢 ${message.author} sessizce ağlamaya başladı... niye üzgünsün? ❤️`);
        }

        if (member.id === message.author.id) {
            return message.reply(`😭 ${message.author} hönkür hönkür ağlıyor... sarılalım mı? 🫂`);
        }

        message.reply(`😢 **Ağlama Zamanı!**\n${message.author} ${member}'ı ağlattı... çok mu kırıcı bir şey söyledin? 😭`);
    }
};