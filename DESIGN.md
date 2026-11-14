---
version: alpha
name: MTS Promosi — Hijau Emas Orisinal
description: Sistem desain website promosi MTs Nurul Falah Gunungsindur untuk orang tua. Next.js, SEO-first, mobile-first. Gaya orisinal: hijau tua + emas (terinspirasi sekolah internasional, BUKAN tiruan satu website — warna, judul, hero, dan CTA dibuat berbeda), judul serif tebal satu baris + garis emas, sudut tajam, CTA tombol isi. TANPA PPDB.
colors:
  primary: "#0b4f3a"
  primary-dark: "#07382a"
  primary-soft: "#e4efe8"
  accent: "#c19a3d"
  accent-soft: "#8a6d25"
  background: "#F2F2F2"
  surface: "#FFFFFF"
  surface-warm: "#EDEDED"
  text-primary: "#0b4f3a"
  text-secondary: "#5A6B64"
  text-on-dark: "#FFFFFF"
  border: "#E5E5E5"
typography:
  h1:
    fontFamily: "Lora"
    fontSize: 3.75rem
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.02em
  h2:
    fontFamily: "Lora"
    fontSize: 3rem
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: -0.01em
  h3:
    fontFamily: "Lora"
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
  sm: 0px
  md: 0px
  lg: 0px
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
    rounded: 0px
    padding: 14px 28px
  button-primary-hover:
    backgroundColor: "{colors.primary-dark}"
    textColor: "{colors.surface}"
    typography: "{typography.body-md}"
    rounded: 0px
    padding: 14px 28px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.body-md}"
    rounded: 0px
    padding: 14px 28px
  button-gold:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.primary-dark}"
    typography: "{typography.body-md}"
    rounded: 0px
    padding: 14px 28px
  card-program:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    rounded: 0px
    padding: 24px
  card-testimoni:
    backgroundColor: "{colors.surface-warm}"
    textColor: "{colors.text-primary}"
    rounded: 0px
    padding: 24px
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    height: 72px
  hero:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-primary}"
    padding: 96px 24px
  stats-band:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    padding: 48px 24px
  footer:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-dark}"
    padding: 64px 24px
  chip-eyebrow:
    backgroundColor: "{colors.primary-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.label-caps}"
    rounded: 0px
    padding: 6px 14px
  stats-number:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.h1}"
  button-gold-hover:
    backgroundColor: "{colors.accent-soft}"
    textColor: "{colors.primary-dark}"
    typography: "{typography.body-md}"
    rounded: 0px
    padding: 14px 28px
  card-description:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
    typography: "{typography.body-md}"
---

## Overview

Website promosi **MTs Nurul Falah Gunungsindur** (Jl. Pahlawan No. 06, Kp. Bulaksaga RT 03/06, Desa Cibadung, Kec. Gunungsindur, Kabupaten Bogor, Jawa Barat 16340; NPSN 20277531; NSM 121232010082; Yayasan Pendidikan Islam Nurul Fadhilah (YADINA); akreditasi A) — bukan website administrasi, bukan portal siswa, dan **bukan website PPDB**.

Satu kalimat penuntun untuk semua keputusan desain:

> Madrasah modern yang teduh dan berwibawa — hijau tua dan emas, judul serif tebal dengan garis emas, foto asli suasana belajar, dan informasi yang bisa ditemukan orang tua dalam hitungan detik.

Audiens utama adalah **orang tua usia kurang lebih 30–50 tahun** yang sedang membandingkan sekolah untuk anaknya yang lulus SD/MI. Mereka membuka website dari HP, sering lewat tautan yang dibagikan di WhatsApp, dan mereka memutuskan percaya atau tidak dari kesan pertama: apakah sekolah ini rapi, Islami, jelas programnya, dan mudah dihubungi.

Tujuan website hanya satu: **memperkenalkan dan mempromosikan sekolah** — profil, program unggulan, fasilitas, prestasi, galeri, berita, dan testimoni — sampai orang tua yakin untuk menghubungi atau mengunjungi sekolah.

