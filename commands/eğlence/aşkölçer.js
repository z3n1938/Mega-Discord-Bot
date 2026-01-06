// aşkölçer.js
module.exports = {
    name: 'aşkölçer',
    aliases: ['aşk', 'love', 'seviye'],
    category: 'Eğlence',
    description: 'İki kişi arasındaki aşk yüzdesini ölçer',
    execute(message, args, client) {
        const user1 = message.member;
        const user2 = message.mentions.members.first() || message.member;

        if (user1.id === user2.id) {
            return message.reply(`💔 **Aşkölçer**\n${user1.displayName} kendini ne kadar seviyor?\n**%100** (Narsist modu aktif) 😏`);
        }

        const love = Math.floor(Math.random() * 101);

        let emoji = '';
        let text = '';

        if (love >= 90) { emoji = '💞'; text = 'Mükemmel bir uyum! Evlenin gitsin!'; }
        else if (love >= 70) { emoji = '❤️'; text = 'Çok iyi gidiyor, şanslısınız!'; }
        else if (love >= 50) { emoji = '💕'; text = 'Orta seviye, biraz çaba lazım.'; }
        else if (love >= 30) { emoji = '💖'; text = 'Zor ama imkansız değil...'; }
        else { emoji = '💔'; text = 'Maalesef pek uyumlu değilsiniz.'; }

        message.reply(`💘 **Aşkölçer**\n${user1.displayName} ❤️ ${user2.displayName}\nAşk Yüzdesi: **%${love}** ${emoji}\n${text}`);
    }
};