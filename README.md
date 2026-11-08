# Website Promosi MTs Nurul Falah Serpong

Website promosi untuk **MTs Nurul Falah Serpong**, madrasah tsanawiyah swasta di Lengkong Gudang,
Kecamatan Serpong, Kota Tangerang Selatan, Banten 15310. Ditujukan untuk orang tua yang mencari
sekolah untuk putra-putrinya: profil sekolah, program akademik dan ekstrakurikuler, fasilitas,
berita, galeri, prestasi, dan kontak.

> **Bukan website PPDB.** Situs ini murni promosi dan informasi. Pendaftaran diarahkan ke kontak
> sekolah, bukan formulir pendaftaran online.

## Desain

Gaya **orisinal** (terinspirasi sekolah internasional, bukan tiruan satu website): hijau tua `#0b4f3a` +
emas `#c19a3d` di atas abu muda `#F2F2F2` dan putih, judul serif tebal satu baris dengan garis emas
pendek di bawahnya, sudut tajam, dan CTA berupa tombol isi. Font: Lora (judul) dan
Plus Jakarta Sans (isi/UI), Amiri untuk kutipan Arab.

Desain lengkapnya ada di [`DESIGN.md`](./DESIGN.md).

## Teknologi

- **Next.js 16.4** (App Router, Cache Components) + **React 19** + **TypeScript**
- **Tailwind CSS 4**
- **Prisma 7.10** (pin — jangan update ke 8.0.0-rc) + **PostgreSQL**
- **Auth.js v5** (Credentials + JWT) untuk login admin
- Konten publik dikelola lewat panel admin (`/admin`): berita, fasilitas, guru, prestasi,
  kegiatan, program akademik, ekstrakurikuler, dan pengaturan tampilan footer.

## Menjalankan di lokal

```bash
npm install
```

Salin `.env.example` menjadi `.env`, lalu isi:

```env
DATABASE_URL="postgresql://...?sslmode=verify-full"
DIRECT_URL="postgresql://...?sslmode=verify-full"
AUTH_SECRET="..."
ADMIN_EMAIL="..."
ADMIN_PASSWORD="..."
```

> Jangan jalankan `prisma migrate` lewat koneksi pooler (Neon). Pakai koneksi langsung
> (`DIRECT_URL`) untuk migrasi.

```bash
npx prisma migrate dev
npx prisma generate
npm run db:seed
npm run dev
```

Buka http://localhost:3000. Login admin di http://localhost:3000/login dengan akun dari
`ADMIN_EMAIL` / `ADMIN_PASSWORD`.

## Struktur

```text
app/
  (publik)/        Halaman pengunjung: beranda, profil, visi-misi, guru, berita,
                  fasilitas, galeri, program, kontak
  admin/           Panel admin (butuh login)
  api/auth/        Rute Auth.js
components/
  home/            Bagian beranda (hero, statistik, teaser)
  navbar/          Navigasi + TopBar
  footer.tsx       Footer
  admin/           Form dan komponen panel admin
lib/               Prisma, auth, upload, slug, validasi, mini-markdown
prisma/
  schema.prisma    14 model (lihat DESIGN.md)
  prisma7.config.ts Konfigurasi Prisma 7 (jangan diganti namanya)
public/uploads/    Foto yang diunggah admin (lokal per mesin)
```

## Konten

Data sekolah yang tampil adalah data asli yang terverifikasi (NPSN 20623052, NSM 121236740033,
berdiri 16 November 2001, akreditasi B nilai 83 tahun 2019). Data yang belum dikonfirmasi sekolah
ditampilkan sebagai placeholder bertanda kurung siku `[...]` — jangan dikarang.

Statistik di beranda dihitung langsung dari database (jumlah guru, program, ekstrakurikuler,
dan fasilitas yang aktif). Bagian yang belum punya data tidak tampil.

## Catatan penting

- **Prisma 7.10.1 dipin.** Jangan update ke 8.0.0-rc. Setelah pull yang membawa perubahan
  skema, jalankan `npx prisma migrate dev` dan `npx prisma generate`, lalu restart dev server.
- **`prisma/generated/` tidak di-commit** (di-generate ulang oleh `postinstall`).
- **Foto di `public/uploads/` bersifat lokal per mesin.** Di hosting ephemeral, foto hilang
  tiap redeploy — butuh object storage (R2/S3/Vercel Blob) atau disk persisten sebelum hosting.
- **SEO:** isi `site.url` di `lib/site.ts` dengan domain asli saat sudah hosting, lalu
  daftarkan sitemap ke Google Search Console.
- **Branch:** desain baru ini dikembangkan di branch **`newest`**. Branch `main` berisi desain
  sebelumnya.
