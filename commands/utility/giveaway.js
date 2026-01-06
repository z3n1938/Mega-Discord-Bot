// giveaway.js - Eğlence / Utility (Çoklu Kazanan Destekli)
module.exports = {
    name: 'giveaway',
    aliases: ['çekiliş', 'giveawaystart', 'çekilişbaşlat'],
    description: 'Çekiliş başlatır (süre + ödül + kazanan sayısı)',
    category: 'Eğlence',
    execute(message, args, client) {
        if (!message.member.permissions.has('ManageMessages')) {
            return message.reply('❌ **Mesajları Yönet** iznin yok!');
        }

        // Kullanım: !giveaway <süre> <kazanan sayısı> <ödül>
        // Örnek: !giveaway 1h 3 Nitro Classic
        // Veya: !giveaway 30m Nitro (kazanan sayısı belirtilmezse 1)

        if (args.length < 2) {
            return message.reply('❌ Kullanım: `!giveaway <süre> [kazanan sayısı] <ödül>`\nÖrnek:\n`!giveaway 1h Nitro Classic`\n`!giveaway 2h 3 2x Nitro`');
        }

        let duration = args[0];
        let winnerCount = 1;
        let prizeStartIndex = 1;

        // Kazanan sayısı belirtilmiş mi?
        if (!isNaN(args[1]) && parseInt(args[1]) > 0) {
            winnerCount = parseInt(args[1]);
            if (winnerCount > 10) winnerCount = 10; // Maks 10 kazanan
            prizeStartIndex = 2;
        }

        const prize = args.slice(prizeStartIndex).join(' ');
        if (!prize) {
            return message.reply('❌ Lütfen ödülü belirt!');
        }

        const ms = parseTime(duration);
        if (!ms || ms < 60000) {
            return message.reply('❌ Süre en az 1 dakika olmalı! (s/m/h destekler: 30s, 5m, 1h)');
        }

        const endTime = Date.now() + ms;

        const embed = {
            color: 0xFF9900,
            title: '🎉 ÇEKİLİŞ BAŞLADI!',
            description: `**Ödül:** ${prize}\n**Kazanan Sayısı:** ${winnerCount}\n**Katılmak için:** 🎉 emojisine tıkla!\n**Bitiş:** <t:${Math.floor(endTime / 1000)}:R>`,
            footer: { text: `Başlatan: ${message.author.tag} | ID: ${message.id}` },
            timestamp: new Date()
        };

        message.channel.send({ embeds: [embed] })
            .then(msg => {
                msg.react('🎉');

                if (!client.giveaways) client.giveaways = new Map();

                client.giveaways.set(msg.id, {
                    prize,
                    winnerCount,
                    endTime,
                    channelId: message.channel.id,
                    messageId: msg.id,
                    host: message.author.id
                });

                setTimeout(async () => {
                    if (!client.giveaways.has(msg.id)) return;

                    try {
                        const updatedMsg = await msg.channel.messages.fetch(msg.id);
                        const reaction = updatedMsg.reactions.cache.get('🎉');

                        if (!reaction || reaction.count <= 1) { // Sadece bot tepki verdiyse
                            updatedMsg.reply(`🎉 **Çekiliş Bitti!**\nÖdül: **${prize}**\nKazanan yok (katılım olmadı 😢)`);
                            client.giveaways.delete(msg.id);
                            return;
                        }

                        await reaction.users.fetch();
                        const participants = reaction.users.cache.filter(u => !u.bot);

                        if (participants.size < winnerCount) {
                            updatedMsg.reply(`🎉 **Çekiliş Bitti!**\nÖdül: **${prize}**\nYeterli katılım olmadığı için kazanan seçilemedi 😢`);
                        } else {
                            const winners = [];
                            const tempParticipants = [...participants.values()];

                            for (let i = 0; i < winnerCount; i++) {
                                if (tempParticipants.length === 0) break;
                                const index = Math.floor(Math.random() * tempParticipants.length);
                                winners.push(tempParticipants.splice(index, 1)[0]);
                            }

                            if (winners.length === 1) {
                                updatedMsg.reply(`🎉 **ÇEKİLİŞ BİTTİ!**\nÖdül: **${prize}**\nKazanan: **${winners[0]}** Tebrikler! 🎊`);
                            } else {
                                updatedMsg.reply(`🎉 **ÇEKİLİŞ BİTTİ!**\nÖdül: **${prize}**\nKazananlar: ${winners.map(w => `**${w}**`).join(', ')}\nTebrikler! 🎊`);
                            }
                        }
                    } catch (err) {
                        console.error('Çekiliş bitiş hatası:', err);
                        message.channel.send('Çekiliş bitirilirken bir hata oluştu.');
                    }

                    client.giveaways.delete(msg.id);
                }, ms);
            })
            .catch(err => {
                console.error(err);
                message.reply('❌ Çekiliş başlatılamadı. Emoji ekleme iznim olmayabilir.');
            });
    }
};