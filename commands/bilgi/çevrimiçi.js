// çevrimiçi.js
module.exports = {
    name: 'çevrimiçi',
    aliases: ['online', 'çevrimiçiüyeler'],
    category: 'Bilgi',
    description: 'Sunucuda çevrimiçi olan üyeleri gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        // Çevrimiçi: online, idle, dnd
        const onlineMembers = guild.members.cache.filter(member => 
            member.presence?.status === 'online' || 
            member.presence?.status === 'idle' || 
            member.presence?.status === 'dnd'
        );

        const count = onlineMembers.size;

        if (count === 0) {
            return message.reply('Şu anda çevrimiçi hiçbir üye yok.');
        }

        // Listeyi oluştur (maks. 25 üye göster, fazla olursa özetle)
        let memberList = onlineMembers.map(m => 
            `• ${m.user.tag} (${m.presence?.status === 'online' ? '🟢' : m.presence?.status === 'idle' ? '🟡' : '🔴'})`
        );

        if (memberList.length > 25) {
            memberList = memberList.slice(0, 25);
            memberList.push(`\n... ve ${count - 25} üye daha çevrimiçi.`);
        }

        const listText = memberList.join('\n');

        message.reply(`🟢 **Çevrimiçi Üyeler** (${count} kişi)\n\n${listText}`);
    }
};