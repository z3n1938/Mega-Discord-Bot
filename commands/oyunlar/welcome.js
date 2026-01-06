// welcome.js - Moderasyon (veya oyunlar)
module.exports = {
    name: 'welcome',
    aliases: ['hoşgeldin', 'welcomemsg', 'welcomeset'],
    description: 'Hoş geldin mesajı kanalını ve mesajını ayarlar',
    category: 'Moderasyon',
    execute(message, args, client) { // client parametresi eklendi
        if (!message.member.permissions.has('Administrator')) {
            return message.reply('❌ Bu komutu sadece **Yönetici** kullanabilir!');
        }

        const channel = message.mentions.channels.first();
        if (!channel) {
            const current = client.welcomeChannel ? `<#${client.welcomeChannel}>` : 'Ayarlanmamış';
            return message.reply(`👋 **Hoş Geldin Kanalı:** ${current}\nAyarlamak için: \`!welcome #kanal Merhaba {üye}!\``);
        }

        const welcomeMsg = args.slice(1).join(' ') || `👋 Hoş geldin {üye}! Sunucumuza katılmana çok sevindik!`;

        // client üzerinden kaydet
        client.welcomeChannel = channel.id;
        client.welcomeMessage = welcomeMsg;

        message.reply(`✅ Hoş geldin mesajı ayarlandı!\nKanal: ${channel}\nMesaj: \`${welcomeMsg.replace(/{üye}/g, '@üye')}\``);
    }
};