// iq.js
module.exports = {
    name: 'iq',
    aliases: ['iqtest', 'zeka', 'iqölçer'],
    category: 'Eğlence',
    description: 'Bir üyenin IQ seviyesini ölçer (şaka amaçlı)',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const iq = Math.floor(Math.random() * 180) + 20; // 20-200 arası

        let text = '';
        if (iq >= 160) text = 'Dahi seviyesinde! 🚀';
        else if (iq >= 140) text = 'Çok zeki, dikkat et!';
        else if (iq >= 120) text = 'Üstün zekâ!';
        else if (iq >= 100) text = 'Ortalama üstü, iyi iş!';
        else if (iq >= 80) text = 'Normal seviye...';
        else if (iq >= 50) text = 'Biraz çalışmak lazım...';
        else text = 'IQ mu? O da ne? 🤡';

        message.reply(`🧠 **IQ Testi**\n${member.displayName}'nin IQ'su: **${iq}**\n${text}`);
    }
};