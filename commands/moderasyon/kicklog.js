// kicklog.js - Moderasyon
module.exports = {
    name: 'kicklog',
    aliases: ['kicklistesi', 'kicklog', 'atılanlar'],
    description: 'Sunucudan atılmış üyelerin loglarını gösterir (hafıza tabanlı)',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!client.kickLogs) client.kickLogs = [];

        if (client.kickLogs.length === 0) {
            return message.reply('✅ Sunucudan hiç kimse atılmamış (kayıtlı)!');
        }

        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;

        let logs = client.kickLogs;
        if (target) {
            logs = logs.filter(log => log.userId === target.id);
            if (logs.length === 0) {
                return message.reply(`❌ **${target.tag}** adlı üye hiç atılmamış!`);
            }
        }

        const liste = logs.slice(-15).map((log, i) => 
            `**${client.kickLogs.length - 14 + i}.** ${log.userTag} | Yetkili: ${log.moderator} | Sebep: ${log.reason} | ${log.date}`
        ).join('\n');

        message.reply(`👢 **Kick Logları** ${target ? `(${target.tag})` : ''} (Son 15)\n\n${liste}`);
    }
};