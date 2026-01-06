// hangman.js - oyunlar
module.exports = {
    name: 'hangman',
    aliases: ['adamasmaca', 'hang', 'asmaca'],
    description: 'Adam asmaca oyunu oynar',
    category: 'oyunlar',
    execute(message, args, client) {
        const kelimeler = ['discord', 'javascript', 'bot', 'groovy', 'moderasyon', 'ekonomi', 'oyun', 'seviye', 'ticket', 'çekiliş'];
        const kelime = kelimeler[Math.floor(Math.random() * kelimeler.length)];
        let gizli = '_ '.repeat(kelime.length).trim();
        let can = 6;
        const kullanılan = [];

        const stages = [
            '```\n     \n     \n     \n     \n     \n=========```',
            '```\n     |\n     |\n     |\n     |\n     |\n=========```',
            '```\n  +--+\n     |\n     |\n     |\n     |\n=========```',
            '```\n  +--+\n  |  |\n     |\n     |\n     |\n=========```',
            '```\n  +--+\n  |  |\n  O  |\n     |\n     |\n=========```',
            '```\n  +--+\n  |  |\n  O  |\n /|\\ |\n     |\n=========```',
            '```\n  +--+\n  |  |\n  O  |\n /|\\ |\n / \\ |\n=========```'
        ];

        message.reply(`🎲 **Adam Asmaca Oyunu Başladı!**\nKelime: ${gizli}\nCan: ❤️❤️❤️❤️❤️❤️ (6)\n\nHarf tahmin et! (a-z)`).then(msg => {
            const filter = m => m.author.id === message.author.id && m.content.length === 1 && /[a-zA-Zğüşöçİı]/.test(m.content);
            const collector = message.channel.createMessageCollector({ filter, time: 60000 });

            collector.on('collect', m => {
                const harf = m.content.toLowerCase();
                if (kullanılan.includes(harf)) {
                    m.reply('Bu harfi zaten kullandın!').then(d => setTimeout(() => d.delete(), 3000));
                    return;
                }
                kullanılan.push(harf);

                if (kelime.includes(harf)) {
                    let yeniGizli = '';
                    for (let i = 0; i < kelime.length; i++) {
                        yeniGizli += kelime[i] === harf ? harf : gizli[i * 2];
                    }
                    gizli = yeniGizli.split('').join(' ');

                    if (!gizli.includes('_')) {
                        collector.stop('won');
                        return;
                    }
                } else {
                    can--;
                    if (can === 0) {
                        collector.stop('lost');
                        return;
                    }
                }

                const canEmojisi = '❤️'.repeat(can) + '🖤'.repeat(6 - can);
                msg.edit(`🎲 **Adam Asmaca**\n${stages[6 - can]}\nKelime: ${gizli}\nCan: ${canEmojisi} (${can})\nKullanılan: ${kullanılan.join(', ')}`);
            });

            collector.on('end', (collected, reason) => {
                if (reason === 'won') {
                    msg.reply(`🎉 **Tebrikler! Kelimeyi buldun: ${kelime.toUpperCase()}**`);
                } else if (reason === 'lost') {
                    msg.reply(`😵 **Kaybettin!**\nKelime: **${kelime.toUpperCase()}** idi`);
                } else {
                    msg.reply(`⏰ Zaman doldu! Kelime: **${kelime.toUpperCase()}** idi`);
                }
            });
        });
    }
};