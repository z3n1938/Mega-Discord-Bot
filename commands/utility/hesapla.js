// hesapla.js - Utility
module.exports = {
    name: 'hesapla',
    aliases: ['calc', 'calculator', 'matematik'],
    description: 'Basit matematik işlemleri yapar',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Kullanım: `!hesapla <işlem>`\nÖrnek: `!hesapla 5 + 3 * 2`');
        }

        const query = args.join(' ');

        // Güvenlik: Sadece sayı ve temel operatörler
        const validPattern = /^[0-9+\-*/().\s]+$/;
        if (!validPattern.test(query)) {
            return message.reply('❌ Geçersiz karakter! Sadece sayı ve + - * / ( ) kullanabilirsin.');
        }

        try {
            // eval yerine güvenli hesaplama (Function ile)
            const result = Function('"use strict"; return (' + query + ')')();

            if (typeof result === 'number' && !isNaN(result)) {
                message.reply(`🧮 **Hesaplama Sonucu**\n${query} = **${result}**`);
            } else {
                message.reply('❌ Geçersiz matematik ifadesi!');
            }
        } catch (error) {
            message.reply('❌ Hesaplama sırasında hata oluştu. İfadeyi kontrol et.');
        }
    }
};