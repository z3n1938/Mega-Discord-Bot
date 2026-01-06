module.exports = {
    name: 'insanüye',
    aliases: ['insanüyeler', 'insanlar', 'üyeler'],
    category: 'Bilgi',
    description: 'Sunucudaki insan üyelerin (bot olmayan) listesini ve sayısını gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        // İnsan üyeleri filtrele (bot olmayanlar)
        const humans = guild.members.cache.filter(member => !member.user.bot);

        const humanCount = humans.size;

        if (humanCount === 0) {
            return message.reply('Bu sunucuda hiç insan üye bulunmuyor. (Çok nadir bir durum!)');
        }

        // İnsan üye listesini oluştur (en fazla 20 tane göster, fazla olursa özetle)
        let humanList = humans.map(member => 
            `• ${member.user.tag} (${member.user.id})`
        );

        if (humanList.length > 20) {
            humanList = humanList.slice(0, 20);
            humanList.push(`\n... ve ${humanCount - 20} insan üye daha.`);
        }

        const humanListText = humanList.join('\n');

        message.reply(`👤 **Sunucudaki İnsan Üyeler** (${humanCount} adet)\n\n${humanListText}`);
    }
};