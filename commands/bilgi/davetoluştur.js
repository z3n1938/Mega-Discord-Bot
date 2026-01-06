// davetoluştur.js
module.exports = {
    name: 'davetoluştur',
    aliases: ['davet', 'invitecreate', 'linkoluştur'],
    category: 'Bilgi',
    description: 'Geçici veya kalıcı davet linki oluşturur',
    execute(message, args, client) {
        // Komutu kullanacak kişinin davet oluşturma izni olmalı
        if (!message.member.permissions.has('CreateInstantInvite')) {
            return message.reply('❌ Bu komutu kullanmak için **Davet Oluşturma** iznine sahip olmalısın!');
        }

        if (!message.guild.members.me.permissions.has('CreateInstantInvite')) {
            return message.reply('❌ Botun **Davet Oluşturma** izni yok, davet linki oluşturamıyorum.');
        }

        // Varsayılan ayarlar: 0 = sınırsız kullanım, 0 = hiç süresi yok (kalıcı)
        const maxUses = 0;
        const temporary = false; // false = kalıcı üyelik

        message.channel.createInvite({
            maxAge: 0,          // 0 = süresi yok
            maxUses: maxUses,   // 0 = sınırsız kullanım
            temporary: temporary,
            unique: true
        }).then(invite => {
            message.reply(`✅ **Davet Linki Oluşturuldu!**\n` +
                `🔗 **Link:** ${invite.url}\n` +
                `⏰ **Süre:** Sınırsız\n` +
                `📊 **Kullanım Limiti:** Sınırsız`);
        }).catch(err => {
            console.error(err);
            message.reply('❌ Davet linki oluşturulamadı. Kanal izinlerini kontrol et.');
        });
    }
};