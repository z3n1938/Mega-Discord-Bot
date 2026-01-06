// banlog.js - Moderasyon
module.exports = {
    name: 'banlog',
    aliases: ['banlistesi', 'bans', 'yasaklog'],
    description: 'Sunucudaki banlanmış üyeleri ve logları gösterir',
    category: 'Moderasyon',
    execute(message, args, client) {
        message.guild.bans.fetch()
            .then(bans => {
                if (bans.size === 0) {
                    return message.reply('✅ Sunucuda banlanmış üye yok!');
                }

                const banList = bans.map(ban => 
                    `• ${ban.user.tag} (${ban.user.id}) ${ban.reason ? `- Sebep: ${ban.reason}` : ''}`
                ).slice(0, 20).join('\n');

                message.reply(`🔨 **Banlanmış Üyeler** (Toplam: ${bans.size})\n\n${banList}${bans.size > 20 ? '\n... ve daha fazlası' : ''}`);
            })
            .catch(() => message.reply('❌ Ban listesi alınamadı. Botun **Üyeleri Yasakla** izni olduğundan emin ol.'));
    }
};