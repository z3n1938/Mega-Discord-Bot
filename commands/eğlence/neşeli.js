// neşeli.js
module.exports = {
    name: 'neşeli',
    aliases: ['neşe', 'mutluluğuver'],
    category: 'Eğlence',
    description: 'Neşeli bir mesaj gönderir',
    execute(message, args, client) {
        const messages = ['Bugün harika bir gün!', 'Gülümse, hayat güzel! 😄', 'Her şey yolunda gidecek!', 'Sen harikasın!'];
        message.reply(`🎈 **Neşeli Mesaj**\n${messages[Math.floor(Math.random() * messages.length)]}`);
    }
};