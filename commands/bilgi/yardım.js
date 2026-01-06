const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'yardım',
    aliases: ['help', 'komutlar'],
    category: 'Bilgi',
    description: 'Tüm komutları chate gösterir',
    execute(message, args, client) {
        const embed = new EmbedBuilder()
            .setTitle('📋 Komut Listesi')
            .setDescription('`!` prefix ile kullanılır')
            .setColor('#00ff99')
            .setTimestamp()
            .setFooter({ text: `Toplam ${client.commands.size} komut aktif! 🔥` });

        const kategoriler = {};
        client.commands.forEach(cmd => {
            const kat = cmd.category || 'Diğer';
            if (!kategoriler[kat]) kategoriler[kat] = [];
            kategoriler[kat].push(`!${cmd.name}`);
        });

        for (const [kat, cmds] of Object.entries(kategoriler)) {
            embed.addFields({ name: kat, value: cmds.join(', ') || 'Boş', inline: false });
        }

        message.channel.send({ embeds: [embed] })
            .catch(() => message.reply('❌ Embed gönderilemedi ama yardım chate atıldı!'));
    }
};