// kahve.js
module.exports = {
    name: 'kahve',
    aliases: ['coffee', 'çay'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye kahve ikram eder',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        message.reply(`☕ ${message.author} ${member}'a sıcak bir kahve ikram etti! Afiyet olsun!`);
    }
};