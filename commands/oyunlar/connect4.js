// connect4.js - oyunlar
module.exports = {
    name: 'connect4',
    aliases: ['dörtlü', 'connectfour', '4lü'],
    description: 'Connect 4 (Dört Bağla) oynar',
    category: 'oyunlar',
    execute(message, args, client) {
        const target = message.mentions.members.first();
        if (!target || target.user.bot) {
            return message.reply('❌ Bir rakip etiketle! (`!connect4 @üye`)');
        }
        if (target.id === message.author.id) {
            return message.reply('❌ Kendinle oynayamazsın!');
        }

        const board = Array(6).fill().map(() => Array(7).fill('⚫'));
        let turn = message.author.id;
        const oyuncu1 = message.author;
        const oyuncu2 = target.user;
        const emoji1 = '🔴';
        const emoji2 = '🟡';

        const oyunTahtası = () => {
            return board.map(row => row.join('')).join('\n') + '\n1️⃣2️⃣3️⃣4️⃣5️⃣6️⃣7️⃣';
        };

        const kontrol = () => {
            // Yatay, dikey, çapraz kontrol
            for (let r = 0; r < 6; r++) {
                for (let c = 0; c < 7; c++) {
                    if (board[r][c] === '⚫') continue;
                    const renk = board[r][c];

                    // Yatay
                    if (c <= 3 && board[r][c+1] === renk && board[r][c+2] === renk && board[r][c+3] === renk) return renk;
                    // Dikey
                    if (r <= 2 && board[r+1][c] === renk && board[r+2][c] === renk && board[r+3][c] === renk) return renk;
                    // Çapraz sağ
                    if (r <= 2 && c <= 3 && board[r+1][c+1] === renk && board[r+2][c+2] === renk && board[r+3][c+3] === renk) return renk;
                    // Çapraz sol
                    if (r <= 2 && c >= 3 && board[r+1][c-1] === renk && board[r+2][c-2] === renk && board[r+3][c-3] === renk) return renk;
                }
            }
            if (board[0].every(cell => cell !== '⚫')) return 'berabere';
            return null;
        };

        message.reply(`${target} **${message.author} sana Connect 4 meydan okudu!**\nKabul ediyor musun? (evet/hayır)`)
            .then(() => {
                const filter = m => m.author.id === target.id && ['evet', 'hayır'].includes(m.content.toLowerCase());
                message.channel.awaitMessages({ filter, max: 1, time: 30000 })
                    .then(collected => {
                        if (collected.first().content.toLowerCase() !== 'evet') {
                            return message.reply('❌ Rakip kabul etmedi.');
                        }

                        message.channel.send(`🎲 **Connect 4 Oyunu Başladı!**\n${oyuncu1} (🔴) vs ${oyuncu2} (🟡)\nSıra: <@${turn}>\n\n${oyunTahtası()}`)
                            .then(gameMsg => {
                                const filter2 = m => [message.author.id, target.id].includes(m.author.id) && ['1','2','3','4','5','6','7'].includes(m.content) && board[0][parseInt(m.content)-1] === '⚫';
                                const collector = message.channel.createMessageCollector({ filter: filter2, time: 120000 });

                                collector.on('collect', m => {
                                    const col = parseInt(m.content) - 1;
                                    for (let r = 5; r >= 0; r--) {
                                        if (board[r][col] === '⚫') {
                                            board[r][col] = m.author.id === oyuncu1.id ? emoji1 : emoji2;
                                            break;
                                        }
                                    }

                                    const sonuç = kontrol();
                                    if (sonuç) {
                                        collector.stop(sonuç);
                                        return;
                                    }

                                    turn = turn === oyuncu1.id ? oyuncu2.id : oyuncu1.id;
                                    gameMsg.edit(`🎲 **Connect 4**\nSıra: <@${turn}>\n\n${oyunTahtası()}`);
                                });

                                collector.on('end', (collected, reason) => {
                                    if (reason === emoji1) {
                                        gameMsg.reply(`🎉 **${oyuncu1} kazandı!** 🏆`);
                                    } else if (reason === emoji2) {
                                        gameMsg.reply(`🎉 **${oyuncu2} kazandı!** 🏆`);
                                    } else if (reason === 'berabere') {
                                        gameMsg.reply('🤝 **Berabere!** Tahta doldu.');
                                    } else {
                                        gameMsg.reply('⏰ Zaman doldu! Oyun iptal.');
                                    }
                                });
                            });
                    })
                    .catch(() => message.reply('⏰ Rakip cevap vermedi, oyun iptal.'));
            });
    }
};