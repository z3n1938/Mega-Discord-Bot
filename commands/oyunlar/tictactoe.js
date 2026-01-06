// tictactoe.js - oyunlar
module.exports = {
    name: 'tictactoe',
    aliases: ['xox', 'xo', 'tictac'],
    description: 'XOX (Tic Tac Toe) oynar',
    category: 'oyunlar',
    execute(message, args, client) {
        const target = message.mentions.members.first();
        if (!target || target.user.bot) {
            return message.reply('❌ Bir rakip etiketle! (`!tictactoe @üye`)');
        }
        if (target.id === message.author.id) {
            return message.reply('❌ Kendinle oynayamazsın! 😅');
        }

        const board = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
        let turn = message.author.id;
        const oyuncu1 = message.author;
        const oyuncu2 = target.user;

        const oyunMesajı = () => {
            return `🎮 **XOX Oyunu**\n${oyuncu1} (X) vs ${oyuncu2} (O)\n\n` +
                   `${board[0]} | ${board[1]} | ${board[2]}\n` +
                   `${board[3]} | ${board[4]} | ${board[5]}\n` +
                   `${board[6]} | ${board[7]} | ${board[8]}\n\n` +
                   `Sıra: <@${turn}>`;
        };

        message.reply(`${target} **${message.author} sana XOX meydan okudu!**\nBaşlamak için onay ver! (evet/hayır)`)
            .then(() => {
                const filter = m => m.author.id === target.id && ['evet', 'hayır'].includes(m.content.toLowerCase());
                message.channel.awaitMessages({ filter, max: 1, time: 30000 })
                    .then(collected => {
                        if (collected.first().content.toLowerCase() !== 'evet') {
                            return message.reply('❌ Rakip kabul etmedi, oyun iptal edildi.');
                        }

                        message.channel.send(oyunMesajı()).then(gameMsg => {
                            const filter2 = m => [message.author.id, target.id].includes(m.author.id) && ['1','2','3','4','5','6','7','8','9'].includes(m.content) && board[parseInt(m.content) - 1] === m.content;
                            const collector = message.channel.createMessageCollector({ filter: filter2, time: 60000 });

                            const kontrol = () => {
                                const kazananKombinasyonlar = [
                                    [0,1,2], [3,4,5], [6,7,8],
                                    [0,3,6], [1,4,7], [2,5,8],
                                    [0,4,8], [2,4,6]
                                ];

                                for (const komb of kazananKombinasyonlar) {
                                    if (board[komb[0]] === board[komb[1]] && board[komb[1]] === board[komb[2]] && board[komb[0]] !== komb[0] + 1 + '') {
                                        return board[komb[0]];
                                    }
                                }
                                if (!board.some(cell => !isNaN(cell))) return 'berabere';
                                return null;
                            };

                            collector.on('collect', m => {
                                const pozisyon = parseInt(m.content) - 1;
                                board[pozisyon] = m.author.id === oyuncu1.id ? 'X' : 'O';
                                turn = turn === oyuncu1.id ? oyuncu2.id : oyuncu1.id;

                                const sonuç = kontrol();
                                if (sonuç) {
                                    collector.stop(sonuç);
                                    return;
                                }

                                gameMsg.edit(oyunMesajı());
                            });

                            collector.on('end', (collected, reason) => {
                                if (reason === 'X') {
                                    gameMsg.reply(`🎉 **${oyuncu1} kazandı!** Tebrikler! 🏆`);
                                } else if (reason === 'O') {
                                    gameMsg.reply(`🎉 **${oyuncu2} kazandı!** Tebrikler! 🏆`);
                                } else if (reason === 'berabere') {
                                    gameMsg.reply(`🤝 **Berabere!** Kimse kazanamadı.`);
                                } else {
                                    gameMsg.reply(`⏰ Zaman doldu! Oyun iptal edildi.`);
                                }
                            });
                        });
                    })
                    .catch(() => message.reply('⏰ Zaman doldu, rakip cevap vermedi.'));
            });
    }
};