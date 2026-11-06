"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hapusBerkas, simpanFoto } from "@/lib/upload";
import { bacaId, cekPanjang, pesanGalat, wajibAdmin } from "@/lib/admin";
import type { HasilAksi } from "@/lib/hasil";

export type { HasilAksi };

const FOLDER = "prestasi";

function muatUlang() {
  revalidatePath("/admin/prestasi");
  revalidatePath("/");
}

export async function tambahPrestasi(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim() || null;
  const tahun = Number(formData.get("tahun"));
  const tingkat = (formData.get("tingkat") as string | null)?.trim() || null;

  if (!judul) return { error: "Judul prestasi wajib diisi." };
  if (!tahun || !Number.isInteger(tahun) || tahun < 1900 || tahun > 2100)
    return { error: "Tahun tidak valid." };
  const panjang =
    cekPanjang(judul, 200, "Judul") ?? cekPanjang(deskripsi, 2000, "Deskripsi");
  if (panjang) return { error: panjang };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.prestasi.create({
      data: { judul, deskripsi, tahun, tingkat, gambarUrl: fotoUrl },
    });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, FOLDER);
    return { error: pesanGalat(e, "Gagal menyimpan prestasi.") };
  }
  muatUlang();
  redirect("/admin/prestasi");
}

export async function ubahPrestasi(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  const id = bacaId(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim() || null;
  const tahun = Number(formData.get("tahun"));
  const tingkat = (formData.get("tingkat") as string | null)?.trim() || null;

  if (!id) return { error: "ID prestasi tidak valid." };
  if (!judul) return { error: "Judul prestasi wajib diisi." };
  if (!tahun || !Number.isInteger(tahun) || tahun < 1900 || tahun > 2100)
    return { error: "Tahun tidak valid." };
  const panjang =
    cekPanjang(judul, 200, "Judul") ?? cekPanjang(deskripsi, 2000, "Deskripsi");
  if (panjang) return { error: panjang };

  const lama = await prisma.prestasi.findUnique({ where: { id } });
  if (!lama) return { error: "Prestasi tidak ditemukan." };

  let fotoBaru: string | null = null;
  try {
    fotoBaru = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.prestasi.update({
      where: { id },
      data: { judul, deskripsi, tahun, tingkat, gambarUrl: fotoBaru ?? lama.gambarUrl },
    });
  } catch (e) {
    if (fotoBaru) await hapusBerkas(fotoBaru, FOLDER);
    return { error: pesanGalat(e, "Gagal mengubah prestasi.") };
  }
  if (fotoBaru && lama.gambarUrl) await hapusBerkas(lama.gambarUrl, FOLDER);
  muatUlang();
  redirect("/admin/prestasi");
}

export async function hapusPrestasi(id: number): Promise<void> {
  await wajibAdmin();
  if (!Number.isInteger(id) || id <= 0) return;
  const prestasi = await prisma.prestasi.findUnique({ where: { id } });
  if (!prestasi) return;
  try {
    await prisma.prestasi.delete({ where: { id } });
  } catch {
    return;
  }
  await hapusBerkas(prestasi.gambarUrl, FOLDER);
  muatUlang();
}
