// çevrimdışı.js
module.exports = {
    name: 'çevrimdışı',
    aliases: ['offline', 'çevrimdışıüyeler'],
    category: 'Bilgi',
    description: 'Sunucuda çevrimdışı görünen üyeleri gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        // Çevrimdışı: presence yok veya status 'offline'
        const offlineMembers = guild.members.cache.filter(member => 
            !member.presence || member.presence.status === 'offline'
        );

        const count = offlineMembers.size;

        if (count === 0) {
            return message.reply('Şu anda çevrimdışı görünen hiçbir üye yok.');
        }

        // Listeyi oluştur (maks. 25 üye göster, fazla olursa özetle)
        let memberList = offlineMembers.map(m => `• ${m.user.tag}`);

        if (memberList.length > 25) {
            memberList = memberList.slice(0, 25);
            memberList.push(`\n... ve ${count - 25} üye daha çevrimdışı.`);
        }

        const listText = memberList.join('\n');

        message.reply(`⚫ **Çevrimdışı Üyeler** (${count} kişi)\n\n${listText}`);
    }
};