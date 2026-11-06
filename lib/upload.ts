import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";

/** Ukuran maksimal satu foto: 2 MB. */
export const MAKS_UKURAN = 2 * 1024 * 1024;
/** Jumlah maksimal foto galeri per berita/kegiatan. */
export const MAKS_FOTO_GALERI = 20;

const AKAR_UNGGAH = join(process.cwd(), "public", "uploads");

/**
 * Kenali jenis gambar dari isi berkas (magic bytes), bukan dari nama atau
 * klaim MIME pengunggah. Hanya JPG, PNG, dan WebP yang diterima.
 */
function deteksiJenis(bytes: Uint8Array): "jpg" | "png" | "webp" | null {
  if (bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff) return "jpg";
  if (
    bytes[0] === 0x89 &&
    bytes[1] === 0x50 &&
    bytes[2] === 0x4e &&
    bytes[3] === 0x47
  )
    return "png";
  if (
    bytes.length >= 12 &&
    bytes[0] === 0x52 && // R
    bytes[1] === 0x49 && // I
    bytes[2] === 0x46 && // F
    bytes[3] === 0x46 && // F
    bytes[8] === 0x57 && // W
    bytes[9] === 0x45 && // E
    bytes[10] === 0x42 && // B
    bytes[11] === 0x50 // P
  )
    return "webp";
  return null;
}

function periksaFolder(folder: string) {
  if (!/^[a-z0-9][a-z0-9-]*$/.test(folder))
    throw new Error("Folder unggahan tidak valid.");
}

/**
 * Simpan foto yang diunggah ke public/uploads/<folder>/ dengan nama acak.
 * Mengembalikan URL publik (mis. /uploads/berita/<uuid>.jpg) atau null bila
 * tidak ada berkas yang dipilih.
 */
export async function simpanFoto(file: unknown, folder: string): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > MAKS_UKURAN) throw new Error("Ukuran foto maksimal 2 MB.");
  periksaFolder(folder);

  const data = new Uint8Array(await file.arrayBuffer());
  const jenis = deteksiJenis(data.slice(0, 12));
  if (!jenis) throw new Error("Format foto tidak didukung. Gunakan JPG, PNG, atau WebP.");

  const direktori = join(AKAR_UNGGAH, folder);
  await mkdir(direktori, { recursive: true });
  const namaBerkas = `${randomUUID()}.${jenis}`;
  await writeFile(join(direktori, namaBerkas), Buffer.from(data));
  return `/uploads/${folder}/${namaBerkas}`;
}

/**
 * Hapus berkas unggahan. URL harus berada di dalam folder yang sama, dan
 * nama berkas tidak boleh mengandung pemisah direktori (anti path traversal).
 * Gagal menghapus berkas tidak pernah melempar galat.
 */
export async function hapusBerkas(url: string | null, folder: string) {
  if (!url) return;
  periksaFolder(folder);
  const awalan = `/uploads/${folder}/`;
  if (!url.startsWith(awalan)) return;
  const nama = url.slice(awalan.length);
  if (!nama || nama.includes("/") || nama.includes("\\")) return;
  const dasar = resolve(AKAR_UNGGAH, folder);
  const jalur = resolve(dasar, nama);
  if (!jalur.startsWith(dasar + sep)) return;
  await unlink(jalur).catch(() => undefined);
}
