import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join, resolve, sep } from "node:path";

export const MAKS_UKURAN_FOTO = 2 * 1024 * 1024;
export const MAKS_DIMENSI_FOTO = 10000;

const TIPE_DIIZINKAN = new Set(["image/jpeg", "image/png", "image/webp"]);
const SUBFOLDER_VALID = /^[a-z0-9-]+$/;

function pastikanSubfolder(subfolder: string): string {
  if (!SUBFOLDER_VALID.test(subfolder)) {
    throw new Error("Folder penyimpanan unggahan tidak valid.");
  }
  return subfolder;
}

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

function validasiDimensi(lebar: number, tinggi: number) {
  if (lebar <= 0 || tinggi <= 0 || lebar > MAKS_DIMENSI_FOTO || tinggi > MAKS_DIMENSI_FOTO) {
    throw new Error(`Dimensi gambar melebihi batas maksimal ${MAKS_DIMENSI_FOTO}x${MAKS_DIMENSI_FOTO} piksel.`);
  }
}

function bersihkanJpeg(buf: Buffer): Buffer {
  const hasil: Buffer[] = [buf.subarray(0, 2)]; // SOI (FF D8)
  let pos = 2;

  while (pos + 1 < buf.length) {
    while (pos < buf.length && buf[pos] !== 0xff) pos++;
    while (pos + 1 < buf.length && buf[pos + 1] === 0xff) pos++;
    if (pos + 1 >= buf.length) break;

    const marker = buf[pos + 1];
    // SOS (DA) memulai data terkompresi hingga akhir berkas; EOI (D9) menutup berkas
    if (marker === 0xda || marker === 0xd9) {
      hasil.push(buf.subarray(pos));
      return Buffer.concat(hasil);
    }

    // Marker tanpa payload panjang (00, 01, RST0..RST7)
    if (marker === 0x00 || marker === 0x01 || (marker >= 0xd0 && marker <= 0xd7)) {
      hasil.push(buf.subarray(pos, pos + 2));
      pos += 2;
      continue;
    }

    if (pos + 4 > buf.length) throw new Error("Struktur gambar JPEG tidak valid.");
    const panjang = buf.readUInt16BE(pos + 2);
    const akhir = pos + 2 + panjang;
    if (panjang < 2 || akhir > buf.length) throw new Error("Struktur gambar JPEG tidak valid.");

    // Validasi dimensi pada segmen Start Of Frame (SOF0..SOF3, SOF5..SOF7, SOF9..SOF11)
    if (
      (marker >= 0xc0 && marker <= 0xc3) ||
      (marker >= 0xc5 && marker <= 0xc7) ||
      (marker >= 0xc9 && marker <= 0xcb)
    ) {
      if (panjang >= 7) {
        const tinggi = buf.readUInt16BE(pos + 5);
        const lebar = buf.readUInt16BE(pos + 7);
        validasiDimensi(lebar, tinggi);
      }
    }

    // Hapus segmen metadata EXIF/XMP (E1), IPTC Photoshop (ED), dan komentar (FE)
    if (marker !== 0xe1 && marker !== 0xed && marker !== 0xfe) {
      hasil.push(buf.subarray(pos, akhir));
    }

    pos = akhir;
  }

  return Buffer.concat(hasil);
}

const CHUNK_METADATA_PNG = new Set(["eXIf", "tEXt", "iTXt", "zTXt", "tIME"]);

function bersihkanPng(buf: Buffer): Buffer {
  const hasil: Buffer[] = [buf.subarray(0, 8)]; // Signature PNG
  let pos = 8;

  while (pos + 12 <= buf.length) {
    const panjang = buf.readUInt32BE(pos);
    const akhir = pos + 12 + panjang;
    if (panjang > buf.length || akhir > buf.length) {
      throw new Error("Struktur gambar PNG tidak valid.");
    }

    const tipe = buf.subarray(pos + 4, pos + 8).toString("ascii");
    if (tipe === "IHDR" && panjang >= 8) {
      const lebar = buf.readUInt32BE(pos + 8);
      const tinggi = buf.readUInt32BE(pos + 12);
      validasiDimensi(lebar, tinggi);
    }

    if (!CHUNK_METADATA_PNG.has(tipe)) {
      hasil.push(buf.subarray(pos, akhir));
    }

    pos = akhir;
    if (tipe === "IEND") break;
  }

  return Buffer.concat(hasil);
}

