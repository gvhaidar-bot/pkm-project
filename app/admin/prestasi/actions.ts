"use server";

import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const DIREKTORI = join(process.cwd(), "public", "uploads", "prestasi");
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
  return `/uploads/prestasi/${namaBerkas}`;
}

async function hapusBerkas(url: string | null) {
  if (!url || !url.startsWith("/uploads/prestasi/")) return;
  await unlink(join(process.cwd(), "public", url)).catch(() => undefined);
}

function muatUlang() {
  revalidatePath("/admin/prestasi");
}

export async function tambahPrestasi(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim() || null;
  const tahun = Number(formData.get("tahun"));
  const tingkat = (formData.get("tingkat") as string | null)?.trim() || null;

  if (!judul) return { error: "Judul prestasi wajib diisi." };
  if (!tahun || tahun < 1900 || tahun > 2100) return { error: "Tahun tidak valid." };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"));
    await prisma.prestasi.create({ data: { judul, deskripsi, tahun, tingkat, gambarUrl: fotoUrl } });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl);
    return { error: e instanceof Error ? e.message : "Gagal menyimpan prestasi." };
  }
  muatUlang();
  redirect("/admin/prestasi");
}

export async function ubahPrestasi(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const id = Number(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim() || null;
  const tahun = Number(formData.get("tahun"));
  const tingkat = (formData.get("tingkat") as string | null)?.trim() || null;

  if (!id) return { error: "ID prestasi tidak valid." };
  if (!judul) return { error: "Judul prestasi wajib diisi." };
  if (!tahun || tahun < 1900 || tahun > 2100) return { error: "Tahun tidak valid." };

  const lama = await prisma.prestasi.findUnique({ where: { id } });
  if (!lama) return { error: "Prestasi tidak ditemukan." };

  let fotoUrl = lama.gambarUrl;
  try {
    const baru = await simpanFoto(formData.get("foto"));
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl);
    }
    await prisma.prestasi.update({ where: { id }, data: { judul, deskripsi, tahun, tingkat, gambarUrl: fotoUrl } });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal mengubah prestasi." };
  }
  muatUlang();
  redirect("/admin/prestasi");
}

export async function hapusPrestasi(id: number): Promise<void> {
  const prestasi = await prisma.prestasi.findUnique({ where: { id } });
  if (!prestasi) return;
  await hapusBerkas(prestasi.gambarUrl);
  await prisma.prestasi.delete({ where: { id } });
  muatUlang();
}
