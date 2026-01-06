// rob.js - oyunlar
module.exports = {
    name: 'rob',
    aliases: ['soygun', 'çal', 'rob'],
    description: 'Başka bir üyeyi soymaya çalışırsın (çok riskli!)',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.coins) client.coins = new Map();
        if (!client.lastRob) client.lastRob = new Map();

        const target = message.mentions.members.first();
        if (!target || target.user.bot) {
            return message.reply('❌ Geçerli bir üye etiketle! (Botları soyamazsın 😏)');
        }
        if (target.id === message.author.id) {
            return message.reply('❌ Kendini soyamazsın, aptal mısın? 🤦');
        }

        const userId = message.author.id;
        const targetId = target.user.id;
        const now = Date.now();
        const last = client.lastRob.get(userId) || 0;

        if (now - last < 10800000) { // 3 saat soğuma
            const kalan = formatTime(10800000 - (now - last));
            return message.reply(`🚔 Polis seni izliyor!\nTekrar soygun için **${kalan}** beklemelisin.`);
        }

        const targetCoins = client.coins.get(targetId) || 0;
        if (targetCoins < 200) {
            return message.reply(`❌ **${target.user.username}**'nin soyulacak kadar parası yok! (min 200 coin)`);
        }

        const başarı = Math.random() < 0.35; // %35 başarı şansı (çok riskli!)

        if (başarı) {
            const çalınan = Math.floor(Math.random() * (targetCoins * 0.5)) + 100; // Hedefin max %50'si
            const current = client.coins.get(userId) || 0;
            const targetCurrent = client.coins.get(targetId) || 0;

            client.coins.set(userId, current + çalınan);
            client.coins.set(targetId, targetCurrent - çalınan);
            client.lastRob.set(userId, now);

            message.reply(`✅ **Soygun Başarılı!**\n**${target.user.username}**'yi soydun!\n**+${çalınan}** coin çaldın!\nYeni bakiyen: **${current + çalınan}** coin`);
        } else {
            const ceza = Math.floor(Math.random() * 401) + 200; // 200-600 coin ceza
            const current = client.coins.get(userId) || 0;
            const yeniBakiye = Math.max(0, current - ceza);
            client.coins.set(userId, yeniBakiye);
            client.lastRob.set(userId, now);

            message.reply(`❌ **Soygun Başarısız!**\n**${target.user.username}** seni yakaladı veya polis geldi!\n**-${ceza}** coin ceza ödedin!\nYeni bakiyen: **${yeniBakiye}** coin`);
        }
    }
};