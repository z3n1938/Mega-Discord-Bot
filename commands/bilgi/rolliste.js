// rolliste.js
module.exports = {
    name: 'rolliste',
    aliases: ['roller', 'rollister', 'roll'],
    category: 'Bilgi',
    description: 'Sunucudaki tüm rolleri listeler',
    execute(message, args, client) {
        const roles = message.guild.roles.cache.sort((a, b) => b.position - a.position).map(role => 
            `${role} (ID: ${role.id}) - Üye: ${role.members.size}`
        );

        if (roles.length === 0) {
            return message.reply('Bu sunucuda hiç rol bulunmuyor.');
        }

        // 20 rol göster, fazla varsa özetle
        let roleList = roles.slice(0, 20);
        if (roles.length > 20) {
            roleList.push(`\n... ve ${roles.length - 20} rol daha.`);
        }

        message.reply(`🎭 **Sunucudaki Roller** (Toplam: ${roles.length})\n\n${roleList.join('\n')}`);
    }
};