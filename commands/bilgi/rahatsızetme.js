// rahatsızetme.js
module.exports = {
    name: 'rahatsızetme',
    aliases: ['dnd', 'rahatsızetmeüyeler'],
    category: 'Bilgi',
    description: 'Rahatsız Etmeyin (Do Not Disturb) modundaki üyeleri gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        const dndMembers = guild.members.cache.filter(member => 
            member.presence?.status === 'dnd'
        );

        const count = dndMembers.size;

        if (count === 0) {
            return message.reply('Şu anda Rahatsız Etmeyin modunda kimse yok.');
        }

        let memberList = dndMembers.map(m => `• ${m.user.tag}`);

        if (memberList.length > 25) {
            memberList = memberList.slice(0, 25);
            memberList.push(`\n... ve ${count - 25} üye daha Rahatsız Etmeyin modunda.`);
        }

        const listText = memberList.join('\n');

        message.reply(`🔴 **Rahatsız Etmeyin Modundaki Üyeler** (${count} kişi)\n\n${listText}`);
    }
};