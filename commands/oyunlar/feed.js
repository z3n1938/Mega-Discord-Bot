// feed.js - oyunlar
module.exports = {
    name: 'feed',
    aliases: ['besle', 'yemver', 'petfeed'],
    description: 'Evcil hayvanını besler',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.pets) client.pets = new Map();

        const userId = message.author.id;
        const pet = client.pets.get(userId);

        if (!pet) {
            return message.reply('❌ Önce bir evcil hayvan edin! (`!pet`)');
        }

        const now = Date.now();
        if (now - pet.lastFed < 3600000) { // 1 saat soğuma
            const kalan = formatTime(3600000 - (now - pet.lastFed));
            return message.reply(`🍖 **${pet.name}** ${pet.emoji} zaten tok!\nTekrar beslemek için **${kalan}** bekle.`);
        }

        pet.hunger = Math.min(100, pet.hunger + 40);
        pet.happiness = Math.min(100, pet.happiness + 15);
        pet.lastFed = now;

        let mesaj = `🍖 **${pet.name}** ${pet.emoji} yemini yedi! 😋\nAçlık: **${pet.hunger}/100**\nMutluluk: **${pet.happiness}/100**`;

        // Seviye atlama kontrolü
        if (pet.hunger >= 100 && pet.happiness >= 100 && Math.random() < 0.3) { // %30 şans
            pet.level += 1;
            pet.hunger = 50;
            pet.happiness = 80;
            mesaj += `\n\n🎉 **${pet.name} seviye atladı!**\nYeni seviye: **${pet.level}** 🚀`;
        }

        client.pets.set(userId, pet);
        message.reply(mesaj);
    }
};