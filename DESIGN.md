---
version: alpha
name: MTS Promosi — Islami Modern
description: Sistem desain website promosi Madrasah Tsanawiyah (MTS) untuk orang tua. Next.js, SEO-first, mobile-first. Referensi struktur utama MTs YPPMI, ritme warna Starbucks, kartu foto Airbnb, hero Apple. TANPA PPDB.
colors:
  primary: "#0B5B3E"
  primary-dark: "#1E3932"
  primary-soft: "#E7F0EB"
  accent: "#C9A227"
  accent-soft: "#CBA258"
  background: "#F7F3EA"
  surface: "#FFFFFF"
  surface-warm: "#F2F0EB"
  text-primary: "#1A2E28"
  text-secondary: "#5A6B64"
  text-on-dark: "#F7F3EA"
  border: "#DDE3DD"
typography:
  h1:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 2.75rem
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: -0.02em
  h2:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 2rem
    fontWeight: 700
    lineHeight: 1.25
    letterSpacing: -0.01em
  h3:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.4
  body-lg:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 1.125rem
    fontWeight: 400
    lineHeight: 1.7
  body-md:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 1rem
    fontWeight: 400
    lineHeight: 1.7
  body-sm:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 0.875rem
    fontWeight: 400
    lineHeight: 1.6
  label-caps:
    fontFamily: "Plus Jakarta Sans"
    fontSize: 0.75rem
    fontWeight: 700
    lineHeight: 1.4
    letterSpacing: 0.12em
  arabic-quote:
    fontFamily: "Amiri"
    fontSize: 1.5rem
    fontWeight: 400
    lineHeight: 2
rounded:
  sm: 8px
  md: 16px
  lg: 24px
  full: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  3xl: 64px
  section: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
  button-gold:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
  card-program:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-testimoni:
    backgroundColor: "{colors.surface-warm}"
    textColor: "{colors.text-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    height: 72px
  hero:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.text-on-dark}"
    padding: 96px 24px
  stats-band:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    padding: 48px 24px
  footer:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.text-on-dark}"
    padding: 64px 24px
  chip-eyebrow:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    padding: 6px 14px
  stats-number:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.h1}"
  button-gold-hover:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.primary-dark}"
    typography: "{typography.body-md}"
    rounded: "{rounded.full}"
    padding: 14px 28px
  card-description:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-md}"
---

## Overview

Website promosi Madrasah Tsanawiyah (MTS) — bukan website administrasi, bukan portal siswa, dan **bukan website PPDB**.

Satu kalimat penuntun untuk semua keputusan desain:

> Madrasah modern yang hangat dan terpercaya — hijau yang teduh, emas seperlunya, foto asli suasana belajar, dan informasi yang bisa ditemukan orang tua dalam hitungan detik.

Audiens utama adalah **orang tua usia kurang lebih 30–50 tahun** yang sedang membandingkan sekolah untuk anaknya yang lulus SD/MI. Mereka membuka website dari HP, sering lewat tautan yang dibagikan di WhatsApp, dan mereka memutuskan percaya atau tidak dari kesan pertama: apakah sekolah ini rapi, Islami, jelas programnya, dan mudah dihubungi.

Tujuan website hanya satu: **memperkenalkan dan mempromosikan sekolah** — profil, program unggulan, fasilitas, prestasi, galeri, berita, dan testimoni — sampai orang tua yakin untuk menghubungi atau mengunjungi sekolah.

Referensi yang mengikat:

- **Struktur: MTs YPPMI** — program unggulan dibuat kartu yang jelas, berita dan agenda teratur, informasi dipisah per kebutuhan pengunjung. Abaikan seluruh bagian SPMB/PPDB dari referensi ini.
- **Warna dan ritme halaman: Starbucks** — hijau tua, krem hangat, pita hijau tua di antara section krem dan putih, tombol berbentuk pill.
- **Kartu foto: Airbnb** — foto adalah bintang utama pada kartu fasilitas, galeri, dan testimoni. Warna asli Airbnb (pink/merah) tidak dipakai, diganti hijau MTS.
- **Hero: Apple** — satu foto full-width, satu headline besar, dua tombol. Tidak lebih.

Website ini dibangun dengan **Next.js (App Router)**. Konten homepage ada di `app/page.js`. Navbar dan Footer adalah komponen reusable yang dipasang satu kali di `app/layout.js` dan tampil di semua halaman.

