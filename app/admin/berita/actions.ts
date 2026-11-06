"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adalahGalatDuplikat, buatSlug } from "@/lib/slug";
import { adminLogin } from "@/lib/admin";
import { hapusBerkas, simpanFoto } from "@/lib/upload";

export type HasilAksi = { error?: string } | null;

async function slugUnik(dasar: string, kecualiId?: number): Promise<string> {
  let slug = dasar;
  let i = 2;
  while (true) {
    const ada = await prisma.berita.findUnique({ where: { slug } });
    if (!ada || ada.id === kecualiId) return slug;
    slug = `${dasar}-${i++}`;
  }
}

function muatUlang(slug?: string) {
  revalidatePath("/admin/berita");
  revalidatePath("/berita");
  revalidatePath("/");
  if (slug) revalidatePath(`/berita/${slug}`);
}

export async function tambahBerita(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const admin = await adminLogin();
  if (!admin) return { error: "Anda harus login sebagai admin." };

  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const published = formData.get("published") === "on";

  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let fotoUrl: string | null = null;
  try {
    const slug = await slugUnik(buatSlug(slugMasukan || judul));
    fotoUrl = await simpanFoto(formData.get("foto"), "berita");
    await prisma.berita.create({
      data: {
        judul,
        slug,
        ringkasan,
        isi,
        gambarUrl: fotoUrl,
        published,
        publishedAt: published ? new Date() : null,
        authorId: admin.id,
      },
    });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, "berita");
    if (adalahGalatDuplikat(e)) return { error: "Judul sudah dipakai. Coba judul lain." };
    return { error: e instanceof Error ? e.message : "Gagal menyimpan berita." };
  }
  muatUlang();
  redirect("/admin/berita");
}

export async function ubahBerita(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const admin = await adminLogin();
  if (!admin) return { error: "Anda harus login sebagai admin." };

  const id = Number(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const published = formData.get("published") === "on";

  if (!id) return { error: "ID berita tidak valid." };
  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };

  const lama = await prisma.berita.findUnique({ where: { id } });
  if (!lama) return { error: "Berita tidak ditemukan." };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let fotoUrl = lama.gambarUrl;
  try {
    const slug = await slugUnik(buatSlug(slugMasukan || judul), id);
    const baru = await simpanFoto(formData.get("foto"), "berita");
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl, "berita");
    }
    await prisma.berita.update({
      where: { id },
      data: {
        judul,
        slug,
        ringkasan,
        isi,
        gambarUrl: fotoUrl,
        published,
        publishedAt: published ? (lama.publishedAt ?? new Date()) : lama.publishedAt,
      },
    });
    muatUlang(slug);
  } catch (e) {
    if (adalahGalatDuplikat(e)) return { error: "Judul sudah dipakai. Coba judul lain." };
    return { error: e instanceof Error ? e.message : "Gagal mengubah berita." };
  }
  redirect("/admin/berita");
}

export async function hapusBerita(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const berita = await prisma.berita.findUnique({
    where: { id },
    include: { foto: true },
  });
  if (!berita) return;
  await hapusBerkas(berita.gambarUrl, "berita");
  for (const f of berita.foto) await hapusBerkas(f.url, "berita");
  await prisma.berita.delete({ where: { id } });
  muatUlang(berita.slug);
}

export async function tambahFotoBerita(
  beritaId: number,
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const berita = await prisma.berita.findUnique({ where: { id: beritaId } });
  if (!berita) return { error: "Berita tidak ditemukan." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };

  const tersimpan: string[] = [];
  try {
    const jumlah = await prisma.beritaFoto.count({ where: { beritaId } });
    let n = 0;
    for (const file of files) {
      const url = await simpanFoto(file, "berita");
      if (!url) continue;
      tersimpan.push(url);
      await prisma.beritaFoto.create({
        data: { url, beritaId, urutan: jumlah + n++ },
      });
    }
  } catch (e) {
    for (const url of tersimpan) await hapusBerkas(url, "berita");
    return { error: e instanceof Error ? e.message : "Gagal mengunggah foto." };
  }
  muatUlang(berita.slug);
  return null;
}

export async function hapusFotoBerita(fotoId: number): Promise<void> {
  if (!(await adminLogin())) return;
  const foto = await prisma.beritaFoto.findUnique({
    where: { id: fotoId },
    include: { berita: true },
  });
  if (!foto) return;
  await hapusBerkas(foto.url, "berita");
  await prisma.beritaFoto.delete({ where: { id: fotoId } });
  muatUlang(foto.berita.slug);
}
