require('dotenv').config();
const { Client, Collection, GatewayIntentBits } = require('discord.js');
const fs = require('fs');
const path = require('path');

// Node.js v18+ için yerleşik fetch
global.fetch = global.fetch || (async (...args) => (await import('node-fetch')).default(...args));

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.GuildMessageReactions,
    ]
});

// Hafıza tabanlı sistemler
client.commands = new Collection();
client.afk = new Map();
client.cezalar = [];
client.kickLogs = [];
client.muteLogs = [];
client.warnLogs = [];
client.jailed = new Map();
client.antinuke = { enabled: false, limit: 5, time: 10000 };
client.antiraid = { enabled: false, limit: 10, time: 10000, action: 'kick' };
client.modlogChannel = null;
client.loggerChannel = null;
client.snipedMessages = new Map();
client.editedMessages = new Map();
client.giveaways = new Map();
client.reactionRoles = new Map(); // Tepki rol sistemi
client.welcomeChannel = null;
client.welcomeMessage = null;

const prefix = process.env.PREFIX;

// Zaman formatlama
function formatTime(ms) {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds} saniye`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)} dakika`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} saat`;
    return `${Math.floor(seconds / 86400)} gün`;
}

// Zaman dönüştürücü
function parseTime(time) {
    const regex = /^(\d+)(s|m|h)?$/;
    const match = time.match(regex);
    if (!match) return null;
    let value = parseInt(match[1]);
    const unit = match[2] || 's';
    if (unit === 's') return value * 1000;
    if (unit === 'm') return value * 60 * 1000;
    if (unit === 'h') return value * 60 * 60 * 1000;
    return null;
}

// Log gönderme
function sendLog(guild, embed) {
    if (!client.modlogChannel) return;
    const channel = guild.channels.cache.get(client.modlogChannel);
    if (channel) channel.send({ embeds: [embed] }).catch(() => {});
}

// KOMUT YÜKLEME
function loadCommands(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.lstatSync(filePath);
        if (stat.isDirectory()) {
            loadCommands(filePath);
        } else if (file.endsWith('.js')) {
            try {
                delete require.cache[require.resolve(filePath)];
                const command = require(filePath);
                if (command.name) {
                    client.commands.set(command.name, command);
                    console.log(`✅ ${command.name} komutu yüklendi`);
                }
            } catch (err) {
                console.log(`❌ ${file} yüklenemedi: ${err.message}`);
            }
        }
    }
}

loadCommands(path.join(__dirname, 'commands'));

client.once('ready', () => {
    console.log(`\n🚀 ${client.user.tag} aktif oldu!`);
    console.log(`📊 Toplam ${client.commands.size} komut yüklendi`);
    console.log(`🆔 Bot ID: ${client.user.id}\n`);

    client.user.setActivity(`${prefix}yardım | ${client.guilds.cache.size} sunucu`, { type: 'WATCHING' });

    setInterval(() => {
        client.user.setActivity(`${prefix}yardım | ${client.guilds.cache.size} sunucu`, { type: 'WATCHING' });
    }, 30000);
});

// TICKET BUTONU ETKİLEŞİMLERİ (DÜZELTİLDİ)
client.on('interactionCreate', async interaction => {
    if (!interaction.isButton()) return;

    // Ticket Açma
    if (interaction.customId === 'create_ticket') {
        await interaction.deferReply({ ephemeral: true });

        let category = interaction.guild.channels.cache.find(c => c.name.toLowerCase() === 'ticketler' && c.type === 'GUILD_CATEGORY');
        if (!category) {
            category = await interaction.guild.channels.create('Ticketler', {
                type: 'GUILD_CATEGORY',
                permissionOverwrites: [{ id: interaction.guild.id, deny: ['ViewChannel'] }]
            });
        }

        const ticketChannel = await interaction.guild.channels.create(`ticket-${interaction.user.username}`, {
            type: 'GUILD_TEXT',
            parent: category.id,
            permissionOverwrites: [
                { id: interaction.guild.id, deny: ['ViewChannel'] },
                { id: interaction.user.id, allow: ['ViewChannel', 'SendMessages', 'ReadMessageHistory', 'AttachFiles'] },
                { id: interaction.guild.roles.everyone, deny: ['ViewChannel'] }
            ]
        });

        const closeButton = {
            type: 2,
            style: 4,
            label: 'Kapat',
            custom_id: 'close_ticket',
            emoji: '🔒'
        };

        await ticketChannel.send({
            content: `${interaction.user} Hoş geldin!\nYetkililer en kısa sürede burada olacak.\nKapatmak için butona tıkla.`,
            components: [{ type: 1, components: [closeButton] }]
        });

        interaction.editReply({ content: `✅ Ticket kanalın oluşturuldu: ${ticketChannel}` });
    }

    // Ticket Kapatma
    if (interaction.customId === 'close_ticket') {
        if (!interaction.channel.name.startsWith('ticket-')) return;

        await interaction.reply('🔒 Ticket 5 saniye içinde kapanacak...');
        setTimeout(() => interaction.channel.delete().catch(() => {}), 5000);
    }
});

// SNIPE & EDITSNIPE
client.on('messageDelete', message => {
    if (message.author.bot || (!message.content && !message.attachments.size)) return;

    const image = message.attachments.first()?.url || null;

    client.snipedMessages.set(message.channel.id, {
        author: message.author,
        content: message.content,
        time: new Date().toLocaleString('tr-TR'),
        image: image
    });
});

client.on('messageUpdate', (oldMessage, newMessage) => {
    if (oldMessage.author.bot || oldMessage.content === newMessage.content) return;

    client.editedMessages.set(oldMessage.channel.id, {
        author: oldMessage.author,
        oldContent: oldMessage.content,
        newContent: newMessage.content,
        time: new Date().toLocaleString('tr-TR')
    });
});

// HOŞ GELDİN MESAJI
client.on('guildMemberAdd', member => {
    if (!client.welcomeChannel) return;

    const channel = member.guild.channels.cache.get(client.welcomeChannel);
    if (!channel) return;

    const msg = (client.welcomeMessage || '👋 Hoş geldin {üye}!')
        .replace(/{üye}/g, member)
        .replace(/{sunucu}/g, member.guild.name)
        .replace(/{üyesayı}/g, member.guild.memberCount);

    channel.send(msg).catch(() => {});
});

// TEPKİ ROL SİSTEMİ
client.on('messageReactionAdd', async (reaction, user) => {
    if (user.bot) return;
    if (!client.reactionRoles) return;

    const msgId = reaction.message.id;
    const roleMap = client.reactionRoles.get(msgId);
    if (!roleMap) return;

    const emoji = reaction.emoji.toString();
    const roleId = roleMap[emoji];
    if (!roleId) return;

    const member = reaction.message.guild.members.cache.get(user.id);
    if (!member) return;

    const role = reaction.message.guild.roles.cache.get(roleId);
    if (role) member.roles.add(role).catch(() => {});
});

client.on('messageReactionRemove', async (reaction, user) => {
    if (user.bot) return;
    if (!client.reactionRoles) return;

    const msgId = reaction.message.id;
    const roleMap = client.reactionRoles.get(msgId);
    if (!roleMap) return;

    const emoji = reaction.emoji.toString();
    const roleId = roleMap[emoji];
    if (!roleId) return;

    const member = reaction.message.guild.members.cache.get(user.id);
    if (!member) return;

    const role = reaction.message.guild.roles.cache.get(roleId);
    if (role) member.roles.remove(role).catch(() => {});
});

// AFK + KOMUT ÇALIŞTIRMA
client.on('messageCreate', async message => {
    if (message.author.bot) return;

    // AFK Kontrolü
    if (message.mentions.users.size > 0 && client.afk) {
        message.mentions.users.forEach(user => {
            if (client.afk.has(user.id)) {
                const afkData = client.afk.get(user.id);
                if (afkData.guild === message.guild.id) {
                    const timeAgo = formatTime(Date.now() - afkData.time);
                    message.reply(`${user.tag} şu anda AFK!\nSebep: \`${afkData.reason}\`\n${timeAgo} önce AFK oldu.`);
                }
            }
        });
    }

    // AFK'dan Çıkış
    if (client.afk && client.afk.has(message.author.id)) {
        const afkData = client.afk.get(message.author.id);
        client.afk.delete(message.author.id);
        message.reply(`✅ **AFK Modundan Çıkıldı!**\nHoş geldin! ${formatTime(Date.now() - afkData.time)} AFK'ydın.`);

        if (message.member.manageable && message.member.displayName.startsWith('[AFK]')) {
            const oldNick = message.member.displayName.replace(/^\[AFK\]\s*/i, '');
            message.member.setNickname(oldNick).catch(() => {});
        }
    }

    // KOMUT ÇALIŞTIRMA
    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = client.commands.get(commandName) ||
                    client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return;

    try {
        command.execute(message, args, client);
    } catch (error) {
        console.error(error);
        message.reply('❌ Komut çalışırken bir hata oluştu!');
    }
});