File ini adalah aturan desain yang **wajib** diikuti setiap AI/agent yang mengerjakan website ini. Jika instruksi lain bertentangan dengan file ini dalam hal tampilan, file ini yang menang untuk tampilan. Jika ada hal yang tidak diatur di file ini, agent harus bertanya kepada pemilik project, bukan mengarang sendiri.

## Colors

Palet ini terkunci. Agent tidak boleh memperkenalkan warna baru.

- **Primary ({colors.primary}, #0B5B3E):** Hijau MTS. Warna utama merek — tombol utama, judul aksen, ikon, tautan, dan elemen interaktif utama.
- **Primary Dark ({colors.primary-dark}, #1E3932):** Hijau sangat tua. Untuk latar hero, pita statistik boleh memakai Primary, dan Footer selalu memakai warna ini.
- **Primary Soft ({colors.primary-soft}, #E7F0EB):** Hijau sangat muda. Untuk latar chip, badge, dan kartu yang dipilih/aktif. Bukan untuk latar section besar.
- **Accent ({colors.accent}, #C9A227):** Emas. Hanya untuk aksen kecil yang penting — garis pembatas pendek, ikon bintang/geometris, label-caps di atas judul, angka statistik, dan tombol emas khusus di atas latar hijau tua. Emas **tidak pernah** dipakai untuk teks isi, dan tidak pernah untuk teks kecil di atas latar putih/krem karena kontrasnya tidak cukup.
- **Accent Soft ({colors.accent-soft}, #CBA258):** Emas lembut untuk hover aksen dan detail pola geometris.
- **Background ({colors.background}, #F7F3EA):** Krem/gading hangat. Latar dasar halaman, bergantian dengan Surface.
- **Surface ({colors.surface}, #FFFFFF):** Putih bersih untuk kartu dan section selingan.
- **Surface Warm ({colors.surface-warm}, #F2F0EB):** Krem sedikit lebih gelap untuk kartu testimoni dan section yang ingin terasa hangat.
- **Text Primary ({colors.text-primary}, #1A2E28):** Hijau-hitam. Semua judul dan teks utama.
- **Text Secondary ({colors.text-secondary}, #5A6B64):** Abu kehijauan. Untuk deskripsi, caption, dan metadata. Tidak untuk teks penting yang harus dibaca cepat.
- **Text on Dark ({colors.text-on-dark}, #F7F3EA):** Krem terang untuk teks di atas Primary Dark.
- **Border ({colors.border}, #DDE3DD):** Garis tipis kartu dan pembatas section di latar terang.

Aturan pakai warna:

- Perbandingan latar dalam satu halaman kurang lebih: 60% krem/putih, 30% hijau, 10% emas sebagai aksen.
- Satu section = satu warna latar. Jangan mencampur dua warna latar dalam satu section.
- Gradasi (gradient) dilarang, kecuali overlay hitam/hijau tua transparan di atas foto hero agar teks terbaca. Gradasi ungu, biru, pink, atau pelangi dilarang total.
- Mode gelap (dark mode) tidak dibuat.

## Typography

Satu keluarga font Latin untuk semuanya: **Plus Jakarta Sans**. Font ini modern, ramah, dan terbaca jelas oleh orang tua di layar HP kecil.

- **H1 ({typography.h1}):** Hanya satu H1 per halaman, yaitu headline hero atau judul halaman. Di HP ukurannya turun menjadi 2rem. Tidak pernah memakai huruf kapital semua.
- **H2 ({typography.h2}):** Judul section. Selalu didahului label-caps emas/hijau kecil, contoh: `PROGRAM UNGGULAN`, lalu H2, lalu satu kalimat penjelasan di bawahnya.
- **H3 ({typography.h3}):** Judul kartu (nama program, nama fasilitas, judul berita).
- **Body ({typography.body-md} dan {typography.body-lg}):** Ukuran minimum teks isi adalah 16px dengan line-height 1.7. Orang tua tidak boleh perlu memperbesar layar untuk membaca. Paragraf maksimal sekitar 3 baris sebelum diberi jarak.
- **Label Caps ({typography.label-caps}):** Huruf kapital kecil berjarak untuk label section dan badge. Hanya untuk teks pendek, maksimal 3 kata.
- **Arabic Quote ({typography.arabic-quote}):** Font **Amiri** hanya untuk kutipan berbahasa Arab (ayat/hadits) dan artinya. Tidak pernah untuk judul, menu, atau teks Latin. Maksimal satu kutipan Arab per halaman.

Hierarki judul HTML wajib mengikuti hierarki visual: H1 → H2 → H3, tanpa melompat. Ini aturan desain sekaligus aturan SEO, tidak boleh ditukar demi tampilan.

## Layout

- **Mobile-first.** Rancang untuk lebar 360px dulu, baru tablet, baru desktop. Mayoritas pengunjung adalah orang tua di HP.
- Lebar konten maksimal **1200px**, dengan padding samping 20px di HP dan 24px di desktop. Konten tidak pernah menempel ke tepi layar.
- Grid desktop 12 kolom. Kartu program/fasilitas: **3 kolom di desktop, 2 kolom di tablet, 1 kolom di HP.** Tidak pernah 4 kolom untuk kartu berisi teks.
- Jarak antar-section adalah {spacing.section} (96px) di desktop dan 64px di HP. Ritme latar section homepage harus bergantian:

  `Hero (hijau tua + foto) → Krem → Putih → Pita Statistik (hijau) → Krem → Putih → Footer (hijau tua)`

- Urutan section homepage terkunci, tidak boleh ditambah, dikurangi, atau ditukar tanpa persetujuan pemilik project:

  1. Hero
  2. Statistik / keunggulan singkat
  3. Program Unggulan
  4. Kenapa Orang Tua Memilih Kami
  5. Fasilitas (galeri foto)
  6. Prestasi
  7. Berita & Agenda
  8. Testimoni Orang Tua
  9. CTA penutup: Hubungi Sekolah / Kunjungi Sekolah
  10. Footer

- Menu utama terkunci, hanya tujuh ini: **Beranda, Profil, Program, Fasilitas, Galeri, Berita, Kontak.** Tidak ada menu lain di navbar.
- Semua target sentuh (tombol, menu, tautan kartu) minimal setinggi **44px**.
- Foto memakai komponen `next/image`, rasio konsisten dalam satu baris kartu (4:3 untuk fasilitas/program, 16:9 untuk hero dan berita), dan selalu memiliki teks alt yang menjelaskan isi foto — bukan "gambar1" dan bukan teks yang sama dengan judul.

## Elevation & Depth

Desain ini datar dan tenang. Kedalaman hanya dari bayangan yang sangat lembut dan dari perbedaan warna latar section.

- Bayangan kartu standar: `0 4px 24px rgba(11, 91, 62, 0.08)`.
- Bayangan kartu saat hover (desktop saja): `0 8px 32px rgba(11, 91, 62, 0.14)`, dan kartu naik maksimal 4px. Tidak ada animasi memantul, berputar, atau membesar berlebihan.
- Tidak ada bayangan keras, tidak ada efek kaca (glassmorphism), tidak ada neumorphism.
- Pola geometris bintang segi delapan Islami boleh dipakai hanya sebagai tekstur sangat tipis (opacity 4–6%) di latar hero, pita statistik, dan footer. Pola tidak pernah diletakkan di belakang teks isi dan tidak pernah lebih mencolok daripada konten.

## Shapes

- **Tombol selalu berbentuk pill** ({rounded.full}), mengikuti ritme Starbucks.
- Kartu memakai sudut {rounded.lg} (24px). Kartu kecil dan chip memakai {rounded.md} (16px) atau pill.
- **Lengkung mihrab** adalah ciri khas bentuk di website ini: foto utama pada kartu program unggulan dan foto profil sekolah boleh memakai lengkung atas penuh — sudut atas dibuat setengah lingkaran (`border-radius: 999px 999px 24px 24px`). Dipakai hemat, maksimal untuk satu jenis kartu per halaman, bukan untuk semua elemen.
- Ikon memakai satu set ikon garis (line icon) yang konsisten, warna Primary atau Accent, ukuran 24px di dalam lingkaran Primary Soft. Tidak mencampur ikon garis, ikon penuh warna, emoji, dan ilustrasi dalam satu halaman. **Emoji tidak dipakai sebagai ikon.**
- Foto selalu asli: suasana belajar, guru, siswa, gedung, dan kegiatan sekolah. Foto stok orang asing, kartun, dan ilustrasi 3D dilarang.

## Components

### Navbar

Tinggi 72px, latar Surface, menempel di atas (sticky) dengan bayangan sangat tipis saat halaman digulir. Isi dari kiri ke kanan: logo + nama MTS, menu tujuh item, dan satu tombol pill Primary bertuliskan **Hubungi Kami** yang menuju halaman Kontak / WhatsApp. Di HP, menu menjadi hamburger. Tidak ada tombol lain di navbar.

### Hero

Foto full-width suasana sekolah dengan overlay Primary Dark transparan. Isi maksimal: satu label-caps, satu H1, satu paragraf maksimal dua baris, dan tepat dua tombol:

1. **Lihat Program Unggulan** — tombol emas ({components.button-gold}) di atas foto.
2. **Lihat Fasilitas** — tombol sekunder terang.

Tidak ada tombol ketiga, tidak ada slider/carousel hero, tidak ada video autoplay, dan tidak ada teks berjalan.

### Kartu Program Unggulan

Mengikuti pola MTs YPPMI: tepat **tiga kartu** di homepage — contoh pola isinya Tahfizh Al-Qur'an, Bilingual (Arab & Inggris), dan Sains & Digital. Nama program mengikuti data asli sekolah, agent tidak boleh mengarang program. Setiap kartu: foto atau ikon di atas, H3, deskripsi 2–3 baris, dan tautan teks `Pelajari lebih lanjut →`. Seluruh kartu bisa diklik.

### Pita Statistik

Latar Primary, empat angka maksimal, angka besar berwarna putih dan label kecil berwarna Accent Soft di bawahnya. **Agent tidak boleh mengarang angka.** Jika data asli (jumlah siswa, guru, prestasi, alumni) belum diberikan pemilik project, tulis placeholder yang jelas seperti `[Jumlah Siswa]` — jangan mengisi angka karangan.

### Kartu Fasilitas & Galeri

Foto sebagai elemen terbesar (pola Airbnb): foto 4:3 memenuhi bagian atas kartu, judul dan satu baris keterangan di bawahnya. Galeri memakai grid foto yang rapi dengan jarak {spacing.md}. Tidak ada teks panjang di dalam galeri.

### Kartu Berita

Foto 16:9, tanggal dalam format Indonesia (contoh: 12 Oktober 2026), H3 sebagai judul, dan satu baris ringkasan. Berita diurutkan dari yang terbaru.

### Testimoni

Kartu Surface Warm. Isi: kutipan orang tua maksimal tiga baris, nama, dan keterangan singkat (contoh: Wali murid kelas 8). Foto wajah hanya jika ada izin dan foto asli. Testimoni tidak boleh dikarang — jika belum ada testimoni asli, section ini dikosongkan dan diberi catatan placeholder untuk pemilik project, bukan diisi kutipan fiktif.

### CTA Penutup

Satu section Primary Dark sebelum footer: satu H2 ajakan yang bersifat informatif, contoh pola: "Ingin Mengenal Sekolah Kami Lebih Dekat?" dan dua tombol: **Hubungi via WhatsApp** dan **Lihat Lokasi di Google Maps**. Ini adalah ajakan untuk bertanya dan berkunjung, bukan ajakan mendaftar.

### Footer

Latar Primary Dark, teks Text on Dark. Empat kolom di desktop (bertumpuk di HP): identitas sekolah + alamat, menu, program unggulan, dan kontak (telepon, WhatsApp, email, jam layanan) + peta lokasi tertanam atau tautan Google Maps. Baris bawah: hak cipta dan nama sekolah.

## Do's and Don'ts

### Do

- Selalu baca file ini dari awal sampai akhir sebelum menulis atau mengubah UI apa pun.
- Pakai hanya warna, font, spacing, dan radius yang terdaftar di file ini. Jika butuh nilai yang belum ada, tanyakan pemilik project.
- Tulis semua teks dalam Bahasa Indonesia yang hangat, jelas, dan sopan untuk orang tua. Hindari istilah teknis dan bahasa Inggris yang tidak perlu.
- Jadikan setiap halaman punya satu H1, metadata judul dan deskripsi yang unik, dan teks yang benar-benar berupa teks (bukan teks di dalam gambar) agar terbaca Google.
- Uji tampilan di lebar HP 360px sebelum menyatakan selesai. Jika rusak di HP, berarti belum selesai.
- Gunakan placeholder yang terlihat jelas seperti `[Nama MTS]`, `[Alamat Sekolah]`, `[Nomor WhatsApp]` untuk data yang belum diberikan. Placeholder lebih baik daripada data karangan.

### Don't — Aturan Keras

- **JANGAN tambahkan PPDB dalam bentuk apa pun.** Dilarang: halaman PPDB, menu PPDB, section PPDB, banner/pengumuman penerimaan siswa baru, timeline pendaftaran, syarat pendaftaran, formulir pendaftaran, tombol "Daftar PPDB" / "Daftar Sekarang" / "Daftar Siswa Baru", FAQ pendaftaran, popup pendaftaran, dan hitung mundur pendaftaran. Jika referensi seperti MTs YPPMI memuat bagian PPDB/SPMB, bagian itu **wajib diabaikan**. Website ini promosi profil sekolah, bukan pendaftaran.
- **JANGAN memakai warna di luar palet.** Dilarang khususnya: pink/merah Airbnb (#FF385C), ungu Stripe, biru generik template, hijau WhatsApp terang sebagai warna merek, dan hitam murni (#000000) untuk teks atau latar.
- **JANGAN mengganti font**, menambah keluarga font Latin kedua, atau memakai font dekoratif untuk teks isi.
- **JANGAN menambah halaman, section, menu, atau komponen baru** yang tidak ada di file ini tanpa persetujuan pemilik project. Kreatif di dalam aturan, bukan menambah aturan sendiri.
- **JANGAN mengarang data sekolah:** nama sekolah, alamat, angka statistik, nama guru, prestasi, program, harga/biaya, dan testimoni harus berasal dari pemilik project. Jika belum ada datanya, pakai placeholder.
- **JANGAN memakai klaim superlatif tanpa data**, seperti "terbaik se-Indonesia", "nomor satu", atau "dijamin masuk". Promosi harus meyakinkan lewat fakta dan foto, bukan lewat klaim kosong.
- **JANGAN menyembunyikan informasi penting di dalam gambar, slider, atau tab** yang tidak terbaca mesin pencari dan sulit ditemukan orang tua.
- **JANGAN memakai animasi berlebihan:** tidak ada parallax berat, tidak ada animasi masuk dari segala arah, tidak ada elemen melayang selain tombol WhatsApp kontak (jika dipakai, satu tombol kecil di kanan bawah, warna Primary, ikon WhatsApp saja).
- **JANGAN membuat halaman terlihat seperti website SaaS/startup, fintech, atau toko online.** Tidak ada harga, keranjang, pricing table, dashboard, login siswa, atau fitur portal dalam website promosi ini.

## Agent Prompt Guide

Untuk agent/AI yang membaca file ini:

1. Baca seluruh file ini sebelum menghasilkan kode. Ringkas kembali dalam satu kalimat: palet apa, font apa, urutan section homepage apa, dan apa larangan kerasnya. Jika ringkasan itu salah, perbaiki pemahamanmu sebelum lanjut.
2. Saat membuat komponen, sebutkan token yang kamu pakai (contoh: latar `{colors.background}`, tombol `{components.button-primary}`) agar pemilik project bisa memeriksa kepatuhanmu.
3. Jika permintaan pengguna bertentangan dengan file ini — misalnya meminta halaman PPDB, warna baru, atau font baru — **jangan langsung menurut**. Tunjukkan pertentangannya, sebutkan aturan di file ini yang dilanggar, dan minta keputusan pemilik project. Keputusan pemilik project yang eksplisit selalu mengalahkan file ini, tetapi perubahan itu harus dicatat kembali ke file ini.
4. Selesaikan satu komponen dalam satu waktu, tampilkan hasilnya, dan periksa: apakah warnanya dari palet, apakah teksnya minimal 16px, apakah tampil rapi di 360px, dan apakah ada unsur PPDB yang tidak sengaja masuk. Jika ada satu saja yang gagal, perbaiki sebelum lanjut ke komponen berikutnya.
5. Jangan menambahkan komentar yang tidak perlu di dalam kode, kecuali pemilik project memintanya.

Contoh perintah yang benar dari pemilik project:

> Ikuti DESIGN.md di root project ini. Buatkan section Program Unggulan untuk homepage: tiga kartu sesuai komponen Kartu Program Unggulan, pakai token warna dan font dari file itu, tanpa unsur PPDB apa pun.
