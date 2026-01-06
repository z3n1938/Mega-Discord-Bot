// fakt.js
module.exports = {
    name: 'fakt',
    aliases: ['bilgi', 'faktver'],
    category: 'Eğlence',
    description: 'Rastgele ilginç bir bilgi verir',
    execute(message, args, client) {
        const facts = [
            'Bir ahtapot 3 kalbi vardır.',
            'Bal arıları dans ederek iletişim kurar.',
            'Dünyanın en uzun kelimesi 189.819 harf!',
            'Pizza Hawaii aslında Kanada\'dan çıktı.',
            'Bir gün Mars\'ta 40 dakika daha uzun sürer.'
        ];
        message.reply(`🧠 **İlginç Bilgi**\n${facts[Math.floor(Math.random() * facts.length)]}`);
    }
};