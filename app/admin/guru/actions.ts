"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { hapusBerkas, simpanFoto } from "@/lib/upload";
import { bacaId, bacaUrutan, cekPanjang, pesanGalat, wajibAdmin } from "@/lib/admin";
import type { HasilAksi } from "@/lib/hasil";

export type { HasilAksi };

const FOLDER = "guru";

function muatUlang() {
  revalidatePath("/admin/guru");
  revalidatePath("/profil");
}

export async function tambahGuru(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  await wajibAdmin();
  const nama = (formData.get("nama") as string | null)?.trim();
  const jabatan = (formData.get("jabatan") as string | null)?.trim();
  const bio = (formData.get("bio") as string | null)?.trim() || null;
  const urutan = bacaUrutan(formData.get("urutan"));
  const aktif = formData.get("aktif") === "on";

  if (!nama || !jabatan) return { error: "Nama dan jabatan wajib diisi." };
  const panjang =
    cekPanjang(nama, 200, "Nama") ??
    cekPanjang(jabatan, 200, "Jabatan") ??
    cekPanjang(bio, 2000, "Bio");
  if (panjang) return { error: panjang };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.guru.create({ data: { nama, jabatan, bio, fotoUrl, urutan, aktif } });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, FOLDER);
    return { error: pesanGalat(e, "Gagal menyimpan data guru.") };
  }
  muatUlang();
  redirect("/admin/guru");
}

export async function ubahGuru(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  await wajibAdmin();
  const id = bacaId(formData.get("id"));
  const nama = (formData.get("nama") as string | null)?.trim();
  const jabatan = (formData.get("jabatan") as string | null)?.trim();
  const bio = (formData.get("bio") as string | null)?.trim() || null;
  const urutan = bacaUrutan(formData.get("urutan"));
  const aktif = formData.get("aktif") === "on";

  if (!id) return { error: "ID guru tidak valid." };
  if (!nama || !jabatan) return { error: "Nama dan jabatan wajib diisi." };
  const panjang =
    cekPanjang(nama, 200, "Nama") ??
    cekPanjang(jabatan, 200, "Jabatan") ??
    cekPanjang(bio, 2000, "Bio");
  if (panjang) return { error: panjang };

  const lama = await prisma.guru.findUnique({ where: { id } });
  if (!lama) return { error: "Data guru tidak ditemukan." };

  let fotoBaru: string | null = null;
  try {
    fotoBaru = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.guru.update({
      where: { id },
      data: { nama, jabatan, bio, fotoUrl: fotoBaru ?? lama.fotoUrl, urutan, aktif },
    });
  } catch (e) {
    if (fotoBaru) await hapusBerkas(fotoBaru, FOLDER);
    return { error: pesanGalat(e, "Gagal mengubah data guru.") };
  }
  if (fotoBaru && lama.fotoUrl) await hapusBerkas(lama.fotoUrl, FOLDER);
  muatUlang();
  redirect("/admin/guru");
}

export async function hapusGuru(id: number): Promise<void> {
  await wajibAdmin();
  if (!Number.isInteger(id) || id <= 0) return;
  const guru = await prisma.guru.findUnique({ where: { id } });
  if (!guru) return;
  try {
    await prisma.guru.delete({ where: { id } });
  } catch {
    return;
  }
  await hapusBerkas(guru.fotoUrl, FOLDER);
  muatUlang();
}
