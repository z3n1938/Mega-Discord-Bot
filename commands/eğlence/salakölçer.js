// salakölçer.js
module.exports = {
    name: 'salakölçer',
    aliases: ['salak', 'aptalölçer', 'salakrate'],
    category: 'Eğlence',
    description: 'Bir üyenin "salak" yüzdesini ölçer (şaka amaçlı)',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const rate = Math.floor(Math.random() * 101);

        let text = '';
        if (rate === 100) text = 'Tam bir efsane! Beyin hücreleri tatilde... 🏖️';
        else if (rate >= 80) text = 'Yüksek seviye salaklık tespit edildi! 😂';
        else if (rate >= 50) text = 'Orta seviye, bazen düşünüyorsun...';
        else if (rate >= 20) text = 'Azıcık var, herkesin olur bazen.';
        else text = 'Zeki biri! Salaklık seviyesi düşük. 🧠';

        message.reply(`🤡 **Salakölçer**\n${member.displayName}: **%${rate}** salak!\n${text}`);
    }
};