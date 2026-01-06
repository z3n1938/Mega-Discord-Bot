// güzellik.js
module.exports = {
    name: 'güzellik',
    aliases: ['güzelölçer', 'beauty', 'güzellikölçer'],
    category: 'Eğlence',
    description: 'Bir üyenin güzellik yüzdesini ölçer (şaka amaçlı)',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const rate = Math.floor(Math.random() * 101);

        let text = '';
        if (rate === 100) text = 'Mükemmel güzellik! Ayna kırılır senden! ✨';
        else if (rate >= 90) text = 'Çok güzel! Herkes dönüp bakar. 😍';
        else if (rate >= 70) text = 'Güzel, kendine has bir çekicilik var.';
        else if (rate >= 50) text = 'Orta seviye, karakter önemli zaten!';
        else text = 'Güzellik içten gelir... çok içten! ❤️';

        message.reply(`😘 **Güzellik Ölçer**\n${member.displayName}: **%${rate}** güzel!\n${text}`);
    }
};