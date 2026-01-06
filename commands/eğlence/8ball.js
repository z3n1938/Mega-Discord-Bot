// 8ball.js
module.exports = {
    name: '8ball',
    aliases: ['8top', 'fal', 'sihirlitop'],
    category: 'Eğlence',
    description: 'Sihirli 8-ball ile soruna cevap verir',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen bir soru sor! Örnek: `!8ball Bugün şanslı mıyım?`');
        }

        const answers = [
            'Kesinlikle evet! ✅',
            'Evet, öyle görünüyor. 👍',
            'Şüphesiz. 💯',
            'Evet. 😊',
            'İşaretler evet diyor. 🔮',
            'Görünüşe göre evet. 👌',
            'Muhtemelen. 🤔',
            'Gelecek belirsiz, tekrar sor. 🔄',
            'Şimdi söyleyemem. 🙊',
            'Konsantre ol ve tekrar sor. 🧘',
            'Bekleme, kötü bir fikir. ❌',
            'Hayır. 🚫',
            'Çok şüpheli. 🤨',
            'Kaynaklarım hayır diyor. 📜',
            'Kesinlikle hayır! ⛔',
            'Şansını başka yerde dene. 😅'
        ];

        const randomAnswer = answers[Math.floor(Math.random() * answers.length)];

        message.reply(`🎱 **Sihirli 8-Ball**\nSoru: ${args.join(' ')}\nCevap: **${randomAnswer}**`);
    }
};