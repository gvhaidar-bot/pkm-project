<div align="center">

# PKM Project

**Website profil Madrasah Tsanawiyah — Next.js, Prisma, dan panel admin.**

Website sekolah untuk memperkenalkan profil, program, fasilitas, prestasi, galeri, dan berita madrasah kepada orang tua.

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev/)
[![Prisma](https://img.shields.io/badge/Prisma-7-2D3748?logo=prisma)](https://www.prisma.io/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)

[Website](#) · [Panduan Desain](DESIGN.md) · [Panduan Kontribusi](CONTRIBUTING.md)

[Persiapan](#persiapan) · [Menjalankan](#menjalankan) · [Panel Admin](#panel-admin) · [Struktur](#struktur) · [FAQ](#faq)

</div>

## Persiapan

Siapkan database PostgreSQL (misalnya [Neon](https://neon.tech/)) lalu salin berkas contoh
lingkungan dan isi nilainya:

```bash
cp .env.example .env
```

Isi yang wajib ada di `.env`:

| Variabel | Keterangan |
| --- | --- |
| `DATABASE_URL` | URL PostgreSQL (pooled) |
| `DATABASE_URL_NON_POOLING` | URL PostgreSQL (direct, untuk migrasi) |
| `AUTH_SECRET` | Kunci rahasia NextAuth (`openssl rand -base64 32`) |
| `ADMIN_EMAIL` | Email akun admin awal |
| `ADMIN_PASSWORD` | Kata sandi akun admin awal |

> Akun admin dibuat oleh `db:seed`. Tidak ada akun bawaan dan tidak ada
> pendaftaran mandiri — seluruh area `/admin` hanya bisa dibuka setelah masuk.

## Menjalankan

```bash
npm install
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

Perintah lain:

```bash
npm run build       # build produksi
npm run start       # jalankan hasil build
npm run lint        # ESLint
npm run typecheck   # tsc --noEmit
```

## Panel Admin

Masuk lewat `/login` dengan akun dari `db:seed`. Panel admin mengelola 7 modul:
berita, ekstrakurikuler, fasilitas, guru, kegiatan, prestasi, dan program
akademik. Setiap modul punya daftar, tambah, ubah, dan hapus; berita dan
kegiatan punya galeri foto tambahan.

Keamanan yang sudah diterapkan:

- Seluruh `/admin` dijaga `callbacks.authorized` (Auth.js) dan gerbang layout,
  serta pemeriksaan sesi di setiap server action.
- Unggahan foto hanya menerima JPG/PNG/WebP yang dikenali dari isi berkas
  (magic bytes), maksimal 2 MB, nama berkas acak.
- Login dibatasi 5 percobaan gagal per email dalam 10 menit.
- Pesan galat database tidak pernah diteruskan mentah ke layar admin.

## Struktur

```
app/
  (publik)/          Halaman pengunjung: beranda, profil, program, berita, ...
  admin/             Panel admin (7 modul CRUD)
  api/auth/          Rute Auth.js
components/
  home/              Section beranda (hero, statistik, teaser, CTA)
  admin/             Komponen bersama panel admin
lib/
  prisma.ts          Klien Prisma
  upload.ts          Simpan/hapus foto unggahan
  admin.ts           Gerbang admin, validasi, pesan galat
  rate-limit.ts      Pembatas percobaan login
prisma/
  schema.prisma      Model data
  seed.ts            Akun admin awal
```

Aturan tampilan yang mengikat ada di [DESIGN.md](DESIGN.md) — palet hijau
`#0B5B3E`, emas `#C9A227`, krem `#F7F3EA`, dan Plus Jakarta Sans. Foto harus
foto asli; foto stok dilarang. Data sekolah tidak boleh dikarang — bila belum
ada datanya, pakai placeholder yang terlihat seperti `[Nama Sekolah]`.

## FAQ

**Di mana foto yang diunggah disimpan?**
Di `public/uploads/<modul>/`. Untuk deploy multi-instance, pindahkan ke
penyimpanan objek (misalnya S3) agar foto tidak hilang saat instance berganti.

**Kenapa `prisma/generated` tidak ada di repo?**
Client Prisma dibuat otomatis saat `npm install` (`postinstall: prisma generate`)
dan sengaja tidak di-commit.

**Bagaimana cara menambah admin baru?**
Buat langsung di database (tabel `Admin`) atau jalankan seed dengan
`ADMIN_EMAIL`/`ADMIN_PASSWORD` yang berbeda.
