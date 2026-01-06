// kanalliste.js
module.exports = {
    name: 'kanalliste',
    aliases: ['kanallar', 'channellist', 'kanallar'],
    category: 'Bilgi',
    description: 'Sunucudaki tüm kanalları listeler',
    execute(message, args, client) {
        const channels = message.guild.channels.cache.sort((a, b) => a.position - b.position);

        if (channels.size === 0) {
            return message.reply('Bu sunucuda hiç kanal bulunmuyor.');
        }

        let text = channels.filter(c => c.type === 'GUILD_TEXT' || c.type === 'GUILD_NEWS').map(c => `#${c.name} (ID: ${c.id})`).slice(0, 25);
        let voice = channels.filter(c => c.type === 'GUILD_VOICE' || c.type === 'GUILD_STAGE_VOICE').map(c => `🔊 ${c.name} (ID: ${c.id})`).slice(0, 25);
        let category = channels.filter(c => c.type === 'GUILD_CATEGORY').map(c => `📁 **${c.name}**`).slice(0, 15);

        let response = `📂 **Sunucudaki Kanallar** (Toplam: ${channels.size})\n\n`;

        if (category.size > 0) response += '**Kategoriler**\n' + category.join('\n') + '\n\n';
        if (text.size > 0) response += '**Metin Kanalları**\n' + text.join('\n') + (channels.filter(c => c.type === 'GUILD_TEXT' || c.type === 'GUILD_NEWS').size > 25 ? '\n...' : '') + '\n\n';
        if (voice.size > 0) response += '**Ses Kanalları**\n' + voice.join('\n') + (channels.filter(c => c.type === 'GUILD_VOICE' || c.type === 'GUILD_STAGE_VOICE').size > 25 ? '\n...' : '');

        message.reply(response);
    }
};