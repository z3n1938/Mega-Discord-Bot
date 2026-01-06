// aptal.js
module.exports = {
    name: 'aptal',
    aliases: ['aptalmısın', 'gerizekalı'],
    category: 'Eğlence',
    description: 'Şaka amaçlı aptallık ölçer',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const rate = Math.floor(Math.random() * 101);
        message.reply(`🫠 ${member.displayName} aptallık oranı: **%${rate}**\nTam bir dahi mi yoksa... 🤡`);
    }
};