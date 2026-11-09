# Panduan Setup — Website Promosi MTs Nurul Falah Serpong

Panduan ini untuk anggota tim yang menjalankan project di laptop sendiri dengan
**PostgreSQL lokal** (bukan Neon). Ikuti langkah demi langkah; jangan loncat.

> **Branch yang dipakai: `newest`.** Pastikan kamu di branch itu sebelum mulai
> (lihat Langkah 1).

## Yang dibutuhkan

- **Git**
- **Node.js 20+** (cek dengan `node -v`)
- **PostgreSQL** sudah terpasang dan berjalan di laptop
  (cek dengan `psql --version`; kalau belum ada, pasang dulu dari
  https://www.postgresql.org/download/ dan catat kata sandi user `postgres`
  yang kamu buat saat instalasi)

## Langkah 1 — Ambil kode dan pindah ke branch `newest`

```bash
git clone https://github.com/gvhaidar-bot/pkm-project.git
cd pkm-project
git checkout newest
git pull origin newest
```

Kalau sudah punya folder project-nya, cukup:

```bash
cd pkm-project
git checkout newest
git pull origin newest
```

## Langkah 2 — Pasang package

```bash
npm install
```

Tunggu sampai selesai. Kalau ada peringatan (warning) kuning, abaikan saja selama
tidak ada tulisan `ERR`.

## Langkah 3 — Buat database lokal

Buka `psql` (atau pgAdmin) dan buat database baru. Ganti `pkm_project` dengan nama
yang kamu mau, tapi ingat namanya karena dipakai di Langkah 4.

```sql
CREATE DATABASE pkm_project;
```

Cek dengan:

```sql
\l
```

Database `pkm_project` harus muncul di daftar.

## Langkah 4 — Buat file `.env`

Salin contohnya:

```bash
cp .env.example .env
```

Lalu buka file `.env` dan isi seperti ini (sesuaikan kata sandi dan nama database
dengan yang kamu buat di Langkah 3):

```env
DATABASE_URL="postgresql://postgres:KATA-SANDI-POSTGRES@localhost:5432/pkm_project?schema=public"
DATABASE_URL_NON_POOLING="postgresql://postgres:KATA-SANDI-POSTGRES@localhost:5432/pkm_project?schema=public"
AUTH_SECRET="isi-dengan-string-acak-minimal-32-karakter"
ADMIN_EMAIL="admin@contoh.id"
ADMIN_PASSWORD="ganti-dengan-kata-sandi-yang-kuat"
```

Keterangan:

- `DATABASE_URL` — dipakai aplikasi dan seed. Untuk PostgreSQL lokal, isinya sama
  dengan `DATABASE_URL_NON_POOLING` (tidak ada pooler di lokal).
- `AUTH_SECRET` — string acak, minimal 32 karakter. Buat dengan perintah ini
  (di terminal, lalu salin hasilnya ke `.env`):
  ```bash
  openssl rand -base64 32
  ```
- `ADMIN_EMAIL` / `ADMIN_PASSWORD` — akun admin PERTAMA kamu. Ini akunmu sendiri
  untuk login ke `/admin`. Jangan pakai akun orang lain.
- **Jangan** isi URL Neon di sini. URL Neon hanya untuk Haidar; tim pakai
  PostgreSQL lokal masing-masing.

> File `.env` **tidak boleh di-commit** ke Git. File ini sudah ada di `.gitignore`.

## Langkah 5 — Migrasi database

```bash
npx prisma migrate dev
```

Perintah ini membuat semua tabel di database lokalmu. Kalau muncul tulisan
`Already in sync, no schema change or pending migration was found`, itu **bukan
error** — artinya tabelmu sudah sama dengan skema, lanjut saja.

Kalau muncul error koneksi (mis. `Can't reach database server`), cek lagi:
database-nya sudah dibuat (Langkah 3), PostgreSQL-nya sedang berjalan, dan
`DATABASE_URL` di `.env` sudah benar (user, kata sandi, nama database, port 5432).

## Langkah 6 — Generate Prisma Client

```bash
npx prisma generate
```

Harus muncul `✔ Generated Prisma Client`. Kalau muncul error
`prisma/generated/prisma exists and is not empty but doesn't look like a generated
Prisma Client`, hapus foldernya lalu ulangi:

```bash
rm -rf prisma/generated
npx prisma generate
```

## Langkah 7 — Buat akun admin (seed)

```bash
npm run db:seed
```

Perintah ini membuat akun admin dari `ADMIN_EMAIL` / `ADMIN_PASSWORD` di `.env`.
Kalau gagal karena `ADMIN_EMAIL` atau `ADMIN_PASSWORD` kosong, cek lagi file `.env`.

## Langkah 8 — Jalankan dev server

```bash
npm run dev
```

Buka http://localhost:3000 di browser. Login admin di
http://localhost:3000/login dengan email dan kata sandi dari `.env`.

## Setelah pull (setiap kali ada perubahan baru)

Setiap kali kamu `git pull` dan ada perubahan, jalankan ini sebelum `npm run dev`:

```bash
npx prisma migrate dev
npx prisma generate
```

Dua perintah itu memperbarui tabel dan client Prisma-mu mengikuti skema terbaru.

## Kalau error saat pindah branch

Kalau `git checkout newest` ditolak dengan pesan `Your local changes to
prisma/generated/... would be overwritten`, itu karena folder `prisma/generated/`
masih tersimpan di branch lama. Buang perubahan lokalnya (aman, file itu hasil
generate otomatis), lalu ulangi checkout:

```bash
git checkout -- prisma/generated/
git checkout newest
rm -rf prisma/generated
npx prisma generate
```

## Ringkasan perintah (sekali jalan, dari awal)

```bash
git clone https://github.com/gvhaidar-bot/pkm-project.git
cd pkm-project
git checkout newest
npm install
# ... buat database + isi .env (Langkah 3-4) ...
npx prisma migrate dev
npx prisma generate
npm run db:seed
npm run dev
```
