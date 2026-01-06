// reactionrole.js - Moderasyon
module.exports = {
    name: 'reactionrole',
    aliases: ['tepkirol', 'rr', 'reactionroleset'],
    description: 'Tepki rol paneli oluşturur',
    category: 'Moderasyon',
    execute(message, args, client) { // <-- client parametresi eklendi
        if (!message.member.permissions.has('ManageRoles')) {
            return message.reply('❌ **Rolleri Yönet** iznin yok!');
        }
        if (!message.guild.members.me.permissions.has('ManageRoles')) {
            return message.reply('❌ Botun **Rolleri Yönet** izni yok!');
        }

        // Kullanım: !reactionrole <başlık> | @rol1 emoji1 | @rol2 emoji2
        // Örnek: !reactionrole Rollerini Seç! | @VIP 🎉 | @Üye ⭐

        if (args.length < 2 || !message.content.includes('|')) {
            return message.reply('❌ Kullanım: `!reactionrole <başlık> | @rol emoji | @rol2 emoji2`\nÖrnek: `!reactionrole Rollerini Seç! | @VIP 🎉 | @Üye ⭐`');
        }

        const parts = message.content.slice(prefix.length).trim().split('|');
        const title = parts[0].replace('reactionrole', '').trim() || 'Tepki Rol Paneli';

        const embed = {
            color: 0x00FF00,
            title: '🎭 TEPKİ ROL PANELİ',
            description: title,
            footer: { text: 'Rol almak/kaldırmak için tepki ver!' }
        };

        const roleMap = {};

        message.channel.send({ embeds: [embed] })
            .then(async msg => {
                for (let part of parts.slice(1)) {
                    part = part.trim();
                    if (!part) continue;

                    const words = part.split(' ');
                    const emoji = words.pop(); // son kelime emoji
                    const roleMention = words.join(' ').trim(); // kalan rol mention

                    let role = message.mentions.roles.first();
                    if (!role) {
                        role = message.guild.roles.cache.find(r => r.name.toLowerCase() === roleMention.toLowerCase().replace('@', ''));
                    }

                    if (role && emoji) {
                        try {
                            await msg.react(emoji);
                            roleMap[emoji] = role.id;
                        } catch (err) {
                            console.log(`Emoji eklenemedi: ${emoji}`);
                        }
                    }
                }

                // Hafızada sakla
                if (!client.reactionRoles) client.reactionRoles = new Map();
                client.reactionRoles.set(msg.id, roleMap);

                message.reply(`✅ Tepki rol paneli oluşturuldu! Mesaj ID: ${msg.id}`);
            })
            .catch(() => {
                message.reply('❌ Panel gönderilemedi. Botun embed ve tepki izni var mı?');
            });
    }
};