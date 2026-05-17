# Let's generate a highly detailed and complete README.md for the premium wedding invitation website project.
# We will use python to write this out cleanly into a file and then provide it to the user.

readme_content = # 💍 Premium Exclusive Wedding Invitation & Admin Panel

Sebuah aplikasi web undangan pernikahan digital eksklusif, premium, dan interaktif yang dibangun menggunakan teknologi modern berbasis **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS**, dan terintegrasi secara *real-time* dengan **Supabase** sebagai database backend untuk pengelolaan tamu, RSVP, ucapan do'a, serta pengaturan fitur undangan.

Aplikasi ini dilengkapi dengan **Admin Panel / Dashboard Admin** yang dilindungi oleh sistem keamanan berlapis enkripsi berbasis `<Gatekeeper>` untuk mengontrol seluruh data secara privat.

---

## 🌟 Fitur Utama

### 🌐 Halaman Undangan Depan (Client/Tamu)
* **Opening Screen / Gate Screen:** Menyapa tamu secara personal berdasarkan URL Parameter (contoh: `?to=Nama%20Tamu`).
* **Muted Autoplay Audio System:** Pemutar musik latar (`FloatingAudioPlayer`) otomatis aktif setelah pintu undangan diklik (menghindari kebijakan pemblokiran autoplay dari browser modern).
* **Premium Typography Layout:** Perpaduan harmonis antara Font Serif elegan (*Playfair Display*) untuk nuansa romantis klasik dan Font Sans-serif modern (*Plus Jakarta Sans*) untuk keterbacaan optimal.
* **Dynamic Countdown Section:** Penghitung waktu mundur hari H pernikahan yang responsif dan diperbarui setiap detik secara *real-time*.
* **Interactive Gallery Section:** Galeri dokumentasi foto *pre-wedding* premium yang disusun rapi dengan memanggil data visual lokal secara dinamis dari file JSON konfigurasi.
* **Live RSVP & Wish Form:** Form interaktif bagi tamu untuk mengonfirmasi kehadiran serta mengirimkan ucapan doa kebahagiaan yang langsung terkirim ke database Supabase.
* **Exclusive Digital Gift Box:** Informasi rekening bank dan e-waller yang didesain mewah untuk memudahkan tamu memberikan hadiah digital.

### 🛡️ Dashboard Admin / Panel Kendali (`/dashboard`)
* **Overview Analytics:** Ringkasan statistik jumlah tamu terundang, total konfirmasi kehadiran RSVP, dan total ucapan doa yang masuk.
* **Tamu & RSVP Management:** Tabel kelola tamu terintegrasi dengan fitur ekspor data langsung ke format spreadsheet (Excel) menggunakan ikon khusus `FileSpreadsheet`.
* **Ucapan Doa Stream:** Panel moderasi pesan ucapan dan doa dari para tamu undangan secara *live*.
* **Centralized Settings Panel:** Pengaturan preferensi undangan seperti menyalakan/mematikan musik latar secara global, serta mengubah status indeks Google (`public_invitation`).
* **SEO DOM Injector:** Sistem kendali robot penjelajah otomatis. Jika undangan disetel privat, sistem akan menyuntikkan tag `<meta name="robots" content="noindex, nofollow">` ke dalam DOM secara instan demi menjaga privasi kedua mempelai.

### 🔒 Lapisan Keamanan (Security)
* **Anti-Crash Gatekeeper System:** Autentikasi sisi klien yang ketat. Melindungi seluruh rute `/dashboard` dari akses ilegal dengan memvalidasi kunci rahasia (*Secret Code*) multi-karakter yang bersumber langsung dari Supabase.
* **Flicker-Free Passcode Input:** Form login admin yang telah dioptimasi dengan transisi warna `ease-in-out` 300ms untuk menghilangkan efek kedipan (*flicker*) visual saat validasi data berlangsung.
* **Next.js Architecture Compliant:** Struktur kode dipisah secara modular antara *Server Component* (untuk penanganan SEO Metadata dinamis dari data JSON tanpa menyebabkan *blank screen*) dan *Client Component* (`'use client'`) untuk interaksi UI yang responsif.

