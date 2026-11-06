"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buatSlug } from "@/lib/slug";
import { MAKS_FOTO_GALERI, hapusBerkas, simpanFoto } from "@/lib/upload";
import { bacaId, cekPanjang, idAdmin, pesanGalat, wajibAdmin } from "@/lib/admin";
import type { HasilAksi } from "@/lib/hasil";

export type { HasilAksi };

const FOLDER = "berita";

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
  if (slug) revalidatePath(`/berita/${slug}`);
}

export async function tambahBerita(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  await wajibAdmin();
  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const published = formData.get("published") === "on";

  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };
  const panjang =
    cekPanjang(judul, 200, "Judul") ??
    cekPanjang(ringkasan, 500, "Ringkasan") ??
    cekPanjang(isi, 50000, "Isi");
  if (panjang) return { error: panjang };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();
  const adminId = await idAdmin();

  let fotoUrl: string | null = null;
  try {
    const slug = await slugUnik(buatSlug(slugMasukan || judul));
    fotoUrl = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.berita.create({
      data: {
        judul,
        slug,
        ringkasan,
        isi,
        gambarUrl: fotoUrl,
        published,
        publishedAt: published ? new Date() : null,
        authorId: adminId,
      },
    });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, FOLDER);
    return { error: pesanGalat(e, "Gagal menyimpan berita.") };
  }
  muatUlang();
  redirect("/admin/berita");
}

export async function ubahBerita(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  await wajibAdmin();
  const id = bacaId(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const ringkasan = (formData.get("ringkasan") as string | null)?.trim();
  const isi = (formData.get("isi") as string | null)?.trim();
  const published = formData.get("published") === "on";

  if (!id) return { error: "ID berita tidak valid." };
  if (!judul || !ringkasan || !isi) return { error: "Judul, ringkasan, dan isi wajib diisi." };
  const panjang =
    cekPanjang(judul, 200, "Judul") ??
    cekPanjang(ringkasan, 500, "Ringkasan") ??
    cekPanjang(isi, 50000, "Isi");
  if (panjang) return { error: panjang };

  const lama = await prisma.berita.findUnique({ where: { id } });
  if (!lama) return { error: "Berita tidak ditemukan." };

  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  let slug = lama.slug;
  let fotoBaru: string | null = null;
  try {
    slug = await slugUnik(buatSlug(slugMasukan || judul), id);
    fotoBaru = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.berita.update({
      where: { id },
      data: {
        judul,
        slug,
        ringkasan,
        isi,
        gambarUrl: fotoBaru ?? lama.gambarUrl,
        published,
        publishedAt: published ? (lama.publishedAt ?? new Date()) : null,
      },
    });
  } catch (e) {
    if (fotoBaru) await hapusBerkas(fotoBaru, FOLDER);
    return { error: pesanGalat(e, "Gagal mengubah berita.") };
  }
  // Foto lama baru dihapus setelah database berhasil diperbarui.
  if (fotoBaru && lama.gambarUrl) await hapusBerkas(lama.gambarUrl, FOLDER);
  muatUlang(slug);
  redirect("/admin/berita");
}

export async function hapusBerita(id: number): Promise<void> {
  await wajibAdmin();
  if (!Number.isInteger(id) || id <= 0) return;
  const berita = await prisma.berita.findUnique({
    where: { id },
    include: { foto: true },
  });
  if (!berita) return;
  // Baris database dihapus dulu; berkas dihapus setelahnya. Bila penghapusan
  // database gagal, berkas tetap dipertahankan agar tidak ada tautan mati.
  try {
    await prisma.berita.delete({ where: { id } });
  } catch {
    return;
  }
  await hapusBerkas(berita.gambarUrl, FOLDER);
  for (const f of berita.foto) await hapusBerkas(f.url, FOLDER);
  muatUlang(berita.slug);
}

export async function tambahFotoBerita(
  beritaId: number,
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  if (!Number.isInteger(beritaId) || beritaId <= 0)
    return { error: "Berita tidak ditemukan." };
  const berita = await prisma.berita.findUnique({ where: { id: beritaId } });
  if (!berita) return { error: "Berita tidak ditemukan." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };

  const jumlah = await prisma.beritaFoto.count({ where: { beritaId } });
  if (jumlah + files.length > MAKS_FOTO_GALERI)
    return {
      error: `Maksimal ${MAKS_FOTO_GALERI} foto per berita (saat ini ${jumlah}).`,
    };

  const tersimpan: { id: number; url: string }[] = [];
  try {
    let n = 0;
    for (const file of files) {
      const url = await simpanFoto(file, FOLDER);
      if (!url) continue;
      const dibuat = await prisma.beritaFoto.create({
        data: { url, beritaId, urutan: jumlah + n++ },
      });
      tersimpan.push({ id: dibuat.id, url });
    }
  } catch (e) {
    // Rollback penuh: baris database yang sudah dibuat ikut dihapus.
    for (const t of tersimpan) {
      await prisma.beritaFoto.delete({ where: { id: t.id } }).catch(() => undefined);
      await hapusBerkas(t.url, FOLDER);
    }
    return { error: pesanGalat(e, "Gagal mengunggah foto.") };
  }
  muatUlang(berita.slug);
  return null;
}

export async function hapusFotoBerita(fotoId: number): Promise<void> {
  await wajibAdmin();
  if (!Number.isInteger(fotoId) || fotoId <= 0) return;
  const foto = await prisma.beritaFoto.findUnique({
    where: { id: fotoId },
    include: { berita: true },
  });
  if (!foto) return;
  try {
    await prisma.beritaFoto.delete({ where: { id: fotoId } });
  } catch {
    return;
  }
  await hapusBerkas(foto.url, FOLDER);
  muatUlang(foto.berita.slug);
}
