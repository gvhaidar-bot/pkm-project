import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";

export const MAKS_UKURAN_FOTO = 2 * 1024 * 1024;

const TIPE_DIIZINKAN = new Set(["image/jpeg", "image/png", "image/webp"]);

function ekstensiDariIsi(buf: Buffer): "jpg" | "png" | "webp" | null {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return "jpg";
  if (
    buf.length >= 8 &&
    buf[0] === 0x89 &&
    buf[1] === 0x50 &&
    buf[2] === 0x4e &&
    buf[3] === 0x47 &&
    buf[4] === 0x0d &&
    buf[5] === 0x0a &&
    buf[6] === 0x1a &&
    buf[7] === 0x0a
  )
    return "png";
  if (
    buf.length >= 12 &&
    buf.subarray(0, 4).toString("ascii") === "RIFF" &&
    buf.subarray(8, 12).toString("ascii") === "WEBP"
  )
    return "webp";
  return null;
}

export async function simpanFoto(file: unknown, subfolder: string): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > MAKS_UKURAN_FOTO) throw new Error("Ukuran foto maksimal 2 MB.");
  if (file.type && !TIPE_DIIZINKAN.has(file.type)) {
    throw new Error("File foto harus berupa gambar JPG, PNG, atau WebP.");
  }
  const isi = Buffer.from(await file.arrayBuffer());
  const ekstensi = ekstensiDariIsi(isi);
  if (!ekstensi) throw new Error("File foto harus berupa gambar JPG, PNG, atau WebP.");
  const direktori = join(process.cwd(), "public", "uploads", subfolder);
  await mkdir(direktori, { recursive: true });
  const namaBerkas = `${Date.now()}-${randomUUID()}.${ekstensi}`;
  await writeFile(join(direktori, namaBerkas), isi);
  return `/uploads/${subfolder}/${namaBerkas}`;
}

export async function hapusBerkas(url: string | null, subfolder: string): Promise<void> {
  if (!url) return;
  const awalan = `/uploads/${subfolder}/`;
  if (!url.startsWith(awalan)) return;
  const dasar = resolve(process.cwd(), "public", "uploads", subfolder);
  const target = resolve(dasar, url.slice(awalan.length));
  if (target !== dasar && !target.startsWith(dasar + sep)) return;
  await unlink(target).catch(() => undefined);
}
