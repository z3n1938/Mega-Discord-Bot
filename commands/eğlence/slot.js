// slot.js
module.exports = {
    name: 'slot',
    aliases: ['slotmachine', 'kumar', 'şans'],
    category: 'Eğlence',
    description: 'Slot makinesi oynatır',
    execute(message, args, client) {
        const emojis = ['🍋', '🍊', '🍇', '🍉', '💎', '7️⃣', '🍀', '🔔'];
        const slot1 = emojis[Math.floor(Math.random() * emojis.length)];
        const slot2 = emojis[Math.floor(Math.random() * emojis.length)];
        const slot3 = emojis[Math.floor(Math.random() * emojis.length)];

        const result = slot1 === slot2 && slot2 === slot3 ? '🎉 **JACKPOT! KAZANDIN!** 🎉' : '😢 Kaybettin, tekrar dene!';

        message.reply(`🎰 **Slot Makinesi**\n| ${slot1} | ${slot2} | ${slot3} |\n${result}`);
    }
};