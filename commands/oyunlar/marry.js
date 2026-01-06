// marry.js - oyunlar
module.exports = {
    name: 'marry',
    aliases: ['evlen', 'evlilikteklifi', 'marryme'],
    description: 'Bir üyeye evlenme teklifi eder',
    category: 'oyunlar',
    execute(message, args, client) {
        if (!client.marriages) client.marriages = new Map();

        const target = message.mentions.members.first();
        if (!target || target.user.bot) {
            return message.reply('❌ Kime evlenme teklifi edeceksin? Bir üye etiketle!');
        }
        if (target.id === message.author.id) {
            return message.reply('❌ Kendinle evlenemezsin! 😅');
        }

        if (client.marriages.get(message.author.id)) {
            return message.reply('❌ Zaten evlisin! Önce boşanmalısın (`!divorce`)');
        }
        if (client.marriages.get(target.id)) {
            return message.reply(`❌ ${target} zaten evli! 😢`);
        }

        message.reply(`${target} **${message.author} sana evlenme teklifi etti!** 💍\nKabul etmek için: \`evet\` | Reddetmek için: \`hayır\``)
            .then(() => {
                const filter = m => m.author.id === target.id && ['evet', 'hayır'].includes(m.content.toLowerCase());
                message.channel.awaitMessages({ filter, max: 1, time: 30000, errors: ['time'] })
                    .then(collected => {
                        const cevap = collected.first().content.toLowerCase();
                        if (cevap === 'evet') {
                            client.marriages.set(message.author.id, target.id);
                            client.marriages.set(target.id, message.author.id);
                            message.channel.send(`🎉 **TEBRİKLER!**\n${message.author} ve ${target} artık evli! 💒❤️\nUzun ve mutlu bir evlilik dileriz! 🥂`);
                        } else {
                            message.channel.send(`💔 ${target} teklifi reddetti...\n${message.author} kalbini topla, daha çok balık var denizde! 🐟`);
                        }
                    })
                    .catch(() => {
                        message.channel.send(`⏰ Zaman doldu! ${target} cevap vermedi...\n${message.author} belki bir dahaki sefere! 😅`);
                    });
            });
    }
};