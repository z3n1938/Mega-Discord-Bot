// küçükharf.js
module.exports = {
    name: 'küçükharf',
    aliases: ['küçük', 'lowercase', 'small'],
    category: 'Eğlence',
    description: 'Yazdığın metni tamamen küçük harfe çevirir',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen küçük harfe çevrilecek bir metin yaz! Örnek: `!küçükharf MERHABA`');
        }

        const lower = args.join(' ').toLowerCase();

        message.reply(`🔈 **küçük harf**\nOrijinal: \`${args.join(' ')}\`\nKüçük: \`${lower}\``);
    }
};