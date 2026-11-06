"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buatSlug } from "@/lib/slug";
import { hapusBerkas, simpanFoto } from "@/lib/upload";
import { bacaId, bacaUrutan, cekPanjang, pesanGalat, wajibAdmin } from "@/lib/admin";
import type { HasilAksi } from "@/lib/hasil";

export type { HasilAksi };

const FOLDER = "program-akademik";

async function slugUnik(dasar: string, kecualiId?: number): Promise<string> {
  let slug = dasar;
  let i = 2;
  while (true) {
    const ada = await prisma.programAkademik.findUnique({ where: { slug } });
    if (!ada || ada.id === kecualiId) return slug;
    slug = `${dasar}-${i++}`;
  }
}

function muatUlang(slug?: string) {
  revalidatePath("/admin/program-akademik");
  revalidatePath("/program/akademik");
  revalidatePath("/program/unggulan");
  if (slug) revalidatePath(`/program/akademik/${slug}`);
}

export async function tambahProgramAkademik(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const unggulan = formData.get("unggulan") === "on";
  const aktif = formData.get("aktif") === "on";
  const urutan = bacaUrutan(formData.get("urutan"));

  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };
  const panjang =
    cekPanjang(judul, 200, "Judul") ??
    cekPanjang(ringkasan, 500, "Ringkasan") ??
    cekPanjang(isi, 50000, "Isi");
  if (panjang) return { error: panjang };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let fotoUrl: string | null = null;
  try {
    const slug = await slugUnik(buatSlug(slugMasukan || judul));
    fotoUrl = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.programAkademik.create({
      data: { judul, slug, ringkasan, isi, gambarUrl: fotoUrl, unggulan, aktif, urutan },
    });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, FOLDER);
    return { error: pesanGalat(e, "Gagal menyimpan program akademik.") };
  }
  muatUlang();
  redirect("/admin/program-akademik");
}

export async function ubahProgramAkademik(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  const id = bacaId(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const unggulan = formData.get("unggulan") === "on";
  const aktif = formData.get("aktif") === "on";
  const urutan = bacaUrutan(formData.get("urutan"));

  if (!id) return { error: "ID program tidak valid." };
  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };
  const panjang =
    cekPanjang(judul, 200, "Judul") ??
    cekPanjang(ringkasan, 500, "Ringkasan") ??
    cekPanjang(isi, 50000, "Isi");
  if (panjang) return { error: panjang };

  const lama = await prisma.programAkademik.findUnique({ where: { id } });
  if (!lama) return { error: "Program akademik tidak ditemukan." };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let slug = lama.slug;
  let fotoBaru: string | null = null;
  try {
    slug = await slugUnik(buatSlug(slugMasukan || judul), id);
    fotoBaru = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.programAkademik.update({
      where: { id },
      data: { judul, slug, ringkasan, isi, gambarUrl: fotoBaru ?? lama.gambarUrl, unggulan, aktif, urutan },
    });
  } catch (e) {
    if (fotoBaru) await hapusBerkas(fotoBaru, FOLDER);
    return { error: pesanGalat(e, "Gagal mengubah program akademik.") };
  }
  if (fotoBaru && lama.gambarUrl) await hapusBerkas(lama.gambarUrl, FOLDER);
  muatUlang(slug);
  redirect("/admin/program-akademik");
}

export async function hapusProgramAkademik(id: number): Promise<void> {
  await wajibAdmin();
  if (!Number.isInteger(id) || id <= 0) return;
  const program = await prisma.programAkademik.findUnique({ where: { id } });
  if (!program) return;
  try {
    await prisma.programAkademik.delete({ where: { id } });
  } catch {
    return;
  }
  await hapusBerkas(program.gambarUrl, FOLDER);
  muatUlang(program.slug);
}
