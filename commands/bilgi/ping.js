module.exports = {
    name: 'ping',
    aliases: ['gecikme'],
    category: 'Bilgi',
    description: 'Botun pingini gösterir',
    execute(message, args, client) {  // client parametresi eklendi
        const latency = Date.now() - message.createdTimestamp;
        message.reply(`🏓 **Pong!**\nGecikme: ${latency}ms | API: ${Math.round(client.ws.ping)}ms`);
    }
};