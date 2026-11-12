"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adalahGalatDuplikat, buatSlug } from "@/lib/slug";
import { adminLogin } from "@/lib/admin";
import { cekPanjang } from "@/lib/validasi";
import { hapusBerkas, simpanFoto } from "@/lib/upload";

export type HasilAksi = { error?: string } | null;

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
  revalidatePath("/");
  if (slug) revalidatePath(`/program/akademik/${slug}`);
}

export async function tambahProgramAkademik(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  const admin = await adminLogin();
  if (!admin) return { error: "Anda harus login sebagai admin." };

  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const unggulan = formData.get("unggulan") === "on";
  const aktif = formData.get("aktif") === "on";
  const urutan = Number(formData.get("urutan")) || 0;

  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };

  const batas = cekPanjang("Judul", judul, 200) ?? cekPanjang("Ringkasan", ringkasan, 500) ?? cekPanjang("Isi", isi, 50000);
  if (batas) return { error: batas };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let fotoUrl: string | null = null;
  try {
    const slug = await slugUnik(buatSlug(slugMasukan || judul));
    fotoUrl = await simpanFoto(formData.get("foto"), "program-akademik");
    await prisma.programAkademik.create({
      data: { judul, slug, ringkasan, isi, gambarUrl: fotoUrl, unggulan, aktif, urutan, dibuatOlehId: admin.id },
    });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, "program-akademik");
    if (adalahGalatDuplikat(e)) return { error: "Judul sudah dipakai. Coba judul lain." };
    console.error(e);
    return { error: "Gagal menyimpan program akademik." };
  }
  muatUlang();
  redirect("/admin/program-akademik");
}

export async function ubahProgramAkademik(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const id = Number(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const unggulan = formData.get("unggulan") === "on";
  const aktif = formData.get("aktif") === "on";
  const urutan = Number(formData.get("urutan")) || 0;

  if (!id) return { error: "ID program tidak valid." };
  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };

  const batas = cekPanjang("Judul", judul, 200) ?? cekPanjang("Ringkasan", ringkasan, 500) ?? cekPanjang("Isi", isi, 50000);
  if (batas) return { error: batas };

  const lama = await prisma.programAkademik.findUnique({ where: { id } });
  if (!lama) return { error: "Program akademik tidak ditemukan." };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let fotoUrl = lama.gambarUrl;
  try {
    const slug = await slugUnik(buatSlug(slugMasukan || judul), id);
    const baru = await simpanFoto(formData.get("foto"), "program-akademik");
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl, "program-akademik");
    }
    await prisma.programAkademik.update({
      where: { id },
      data: { judul, slug, ringkasan, isi, gambarUrl: fotoUrl, unggulan, aktif, urutan },
    });
    muatUlang(slug);
  } catch (e) {
    if (adalahGalatDuplikat(e)) return { error: "Judul sudah dipakai. Coba judul lain." };
    console.error(e);
    return { error: "Gagal mengubah program akademik." };
  }
  redirect("/admin/program-akademik");
}

export async function hapusProgramAkademik(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const program = await prisma.programAkademik.findUnique({ where: { id } });
  if (!program) return;
  await hapusBerkas(program.gambarUrl, "program-akademik");
  await prisma.programAkademik.delete({ where: { id } });
  muatUlang(program.slug);
}
