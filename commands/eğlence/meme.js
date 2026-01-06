// meme.js
module.exports = {
    name: 'meme',
    aliases: ['mem', 'komikmeme'],
    category: 'Eğlence',
    description: 'Rastgele komik bir meme resmi gönderir',
    execute(message, args, client) {
        // Popüler meme şablonları veya genel komik resimler (direkt linkler, kalıcı olanlar)
        const memes = [
            'https://i.imgflip.com/1g8my4.jpg', // Classic Drake
            'https://i.imgflip.com/28j0te.jpg', // Distracted Boyfriend
            'https://i.imgflip.com/1ur9b0.jpg', // SpongeBob Mocking
            'https://i.imgflip.com/1bij.jpg', // One Does Not Simply
            'https://i.imgflip.com/9ehk.jpg', // Change My Mind
            'https://i.imgflip.com/26jwoj.jpg', // Expanding Brain
            'https://i.imgflip.com/3lmzyx.jpg', // This Is Fine
            'https://i.imgflip.com/1otk96.jpg', // Woman Yelling at Cat
            'https://i.imgflip.com/2/2fm6x.jpg', // Success Kid
            'https://i.imgflip.com/1bhk.jpg'  // Ancient Aliens
        ];

        const randomMeme = memes[Math.floor(Math.random() * memes.length)];

        message.reply({
            content: `😂 **Rastgele Meme**\nİşte sana komik bir tane!`,
            files: [randomMeme]
        });
    }
};