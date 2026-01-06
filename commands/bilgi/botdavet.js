// botdavet.js
module.exports = {
    name: 'botdavet',
    aliases: ['davet', 'invite', 'botlink'],
    category: 'Bilgi',
    description: 'Botun davet linkini gönderir',
    execute(message, args, client) {
        const inviteLink = `https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot%20applications.commands`;

        message.reply(`🤖 **Bot Davet Linki**\n` +
            `Botu sunucuna eklemek için aşağıdaki linke tıkla:\n` +
            `🔗 ${inviteLink}\n` +
            `(Yönetici izniyle eklenir. İstersen izinleri özelleştirebilirsin.)`);
    }
};