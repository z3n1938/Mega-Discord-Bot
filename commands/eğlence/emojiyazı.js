// emojiyazı.js
module.exports = {
    name: 'emojiyazı',
    aliases: ['emojitext', 'emojiharf'],
    category: 'Eğlence',
    description: 'Metni emoji harflerle yazar',
    execute(message, args, client) {
        if (args.length === 0) return message.reply('Metin gir!');
        const text = args.join(' ').toLowerCase();
        const emojiMap = { a: '🅰️', b: '🅱️', o: '🅾️', 0: '0️⃣', 1: '1️⃣', 2: '2️⃣', 3: '3️⃣', 4: '4️⃣', 5: '5️⃣', 6: '6️⃣', 7: '7️⃣', 8: '8️⃣', 9: '9️⃣', '!': '❗', '?': '❓' };
        let result = '';
        for (const char of text) {
            result += emojiMap[char] || char;
        }
        message.reply(result);
    }
};