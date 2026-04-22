# 📘 Booklet Portofolio Portal

Sebuah portal web mobile-first yang dirancang khusus untuk orang tua siswa agar dapat mengakses booklet portofolio dan laporan progres siswa dengan mudah. Data diambil secara dinamis dari Google Sheets tanpa memerlukan database eksternal.

## ✨ Fitur Utama
- **Mobile Optimized**: UX yang nyaman di smartphone untuk audiens orang tua.
- **Real-time Sync**: Data sinkron otomatis dengan Google Sheets.
- **Filter Pintar**: Filter berdasarkan Kelas dan Bulan Laporan.
- **Auto-Latest**: Secara otomatis menampilkan bulan laporan terbaru saat dibuka.
- **Zero Maintenance**: Pengelolaan data murni melalui konfigurasi Spreadsheet.

## 🛠️ Tech Stack
- **Framework**: Next.js 16 (App Router & Turbopack)
- **Styling**: Tailwind CSS 4
- **API**: Google Sheets API v4
- **Iconography**: Lucide React
- **Komponen UI**: Radix UI (Select)

## 🔑 Konfigurasi Environment (`.env`)
Aplikasi ini memerlukan kredensial Google Service Account untuk membaca data dari Spreadsheet. Simpan konfigurasi berikut di file `.env`:

```bash
# Spreadsheet Configuration
GOOGLE_SHEET_ID=id_spreadsheet_anda
GOOGLE_SHEET_NAME=Booklets

# Google Service Account Credentials
GOOGLE_PROJECT_ID=nama-project-google-cloud
GOOGLE_CLIENT_EMAIL=email-service-account@iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nIsi_Private_Key_Anda\n-----END PRIVATE KEY-----"
```

## 📋 Struktur Spreadsheet
Sheet harus memiliki struktur header berikut (dimulai dari Kolom A):
- **Kolom A**: No
- **Kolom B**: Nama
- **Kolom C**: Kelas (X, XI, XII)
- **Kolom D**: Link Canva (Opsional)
- **Kolom E dst**: Nama Bulan (Contoh: "Agustus 2025", "September 2025", dll)

*Pastikan Kolom E ke kanan berisi URL publik menuju booklet (PDF/Web).*

## 🚀 Cara Menjalankan
1. Clone repository.
2. Install dependensi: `npm install`
3. Salin `.env.example` ke `.env` dan isi kredensialnya.
4. Pastikan Email Service Account sudah diberi akses **Viewer** pada file Google Sheets terkait.
5. Jalankan mode development: `npm run dev`

## 🌐 Deployment
Saat melakukan deployment ke **Vercel**, pastikan variabel `GOOGLE_PRIVATE_KEY` diisi lengkap termasuk baris `BEGIN` dan `END`. Di sistem kami, karakter `\n` akan otomatis ditangani agar format PEM tetap valid.

---
Built with ❤️ for **KODEIN**.
