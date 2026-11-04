"use server";

import { mkdir, unlink, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buatSlug } from "@/lib/slug";

const DIREKTORI = join(process.cwd(), "public", "uploads", "program-akademik");
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
  return `/uploads/program-akademik/${namaBerkas}`;
}

async function hapusBerkas(url: string | null) {
  if (!url || !url.startsWith("/uploads/program-akademik/")) return;
  await unlink(join(process.cwd(), "public", url)).catch(() => undefined);
}

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
  if (slug) revalidatePath(`/program/akademik/${slug}`);
}

export async function tambahProgramAkademik(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const unggulan = formData.get("unggulan") === "on";
  const aktif = formData.get("aktif") === "on";
  const urutan = Number(formData.get("urutan")) || 0;

  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let fotoUrl: string | null = null;
  try {
    const slug = await slugUnik(buatSlug(slugMasukan || judul));
    fotoUrl = await simpanFoto(formData.get("foto"));
    await prisma.programAkademik.create({
      data: { judul, slug, ringkasan, isi, gambarUrl: fotoUrl, unggulan, aktif, urutan },
    });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl);
    return { error: e instanceof Error ? e.message : "Gagal menyimpan program akademik." };
  }
  muatUlang();
  redirect("/admin/program-akademik");
}

export async function ubahProgramAkademik(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  const id = Number(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const unggulan = formData.get("unggulan") === "on";
  const aktif = formData.get("aktif") === "on";
  const urutan = Number(formData.get("urutan")) || 0;

  if (!id) return { error: "ID program tidak valid." };
  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };

  const lama = await prisma.programAkademik.findUnique({ where: { id } });
  if (!lama) return { error: "Program akademik tidak ditemukan." };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let fotoUrl = lama.gambarUrl;
  try {
    const slug = await slugUnik(buatSlug(slugMasukan || judul), id);
    const baru = await simpanFoto(formData.get("foto"));
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl);
    }
    await prisma.programAkademik.update({
      where: { id },
      data: { judul, slug, ringkasan, isi, gambarUrl: fotoUrl, unggulan, aktif, urutan },
    });
    muatUlang(slug);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal mengubah program akademik." };
  }
  redirect("/admin/program-akademik");
}

export async function hapusProgramAkademik(id: number): Promise<void> {
  const program = await prisma.programAkademik.findUnique({ where: { id } });
  if (!program) return;
  await hapusBerkas(program.gambarUrl);
  await prisma.programAkademik.delete({ where: { id } });
  muatUlang(program.slug);
}
