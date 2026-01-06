// warnlog.js - Moderasyon
module.exports = {
    name: 'warnlog',
    aliases: ['warnlistesi', 'uyarılog', 'warnslog'],
    description: 'Uyarı verilen üyelerin loglarını gösterir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!client.warnLogs) client.warnLogs = [];

        if (client.warnLogs.length === 0) {
            return message.reply('✅ Henüz kimse uyarılmamış (kayıtlı)!');
        }

        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;

        let logs = client.warnLogs;
        if (target) {
            logs = logs.filter(log => log.userId === target.id);
            if (logs.length === 0) {
                return message.reply(`❌ **${target.tag}** adlı üye hiç uyarılmamış!`);
            }
        }

        const liste = logs.slice(-15).map((log, i) => 
            `**${client.warnLogs.length - 14 + i}.** ${log.userTag} | Yetkili: ${log.moderator} | Sebep: ${log.reason} | ${log.date}`
        ).join('\n');

        message.reply(`⚠️ **Uyarı Logları** ${target ? `(${target.tag})` : ''} (Son 15)\n\n${liste}`);
    }
};