Referensi yang mengikat (2026-11-08, branch `newest`):

- **Gaya orisinal (terinspirasi sekolah internasional, BUKAN tiruan):** Haidar awalnya meminta mengikuti gaya American School of Bombay, lalu menegaskan **hindari plagiat** — jadi desain ini mengambil arah umumnya saja (hijau tua + emas, serif elegan, layout rapi) dan dibuat berbeda: nilai warna digeser dari ASB (`#0b4f3a` / `#c19a3d`, bukan `#0b4f3a` / `#c19a3d`), judul satu baris tebal + garis emas pendek (bukan dua baris tipis/tebal khas ASB), hero foto full-bleed tanpa bingkai hijau tebal, CTA berupa tombol isi bersudut tajam (bukan tautan bergaris bawah). Jangan meniru satu website mana pun secara harfiah.
- **Struktur: MTs YPPMI** — program unggulan dibuat kartu yang jelas, berita dan agenda teratur, informasi dipisah per kebutuhan pengunjung. Abaikan seluruh bagian SPMB/PPDB dari referensi ini.
- **Halaman: SMAN 7 Jakarta** — anatomi halaman profil, footer, dan detail berita.

Website ini dibangun dengan **Next.js (App Router)**. Konten homepage ada di `app/page.js`. Navbar dan Footer adalah komponen reusable yang dipasang satu kali di `app/layout.js` dan tampil di semua halaman.

File ini adalah aturan desain yang **wajib** diikuti setiap AI/agent yang mengerjakan website ini. Jika instruksi lain bertentangan dengan file ini dalam hal tampilan, file ini yang menang untuk tampilan. Jika ada hal yang tidak diatur di file ini, agent harus bertanya kepada pemilik project, bukan mengarang sendiri.

## Colors

Palet ini terkunci. Agent tidak boleh memperkenalkan warna baru.

