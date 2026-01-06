// weather.js - Utility (Gerçek API Entegrasyonu ile)
module.exports = {
    name: 'weather',
    aliases: ['hava', 'havadurumu', 'weatherinfo'],
    description: 'Belirtilen şehrin gerçek zamanlı hava durumunu gösterir',
    category: 'Utility',
    execute(message, args, client) {
        if (args.length === 0) {
            return message.reply('❌ Lütfen bir şehir adı gir! Örnek: `!weather İstanbul` veya `!weather London`');
        }

        const city = args.join(' ');

        // OpenWeatherMap API Key (ücretsiz kayıt olup alabilirsin: https://openweathermap.org/api)
        const API_KEY = 'OPENWEATHERMAP_API_KEY_BURAYA'; // Buraya kendi API key'ini yaz

        if (API_KEY === 'OPENWEATHERMAP_API_KEY_BURAYA') {
            return message.reply('❌ Hava durumu API anahtarı ayarlanmamış. Bot sahibine söyle!');
        }

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=tr`;

        fetch(url)
            .then(res => res.json())
            .then(data => {
                if (data.cod !== 200) {
                    return message.reply(`❌ **${city}** için hava durumu bilgisi bulunamadı. Şehir adını doğru yazdığından emin ol!`);
                }

                const temp = Math.round(data.main.temp);
                const feelsLike = Math.round(data.main.feels_like);
                const description = data.weather[0].description.charAt(0).toUpperCase() + data.weather[0].description.slice(1);
                const humidity = data.main.humidity;
                const windSpeed = data.wind.speed;
                const icon = data.weather[0].icon;

                const emojiMap = {
                    '01d': '☀️', '01n': '🌙',
                    '02d': '⛅', '02n': '⛅',
                    '03d': '☁️', '03n': '☁️',
                    '04d': '☁️', '04n': '☁️',
                    '09d': '🌧️', '09n': '🌧️',
                    '10d': '🌦️', '10n': '🌧️',
                    '11d': '⛈️', '11n': '⛈️',
                    '13d': '❄️', '13n': '❄️',
                    '50d': '🌫️', '50n': '🌫️'
                };

                const emoji = emojiMap[icon] || '🌡️';

                message.reply(
                    `${emoji} **Hava Durumu - ${data.name}, ${data.sys.country}**\n` +
                    `📍 **Durum:** ${description}\n` +
                    `🌡️ **Sıcaklık:** ${temp}°C (Hissedilen: ${feelsLike}°C)\n` +
                    `💧 **Nem:** %${humidity}\n` +
                    `💨 **Rüzgar:** ${windSpeed} m/s\n` +
                    `🕐 **Güncellenme:** ${new Date().toLocaleTimeString('tr-TR')}`
                );
            })
            .catch(err => {
                console.error(err);
                message.reply('❌ Hava durumu alınırken bir hata oluştu. Daha sonra tekrar dene.');
            });
    }
};