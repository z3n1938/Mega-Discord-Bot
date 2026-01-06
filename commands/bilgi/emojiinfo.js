module.exports = {
    name: 'emojiinfo',
    aliases: ['emoji', 'emojibilgi', 'emojibilgi'],
    category: 'Bilgi',
    description: 'Belirtilen emoji hakkında bilgi gösterir',
    execute(message, args, client) {
        // Kullanıcı bir emoji yazmamışsa veya geçersizse hata ver
        if (args.length === 0) {
            return message.reply('Lütfen bir emoji belirtin. Örnek: !emojiinfo 😎');
        }

        // Mesajdaki tüm emojileri bul (özel ve standart)
        const emojiRegex = /<a?:.+?:\d+>|[\u{1F600}-\u{1F64F}\u{1F300}-\u{1F5FF}\u{1F680}-\u{1F6FF}\u{1F1E0}-\u{1F1FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}]/gu;
        const foundEmojis = message.content.match(emojiRegex);

        let targetEmoji;
        if (foundEmojis && foundEmojis.length > 0) {
            targetEmoji = foundEmojis[0];
        } else {
            return message.reply('Geçerli bir emoji bulamadım. Lütfen standart veya sunucuya özel bir emoji kullanın.');
        }

        let emojiInfo = '';

        // Özel emoji mi kontrol et
        if (targetEmoji.startsWith('<')) {
            const animated = targetEmoji.startsWith('<a:');
            const emojiName = targetEmoji.split(':')[1];
            const emojiId = targetEmoji.split(':')[2].slice(0, -1);
            const emojiUrl = `https://cdn.discordapp.com/emojis/${emojiId}.${animated ? 'gif' : 'png'}`;

            const fetchedEmoji = message.guild.emojis.cache.get(emojiId);

            const createdAt = fetchedEmoji ? fetchedEmoji.createdAt.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }) : 'Bilinmiyor';

            emojiInfo = `**Özel Emoji Bilgileri**\n` +
                `Adı: **:${emojiName}:**\n` +
                `ID: **${emojiId}**\n` +
                `Animasyonlu: **${animated ? 'Evet' : 'Hayır'}**\n` +
                `Oluşturulma Tarihi: **${createdAt}**\n` +
                `URL: ${emojiUrl}`;
        } else {
            // Standart (Unicode) emoji
            const emojiName = targetEmoji;
            const codePoint = [...targetEmoji].map(char => char.codePointAt(0).toString(16).toUpperCase()).join('-');
            const unicodeName = getUnicodeEmojiName(targetEmoji) || 'Bilinmiyor';

            emojiInfo = `**Standart Emoji Bilgileri**\n` +
                `Emoji: **${targetEmoji}**\n` +
                `Unicode Adı: **${unicodeName}**\n` +
                `Kod Noktası: **U+${codePoint}**\n` +
                `Kısa Kod: **:${getShortName(targetEmoji)}:**`;
        }

        message.reply(`🎨 ${emojiInfo}`);
    }
};

// Yaygın Unicode emojilerin kısa isimleri (Discord'da kullanılan)
function getShortName(emoji) {
    const shortNames = {
        '😀': 'grinning',
        '😃': 'smiley',
        '😄': 'smile',
        '😁': 'grin',
        '😆': 'laughing',
        '😅': 'sweat_smile',
        '😂': 'joy',
        '🤣': 'rofl',
        '😊': 'blush',
        '😇': 'innocent',
        '🙂': 'slightly_smiling_face',
        '🙃': 'upside_down_face',
        '😉': 'wink',
        '😌': 'relieved',
        '😍': 'heart_eyes',
        // İhtiyaca göre daha fazla eklenebilir
    };
    return shortNames[emoji] || 'unknown';
}

// Basit Unicode emoji isimleri (daha fazla eklenebilir)
function getUnicodeEmojiName(emoji) {
    const names = {
        '😀': 'Grinning Face',
        '😃': 'Grinning Face with Big Eyes',
        '😄': 'Grinning Face with Smiling Eyes',
        '😁': 'Beaming Face with Smiling Eyes',
        '😆': 'Grinning Squinting Face',
        '😅': 'Grinning Face with Sweat',
        '😂': 'Face with Tears of Joy',
        '🤣': 'Rolling on the Floor Laughing',
        '😊': 'Smiling Face with Smiling Eyes',
        '😇': 'Smiling Face with Halo',
        // Daha fazla eklenebilir
    };
    return names[emoji] || 'Bilinmiyor';
}