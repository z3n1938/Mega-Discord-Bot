// close.js - Moderasyon
module.exports = {
    name: 'close',
    aliases: ['kapat', 'ticketkapat', 'kapat-ticket'],
    description: 'Mevcut ticket kanalını kapatır (manuel komut)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!message.channel.name.startsWith('ticket-')) {
            return message.reply('❌ Bu komut sadece ticket kanallarında kullanılabilir!');
        }

        if (!message.member.permissions.has('ManageChannels') && !message.member.permissions.has('Administrator')) {
            return message.reply('❌ Ticket kapatmak için **Kanalları Yönet** iznin yok!');
        }

        const reason = args.join(' ') || 'Sebep belirtilmedi';

        message.channel.send(`🔒 **Ticket Kapatılıyor...**\nYetkili: ${message.author}\nSebep: \`${reason}\`\nKanal 5 saniye içinde silinecek.`)
            .then(() => {
                setTimeout(() => {
                    message.channel.delete().catch(() => {});
                }, 5000);
            });
    }
};