"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { adminLogin } from "@/lib/admin";
import { hapusBerkas, simpanFoto } from "@/lib/upload";

export type HasilAksi = { error?: string } | null;

function muatUlang() {
  revalidatePath("/admin/galeri");
  revalidatePath("/galeri");
  revalidatePath("/");
}

export async function tambahFotoGaleri(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  const admin = await adminLogin();
  if (!admin) return { error: "Anda harus login sebagai admin." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };
  if (files.length > 10) return { error: "Maksimal 10 foto sekali unggah." };

  const tersimpan: string[] = [];
  try {
    for (const file of files) {
      const url = await simpanFoto(file, "galeri");
      if (!url) continue;
      tersimpan.push(url);
      await prisma.galeri.create({ data: { gambarUrl: url, diunggahOlehId: admin.id } });
    }
  } catch (e) {
    for (const url of tersimpan) await hapusBerkas(url, "galeri");
    console.error(e);
    return { error: "Gagal mengunggah foto." };
  }
  muatUlang();
  return null;
}

export async function hapusFotoGaleri(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const foto = await prisma.galeri.findUnique({ where: { id } });
  if (!foto) return;
  await hapusBerkas(foto.gambarUrl, "galeri");
  await prisma.galeri.delete({ where: { id } });
  muatUlang();
}

export async function ubahAktifGaleri(id: number, aktif: boolean): Promise<void> {
  if (!(await adminLogin())) return;
  await prisma.galeri.update({ where: { id }, data: { aktif } });
  muatUlang();
}
