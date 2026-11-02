"use server";

import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const DIREKTORI = join(process.cwd(), "public", "uploads", "kegiatan");
const MAKS_UKURAN = 2 * 1024 * 1024;

export type HasilAksi = { error?: string } | null;

async function simpanFoto(file: unknown): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/")) throw new Error("File foto harus berupa gambar.");
  if (file.size > MAKS_UKURAN) throw new Error("Ukuran foto maksimal 2 MB.");
  await mkdir(DIREKTORI, { recursive: true });
  const ekstensi = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const namaBerkas = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ekstensi}`;
  await writeFile(join(DIREKTORI, namaBerkas), Buffer.from(await file.arrayBuffer()));
  return `/uploads/kegiatan/${namaBerkas}`;
}

async function hapusBerkas(url: string | null) {
  if (!url || !url.startsWith("/uploads/kegiatan/")) return;
  await unlink(join(process.cwd(), "public", url)).catch(() => undefined);
}

function muatUlang() {
  revalidatePath("/admin/kegiatan");
  revalidatePath("/galeri");
}

function bacaTanggal(nilai: FormDataEntryValue | null): Date | null {
  if (typeof nilai !== "string" || !nilai) return null;
  const d = new Date(nilai);
  return isNaN(d.getTime()) ? null : d;
}

export async function tambahKegiatan(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const tanggal = bacaTanggal(formData.get("tanggal"));
  const lokasi = (formData.get("lokasi") as string | null)?.trim() || null;

  if (!judul || !deskripsi) return { error: "Judul dan deskripsi wajib diisi." };
  if (!tanggal) return { error: "Tanggal kegiatan wajib diisi." };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"));
    await prisma.kegiatan.create({ data: { judul, deskripsi, tanggal, lokasi, gambarUrl: fotoUrl } });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl);
    return { error: e instanceof Error ? e.message : "Gagal menyimpan kegiatan." };
  }
  muatUlang();
  redirect("/admin/kegiatan");
}

export async function ubahKegiatan(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const id = Number(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const tanggal = bacaTanggal(formData.get("tanggal"));
  const lokasi = (formData.get("lokasi") as string | null)?.trim() || null;

  if (!id) return { error: "ID kegiatan tidak valid." };
  if (!judul || !deskripsi) return { error: "Judul dan deskripsi wajib diisi." };
  if (!tanggal) return { error: "Tanggal kegiatan wajib diisi." };

  const lama = await prisma.kegiatan.findUnique({ where: { id } });
  if (!lama) return { error: "Kegiatan tidak ditemukan." };

  let fotoUrl = lama.gambarUrl;
  try {
    const baru = await simpanFoto(formData.get("foto"));
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl);
    }
    await prisma.kegiatan.update({ where: { id }, data: { judul, deskripsi, tanggal, lokasi, gambarUrl: fotoUrl } });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal mengubah kegiatan." };
  }
  muatUlang();
  redirect("/admin/kegiatan");
}

export async function hapusKegiatan(id: number): Promise<void> {
  const kegiatan = await prisma.kegiatan.findUnique({
    where: { id },
    include: { foto: true },
  });
  if (!kegiatan) return;
  for (const f of kegiatan.foto) await hapusBerkas(f.url);
  await hapusBerkas(kegiatan.gambarUrl);
  await prisma.kegiatan.delete({ where: { id } });
  muatUlang();
}

export async function tambahFotoKegiatan(
  kegiatanId: number,
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  const kegiatan = await prisma.kegiatan.findUnique({ where: { id: kegiatanId } });
  if (!kegiatan) return { error: "Kegiatan tidak ditemukan." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };

  const tersimpan: string[] = [];
  try {
    const jumlah = await prisma.kegiatanFoto.count({ where: { kegiatanId } });
    let n = 0;
    for (const file of files) {
      const url = await simpanFoto(file);
      if (!url) continue;
      tersimpan.push(url);
      await prisma.kegiatanFoto.create({
        data: { url, kegiatanId, urutan: jumlah + n++ },
      });
    }
  } catch (e) {
    for (const url of tersimpan) await hapusBerkas(url);
    return { error: e instanceof Error ? e.message : "Gagal mengunggah foto." };
  }
  muatUlang();
  return null;
}

export async function hapusFotoKegiatan(id: number): Promise<void> {
  const foto = await prisma.kegiatanFoto.findUnique({ where: { id } });
  if (!foto) return;
  await hapusBerkas(foto.url);
  await prisma.kegiatanFoto.delete({ where: { id } });
  muatUlang();
}
