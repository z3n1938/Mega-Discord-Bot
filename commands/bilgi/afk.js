// afk.js - Bilgi
module.exports = {
    name: 'afk',
    aliases: ['afkmod', 'afkyaz'],
    category: 'Bilgi',
    description: 'AFK moduna girer ve sebep belirtir',
    execute(message, args, client) { // <-- client parametresi eklendi (en önemli kısım!)
        const reason = args.join(' ') || 'AFK';

        // Hafıza tabanlı AFK sistemi
        if (!client.afk) client.afk = new Map();

        client.afk.set(message.author.id, {
            reason: reason,
            time: Date.now(),
            guild: message.guild.id
        });

        message.reply(`✅ **AFK Moduna Girildi**\nSebep: \`${reason}\`\nAFK olduğun sürece etiketlendiğinde bu mesaj gösterilecek.`)
            .then(msg => {
                setTimeout(() => {
                    if (msg.deletable) msg.delete().catch(() => {});
                }, 10000);
            });

        // Nick değiştir (eğer izin varsa)
        if (message.member.manageable && !message.member.displayName.startsWith('[AFK]')) {
            const newNick = `[AFK] ${message.member.displayName.substring(0, 26)}`; // 32 karakter sınırı
            message.member.setNickname(newNick).catch(() => {});
        }
    }
};
