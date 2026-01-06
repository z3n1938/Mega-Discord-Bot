// afkremove.js - Utility
module.exports = {
    name: 'afkremove',
    aliases: ['afkçık', 'afkkaldır', 'afkoff'],
    description: 'AFK modundan manuel çıkar',
    category: 'Utility',
    execute(message, args, client) {
        if (!client.afk) client.afk = new Map();

        if (!client.afk.has(message.author.id)) {
            return message.reply('❌ Zaten AFK değilsin!');
        }

        client.afk.delete(message.author.id);
        message.reply('✅ **AFK Modundan Çıkıldı!**\nHoş geldin! 😊');

        // Nick'i eski haline getir
        if (message.member.manageable && message.member.displayName.startsWith('[AFK]')) {
            const oldNick = message.member.displayName.replace(/^\[AFK\]\s*/i, '');
            message.member.setNickname(oldNick).catch(() => {});
        }
    }
};