// mutelog.js - Moderasyon
module.exports = {
    name: 'mutelog',
    aliases: ['mutelistesi', 'susturulog', 'timeoutlog'],
    description: 'Susturulan (timeout) üyelerin loglarını gösterir',
    category: 'Moderasyon',
    execute(message, args, client) {
        if (!client.muteLogs) client.muteLogs = [];

        if (client.muteLogs.length === 0) {
            return message.reply('✅ Henüz kimse susturulmamış (kayıtlı)!');
        }

        const target = message.mentions.users.first() || message.guild.members.cache.get(args[0])?.user;

        let logs = client.muteLogs;
        if (target) {
            logs = logs.filter(log => log.userId === target.id);
            if (logs.length === 0) {
                return message.reply(`❌ **${target.tag}** adlı üye hiç susturulmamış!`);
            }
        }

        const liste = logs.slice(-15).map((log, i) => 
            `**${client.muteLogs.length - 14 + i}.** ${log.userTag} | Süre: ${log.duration} dk | Yetkili: ${log.moderator} | Sebep: ${log.reason} | ${log.date}`
        ).join('\n');

        message.reply(`🔇 **Mute Logları** ${target ? `(${target.tag})` : ''} (Son 15)\n\n${liste}`);
    }
};