// banliste.js
module.exports = {
    name: 'banliste',
    aliases: ['banlılar', 'banlist', 'yasaklılar'],
    category: 'Bilgi',
    description: 'Sunucudan yasaklanmış üyeleri listeler',
    execute(message, args, client) {
        if (!message.member.permissions.has('BanMembers')) {
            return message.reply('❌ Bu komutu kullanmak için **Üyeleri Yasakla** iznine sahip olmalısın!');
        }

        message.guild.bans.fetch()
            .then(bans => {
                if (bans.size === 0) {
                    return message.reply('Bu sunucuda yasaklanmış kimse yok.');
                }

                const banList = bans.map(ban => 
                    `• ${ban.user.tag} (ID: ${ban.user.id}) ${ban.reason ? `- Sebep: ${ban.reason}` : ''}`
                ).slice(0, 25);

                if (bans.size > 25) {
                    banList.push(`\n... ve ${bans.size - 25} yasaklanmış üye daha.`);
                }

                message.reply(`🔨 **Yasaklanmış Üyeler** (Toplam: ${bans.size})\n\n${banList.join('\n')}`);
            })
            .catch(err => {
                console.error(err);
                message.reply('❌ Ban listesi alınırken bir hata oluştu. Botun **Üyeleri Yasakla** izni olduğundan emin ol.');
            });
    }
};