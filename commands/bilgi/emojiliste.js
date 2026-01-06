// emojiliste.js
module.exports = {
    name: 'emojiliste',
    aliases: ['emojiler', 'emojilist', 'emoji'],
    category: 'Bilgi',
    description: 'Sunucudaki tüm emojileri listeler',
    execute(message, args, client) {
        const emojis = message.guild.emojis.cache;

        if (emojis.size === 0) {
            return message.reply('Bu sunucuda hiç özel emoji yok.');
        }

        const animated = emojis.filter(e => e.animated).map(e => `<a:${e.name}:${e.id}> \`:${e.name}:\``);
        const normal = emojis.filter(e => !e.animated).map(e => `<:${e.name}:${e.id}> \`:${e.name}:\``);

        let emojiText = '';
        if (normal.size > 0) emojiText += '**Normal Emojiler** (' + normal.size + ')\n' + normal.slice(0, 30).join(' ') + (normal.length > 30 ? '\n...' : '') + '\n\n';
        if (animated.size > 0) emojiText += '**Animasyonlu Emojiler** (' + animated.size + ')\n' + animated.slice(0, 30).join(' ') + (animated.length > 30 ? '\n...' : '');

        message.reply(`😀 **Sunucudaki Emojiler** (Toplam: ${emojis.size})\n\n${emojiText}`);
    }
};