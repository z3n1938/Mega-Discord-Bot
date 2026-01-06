// roast.js
module.exports = {
    name: 'roast',
    aliases: ['roastla', 'dalga', 'diss'],
    category: 'Eğlence',
    description: 'Belirtilen üyeye komik bir roast atar',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;

        const roasts = [
            `${member}, aynaya baktığında "Kim bu yakışıklı?" diyorsun ama ayna kırılıyor.`,
            `${member}, o kadar yavaşsın ki kaplumbağa seni solluyor.`,
            `${member}, IQ'n o kadar düşük ki termometre bile ölçemiyor.`,
            `${member}, seninle konuşmak Wi-Fi aramak gibi... bağlantı hiç gelmiyor.`,
            `${member}, o kadar tembelsin ki uzaktan kumanda senin en iyi arkadaşın.`,
            `${member}, senin yüzünden "güzel değil ama karakteri iyi" lafı icat edilmiş.`,
            `${member}, seninle yarışsak sen ikinci olursun... çünkü ben katılmam.`,
            `${member}, o kadar unutkansın ki kendi adını Discord'a yazıyorsun.`,
            `${member}, senin gibi biriyle konuşmak hava durumu konuşmak gibi... boş ve sıkıcı.`,
            `${member}, senin profil fotoğrafın bile senden kaçmış!`
        ];

        const randomRoast = roasts[Math.floor(Math.random() * roasts.length)];

        message.reply(`🔥 **Roast Zamanı!**\n${randomRoast}`);
    }
};