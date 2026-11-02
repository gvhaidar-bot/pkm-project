"use server";

import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const DIREKTORI = join(process.cwd(), "public", "uploads", "fasilitas");
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
  return `/uploads/fasilitas/${namaBerkas}`;
}

async function hapusBerkas(url: string | null) {
  if (!url || !url.startsWith("/uploads/fasilitas/")) return;
  await unlink(join(process.cwd(), "public", url)).catch(() => undefined);
}

function muatUlang() {
  revalidatePath("/admin/fasilitas");
  revalidatePath("/fasilitas");
}

export async function tambahFasilitas(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const nama = (formData.get("nama") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";

  if (!nama || !deskripsi) return { error: "Nama dan deskripsi wajib diisi." };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"));
    await prisma.fasilitas.create({ data: { nama, deskripsi, gambarUrl: fotoUrl, urutan, aktif } });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl);
    return { error: e instanceof Error ? e.message : "Gagal menyimpan fasilitas." };
  }
  muatUlang();
  redirect("/admin/fasilitas");
}

export async function ubahFasilitas(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const id = Number(formData.get("id"));
  const nama = (formData.get("nama") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";

  if (!id) return { error: "ID fasilitas tidak valid." };
  if (!nama || !deskripsi) return { error: "Nama dan deskripsi wajib diisi." };

  const lama = await prisma.fasilitas.findUnique({ where: { id } });
  if (!lama) return { error: "Fasilitas tidak ditemukan." };

  let fotoUrl = lama.gambarUrl;
  try {
    const baru = await simpanFoto(formData.get("foto"));
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl);
    }
    await prisma.fasilitas.update({ where: { id }, data: { nama, deskripsi, gambarUrl: fotoUrl, urutan, aktif } });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal mengubah fasilitas." };
  }
  muatUlang();
  redirect("/admin/fasilitas");
}

export async function hapusFasilitas(id: number): Promise<void> {
  const fasilitas = await prisma.fasilitas.findUnique({ where: { id } });
  if (!fasilitas) return;
  await hapusBerkas(fasilitas.gambarUrl);
  await prisma.fasilitas.delete({ where: { id } });
  muatUlang();
}
