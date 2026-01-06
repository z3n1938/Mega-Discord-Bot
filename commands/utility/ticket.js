// events/interactionCreate.js
module.exports = {
    name: 'interactionCreate',
    async execute(interaction, client) {
        if (!interaction.isButton()) return;

        // Ticket açma butonu
        if (interaction.customId === 'create_ticket') {
            const guild = interaction.guild;
            const member = interaction.member;

            // Kullanıcının zaten açık ticketı var mı kontrol et
            const existingChannel = guild.channels.cache.find(ch => 
                ch.name === `ticket-${member.user.username.toLowerCase().replace(/ /g, '-')}` ||
                ch.topic === member.user.id
            );

            if (existingChannel) {
                return interaction.reply({
                    content: `❌ Zaten açık bir ticketın var: ${existingChannel}`,
                    ephemeral: true
                });
            }

            // Yeni ticket kanalı oluştur
            const ticketChannel = await guild.channels.create({
                name: `ticket-${member.user.username.toLowerCase().replace(/ /g, '-')}`,
                type: 2, // GUILD_TEXT
                parent: 'TICKET_KATEGORI_ID_BURAYA', // ← Burayı değiştir! Ticket kategorisinin ID'sini yaz
                permissionOverwrites: [
                    {
                        id: guild.roles.everyone.id,
                        deny: ['ViewChannel'],
                    },
                    {
                        id: member.id,
                        allow: ['ViewChannel', 'SendMessages', 'AttachFiles', 'ReadMessageHistory'],
                    },
                    {
                        id: 'YETKILI_ROL_ID_BURAYA', // ← Destek ekibi rol ID'si (opsiyonel)
                        allow: ['ViewChannel', 'SendMessages', 'AttachFiles', 'ReadMessageHistory'],
                    }
                ],
                topic: member.user.id // Kanal konusuna kullanıcı ID'si yaz (sonra kapatırken kullanışlı)
            });

            // Ticket kanalına hoş geldin mesajı
            const welcomeEmbed = {
                color: 0x00ff00,
                title: '🎫 Ticket Açıldı!',
                description: `${member} hoş geldin!\nLütfen sorununuzu detaylı bir şekilde anlatın.\nYetkililer en kısa sürede size yardımcı olacak.`,
                footer: { text: 'Ticketı kapatmak için aşağıdaki butona basın.' }
            };

            const closeButton = {
                type: 2,
                style: 4, // Kırmızı buton
                label: 'Ticket Kapat',
                custom_id: 'close_ticket',
                emoji: '🔒'
            };

            await ticketChannel.send({
                content: `${member} | @here`, // Yetkilileri etiketle (isteğe bağlı)
                embeds: [welcomeEmbed],
                components: [{ type: 1, components: [closeButton] }]
            });

            // Kullanıcıya onay mesajı (sadece kendisi görür)
            await interaction.reply({
                content: `✅ Ticketın başarıyla açıldı: ${ticketChannel}`,
                ephemeral: true
            });
        }

        // Ticket kapatma butonu (isteğe bağlı ek özellik)
        if (interaction.customId === 'close_ticket') {
            const channel = interaction.channel;
            await interaction.reply('🔒 Ticket 5 saniye içinde kapatılacak...');
            setTimeout(() => {
                channel.delete().catch(() => {});
            }, 5000);
        }
    }
};