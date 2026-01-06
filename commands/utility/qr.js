// qr.js - Utility
module.exports = {
    name: 'qr',
    aliases: ['qrcode', 'qrkod', 'qrcreate'],
    description: 'Belirtilen metin veya link için QR kod oluşturur',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen QR kod yapılacak metni veya linki yaz!\nÖrnek: `!qr https://discord.gg/sunucu`');
        }

        const text = args.join(' ');
        const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=512x512&data=${encodeURIComponent(text)}`;

        message.reply({
            content: `🔳 **QR Kod Oluşturuldu!**\nMetin/Link: \`${text}\`\nAşağıdaki resmi tarat!`,
            files: [qrUrl]
        });
    }
};