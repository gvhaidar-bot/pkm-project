"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hapusBerkas, simpanFoto } from "@/lib/upload";
import { bacaId, bacaUrutan, cekPanjang, pesanGalat, wajibAdmin } from "@/lib/admin";
import type { HasilAksi } from "@/lib/hasil";

export type { HasilAksi };

const FOLDER = "fasilitas";

function muatUlang() {
  revalidatePath("/admin/fasilitas");
  revalidatePath("/fasilitas");
}

export async function tambahFasilitas(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  const nama = (formData.get("nama") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const urutan = bacaUrutan(formData.get("urutan"));
  const aktif = formData.get("aktif") === "on";

  if (!nama || !deskripsi) return { error: "Nama dan deskripsi wajib diisi." };
  const panjang =
    cekPanjang(nama, 200, "Nama") ?? cekPanjang(deskripsi, 2000, "Deskripsi");
  if (panjang) return { error: panjang };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.fasilitas.create({
      data: { nama, deskripsi, gambarUrl: fotoUrl, urutan, aktif },
    });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, FOLDER);
    return { error: pesanGalat(e, "Gagal menyimpan fasilitas.") };
  }
  muatUlang();
  redirect("/admin/fasilitas");
}

export async function ubahFasilitas(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  const id = bacaId(formData.get("id"));
  const nama = (formData.get("nama") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const urutan = bacaUrutan(formData.get("urutan"));
  const aktif = formData.get("aktif") === "on";

  if (!id) return { error: "ID fasilitas tidak valid." };
  if (!nama || !deskripsi) return { error: "Nama dan deskripsi wajib diisi." };
  const panjang =
    cekPanjang(nama, 200, "Nama") ?? cekPanjang(deskripsi, 2000, "Deskripsi");
  if (panjang) return { error: panjang };

  const lama = await prisma.fasilitas.findUnique({ where: { id } });
  if (!lama) return { error: "Fasilitas tidak ditemukan." };

  let fotoBaru: string | null = null;
  try {
    fotoBaru = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.fasilitas.update({
      where: { id },
      data: { nama, deskripsi, gambarUrl: fotoBaru ?? lama.gambarUrl, urutan, aktif },
    });
  } catch (e) {
    if (fotoBaru) await hapusBerkas(fotoBaru, FOLDER);
    return { error: pesanGalat(e, "Gagal mengubah fasilitas.") };
  }
  if (fotoBaru && lama.gambarUrl) await hapusBerkas(lama.gambarUrl, FOLDER);
  muatUlang();
  redirect("/admin/fasilitas");
}

export async function hapusFasilitas(id: number): Promise<void> {
  await wajibAdmin();
  if (!Number.isInteger(id) || id <= 0) return;
  const fasilitas = await prisma.fasilitas.findUnique({ where: { id } });
  if (!fasilitas) return;
  try {
    await prisma.fasilitas.delete({ where: { id } });
  } catch {
    return;
  }
  await hapusBerkas(fasilitas.gambarUrl, FOLDER);
  muatUlang();
}
