// karantina.js - Moderasyon (jail ile aynı işlevi görür, alias olarak)
module.exports = {
    name: 'karantina',
    aliases: ['karantinayaal', 'quarantine'],
    description: 'Belirtilen üyeyi karantinaya alır (jail rolü verir)',
    category: 'Moderasyon',
    execute(message, args, client) {
        // jail komutuyla aynı kodu çalıştır
        const jailCommand = client.commands.get('jail');
        if (jailCommand) {
            return jailCommand.execute(message, args, client);
        } else {
            return message.reply('❌ Jail sistemi aktif değil. Önce jail rolünü ayarla.');
        }
    }
};