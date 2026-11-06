"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { MAKS_FOTO_GALERI, hapusBerkas, simpanFoto } from "@/lib/upload";
import { bacaId, cekPanjang, pesanGalat, wajibAdmin } from "@/lib/admin";
import type { HasilAksi } from "@/lib/hasil";

export type { HasilAksi };

const FOLDER = "kegiatan";

function muatUlang() {
  revalidatePath("/admin/kegiatan");
  revalidatePath("/galeri");
}

function bacaTanggal(nilai: FormDataEntryValue | null): Date | null {
  if (typeof nilai !== "string" || !nilai) return null;
  const d = new Date(nilai);
  return isNaN(d.getTime()) ? null : d;
}

export async function tambahKegiatan(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const tanggal = bacaTanggal(formData.get("tanggal"));
  const lokasi = (formData.get("lokasi") as string | null)?.trim() || null;

  if (!judul || !deskripsi) return { error: "Judul dan deskripsi wajib diisi." };
  if (!tanggal) return { error: "Tanggal kegiatan wajib diisi." };
  const panjang =
    cekPanjang(judul, 200, "Judul") ?? cekPanjang(deskripsi, 2000, "Deskripsi");
  if (panjang) return { error: panjang };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.kegiatan.create({
      data: { judul, deskripsi, tanggal, lokasi, gambarUrl: fotoUrl },
    });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, FOLDER);
    return { error: pesanGalat(e, "Gagal menyimpan kegiatan.") };
  }
  muatUlang();
  redirect("/admin/kegiatan");
}

export async function ubahKegiatan(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  const id = bacaId(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const tanggal = bacaTanggal(formData.get("tanggal"));
  const lokasi = (formData.get("lokasi") as string | null)?.trim() || null;

  if (!id) return { error: "ID kegiatan tidak valid." };
  if (!judul || !deskripsi) return { error: "Judul dan deskripsi wajib diisi." };
  if (!tanggal) return { error: "Tanggal kegiatan wajib diisi." };
  const panjang =
    cekPanjang(judul, 200, "Judul") ?? cekPanjang(deskripsi, 2000, "Deskripsi");
  if (panjang) return { error: panjang };

  const lama = await prisma.kegiatan.findUnique({ where: { id } });
  if (!lama) return { error: "Kegiatan tidak ditemukan." };

  let fotoBaru: string | null = null;
  try {
    fotoBaru = await simpanFoto(formData.get("foto"), FOLDER);
    await prisma.kegiatan.update({
      where: { id },
      data: { judul, deskripsi, tanggal, lokasi, gambarUrl: fotoBaru ?? lama.gambarUrl },
    });
  } catch (e) {
    if (fotoBaru) await hapusBerkas(fotoBaru, FOLDER);
    return { error: pesanGalat(e, "Gagal mengubah kegiatan.") };
  }
  if (fotoBaru && lama.gambarUrl) await hapusBerkas(lama.gambarUrl, FOLDER);
  muatUlang();
  redirect("/admin/kegiatan");
}

export async function hapusKegiatan(id: number): Promise<void> {
  await wajibAdmin();
  if (!Number.isInteger(id) || id <= 0) return;
  const kegiatan = await prisma.kegiatan.findUnique({
    where: { id },
    include: { foto: true },
  });
  if (!kegiatan) return;
  try {
    await prisma.kegiatan.delete({ where: { id } });
  } catch {
    return;
  }
  for (const f of kegiatan.foto) await hapusBerkas(f.url, FOLDER);
  await hapusBerkas(kegiatan.gambarUrl, FOLDER);
  muatUlang();
}

export async function tambahFotoKegiatan(
  kegiatanId: number,
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  await wajibAdmin();
  if (!Number.isInteger(kegiatanId) || kegiatanId <= 0)
    return { error: "Kegiatan tidak ditemukan." };
  const kegiatan = await prisma.kegiatan.findUnique({ where: { id: kegiatanId } });
  if (!kegiatan) return { error: "Kegiatan tidak ditemukan." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };

  const jumlah = await prisma.kegiatanFoto.count({ where: { kegiatanId } });
  if (jumlah + files.length > MAKS_FOTO_GALERI)
    return {
      error: `Maksimal ${MAKS_FOTO_GALERI} foto per kegiatan (saat ini ${jumlah}).`,
    };

  const tersimpan: { id: number; url: string }[] = [];
  try {
    let n = 0;
    for (const file of files) {
      const url = await simpanFoto(file, FOLDER);
      if (!url) continue;
      const dibuat = await prisma.kegiatanFoto.create({
        data: { url, kegiatanId, urutan: jumlah + n++ },
      });
      tersimpan.push({ id: dibuat.id, url });
    }
  } catch (e) {
    for (const t of tersimpan) {
      await prisma.kegiatanFoto.delete({ where: { id: t.id } }).catch(() => undefined);
      await hapusBerkas(t.url, FOLDER);
    }
    return { error: pesanGalat(e, "Gagal mengunggah foto.") };
  }
  muatUlang();
  return null;
}

export async function hapusFotoKegiatan(id: number): Promise<void> {
  await wajibAdmin();
  if (!Number.isInteger(id) || id <= 0) return;
  const foto = await prisma.kegiatanFoto.findUnique({ where: { id } });
  if (!foto) return;
  try {
    await prisma.kegiatanFoto.delete({ where: { id } });
  } catch {
    return;
  }
  await hapusBerkas(foto.url, FOLDER);
  muatUlang();
}
