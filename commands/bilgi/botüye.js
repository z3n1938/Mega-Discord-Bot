module.exports = {
    name: 'botüye',
    aliases: ['botüyeler', 'botlar', 'botlist'],
    category: 'Bilgi',
    description: 'Sunucudaki botların listesini ve sayısını gösterir',
    execute(message, args, client) {
        const guild = message.guild;

        // Botları filtrele
        const bots = guild.members.cache.filter(member => member.user.bot);

        const botCount = bots.size;

        if (botCount === 0) {
            return message.reply('Bu sunucuda hiç bot bulunmuyor.');
        }

        // Bot listesini oluştur (en fazla 20 tane göster, fazla olursa özetle)
        let botList = bots.map(bot => 
            `• ${bot.user.tag} (${bot.user.id})`
        );

        if (botList.length > 20) {
            botList = botList.slice(0, 20);
            botList.push(`\n... ve ${botCount - 20} bot daha.`);
        }

        const botListText = botList.join('\n');

        message.reply(`🤖 **Sunucudaki Botlar** (${botCount} adet)\n\n${botListText}`);
    }
};