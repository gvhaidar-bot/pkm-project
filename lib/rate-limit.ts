/**
 * Pembatas percobaan masuk (login) sederhana, disimpan di memori proses.
 *
 * Batas: 5 percobaan gagal per email dalam 10 menit. Setelah batas tercapai,
 * percobaan berikutnya ditolak dengan pesan galat umum yang sama seperti
 * kredensial salah (tanpa memberi tahu penyerang bahwa akun terkunci).
 *
 * Keterbatasan: hitungan hilang saat server restart dan tidak dibagi antar
 * instance. Untuk produksi, ganti dengan penyimpanan bersama (mis. Redis
 * atau tabel di database).
 */
const BATAS = 5;
const JENDELA_MS = 10 * 60 * 1000;

type Catatan = { jumlah: number; awal: number };

const catatan = new Map<string, Catatan>();

function kunciNormal(kunci: string): string {
  return kunci.trim().toLowerCase();
}

export function batasMasukTerlampaui(kunci: string): boolean {
  const ada = catatan.get(kunciNormal(kunci));
  if (!ada) return false;
  if (Date.now() - ada.awal > JENDELA_MS) {
    catatan.delete(kunciNormal(kunci));
    return false;
  }
  return ada.jumlah >= BATAS;
}

export function catatMasukGagal(kunci: string) {
  const k = kunciNormal(kunci);
  const sekarang = Date.now();
  const ada = catatan.get(k);
  if (!ada || sekarang - ada.awal > JENDELA_MS) {
    catatan.set(k, { jumlah: 1, awal: sekarang });
    return;
  }
  ada.jumlah += 1;
}

export function catatMasukBerhasil(kunci: string) {
  catatan.delete(kunciNormal(kunci));
}