---

## 🛠️ Arsitektur Teknologi & Pustaka

* **Framework Utama:** [Next.js 14](https://nextjs.org/) (App Router Architecture)
* **Bahasa Pemrograman:** [TypeScript](https://www.typescriptlang.org/) (Strict Type-Safety)
* **Desain & Styling:** [Tailwind CSS](https://tailwindcss.com/)
* **Animasi Visual:** [Framer Motion](https://www.framer.com/motion/)
* **Database & Backend:** [Supabase](https://supabase.com/) (PostgreSQL dengan REST API bawaan)
* **Paket Ikon Grafis:** [Lucide React](https://lucide.dev/)

---

## Dependensi

Bash

npm install
# atau
yarn install

## Development

Bash

npm run dev
# atau
yarn dev

## 📁 Struktur Folder Proyek

src/
├── app/
│   ├── layout.tsx                 # Layout global, inisialisasi Font, dan SEO Utama Halaman Depan
│   ├── page.tsx                   # Halaman Utama Undangan Pernikahan Client ('use client')
│   ├── globals.css                # Konfigurasi utility Tailwind CSS & custom scrollbar
│   └── dashboard/
│       ├── layout.tsx             # Server Component khusus penanganan SEO Metadata Dashboard Admin
│       ├── dashboard-client.tsx   # Client Layout: Pembungkus UI Navigasi Sidebar & Bottom Bar Mobile
│       ├── page.tsx               # Sub-halaman: Overview Panel Utama
│       ├── guests/                # Sub-halaman: Manajemen Data Tamu & RSVP
│       ├── messages/              # Sub-halaman: Moderasi Ucapan Doa Tamu
│       └── settings/              # Sub-halaman: Panel Konfigurasi Fitur Global Undangan
├── components/
│   ├── admin/
│   │   └── Gatekeeper.tsx         # Sistem validasi passcode login admin (Protected Route System)
│   ├── audio/
│   │   └── FloatingAudioPlayer.tsx# Pemutar musik latar premium antimacet
│   ├── layout/
│   │   └── Navbar.tsx             # Bar navigasi mengambang halaman depan
│   ├── sections/
│   │   ├── OpeningScreen.tsx      # Layar pembuka / Amplop undangan personalisasi
│   │   ├── HeroSection.tsx        # Banner selamat datang visual utama
│   │   ├── BrideGroomSection.tsx  # Profil singkat kedua mempelai
│   │   ├── CountdownSection.tsx   # Komponen hitung mundur waktu acara
│   │   ├── EventSection.tsx       # Informasi detail acara
│   │   ├── GallerySection.tsx     # Komponen penampil album foto pre-wedding
│   │   ├── RSVPSection.tsx        # Form konfirmasi kehadiran tamu
│   │   ├── GiftSection.tsx        # Rekening box dan hadiah digital
│   │   └── Footer.tsx             # Informasi penutup halaman depan
│   └── ui/
│       ├── Button.tsx             # Komponen button
│       ├── CountdownTimer.tsx     # Komponen UI countdown
│       ├── Pagination.tsx         # Komponen UI halaman
│       ├── SuccessModal.tsx       # Modal sukses universal
│       ├── SuccessToast.tsx       # Notifikasi Sukses universal
│       └── ConfirmationModal.tsx  # Modal konfirmasi universal
├── data/
│   └── wedding-data.json          # File konfigurasi data teks statis terpusat (Mempelai, SEO, Teks UI)
├── lib/
│   └── supabase.ts                # Inisialisasi koneksi SDK Supabase Client
├── schemas/
│   └── supabase.ts                # Pesan error form kehadiran
├── store/
│   └── supabase.ts                # Setting audio background
└── utils/
    ├── cn.ts                      # Memanggil excel dan tailwindcss
    └── supabaseClient.ts          # Expor library dari database 'Supabase'

## 📝 Lisensi

Proyek ini dibuat untuk keperluan komersial undangan pernikahan digital eksklusif. Hak cipta dilindungi undang-undang. Pengembangan lebih lanjut wajib mematuhi standar keamanan data pribadi pengantin.