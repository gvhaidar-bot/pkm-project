"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adminLogin } from "@/lib/admin";
import { hapusBerkas, simpanFoto } from "@/lib/upload";

export type HasilAksi = { error?: string } | null;

function muatUlang() {
  revalidatePath("/admin/prestasi");
  revalidatePath("/");
}

export async function tambahPrestasi(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim() || null;
  const tahun = Number(formData.get("tahun"));
  const tingkat = (formData.get("tingkat") as string | null)?.trim() || null;

  if (!judul) return { error: "Judul prestasi wajib diisi." };
  if (!tahun || tahun < 1900 || tahun > 2100) return { error: "Tahun tidak valid." };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"), "prestasi");
    await prisma.prestasi.create({ data: { judul, deskripsi, tahun, tingkat, gambarUrl: fotoUrl } });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, "prestasi");
    return { error: e instanceof Error ? e.message : "Gagal menyimpan prestasi." };
  }
  muatUlang();
  redirect("/admin/prestasi");
}

export async function ubahPrestasi(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

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
    const baru = await simpanFoto(formData.get("foto"), "prestasi");
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl, "prestasi");
    }
    await prisma.prestasi.update({ where: { id }, data: { judul, deskripsi, tahun, tingkat, gambarUrl: fotoUrl } });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal mengubah prestasi." };
  }
  muatUlang();
  redirect("/admin/prestasi");
}

export async function hapusPrestasi(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const prestasi = await prisma.prestasi.findUnique({
    where: { id },
    include: { foto: true },
  });
  if (!prestasi) return;
  await hapusBerkas(prestasi.gambarUrl, "prestasi");
  for (const f of prestasi.foto) await hapusBerkas(f.url, "prestasi");
  await prisma.prestasi.delete({ where: { id } });
  muatUlang();
}

export async function tambahFotoPrestasi(
  prestasiId: number,
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const prestasi = await prisma.prestasi.findUnique({ where: { id: prestasiId } });
  if (!prestasi) return { error: "Prestasi tidak ditemukan." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };

  const tersimpan: string[] = [];
  try {
    const jumlah = await prisma.prestasiFoto.count({ where: { prestasiId } });
    let n = 0;
    for (const file of files) {
      const url = await simpanFoto(file, "prestasi");
      if (!url) continue;
      tersimpan.push(url);
      await prisma.prestasiFoto.create({
        data: { url, prestasiId, urutan: jumlah + n++ },
      });
    }
  } catch (e) {
    for (const url of tersimpan) await hapusBerkas(url, "prestasi");
    return { error: e instanceof Error ? e.message : "Gagal mengunggah foto." };
  }
  muatUlang();
  return null;
}

export async function hapusFotoPrestasi(fotoId: number): Promise<void> {
  if (!(await adminLogin())) return;
  const foto = await prisma.prestasiFoto.findUnique({ where: { id: fotoId } });
  if (!foto) return;
  await hapusBerkas(foto.url, "prestasi");
  await prisma.prestasiFoto.delete({ where: { id: fotoId } });
  muatUlang();
}
