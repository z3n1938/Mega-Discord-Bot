// gayölçer.js
module.exports = {
    name: 'gayölçer',
    aliases: ['gay', 'gayrate', 'eşcinselölçer'],
    category: 'Eğlence',
    description: 'Bir üyenin "gay" yüzdesini ölçer (şaka amaçlı)',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const rate = Math.floor(Math.random() * 101);

        let text = '';
        if (rate === 100) text = 'Tam bir efsane! 🌈';
        else if (rate >= 80) text = 'Yüksek seviye gökkuşağı enerjisi!';
        else if (rate >= 50) text = 'Orta seviye, gizli yetenek var.';
        else if (rate >= 20) text = 'Azıcık var, inkar etme.';
        else text = 'Tamamen heteronormatif... sanırım? 😏';

        message.reply(`🌈 **Gayölçer**\n${member.displayName}: **%${rate}** gay!\n${text}`);
    }
};