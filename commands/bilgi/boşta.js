// boşta.js
module.exports = {
    name: 'boşta',
    aliases: ['idle', 'boştaüyeler'],
    category: 'Bilgi',
    description: 'Boşta (Idle) modundaki üyeleri gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        const idleMembers = guild.members.cache.filter(member => 
            member.presence?.status === 'idle'
        );

        const count = idleMembers.size;

        if (count === 0) {
            return message.reply('Şu anda Boşta modunda kimse yok.');
        }

        let memberList = idleMembers.map(m => `• ${m.user.tag}`);

        if (memberList.length > 25) {
            memberList = memberList.slice(0, 25);
            memberList.push(`\n... ve ${count - 25} üye daha Boşta modunda.`);
        }

        const listText = memberList.join('\n');

        message.reply(`🟡 **Boşta Modundaki Üyeler** (${count} kişi)\n\n${listText}`);
    }
};