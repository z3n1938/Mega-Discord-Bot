// pet.js - oyunlar
module.exports = {
    name: 'pet',
    aliases: ['evcilhayvan', 'petim', 'hayvan'],
    description: 'Evcil hayvanını besler, okşar veya gösterir',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.pets) client.pets = new Map();

        const userId = message.author.id;
        let pet = client.pets.get(userId);

        if (!pet) {
            // İlk kullanımda rastgele pet ver
            const petNames = ['Köpek', 'Kedi', 'Tavşan', 'Papağan', 'Balık', 'Hamster', 'Kaplan', 'Ejderha'];
            const petEmojiler = ['🐶', '🐱', '🐰', '🦜', '🐠', '🐹', '🐯', '🐉'];
            const index = Math.floor(Math.random() * petNames.length);
            pet = {
                name: petNames[index],
                emoji: petEmojiler[index],
                hunger: 100,
                happiness: 100,
                level: 1,
                lastFed: 0,
                lastPet: 0
            };
            client.pets.set(userId, pet);
            return message.reply(`🎉 **Yeni evcil hayvanın oldu!**\nAdı: **${pet.name}** ${pet.emoji}\nBeslemek için: \`!pet besle\`\nOkşamak için: \`!pet okşa\``);
        }

        const action = args[0]?.toLowerCase();

        if (action === 'besle') {
            const now = Date.now();
            if (now - pet.lastFed < 3600000) { // 1 saat
                return message.reply(`🍖 ${pet.emoji} **${pet.name}** zaten tok!\nBiraz bekle.`);
            }
            pet.hunger = Math.min(100, pet.hunger + 30);
            pet.happiness = Math.min(100, pet.happiness + 10);
            pet.lastFed = now;
            client.pets.set(userId, pet);
            message.reply(`🍖 ${pet.emoji} **${pet.name}** yemini yedi!\nAçlık: **${pet.hunger}/100**\nMutluluk: **${pet.happiness}/100**`);
        } else if (action === 'okşa') {
            const now = Date.now();
            if (now - pet.lastPet < 1800000) { // 30 dakika
                return message.reply(`🖐️ ${pet.emoji} **${pet.name}** daha yeni okşadın!\nBiraz ara ver.`);
            }
            pet.happiness = Math.min(100, pet.happiness + 20);
            pet.lastPet = now;
            client.pets.set(userId, pet);
            message.reply(`🖐️ ${pet.emoji} **${pet.name}** okşandı ve mutlu oldu!\nMutluluk: **${pet.happiness}/100** ❤️`);
        } else {
            // Pet durumunu göster
            const açlıkDurumu = pet.hunger > 70 ? 'Tok' : pet.hunger > 30 ? 'Acıkmış' : 'Aç!';
            const mutlulukDurumu = pet.happiness > 70 ? 'Çok mutlu' : pet.happiness > 30 ? 'Mutlu' : 'Üzgün';

            message.reply(`🐾 **Evcil Hayvanın: ${pet.name}** ${pet.emoji}\n` +
                `Seviye: **${pet.level}**\n` +
                `Açlık: **${pet.hunger}/100** (${açlıkDurumu})\n` +
                `Mutluluk: **${pet.happiness}/100** (${mutlulukDurumu})\n\n` +
                `Beslemek için: \`!pet besle\`\nOkşamak için: \`!pet okşa\``);
        }
    }
};