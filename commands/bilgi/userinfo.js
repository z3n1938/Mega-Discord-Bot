module.exports = {
    name: 'userinfo',
    aliases: ['kullanicibilgi', 'user'],
    category: 'Bilgi',
    description: 'Kullanıcının bilgilerini gösterir',
    execute(message, args, client) {
        const member = message.mentions.members.first() || message.member;
        const user = member.user;
        const createdAt = user.createdAt.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
        const joinedAt = member.joinedAt.toLocaleDateString('tr-TR', { year: 'numeric', month: 'long', day: 'numeric' });
        const roles = member.roles.cache.size > 1 ? member.roles.cache.filter(role => role.name !== '@everyone').map(role => role.name).join(', ') : 'Yok';

        message.reply(`👤 **Kullanıcı Bilgileri**\nKullanıcı Adı: ${user.tag}\nID: ${user.id}\nHesap Oluşturma Tarihi: ${createdAt}\nSunucuya Katılma Tarihi: ${joinedAt}\nRoller: ${roles}`);
    }
};