// compliment.js
module.exports = {
    name: 'compliment',
    aliases: ['iltifat', 'övgü', 'beğen'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye güzel bir iltifat eder',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;

        const compliments = [
            `${member}, seninle konuşmak güneşi görmek gibi! ☀️`,
            `${member}, gülüşün dünyayı aydınlatıyor. 😊`,
            `${member}, senin zekan beni her zaman etkiliyor! 🧠`,
            `${member}, kişiliğin o kadar güzel ki dış görünüş ikinci planda kalıyor.`,
            `${member}, senin gibi biriyle tanışmak büyük şans! 🍀`,
            `${member}, enerjin herkesi olumlu etkiliyor. ⚡`,
            `${member}, senin kalbin altın gibi, çok değerlisin! ❤️`,
            `${member}, varlığın bile ortamı güzelleştiriyor.`,
            `${member}, senin gibi arkadaş herkesin isteyeceği türden!`,
            `${member}, sen gerçekten harika bir insansın! ✨`
        ];

        const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

        message.reply(`🌸 **İltifat Zamanı!**\n${randomCompliment}`);
    }
};