- **Primary ({colors.primary}, #0b4f3a):** Hijau tua. Warna utama merek — pita statistik, footer, judul, ikon, tautan, dan elemen interaktif utama.
- **Primary Dark ({colors.primary-dark}, #07382a):** Hijau paling tua. Untuk hover tombol utama dan gradasi bawah foto hero. Footer memakai Primary (bukan Primary Dark).
- **Primary Soft ({colors.primary-soft}, #e4efe8):** Hijau sangat muda. Untuk latar chip, badge, dan kartu yang dipilih/aktif. Bukan untuk latar section besar.
- **Accent ({colors.accent}, #c19a3d):** Emas. Untuk tombol CTA emas, garis emas di bawah judul section, label angka statistik, badge Unggulan, dan aksen di atas latar hijau tua. Emas **tidak pernah** dipakai untuk teks isi panjang.
- **Accent Soft ({colors.accent-soft}, #8a6d25):** Emas gelap. Untuk pita ProfilTeaser (latar emas + teks putih) dan kartu CTA di halaman detail program. Juga warna hover tombol emas.
- **Background ({colors.background}, #F2F2F2):** Abu sangat muda. Latar dasar halaman, bergantian dengan Surface (putih).
- **Surface ({colors.surface}, #FFFFFF):** Putih bersih untuk kartu dan section selingan.
- **Surface Warm ({colors.surface-warm}, #EDEDED):** Abu sedikit lebih gelap untuk kartu dan avatar placeholder.
- **Text Primary ({colors.text-primary}, #0b4f3a):** Hijau utama. Semua judul dan teks utama. (Riwayat: diubah 2026-11-08 dari #2E4A3F ke #0B5B3E atas permintaan Haidar "ganti semua yang memakai warna font tersebut"; 2026-11-08 malam digeser ke #0b4f3a sebagai bagian dari desain orisinal anti-plagiat. Catatan: `text-ink` dan `text-primary` kini bernilai sama.)
- **Text Secondary ({colors.text-secondary}, #5A6B64):** Abu kehijauan. Untuk deskripsi, caption, dan metadata. Tidak untuk teks penting yang harus dibaca cepat.
- **Text on Dark ({colors.text-on-dark}, #FFFFFF):** Putih untuk teks di atas Primary.
- **Border ({colors.border}, #E5E5E5):** Garis tipis kartu dan pembatas section di latar terang.

Aturan pakai warna:

- Perbandingan latar dalam satu halaman kurang lebih: 60% abu muda/putih, 30% hijau, 10% emas sebagai aksen.
- Satu section = satu warna latar. Jangan mencampur dua warna latar dalam satu section.
- Gradasi (gradient) dilarang, kecuali overlay hitam/hijau tua transparan di atas foto hero agar teks terbaca. Gradasi ungu, biru, pink, atau pelangi dilarang total.
- Mode gelap (dark mode) tidak dibuat.

## Typography

Pasangan font "Modern Islamic School" (2026-11-07): **Lora** (serif) untuk semua judul (H1–H6, via aturan global di `globals.css`) dan kutipan elegan (kelas `font-serif`, mis. kutipan visi di footer) — modern, elegan, dan profesional; **Plus Jakarta Sans** untuk isi, menu, tombol, dan seluruh UI — modern, ramah, dan terbaca jelas oleh orang tua di layar HP kecil.

- **H1 ({typography.h1}):** Hanya satu H1 per halaman, yaitu headline hero atau judul halaman. Judul **satu baris tebal** (`font-black`) dengan garis emas pendek di bawahnya. Di HP ukurannya turun. Tidak pernah memakai huruf kapital semua.
- **H2 ({typography.h2}):** Judul section. **Satu baris tebal** (`font-black`) + garis emas pendek di bawahnya, lalu satu kalimat penjelasan. **Tidak ada label-caps kecil di atas judul** (judulnya sendiri adalah pernyataan section). `components/home/JudulBagian.tsx` merender pola ini.
- **H3 ({typography.h3}):** Judul kartu (nama program, nama fasilitas, judul berita).
- **Body ({typography.body-md} dan {typography.body-lg}):** Ukuran minimum teks isi adalah 16px dengan line-height 1.7. Orang tua tidak boleh perlu memperbesar layar untuk membaca. Paragraf maksimal sekitar 3 baris sebelum diberi jarak.
- **Label Caps ({typography.label-caps}):** Huruf kapital kecil berjarak untuk label section dan badge. Hanya untuk teks pendek, maksimal 3 kata.
- **Arabic Quote ({typography.arabic-quote}):** Font **Amiri** hanya untuk kutipan berbahasa Arab (ayat/hadits) dan artinya. Tidak pernah untuk judul, menu, atau teks Latin. Maksimal satu kutipan Arab per halaman.

Hierarki judul HTML wajib mengikuti hierarki visual: H1 → H2 → H3, tanpa melompat. Ini aturan desain sekaligus aturan SEO, tidak boleh ditukar demi tampilan.

## Layout

- **Mobile-first.** Rancang untuk lebar 360px dulu, baru tablet, baru desktop. Mayoritas pengunjung adalah orang tua di HP.
- Lebar konten maksimal **1200px**, dengan padding samping 20px di HP dan 24px di desktop. Konten tidak pernah menempel ke tepi layar.
- Grid desktop 12 kolom. Kartu program/fasilitas: **3 kolom di desktop, 2 kolom di tablet, 1 kolom di HP.** Tidak pernah 4 kolom untuk kartu berisi teks.
- Jarak antar-section adalah {spacing.section} (96px) di desktop dan 64px di HP. Ritme latar section homepage harus bergantian (hijau/emas/abu/putih):

  `Hero (putih, foto full-bleed) → Pita Statistik (hijau) → Kenapa Memilih Kami (abu muda) → ProfilTeaser (pita emas) → Berita (putih) → Fasilitas (abu muda) → Galeri (putih) → Prestasi (abu muda) → CTA Penutup (hijau) → Footer (hijau)`

- Urutan section homepage (diperbarui 2026-11-05 atas perintah Haidar, mengikuti pola SMAN 19 & SMAN 7 Jakarta; setiap section teaser mengarah ke halaman lengkapnya. Testimoni dihapus 2026-11-05; Program Akademik diganti Berita di posisi yang sama):

  1. Hero
  2. Statistik (pita hijau, angka live dari database)
  3. Kenapa Orang Tua Memilih Kami (4 kartu)
  4. Profil Sekolah (teaser tentang kami → /profil)
  5. Berita Terbaru (kartu utama besar + 2 kartu samping; berita Unggulan didahulukan, sisanya berita terbaru → /berita)
  6. Fasilitas Sekolah (grid 6 foto live, Unggulan didahulukan → /fasilitas)
  7. Galeri (6 foto live → /galeri)
  8. Prestasi (4 item live)
  9. CTA penutup (→ /profil + /program; JANGAN ke /kontak karena masih 404)
  10. Footer

- **Detail ekstrakurikuler** `/program/ekstrakurikuler/[slug]` (dirombak 2026-11-08; 2026-11-08 malam oranye diganti emas gelap sebagai bagian dari desain orisinal): spanduk foto lebar 16:9 di atas (hanya bila ada foto — pembeda dari halaman program akademik yang fotonya 16:10 di kolom kiri); kartu header (lingkaran ikon emas gelap `accent-soft` + nama hijau + deskripsi + baris Anggota/Kategori); grid 2 kolom — kiri kartu putih 'Tentang Kegiatan Ini' + deskripsi + Tujuan/Kegiatan Rutin/Fasilitas (daftar centang emas gelap); kanan sidebar lengket: kartu CTA emas gelap 'Bergabunglah!' (tautan putih bergaris bawah 'Daftar Sekarang' → `/kontak`) + kartu 'Informasi Penting' (Jadwal/Lokasi/Biaya/Pembimbing DIISI ADMIN — kolom opsional di form, tampil placeholder `[…]` bila kosong; migrasi `20261108230000_tambah_info_penting_ekstrakurikuler`). Judul sub-bagian (Tujuan/Kegiatan Rutin/Fasilitas) berwarna hijau `text-primary`, sama seperti judul nama ekstrakurikuler. Foto per ekstrakurikuler: kolom `gambarUrl` (migrasi `20261108160000_tambah_gambar_ekstrakurikuler`) + unggah foto di form admin (MasukanFoto, maks 2 MB, hapus otomatis saat diganti/dihapus).
- **Detail program akademik** `/program/akademik/[slug]` (dirombak 2026-11-08; 2026-11-08 malam oranye diganti emas gelap sebagai bagian dari desain orisinal): tautan 'Kembali ke Program' + grid 2 kolom — kiri foto (16:10) lalu kartu putih berisi judul hijau + ringkasan + isi (mini-markdown via `components/program/IsiProgram.tsx`: `## ` jadi subjudul hijau, `- ` jadi daftar centang emas, `1. ` jadi daftar bernomor); kanan sidebar lengket berisi kartu info (Tipe Program = judul, Durasi = `[Durasi]`, Peserta = `[Peserta]`, Status = Unggulan/Aktif) + kartu CTA emas gelap `accent-soft` ('Tertarik Bergabung?' + tautan putih bergaris bawah 'Hubungi Kami' → `/kontak`). Form admin program akademik punya toolbar format yang sama dengan form berita.
- Menu utama terkunci, tujuh item ini: **Beranda, Tentang, Program, Fasilitas, Galeri, Berita, Kontak.** Item **Tentang** berupa dropdown berisi **Profil Sekolah** (`/profil`), **Visi & Misi** (`/visi-misi`), dan **Staff & Guru** (`/guru`). Item **Program** berupa dropdown berisi **Akademik** (`/program/akademik`), **Ekstrakurikuler** (`/program/ekstrakurikuler`), dan **Program Unggulan** (`/program/unggulan`); halaman `/program` sendiri menjadi indeks ketiga program tersebut. Tidak ada menu lain di navbar. (Perubahan 2026-11-04 atas perintah pemilik project: "Profil" sebagai item tunggal diganti dropdown "Tentang"; halaman Profil Sekolah dan Staff & Guru dipisah; "Program" dijadikan dropdown mengikuti pola Tentang.)
- Halaman **Profil Sekolah** (`/profil`) mengikuti pola SMAN 7 Jakarta (2026-11-07): banner foto + judul H1 "Profil MTs Nurul Falah Gunungsindur", breadcrumb Home › Profil Sekolah, sidebar lengket (Identitas, Sejarah, Visi Misi, Struktur Organisasi — tautan jangkar), lalu konten: tabel Identitas, Sejarah (sementara berisi tonggak Terakreditasi A 2019 dari dokumen resmi; riwayat lengkap menunggu data sekolah), Visi Misi Dan Tujuan (rumusan resmi menunggu data sekolah — sementara placeholder penjelasan), dan Struktur Organisasi (placeholder gambar bagan sampai pihak sekolah memberikannya). Tabel Identitas TIDAK memuat Kepala Sekolah dan Telepon (data personal).
- **Footer** (2026-11-08, branch `newest`; sebelumnya SMAN 7): latar hijau Primary `#0b4f3a`, dibuka pita pernyataan serif besar putih (komponen `PitaVisiFooter`, hanya tampil di /profil, /visi-misi, /guru; isinya pernyataan identitas dari kop resmi sekolah: "Sekolah Lanjutan Tingkat Pertama Berciri Khas Agama Islam."), lalu 5 kolom — (1) logo + nama + kutipan Ki Hadjar Dewantara; (2) Links Internal (Profil Sekolah, Akademik, Visi Misi, Ekstrakurikuler, Berita); (3) Berita Terbaru (3 berita terbit terbaru + tanggal, tautan "Lihat Semua Berita"); (4) Hubungi Kami (alamat asli; Instagram + TikTok sementara tautan "#" — akun resmi sekolah Bogor belum ada data; TANPA telepon/email — belum ada data; tombol "Hubungi Kami" berupa tautan emas bergaris bawah); (5) Lokasi (iframe Google Maps, query nama sekolah + alamat Cibadung, sudut tajam). Bilah bawah: © 2026 + tagline "Madrasah Tsanawiyah Berciri Khas Agama Islam." Kolom Berita Terbaru bisa disembunyikan admin lewat **/admin/pengaturan** (model `Pengaturan`, kunci `tampilkanBeritaFooter`, default true; Footer async + Suspense di layout publik). CSP `next.config.ts` mengizinkan `frame-src` Google Maps. Tombol kembali ke atas (lingkaran emas, muncul setelah scroll 400px) di `components/TombolKeAtas.tsx`. Identitas sekolah DIKOREKSI 2026-11-14: sekolah yang benar adalah MTs Nurul Falah **Gunungsindur, Bogor** (YADINA) berdasarkan surat resmi sekolah — data Serpong sebelumnya adalah kesalahan riset dan sudah diganti total. Visi/misi/tujuan resmi Bogor belum diterima — halaman terkait memakai placeholder penjelasan, JANGAN karang.
- **Animasi beranda** (2026-11-07): layar loading `components/PemuatBeranda.tsx` (overlay hijau tua + logo + spinner emas; hilang saat `load` atau maksimal 3 detik, minimal tampil 500 ms, lalu fade 500 ms; hanya tampil sekali per sesi — navigasi client-side tidak memunculkan lagi) dan animasi reveal `components/TampilSaatScroll.tsx` (IntersectionObserver, threshold 0,1; konten mulai `opacity-0 translate-y-8`, muncul jadi `opacity-100 translate-y-0` selama 700 ms saat masuk viewport, sekali saja). Semua section beranda dibungkus TampilSaatScroll di `app/(publik)/page.tsx` (di luar Suspense).
- Semua target sentuh (tombol, menu, tautan kartu) minimal setinggi **44px**.
- Foto memakai komponen `next/image`, rasio konsisten dalam satu baris kartu (4:3 untuk fasilitas/program, 16:9 untuk hero dan berita), dan selalu memiliki teks alt yang menjelaskan isi foto — bukan "gambar1" dan bukan teks yang sama dengan judul.

## Elevation & Depth

Desain ini datar dan tenang. Kedalaman hanya dari bayangan yang sangat lembut dan dari perbedaan warna latar section.

- Bayangan kartu standar: `0 4px 24px rgba(11, 79, 58, 0.08)`.
- Bayangan kartu saat hover (desktop saja): `0 8px 32px rgba(11, 79, 58, 0.14)`, dan kartu naik maksimal 4px. Tidak ada animasi memantul, berputar, atau membesar berlebihan.
- Tidak ada bayangan keras, tidak ada efek kaca (glassmorphism), tidak ada neumorphism.
- Pola geometris bintang segi delapan Islami boleh dipakai hanya sebagai tekstur sangat tipis (opacity 4–6%) di latar hero, pita statistik, dan footer. Pola tidak pernah diletakkan di belakang teks isi dan tidak pernah lebih mencolok daripada konten.

## Shapes

- **Sudut tajam (radius 0) di semua kartu, foto, panel, dan tombol.** Tidak ada sudut membulat pada kartu/foto/panel publik. Pengecualian: lingkaran penuh (`rounded-full`) hanya untuk elemen yang memang bundar — lingkaran ikon, avatar, indikator, dan tombol kembali ke atas.
- **CTA publik berupa tombol isi bersudut tajam** (bukan pill, bukan tautan bergaris bawah): tombol emas (`bg-accent`, teks putih) untuk aksi utama, tombol hijau (`bg-primary`) atau putih (`bg-white`) untuk aksi kedua. Contoh: "Lihat Semua Berita", "Baca Selengkapnya".
- **Lengkung mihrab** adalah ciri khas bentuk di website ini: foto utama pada kartu program unggulan dan foto profil sekolah boleh memakai lengkung atas penuh — sudut atas dibuat setengah lingkaran (`border-radius: 999px 999px 24px 24px`). Dipakai hemat, maksimal untuk satu jenis kartu per halaman, bukan untuk semua elemen.
- Ikon memakai satu set ikon garis (line icon) yang konsisten, warna Primary atau Accent, ukuran 24px di dalam lingkaran Primary Soft. Tidak mencampur ikon garis, ikon penuh warna, emoji, dan ilustrasi dalam satu halaman. **Emoji tidak dipakai sebagai ikon.**
- Foto selalu asli: suasana belajar, guru, siswa, gedung, dan kegiatan sekolah. Foto stok orang asing, kartun, dan ilustrasi 3D dilarang.

## Components

### Navbar

Tinggi 72px, latar Surface, menempel di atas (sticky) dengan bayangan sangat tipis saat halaman digulir. Isi dari kiri ke kanan: logo + nama MTS, menu tujuh item (huruf kapital, tebal, berjarak — `text-sm font-bold tracking-[0.12em] uppercase`), dan satu tombol kotak tajam Primary bertuliskan **Hubungi Kami** yang menuju halaman Kontak. Item **Tentang** membuka dropdown saat di-hover (desktop) atau di-tap (HP); panel dropdown bersudut tajam. Di HP, menu menjadi hamburger kotak (tombol persegi berbingkai). Tidak ada tombol lain di navbar. Di atas navbar ada TopBar: bilah pengumuman tipis hijau Primary berisi alamat sekolah (teks putih kecil di tengah).

### Hero

Foto full-bleed suasana sekolah (slideshow 3 foto Unsplash sementara, autoplay 10 detik, tombol panah kotak di kanan bawah), tanpa bingkai dan tanpa teks di atas foto, dengan gradasi hijau tua di bawah foto. Di bawah foto: H1 satu baris tebal di tengah, garis emas pendek, satu paragraf penjelasan, dan dua tombol isi:

1. **Lihat Program Unggulan** — tombol emas.
2. **Lihat Fasilitas** — tombol hijau.

Tidak ada tombol ketiga, tidak ada video autoplay, dan tidak ada teks berjalan.

### Kartu Program Unggulan

Mengikuti pola MTs YPPMI: tepat **tiga kartu** di homepage — contoh pola isinya Tahfizh Al-Qur'an, Bilingual (Arab & Inggris), dan Sains & Digital. Nama program mengikuti data asli sekolah, agent tidak boleh mengarang program. Setiap kartu: foto atau ikon di atas, H3, deskripsi 2–3 baris, dan tautan teks `Pelajari lebih lanjut →`. Seluruh kartu bisa diklik.

### Pita Statistik

Latar Primary, empat angka maksimal, angka besar **serif tebal** (`font-serif font-black`, putih) dan label kecil **emas huruf kapital berjarak** (`text-accent uppercase tracking-[0.14em]`) di bawahnya. **Angka diambil LIVE dari database** (jumlah Guru, Program Akademik, Ekstrakurikuler, dan Fasilitas yang aktif); stat yang masih 0 disembunyikan otomatis. **Agent tidak boleh mengarang angka** — jumlah siswa/alumni tidak ditampilkan karena tidak ada di database.

### Kartu Fasilitas & Galeri

Fasilitas (gaya SMAN 7): grid 3 kolom × 2 baris (maks 6), foto 16:10 tanpa kartu, nama fasilitas sebagai keterangan tebal di bawah foto. Fasilitas Unggulan (checkbox "Tampilkan di Beranda" di form admin) tampil lebih dulu, sisanya diisi fasilitas aktif lain sesuai urutan. Galeri memakai grid foto yang rapi dengan jarak {spacing.md}. Tidak ada teks panjang di dalam galeri.

### Kartu Berita

Kartu utama besar (foto + overlay gelap + badge emas "Unggulan" + tombol Baca Selengkapnya) dan 2 kartu samping horizontal (foto kiri, teks kanan). Berita Unggulan (checkbox "Tampilkan di Beranda" di form admin) tampil lebih dulu, sisanya diisi berita terbaru yang sudah terbit; tanggal dalam format Indonesia.

### Halaman Detail Berita
Gaya SMAN 7 Jakarta: latar putih; judul 3xl/4xl; baris meta (Ditulis oleh, Tanggal + hari, Waktu baca, Status Unggulan bila ada); ringkasan sebagai lead tebal; foto sampul tampil utuh tanpa dipotong (object-contain) supaya poster tegak tidak terpotong; isi memakai format mini-markdown — baris `## ` jadi judul bagian (h2), `**teks**` jadi tebal, `- ` jadi daftar poin, `1. ` jadi daftar bernomor; Enter di form = paragraf baru; semua teks memakai break-words supaya kata panjang turun ke baris bawah; kotak penulis + galeri + Berita Terkait (3 kartu) di bawah. Form admin punya tombol Judul Bagian, Tebal, Poin, Nomor yang menyisipkan format itu (opsional). TOOLBAR FORMAT DI SEMUA FORM (2026-11-08, atas permintaan Haidar): toolbar yang sama kini ada di SEMUA form admin yang punya kolom teks panjang — berita, program akademik, fasilitas, guru, prestasi, kegiatan, ekstrakurikuler (4 kolom: deskripsi/tujuan/kegiatanRutin/fasilitas) — lewat komponen bersama `components/admin/ToolbarFormat.tsx` (tombol + `PetunjukFormat`). Render publik memakai `components/TeksBerformat.tsx` (judul `## `, tebal `**`, daftar `- `/`1. `): deskripsi fasilitas (/fasilitas), bio guru (/guru), deskripsi ekstrakurikuler (detail, 'Tentang Kegiatan Ini'), tujuan/kegiatanRutin/fasilitas ekstrakurikuler (detail, daftar centang hijau — baris lama tanpa tanda tetap jadi butir daftar). Deskripsi prestasi hanya tampil sebagai cuplikan 2 baris di beranda (`CuplikanBerformat`: tanda `## `/`- `/`1. ` dibersihkan, tebal tetap tampil). Deskripsi kegiatan TIDAK tampil di halaman publik (hanya tersimpan di admin).

### Testimoni

Kartu Surface Warm. Isi: kutipan orang tua maksimal tiga baris, nama, dan keterangan singkat (contoh: Wali murid kelas 8). Foto wajah hanya jika ada izin dan foto asli. Testimoni tidak boleh dikarang — jika belum ada testimoni asli, section ini dikosongkan dan diberi catatan placeholder untuk pemilik project, bukan diisi kutipan fiktif.

### CTA Penutup

Satu section Primary penuh sebelum footer: H2 satu baris tebal putih di tengah, contoh: "Kenali MTs Nurul Falah Gunungsindur Lebih Dekat", garis emas pendek, satu paragraf, dan dua tombol isi — **Lihat Profil Sekolah** (emas) dan **Jelajahi Program** (putih). Ini adalah ajakan untuk bertanya dan berkunjung, bukan ajakan mendaftar.

### Footer

Latar Primary `#0b4f3a`, teks putih. Dibuka pernyataan serif besar putih (visi sekolah), lalu 5 kolom di desktop (bertumpuk di HP) — lihat bagian Layout. Baris bawah: hak cipta dan tagline.

## SEO

- Data sekolah terpusat di `lib/site.ts` (nama, tagline, deskripsi, alamat, media sosial). Domain resmi (`site.url`) masih kosong — **wajib diisi saat website di-hosting**, karena sitemap, robots, dan canonical URL bergantung padanya.
- Judul halaman memakai template `%s | MTs Nurul Falah Gunungsindur` (di `app/layout.tsx`); H1 tiap halaman memuat nama sekolah.
- Schema `School` (JSON-LD) dipasang sekali di layout via `components/JsonLd.tsx`: nama, deskripsi, alamat, dan akun media sosial resmi. Tidak ada nomor telepon/email di schema karena belum ada data resmi yang bukan data personal.
- `app/sitemap.ts` memuat 12 halaman publik; `app/robots.ts` mengizinkan semua bot dan memblokir `/admin`, `/login`, `/api/`. Keduanya kosong/tanpa sitemap sampai `site.url` diisi.
- Hanya data publik yang wajib tampil yang dimasukkan ke web. **Jangan masukkan data sensitif/personal**: nomor HP pribadi, nama kepala madrasah, nama operator, dan data siswa/guru yang sudah usang. Telepon/email/WhatsApp/jam layanan tetap placeholder sampai pihak sekolah memberikan data resminya.

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
- **JANGAN memakai warna di luar palet.** Dilarang khususnya: pink/merah Airbnb (#FF385C), ungu Stripe, biru generik template, hijau WhatsApp terang sebagai warna merek, oranye (#F97316 — sudah diganti emas gelap, 2026-11-08), dan hitam murni (#000000) untuk teks atau latar.
- **JANGAN mengganti font**, menambah keluarga font Latin kedua, atau memakai font dekoratif untuk teks isi.
- **JANGAN meniru desain satu website secara harfiah.** Boleh terinspirasi arah gayanya (mis. sekolah internasional: hijau tua + emas, serif elegan), tetapi warna, judul, hero, dan CTA harus dibuat berbeda — jangan menyalin nilai hex, pola judul, bingkai, atau gaya tombol website lain apa adanya.
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
