// translate.js - Utility
module.exports = {
    name: 'çevir',
    aliases: ['translate', 'çevri', 'ceviri'],
    description: 'Metni istediğin dile çevirir (Google Translate tarzı)',
    category: 'Utility',
    execute(message, args, client) {
        // Kullanım: !çevir en:tr Merhaba dünya
        // veya !çevir tr:en Hello world
        // veya !çevir Merhaba (otomatik İngilizce'ye çevirir)

        if (args.length === 0) {
            return message.reply('❌ Lütfen çevirilecek metni yaz!\nÖrnek: `!çevir en:tr Merhaba`\nveya sadece `!çevir Merhaba` (otomatik İngilizce\'ye çevirir)');
        }

        let targetLang = 'en'; // Varsayılan hedef dil: İngilizce
        let text = args.join(' ');

        // Dil kodu kontrolü (örnek: en:tr)
        const langMatch = text.match(/^([a-z]{2}):([a-z]{2})\s+(.+)/i);
        if (langMatch) {
            targetLang = langMatch[2].toLowerCase();
            text = langMatch[3];
        } else {
            // Sadece metin varsa, otomatik olarak İngilizce'ye çevir
            // Eğer metin Türkçe gibi görünüyorsa İngilizce'ye, değilse Türkçe'ye çevirebiliriz (basit kontrol)
            if (/[çğıöşü]/i.test(text)) {
                targetLang = 'en';
            } else {
                targetLang = 'tr';
            }
        }

        // Basit çeviri sözlüğü (gerçek API yerine örnek çeviriler)
        // İstersen Google Translate API veya ücretsiz bir alternatif ekleyebiliriz
        const translations = {
            // Türkçe → İngilizce
            'merhaba': 'hello',
            'nasılsın': 'how are you',
            'teşekkürler': 'thank you',
            'evet': 'yes',
            'hayır': 'no',
            'iyi': 'good',
            'kötü': 'bad',
            'lütfen': 'please',
            'afedersin': 'excuse me',
            'görüşürüz': 'see you',
            'hoşça kal': 'goodbye',
            'selam': 'hi',
            'naber': 'what\'s up',
            'tamam': 'okay',
            'harika': 'great',

            // İngilizce → Türkçe
            'hello': 'merhaba',
            'how are you': 'nasılsın',
            'thank you': 'teşekkürler',
            'yes': 'evet',
            'no': 'hayır',
            'good': 'iyi',
            'bad': 'kötü',
            'please': 'lütfen',
            'excuse me': 'afedersin',
            'see you': 'görüşürüz',
            'goodbye': 'hoşça kal',
            'hi': 'selam',
            'what\'s up': 'naber',
            'okay': 'tamam',
            'great': 'harika'
        };

        const lowerText = text.toLowerCase().trim();
        const translated = translations[lowerText] || 
                          (targetLang === 'en' ? '[Çeviri bulunamadı]' : '[Translation not found]');

        const langNames = {
            'tr': 'Türkçe',
            'en': 'English',
            'de': 'Deutsch',
            'fr': 'Français',
            'es': 'Español',
            'ru': 'Русский'
        };

        const sourceLangName = langNames[targetLang === 'en' ? 'tr' : 'en'] || 'Bilinmiyor';
        const targetLangName = langNames[targetLang] || targetLang.toUpperCase();

        message.reply(`🌐 **Çeviri**\n` +
            `📝 **Orijinal (${sourceLangName}):** ${text}\n` +
            `➡️ **Çevrilen (${targetLangName}):** ${translated.charAt(0).toUpperCase() + translated.slice(1)}`);
    }
};