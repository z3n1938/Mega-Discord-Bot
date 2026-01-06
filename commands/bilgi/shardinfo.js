// shardinfo.js
module.exports = {
    name: 'shardinfo',
    aliases: ['shard', 'shardbilgi', 'shards'],
    category: 'Bilgi',
    description: 'Botun shard (parça) bilgilerini gösterir',
    execute(message, args, client) {
        // Eğer bot shard edilmediyse (tek shard)
        if (!client.shard) {
            return message.reply(`🔹 **Shard Bilgisi**\n` +
                `Bu bot shard edilmedi (tek parça olarak çalışıyor).\n` +
                `Shard ID: **0**\n` +
                `Toplam Shard: **1**`);
        }

        client.shard.fetchClientValues('guilds.cache.size').then(guilds => {
            client.shard.broadcastEval(c => c.guilds.cache.size).then(results => {
                const totalGuilds = results.reduce((acc, count) => acc + count, 0);
                const currentShard = client.shard.ids[0];
                const totalShards = client.shard.count;

                message.reply(`🔹 **Shard Bilgileri**\n` +
                    `Mevcut Shard ID: **${currentShard}**\n` +
                    `Toplam Shard Sayısı: **${totalShards}**\n` +
                    `Bu Shard'daki Sunucu Sayısı: **${guilds[currentShard]}**\n` +
                    `Toplam Sunucu (Tüm Shard'lar): **${totalGuilds}**`);
            });
        }).catch(() => {
            message.reply('Shard bilgileri alınırken bir hata oluştu.');
        });
    }
};