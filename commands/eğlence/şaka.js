// şaka.js
module.exports = {
    name: 'şaka',
    aliases: ['joke', 'fıkra', 'espri'],
    category: 'Eğlence',
    description: 'Rastgele bir şaka anlatır',
    execute(message, args, client) {
        const jokes = [
            "Adamın biri doktora gitmiş: 'Doktor bey, ben görünmezim.' Doktor: 'Sıradaki!'",
            "Adamın biri yere düşmüş, yerden kalkmış.",
            "Adamın biri 'Yavaş git' demiş, öteki yavaşlamış.",
            "Neden programcılar Halloween ve Noel'i karıştırır? Çünkü Oct 31 == Dec 25",
            "Adamın biri 'Google'a babamın adını yazdım, karşına çıktım' demiş.",
            "İki arkadaş karşılaşmış: 'Nasılsın?' 'İyiyim, sen?' 'Ben de iyiyim.' (Türk usulü derin sohbet)",
            "Adamın biri 'Bugün hava çok güzel' demiş, hava bozulmuş.",
            "Neden tavuk yolun karşısına geçti? Karşı tarafa geçmek için!",
            "Adamın biri 'Benim hafızam çok iyi' demiş, unutmuş.",
            "Bir adam markete gitmiş: 'Bir ekmek alabilir miyim?' 'Tabii.' 'Bir de yarın için alabilir miyim?' 'Olmaz, ekmek yarın taze olur.' 'O zaman yarın gelirim.'"
        ];

        const randomJoke = jokes[Math.floor(Math.random() * jokes.length)];

        message.reply(`😂 **Şaka Zamanı!**\n${randomJoke}`);
    }
};