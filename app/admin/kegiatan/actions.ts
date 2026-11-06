"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adminLogin } from "@/lib/admin";
import { cekPanjang } from "@/lib/validasi";
import { hapusBerkas, simpanFoto } from "@/lib/upload";

export type HasilAksi = { error?: string } | null;

function muatUlang() {
  revalidatePath("/admin/kegiatan");
  revalidatePath("/galeri");
  revalidatePath("/");
}

function bacaTanggal(nilai: FormDataEntryValue | null): Date | null {
  if (typeof nilai !== "string" || !nilai) return null;
  const d = new Date(nilai);
  return isNaN(d.getTime()) ? null : d;
}

export async function tambahKegiatan(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const tanggal = bacaTanggal(formData.get("tanggal"));
  const lokasi = (formData.get("lokasi") as string | null)?.trim() || null;

  if (!judul || !deskripsi) return { error: "Judul dan deskripsi wajib diisi." };

  const batas = cekPanjang("Judul", judul, 200) ?? cekPanjang("Deskripsi", deskripsi, 5000) ?? cekPanjang("Lokasi", lokasi, 200);
  if (batas) return { error: batas };
  if (!tanggal) return { error: "Tanggal kegiatan wajib diisi." };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"), "kegiatan");
    await prisma.kegiatan.create({ data: { judul, deskripsi, tanggal, lokasi, gambarUrl: fotoUrl } });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, "kegiatan");
    console.error(e);
    return { error: "Gagal menyimpan kegiatan." };
  }
  muatUlang();
  redirect("/admin/kegiatan");
}

export async function ubahKegiatan(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const id = Number(formData.get("id"));
  const judul = (formData.get("judul") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const tanggal = bacaTanggal(formData.get("tanggal"));
  const lokasi = (formData.get("lokasi") as string | null)?.trim() || null;

  if (!id) return { error: "ID kegiatan tidak valid." };
  if (!judul || !deskripsi) return { error: "Judul dan deskripsi wajib diisi." };

  const batas = cekPanjang("Judul", judul, 200) ?? cekPanjang("Deskripsi", deskripsi, 5000) ?? cekPanjang("Lokasi", lokasi, 200);
  if (batas) return { error: batas };
  if (!tanggal) return { error: "Tanggal kegiatan wajib diisi." };

  const lama = await prisma.kegiatan.findUnique({ where: { id } });
  if (!lama) return { error: "Kegiatan tidak ditemukan." };

  let fotoUrl = lama.gambarUrl;
  try {
    const baru = await simpanFoto(formData.get("foto"), "kegiatan");
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl, "kegiatan");
    }
    await prisma.kegiatan.update({ where: { id }, data: { judul, deskripsi, tanggal, lokasi, gambarUrl: fotoUrl } });
  } catch (e) {
    console.error(e);
    return { error: "Gagal mengubah kegiatan." };
  }
  muatUlang();
  redirect("/admin/kegiatan");
}

export async function hapusKegiatan(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const kegiatan = await prisma.kegiatan.findUnique({
    where: { id },
    include: { foto: true },
  });
  if (!kegiatan) return;
  for (const f of kegiatan.foto) await hapusBerkas(f.url, "kegiatan");
  await hapusBerkas(kegiatan.gambarUrl, "kegiatan");
  await prisma.kegiatan.delete({ where: { id } });
  muatUlang();
}

export async function tambahFotoKegiatan(
  kegiatanId: number,
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const kegiatan = await prisma.kegiatan.findUnique({ where: { id: kegiatanId } });
  if (!kegiatan) return { error: "Kegiatan tidak ditemukan." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };
  if (files.length > 10) return { error: "Maksimal 10 foto sekali unggah." };

  const tersimpan: string[] = [];
  try {
    const jumlah = await prisma.kegiatanFoto.count({ where: { kegiatanId } });
    let n = 0;
    for (const file of files) {
      const url = await simpanFoto(file, "kegiatan");
      if (!url) continue;
      tersimpan.push(url);
      await prisma.kegiatanFoto.create({
        data: { url, kegiatanId, urutan: jumlah + n++ },
      });
    }
  } catch (e) {
    for (const url of tersimpan) await hapusBerkas(url, "kegiatan");
    console.error(e);
    return { error: "Gagal mengunggah foto." };
  }
  muatUlang();
  return null;
}

export async function hapusFotoKegiatan(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const foto = await prisma.kegiatanFoto.findUnique({ where: { id } });
  if (!foto) return;
  await hapusBerkas(foto.url, "kegiatan");
  await prisma.kegiatanFoto.delete({ where: { id } });
  muatUlang();
}
