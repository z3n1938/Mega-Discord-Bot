// dog.js
module.exports = {
    name: 'dog',
    aliases: ['köpek', 'dogpic', 'köpekresmi'],
    category: 'Eğlence',
    description: 'Rastgele sevimli bir köpek resmi gönderir',
    execute(message, args, client) {
        // Dog CEO API - Rastgele köpek
        // Direkt JSON döner ama resim linki alırız (basit tutmak için sabit breed'lerden rastgele)
        const breeds = ['beagle', 'boxer', 'bulldog', 'chihuahua', 'corgi', 'dachshund', 'golden', 'husky', 'labrador', 'pomeranian', 'poodle', 'pug', 'shiba', 'retriever'];
        const randomBreed = breeds[Math.floor(Math.random() * breeds.length)];
        const dogUrl = `https://dog.ceo/api/breed/${randomBreed}/images/random`;

        // Not: Bu API JSON döner, resim için fetch gerekmez, ama basitlik için sabit linkler de kullanılabilir.
        // Alternatif: shibe.online API
        const dogSimpleUrl = 'https://shibe.online/api/dogs?count=1&urls=true&httpsUrls=true';

        // Basit tutmak için rastgele köpek linkleri (kalıcı)
        const dogs = [
            'https://images.dog.ceo/breeds/beagle/n02088364_14920.jpg',
            'https://images.dog.ceo/breeds/corgi-cardigan/n02113186_10625.jpg',
            'https://images.dog.ceo/breeds/husky/n02091467_3159.jpg',
            'https://images.dog.ceo/breeds/labrador/n02099712_7715.jpg',
            'https://images.dog.ceo/breeds/pug/n02110958_14371.jpg',
            'https://images.dog.ceo/breeds/shiba/shiba-14.jpg',
            'https://images.dog.ceo/breeds/pomeranian/n02112018_3945.jpg'
        ];

        const randomDog = dogs[Math.floor(Math.random() * dogs.length)];

        message.reply({
            content: `🐶 **Sevimli Köpek**\nİşte sana tatlı bir köpek!`,
            files: [randomDog]
        });
    }
};