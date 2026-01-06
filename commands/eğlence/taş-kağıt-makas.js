// taş-kağıt-makas.js
module.exports = {
    name: 'taş-kağıt-makas',
    aliases: ['tkm', 'taşkağıtmakas', 'rps'],
    category: 'Eğlence',
    description: 'Botla taş-kağıt-makas oynarsın (taş/kağıt/makas yaz)',
    execute(message, args, client) {
        const choices = ['taş', 'kağıt', 'makas'];
        const userChoice = args[0]?.toLowerCase();

        if (!userChoice || !choices.includes(userChoice)) {
            return message.reply('❌ Lütfen bir seçim yap: `taş`, `kağıt` veya `makas`\nÖrnek: `!tkm taş`');
        }

        const botChoice = choices[Math.floor(Math.random() * choices.length)];

        let result = '';
        if (userChoice === botChoice) {
            result = '🤝 **Berabere!**';
        } else if (
            (userChoice === 'taş' && botChoice === 'makas') ||
            (userChoice === 'kağıt' && botChoice === 'taş') ||
            (userChoice === 'makas' && botChoice === 'kağıt')
        ) {
            result = '🎉 **Kazandın!**';
        } else {
            result = '😢 **Kaybettin!**';
        }

        const emojis = { taş: '🪨', kağıt: '📄', makas: '✂️' };

        message.reply(`✂️ **Taş-Kağıt-Makas**\n` +
            `Sen: ${emojis[userChoice]} **${userChoice}**\n` +
            `Bot: ${emojis[botChoice]} **${botChoice}**\n\n` +
            `${result}`);
    }
};