// coinflipbet.js - oyunlar
module.exports = {
    name: 'coinflipbet',
    aliases: ['cfbet', 'yazıturabahis', 'coinflip'],
    description: 'Yazı-tura bahsi oynarsın',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();

        const bahis = parseInt(args[0]);
        const seçim = args[1]?.toLowerCase();

        if (!bahis || bahis < 50) {
            return message.reply('❌ Minimum bahis **50 coin**!\nÖrnek: `!coinflipbet 100 yazı`');
        }
        if (!['yazı', 'tura'].includes(seçim)) {
            return message.reply('❌ Yazı mı tura mı seç! (`yazı` veya `tura`)');
        }

        const current = client.coins.get(message.author.id) || 0;
        if (current < bahis) {
            return message.reply(`❌ Yeterli coinin yok!\nSahip olduğun: **${current}** coin`);
        }

        const sonuç = Math.random() < 0.5 ? 'yazı' : 'tura';
        const emoji = sonuç === 'yazı' ? '🟡' : '⚫';

        if (seçim === sonuç) {
            const kazanç = bahis * 2;
            client.coins.set(message.author.id, current + bahis);
            message.reply(`🪙 **Yazı-Tura Sonuç:** ${emoji} **${sonuç.toUpperCase()}!**\nTahminin doğru!\n**+${bahis}** coin kazandın!\nYeni bakiye: **${current + bahis}** coin`);
        } else {
            client.coins.set(message.author.id, current - bahis);
            message.reply(`🪙 **Yazı-Tura Sonuç:** ${emoji} **${sonuç.toUpperCase()}!**\nTahminin yanlış!\n**-${bahis}** coin kaybettin!\nYeni bakiye: **${current - bahis}** coin`);
        }
    }
};