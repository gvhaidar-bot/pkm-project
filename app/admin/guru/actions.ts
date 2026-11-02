"use server";

import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";

const DIREKTORI = join(process.cwd(), "public", "uploads", "guru");
const MAKS_UKURAN = 2 * 1024 * 1024;

export type HasilAksi = { error: string } | null;

async function simpanFoto(file: unknown): Promise<string | null> {
  if (!(file instanceof File) || file.size === 0) return null;
  if (!file.type.startsWith("image/")) throw new Error("File foto harus berupa gambar.");
  if (file.size > MAKS_UKURAN) throw new Error("Ukuran foto maksimal 2 MB.");
  await mkdir(DIREKTORI, { recursive: true });
  const ekstensi = file.name.split(".").pop()?.toLowerCase() || "jpg";
  const namaBerkas = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ekstensi}`;
  await writeFile(join(DIREKTORI, namaBerkas), Buffer.from(await file.arrayBuffer()));
  return `/uploads/guru/${namaBerkas}`;
}

async function hapusBerkas(url: string | null) {
  if (!url || !url.startsWith("/uploads/guru/")) return;
  await unlink(join(process.cwd(), "public", url)).catch(() => undefined);
}

function muatUlang() {
  revalidatePath("/admin/guru");
  revalidatePath("/profil");
}

export async function tambahGuru(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const nama = (formData.get("nama") as string | null)?.trim();
  const jabatan = (formData.get("jabatan") as string | null)?.trim();
  const bio = (formData.get("bio") as string | null)?.trim() || null;
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";

  if (!nama || !jabatan) return { error: "Nama dan jabatan wajib diisi." };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"));
    await prisma.guru.create({ data: { nama, jabatan, bio, fotoUrl, urutan, aktif } });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl);
    return { error: e instanceof Error ? e.message : "Gagal menyimpan data guru." };
  }
  muatUlang();
  redirect("/admin/guru");
}

export async function ubahGuru(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const id = Number(formData.get("id"));
  const nama = (formData.get("nama") as string | null)?.trim();
  const jabatan = (formData.get("jabatan") as string | null)?.trim();
  const bio = (formData.get("bio") as string | null)?.trim() || null;
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";

  if (!id) return { error: "ID guru tidak valid." };
  if (!nama || !jabatan) return { error: "Nama dan jabatan wajib diisi." };

  const lama = await prisma.guru.findUnique({ where: { id } });
  if (!lama) return { error: "Data guru tidak ditemukan." };

  let fotoUrl = lama.fotoUrl;
  try {
    const baru = await simpanFoto(formData.get("foto"));
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.fotoUrl);
    }
    await prisma.guru.update({ where: { id }, data: { nama, jabatan, bio, fotoUrl, urutan, aktif } });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal mengubah data guru." };
  }
  muatUlang();
  redirect("/admin/guru");
}

export async function hapusGuru(id: number): Promise<void> {
  const guru = await prisma.guru.findUnique({ where: { id } });
  if (!guru) return;
  await hapusBerkas(guru.fotoUrl);
  await prisma.guru.delete({ where: { id } });
  muatUlang();
}
