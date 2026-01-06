// reroll.js - Eğlence / Utility
module.exports = {
    name: 'reroll',
    aliases: ['yenidençek', 'rerollgiveaway'],
    description: 'Sonlanmış bir çekilişi yeniden çeker',
    category: 'Eğlence',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('❌ **Mesajları Yönet** iznin yok!');
        }

        const msgId = args[0] || message.channel.lastMessageId;
        const giveawayMsg = message.channel.messages.cache.get(msgId);

        if (!giveawayMsg || !giveawayMsg.reactions.cache.get('🎉')) {
            return message.reply('❌ Geçerli bir çekiliş mesajı belirt! (mesaj ID\'si veya son mesaj)');
        }

        giveawayMsg.reactions.cache.get('🎉').users.fetch()
            .then(users => {
                const participants = users.filter(u => !u.bot);
                if (participants.size === 0) {
                    return message.reply('❌ Katılımcı yok, yeniden çekilemedi.');
                }

                const newWinner = participants.random();
                message.reply(`🎉 **Yeniden Çekiliş!**\nYeni kazanan: **${newWinner}** Tebrikler! 🎊`);
            })
            .catch(() => message.reply('❌ Yeniden çekme başarısız.'));
    }
};