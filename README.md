# 🚀 Mega Discord Bot

**Modern, güçlü ve tamamen özelleştirilebilir Discord botu altyapısı**  
Discord.js v14 ile geliştirilmiştir. 200+ komut, modüler handler sistemi ve gelişmiş özelliklerle büyük sunucular için uygundur.

![Discord.js](https://img.shields.io/badge/Discord.js-v14-blue.svg?logo=discord&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2018-green.svg)
![License](https://img.shields.io/github/license/z3n1938/Mega-Discord-Bot)
![Stars](https://img.shields.io/github/stars/z3n1938/Mega-Discord-Bot?style=social)

---

## ✨ Genel Özellikler

- ⚙️ **200+ Komut**
- 📁 **Modüler Handler Sistemi**
- 🎫 **Gelişmiş Ticket Sistemi**
- 😴 **AFK Sistemi**
- 🛡 **Moderasyon Komutları**
- 🎮 **Eğlence Komutları**
- 📊 **Seviye / XP Sistemi**
- 🔔 **Log & Koruma Sistemleri**
- ⚡ **Yüksek Performans**
- 🧩 **Kolay Özelleştirilebilir Yapı**

---

## 🎫 Ticket Sistemi

- Butonlu ticket açma
- Otomatik kanal oluşturma
- Yetkili & kullanıcıya özel erişim
- Ticket kapatma / silme
- Kategori destekli sistem

---

## 😴 AFK Sistemi

- `!afk [sebep]`
- Otomatik `[AFK]` etiketleme
- Etiketlenince sebep gösterme
- Mesaj atınca otomatik çıkış
- Süre hesaplama

---

## 🛠 Komut Sistemi

- Prefix & Slash destekli
- Kategori bazlı yükleme
- Hızlı ve stabil handler
- Kolay yeni komut ekleme

Örnek:
```js
module.exports = {
  name: "komut",
  execute(client, message, args) {
    // kod
  }
};

## 📦 Kurulum

### 1️⃣ Repo’yu klonla
```bash
git clone https://github.com/z3n1938/Mega-Discord-Bot.git
cd Mega-Discord-Bot

```

### 2️⃣ Gerekli paketleri yükle
```bash
npm install
```

### 3️⃣ .env dosyasını oluştur
```bash
TOKEN=bot_tokenin_buraya
PREFIX=!
TICKET_CATEGORY_ID=ticket_kanallarının_olacağı_kategori_id
SUPPORT_ROLE_ID=destek_ekibi_rol_id
```
### Botu başlat
```bash
node index.js
```
### 🎫 Ticket Sistemi Kullanımı

Yönetici olarak:
```
!ticket
```

Oluşan panelde Ticket Aç butonuna basıldığında:

ticket-kullanıcıadı adlı kanal açılır

Sadece kullanıcı ve destek ekibi erişebilir

Kanal içinde Ticket Kapat butonu bulunur

### 😴 AFK Sistemi Kullanımı
```bash
!afk Yemek yiyorum
```
AFK olursunuz

Etiketlenince bot otomatik cevap verir

Tekrar mesaj yazınca AFK kalkar ve süre gösterilir

### 📄 Lisans
```bash
Bu proje MIT License ile lisanslanmıştır.
Özgürce kullanabilir, değiştirebilir ve paylaşabilirsin.
```
Made with ❤️ by [z3n1938]
