// tersyazı.js
module.exports = {
    name: 'tersyazı',
    aliases: ['ters', 'reverse', 'tersyaz'],
    category: 'Eğlence',
    description: 'Yazdığın metni ters çevirir',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen ters çevrilecek bir metin yaz! Örnek: `!tersyazı Merhaba`');
        }

        const reversed = args.join(' ').split('').reverse().join('');

        message.reply(`🔄 **Ters Yazı**\nOrijinal: \`${args.join(' ')}\`\nTers: \`${reversed}\``);
    }
};