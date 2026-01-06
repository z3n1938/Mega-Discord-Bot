// slots.js - oyunlar
module.exports = {
    name: 'slots',
    aliases: ['slot', 'kumar', 'slotoyunu'],
    description: 'Slot makinesi oynarsın (bahis miktarı gir)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();

        const bahis = parseInt(args[0]);
        if (!bahis || bahis < 50) {
            return message.reply('❌ Minimum bahis **50 coin**!\nÖrnek: `!slots 100`');
        }

        const current = client.coins.get(message.author.id) || 0;
        if (current < bahis) {
            return message.reply(`❌ Yeterli coinin yok!\nSahip olduğun: **${current}** coin`);
        }

        const emojiler = ['🍒', '🍋', '🍊', '7️⃣', '💎', '🔔', 'BAR', '🍇'];

        const slot1 = emojiler[Math.floor(Math.random() * emojiler.length)];
        const slot2 = emojiler[Math.floor(Math.random() * emojiler.length)];
        const slot3 = emojiler[Math.floor(Math.random() * emojiler.length)];

        let kazanç = 0;
        let mesaj = '';

        if (slot1 === slot2 && slot2 === slot3) {
            kazanç = bahis * 10;
            mesaj = `🎉 **JACKPOT!** ${kazanç} coin kazandın!`;
        } else if (slot1 === slot2 || slot2 === slot3 || slot1 === slot3) {
            kazanç = Math.floor(bahis * 1.5);
            mesaj = `✅ **Küçük kazanç!** ${kazanç} coin kazandın!`;
        } else {
            kazanç = -bahis;
            mesaj = `😢 Kaybettin! -${bahis} coin`;
        }

        client.coins.set(message.author.id, current + kazanç);

        message.reply(`🎰 **SLOT MAKİNESİ**\n\n${slot1} | ${slot2} | ${slot3}\n\n${mesaj}\nYeni bakiye: **${current + kazanç}** coin`);
    }
};