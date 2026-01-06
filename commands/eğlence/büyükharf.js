// büyükharf.js
module.exports = {
    name: 'büyükharf',
    aliases: ['büyük', 'caps', 'uppercase'],
    category: 'Eğlence',
    description: 'Yazdığın metni tamamen büyük harfe çevirir',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen büyük harfe çevrilecek bir metin yaz! Örnek: `!büyükharf selam`');
        }

        const upper = args.join(' ').toUpperCase();

        message.reply(`🔊 **BÜYÜK HARF**\nOrijinal: \`${args.join(' ')}\`\nBüyük: **${upper}**`);
    }
};