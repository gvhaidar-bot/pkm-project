# Panduan Kolaborator — Web Promosi MTS

Selamat datang di tim! File ini menjelaskan cara gabung dan mulai mengerjakan project.

## 1. Cara gabung

1. Kirim **username GitHub** kamu ke Haidar.
2. Haidar akan mengirim undangan collaborator — cek email atau notifikasi GitHub-mu, lalu klik **Accept invitation** (undangan kedaluwarsa dalam 7 hari).
3. Setelah diterima, kamu punya akses tulis ke repo ini.

## 2. Yang perlu disiapkan

- **Git** — https://git-scm.com/downloads
- **Node.js v20.19+** (disarankan versi LTS, mis. v22) — https://nodejs.org
- **PostgreSQL v16+** — https://www.postgresql.org/download (pgAdmin opsional, untuk melihat database lewat GUI)
- **Code editor** — VS Code disarankan

## 3. Setup project pertama kali

Jalankan perintah ini berurutan dari terminal:

```bash
git clone https://github.com/gvhaidar-bot/pkm-project.git
cd pkm-project
npm install
```

Salin file contoh environment, lalu isi:

```bash
cp .env.example .env
```

Isi file `.env` (buka dengan editor):

```
DATABASE_URL="postgresql://postgres:PASSWORD_KAMU@localhost:5432/pkm_mts?schema=public"
```

- Ganti `PASSWORD_KAMU` dengan password PostgreSQL di laptopmu.
- `AUTH_SECRET`: generate string acak dengan perintah ini, lalu tempel hasilnya:
  ```bash
  node -p "require('crypto').randomBytes(32).toString('base64')"
  ```
- `ADMIN_EMAIL` dan `ADMIN_PASSWORD`: akun admin untuk login lokal (boleh pakai email pribadi).

Buat database-nya (lewat psql atau pgAdmin):

```sql
CREATE DATABASE pkm_mts;
```

Siapkan tabel dan akun admin, lalu jalankan:

```bash
npx prisma migrate dev
npx prisma generate
npm run db:seed
npm run dev
```

Buka http://localhost:3000 untuk website, dan http://localhost:3000/login untuk masuk sebagai admin.

> Catatan: file `.env` berisi rahasia (password, secret). File ini **tidak boleh** di-commit — sudah otomatis diabaikan git. Jangan pernah membagikan isinya di chat.

## 4. Alur kerja

1. Selalu mulai dengan `git pull origin main` agar kodemu sinkron dengan yang terbaru.
2. **Jangan push langsung ke `main`.** Buat branch baru untuk setiap fitur/perbaikan:
   ```bash
   git checkout -b fitur/nama-fitur
   ```
3. Kerjakan, lalu commit dan push branch-mu:
   ```bash
   git add -A
   git commit -m "Deskripsi singkat perubahan"
   git push origin fitur/nama-fitur
   ```
4. Buka **Pull Request** ke `main` di GitHub dan minta Haidar me-review sebelum di-merge.

## 5. Aturan main

- **Wajib baca `DESIGN.md`** sebelum menyentuh tampilan. Palet warna, font, dan 7 menu (Beranda, Profil, Program, Fasilitas, Galeri, Berita, Kontak) **terkunci** — tidak boleh diubah tanpa persetujuan.
- **Jangan mengarang data sekolah** (nama, alamat, angka, nama guru, prestasi). Kalau data asli belum ada, pakai placeholder yang jelas seperti `[Nama MTS]`.
- **Tidak ada PPDB** dalam bentuk apa pun — bukan halaman, bukan tombol, bukan banner.
- **Jangan menambahkan komentar** di kode.
- Halaman `/admin` adalah area khusus pengelola — jangan menautkannya dari menu publik.
- Kalau menemukan error, sertakan teks error lengkapnya saat bertanya.

## 6. Butuh bantuan?

Tanya di grup tim, atau buka **Issue** baru di tab Issues repo ini.
