// password.js - Utility
module.exports = {
    name: 'password',
    aliases: ['şifre', 'passwordgen', 'şifreoluştur'],
    description: 'Güçlü ve rastgele bir şifre üretir',
    category: 'Utility',
    execute(message, args, client) {
        const length = parseInt(args[0]) || 16;
        if (length < 8 || length > 50) {
            return message.reply('❌ Şifre uzunluğu 8 ile 50 karakter arasında olmalı!');
        }

        const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
        let password = '';
        for (let i = 0; i < length; i++) {
            password += charset.charAt(Math.floor(Math.random() * charset.length));
        }

        message.author.send(`🔐 **Yeni Şifren Oluşturuldu!**\nUzunluk: **${length}** karakter\nŞifre: \`\`\`${password}\`\`\`\nGüvenlik için DM'den gönderdim!`)
            .then(() => {
                message.reply('✅ Şifren özel mesaj (DM) olarak gönderildi! 📩');
            })
            .catch(() => {
                message.reply('❌ DM kapalı olduğu için şifre gönderilemedi. Lütfen DM\'lerini aç!');
            });
    }
};