function bersihkanWebp(buf: Buffer): Buffer {
  const potongan: Buffer[] = [];
  let pos = 12; // Lewati RIFF (4) + ukuran (4) + WEBP (4)

  while (pos + 8 <= buf.length) {
    const fourCC = buf.subarray(pos, pos + 4).toString("ascii");
    const ukuranPayload = buf.readUInt32LE(pos + 4);
    const ukuranDenganPadding = ukuranPayload + (ukuranPayload % 2);
    const akhir = pos + 8 + ukuranDenganPadding;
    if (ukuranPayload > buf.length || akhir > buf.length) {
      throw new Error("Struktur gambar WebP tidak valid.");
    }

    if (fourCC === "VP8 " && ukuranPayload >= 10) {
      const lebar = buf.readUInt16LE(pos + 14) & 0x3fff;
      const tinggi = buf.readUInt16LE(pos + 16) & 0x3fff;
      validasiDimensi(lebar, tinggi);
    } else if (fourCC === "VP8L" && ukuranPayload >= 5) {
      const bits = buf.readUInt32LE(pos + 9);
      const lebar = (bits & 0x3fff) + 1;
      const tinggi = ((bits >> 14) & 0x3fff) + 1;
      validasiDimensi(lebar, tinggi);
    } else if (fourCC === "VP8X" && ukuranPayload >= 10) {
      const lebar = 1 + (buf[pos + 12] | (buf[pos + 13] << 8) | (buf[pos + 14] << 16));
      const tinggi = 1 + (buf[pos + 15] | (buf[pos + 16] << 8) | (buf[pos + 17] << 16));
      validasiDimensi(lebar, tinggi);
      // Salin VP8X dengan bit EXIF (0x08) dan XMP (0x04) dinonaktifkan
      const salinan = Buffer.from(buf.subarray(pos, akhir));
      salinan[8] = salinan[8] & ~0x0c;
      potongan.push(salinan);
      pos = akhir;
      continue;
    }

    if (fourCC !== "EXIF" && fourCC !== "XMP ") {
      potongan.push(buf.subarray(pos, akhir));
    }

    pos = akhir;
  }

  const isiPayload = Buffer.concat(potongan);
  const header = Buffer.alloc(12);
  header.write("RIFF", 0, "ascii");
  header.writeUInt32LE(4 + isiPayload.length, 4);
  header.write("WEBP", 8, "ascii");
  return Buffer.concat([header, isiPayload]);
}

function sanitasiGambar(buf: Buffer, ekstensi: "jpg" | "png" | "webp"): Buffer {
  if (ekstensi === "jpg") return bersihkanJpeg(buf);
  if (ekstensi === "png") return bersihkanPng(buf);
  return bersihkanWebp(buf);
}

export async function simpanFoto(file: unknown, subfolder: string): Promise<string | null> {
  const folderAman = pastikanSubfolder(subfolder);
  if (!(file instanceof File) || file.size === 0) return null;
  if (file.size > MAKS_UKURAN_FOTO) throw new Error("Ukuran foto maksimal 2 MB.");
  if (file.type && !TIPE_DIIZINKAN.has(file.type)) {
    throw new Error("File foto harus berupa gambar JPG, PNG, atau WebP.");
  }
  const isiMentah = Buffer.from(await file.arrayBuffer());
  const ekstensi = ekstensiDariIsi(isiMentah);
  if (!ekstensi) throw new Error("File foto harus berupa gambar JPG, PNG, atau WebP.");
  const isiBersih = sanitasiGambar(isiMentah, ekstensi);
  const direktori = join(process.cwd(), "public", "uploads", folderAman);
  await mkdir(direktori, { recursive: true });
  const namaBerkas = `${Date.now()}-${randomUUID()}.${ekstensi}`;
  await writeFile(join(direktori, namaBerkas), isiBersih);
  return `/uploads/${folderAman}/${namaBerkas}`;
}

export async function hapusBerkas(url: string | null, subfolder: string): Promise<void> {
  if (!url) return;
  const folderAman = pastikanSubfolder(subfolder);
  const awalan = `/uploads/${folderAman}/`;
  if (!url.startsWith(awalan)) return;
  const dasar = resolve(process.cwd(), "public", "uploads", folderAman);
  const target = resolve(dasar, url.slice(awalan.length));
  if (target !== dasar && !target.startsWith(dasar + sep)) return;
  await unlink(target).catch(() => undefined);
}
