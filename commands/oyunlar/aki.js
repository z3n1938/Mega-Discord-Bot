// aki.js - oyunlar (Gerçek Akinator - aki-api güncel versiyon)
module.exports = {
    name: 'aki',
    aliases: ['akinator', 'tahmin', 'aki'],
    description: 'Gerçek Akinator oyunu',
    category: 'oyunlar',
    execute: async (message, args, client) => {
        const { AKI } = require('aki-api');

        const aki = new AKI({
            region: 'tr',          // Türkçe
            childMode: false,      // NSFW açık
            proxy: null            // Proxy gerekirse ekle
        });

        let adım = 0;

        const oyunBaşlat = async () => {
            try {
                await aki.start();
                const soru = aki.question;
                const progress = aki.progress.toFixed(2);

                message.reply(`🧙‍♂️ **Akinator Başladı!**\nSoru ${aki.currentStep + 1}: **${soru}**\nİlerleme: %${progress}\n\nCevap ver: **evet** / **hayır** / **bilmiyorum** / **muhtemelen** / **muhtemelen değil**\nKısaltma: e / h / b / m / md`);
            } catch (err) {
                message.reply('❌ Akinator başlatılamadı. Daha sonra dene.');
                console.error(err);
            }
        };

        oyunBaşlat();

        const filter = m => m.author.id === message.author.id;
        const collector = message.channel.createMessageCollector({ filter, time: 300000 });

        collector.on('collect', async m => {
            const cevap = m.content.toLowerCase().trim();

            const cevapMap = {
                'evet': 'yes',
                'hayır': 'no',
                'bilmiyorum': 'idk',
                'muhtemelen': 'probably',
                'muhtemelen değil': 'probably not',
                'e': 'yes',
                'h': 'no',
                'b': 'idk',
                'm': 'probably',
                'md': 'probably not'
            };

            const akiCevap = cevapMap[cevap];
            if (!akiCevap) {
                m.reply('Lütfen geçerli cevap ver! (evet/hayır/bilmiyorum/muhtemelen/muhtemelen değil)\nKısaltma: e/h/b/m/md');
                return;
            }

            try {
                await aki.step(akiCevap);

                if (aki.progress >= 85 || aki.currentStep >= 78) {
                    await aki.win();

                    if (aki.answers.length === 0) {
                        m.reply('🤔 Karakteri tahmin edemedim! Aklındaki çok gizemli 😅');
                    } else {
                        const kazanan = aki.answers[0];
                        const embed = {
                            color: 0x00FF00,
                            title: '🧙‍♂️ Akinator Tahmin Etti!',
                            description: `**${kazanan.name}** mı düşündün?\n\n${kazanan.description || ''}`,
                            image: { url: kazanan.absolute_picture_path || null },
                            footer: { text: `Doğruysa bravo! Yanlışsa daha iyi oynardım 😏` }
                        };
                        m.reply({ embeds: [embed] });
                    }
                    collector.stop();
                } else {
                    const soru = aki.question;
                    const progress = aki.progress.toFixed(2);
                    m.reply(`Soru ${aki.currentStep + 1}: **${soru}**\nİlerleme: %${progress}`);
                }
            } catch (err) {
                m.reply('❌ Oyun sırasında hata oluştu. Yeniden başlat: `!aki`');
                console.error(err);
                collector.stop();
            }
        });

        collector.on('end', collected => {
            if (collected.size === 0) {
                message.channel.send('⏰ Zaman doldu! Akinator pes etti...');
            }
        });
    }
};