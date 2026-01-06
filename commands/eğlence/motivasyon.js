// motivasyon.js - Eğlence
module.exports = { // <-- DÜZELTME: module.module.exports → module.exports
    name: 'motivasyon',
    aliases: ['motivate', 'motivasyonel'],
    category: 'Eğlence',
    description: 'Motivasyonel bir söz gönderir',
    execute(message, args, client) {
        const quotes = [
            'Başarının anahtarı pes etmemektir!',
            'Bugün yapmazsan yarın pişman olursun.',
            'Sen buna layıksın, devam et!',
            'Küçük adımlar büyük zaferlere götürür.',
            'İmkansız diye bir şey yoktur!',
            'Her gün bir önceki günden daha iyi olabilir!',
            'Güç sende, kullan onu!',
            'Hedefine ulaşmak için bir adım daha at!'
        ];

        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        message.reply(`💪 **Motivasyon Zamanı!**\n"${randomQuote}"`);
    }
};