// GENEL LOGGER
client.on('messageDelete', async msg => {
    if (!client.loggerChannel || msg.author.bot) return;
    const channel = msg.guild.channels.cache.get(client.loggerChannel);
    if (channel) {
        channel.send(`🗑️ **Mesaj Silindi** | ${msg.channel}\n**Üye:** ${msg.author.tag}\n**İçerik:** ${msg.content || '[Medya/Dosya]'}`).catch(() => {});
    }
});

client.on('messageUpdate', async (oldMsg, newMsg) => {
    if (!client.loggerChannel || oldMsg.author.bot || oldMsg.content === newMsg.content) return;
    const channel = oldMsg.guild.channels.cache.get(client.loggerChannel);
    if (channel) {
        channel.send(`✏️ **Mesaj Düzenlendi** | ${oldMsg.channel}\n**Üye:** ${oldMsg.author.tag}\n**Eski:** ${oldMsg.content}\n**Yeni:** ${newMsg.content}`).catch(() => {});
    }
});

client.on('guildMemberUpdate', async (oldMember, newMember) => {
    if (!client.loggerChannel) return;
    const channel = oldMember.guild.channels.cache.get(client.loggerChannel);
    if (!channel) return;

    const oldRoles = oldMember.roles.cache.map(r => r.name);
    const newRoles = newMember.roles.cache.map(r => r.name);

    if (oldRoles.length !== newRoles.length) {
        const added = newRoles.filter(r => !oldRoles.includes(r));
        const removed = oldRoles.filter(r => !newRoles.includes(r));

        let log = `🔄 **Rol Değişikliği** | ${newMember.user.tag}\n`;
        if (added.length > 0) log += `✅ Eklendi: ${added.join(', ')}\n`;
        if (removed.length > 0) log += `❌ Kaldırıldı: ${removed.join(', ')}`;

        channel.send(log).catch(() => {});
    }
});

// ANTI-RAID
let joinBuffer = [];

client.on('guildMemberAdd', member => {
    if (!client.antiraid?.enabled || member.user.bot) return;

    const now = Date.now();
    joinBuffer = joinBuffer.filter(j => now - j < client.antiraid.time);
    joinBuffer.push(now);

    if (joinBuffer.length >= client.antiraid.limit) {
        const recentMembers = member.guild.members.cache.filter(m => 
            m.joinedTimestamp > now - client.antiraid.time && !m.user.bot
        );

        recentMembers.forEach(m => {
            if (client.antiraid.action === 'ban') {
                m.ban({ reason: 'Anti-Raid: Toplu katılım' }).catch(() => {});
            } else {
                m.kick('Anti-Raid: Toplu katılım').catch(() => {});
            }
        });

        if (client.modlogChannel) {
            const channel = member.guild.channels.cache.get(client.modlogChannel);
            if (channel) {
                channel.send(`🚨 **ANTI-RAID TETİKLENDİ!**\n${recentMembers.size} yeni üye ${client.antiraid.action === 'ban' ? 'banlandı' : 'kicklendi'}!`);
            }
        }

        joinBuffer = [];
    }
});

client.login(process.env.TOKEN);