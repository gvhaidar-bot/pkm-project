"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adminLogin } from "@/lib/admin";
import { cekPanjang } from "@/lib/validasi";
import { hapusBerkas, simpanFoto } from "@/lib/upload";

export type HasilAksi = { error?: string } | null;

function muatUlang() {
  revalidatePath("/admin/fasilitas");
  revalidatePath("/fasilitas");
  revalidatePath("/");
}

export async function tambahFasilitas(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const nama = (formData.get("nama") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";
  const unggulan = formData.get("unggulan") === "on";

  if (!nama || !deskripsi) return { error: "Nama dan deskripsi wajib diisi." };

  const batas = cekPanjang("Nama", nama, 200) ?? cekPanjang("Deskripsi", deskripsi, 5000);
  if (batas) return { error: batas };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"), "fasilitas");
    await prisma.fasilitas.create({ data: { nama, deskripsi, gambarUrl: fotoUrl, urutan, aktif, unggulan } });
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, "fasilitas");
    console.error(e);
    return { error: "Gagal menyimpan fasilitas." };
  }
  muatUlang();
  redirect("/admin/fasilitas");
}

export async function ubahFasilitas(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const id = Number(formData.get("id"));
  const nama = (formData.get("nama") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";
  const unggulan = formData.get("unggulan") === "on";

  if (!id) return { error: "ID fasilitas tidak valid." };
  if (!nama || !deskripsi) return { error: "Nama dan deskripsi wajib diisi." };

  const batas = cekPanjang("Nama", nama, 200) ?? cekPanjang("Deskripsi", deskripsi, 5000);
  if (batas) return { error: batas };

  const lama = await prisma.fasilitas.findUnique({ where: { id } });
  if (!lama) return { error: "Fasilitas tidak ditemukan." };

  let fotoUrl = lama.gambarUrl;
  try {
    const baru = await simpanFoto(formData.get("foto"), "fasilitas");
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl, "fasilitas");
    }
    await prisma.fasilitas.update({ where: { id }, data: { nama, deskripsi, gambarUrl: fotoUrl, urutan, aktif, unggulan } });
  } catch (e) {
    console.error(e);
    return { error: "Gagal mengubah fasilitas." };
  }
  muatUlang();
  redirect("/admin/fasilitas");
}

export async function hapusFasilitas(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const fasilitas = await prisma.fasilitas.findUnique({
    where: { id },
    include: { foto: true },
  });
  if (!fasilitas) return;
  await hapusBerkas(fasilitas.gambarUrl, "fasilitas");
  for (const f of fasilitas.foto) await hapusBerkas(f.url, "fasilitas");
  await prisma.fasilitas.delete({ where: { id } });
  muatUlang();
}

export async function tambahFotoFasilitas(
  fasilitasId: number,
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const fasilitas = await prisma.fasilitas.findUnique({ where: { id: fasilitasId } });
  if (!fasilitas) return { error: "Fasilitas tidak ditemukan." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };
  if (files.length > 10) return { error: "Maksimal 10 foto sekali unggah." };

  const tersimpan: string[] = [];
  try {
    const jumlah = await prisma.fasilitasFoto.count({ where: { fasilitasId } });
    let n = 0;
    for (const file of files) {
      const url = await simpanFoto(file, "fasilitas");
      if (!url) continue;
      tersimpan.push(url);
      await prisma.fasilitasFoto.create({
        data: { url, fasilitasId, urutan: jumlah + n++ },
      });
    }
  } catch (e) {
    for (const url of tersimpan) await hapusBerkas(url, "fasilitas");
    console.error(e);
    return { error: "Gagal mengunggah foto." };
  }
  muatUlang();
  return null;
}

export async function hapusFotoFasilitas(fotoId: number): Promise<void> {
  if (!(await adminLogin())) return;
  const foto = await prisma.fasilitasFoto.findUnique({ where: { id: fotoId } });
  if (!foto) return;
  await hapusBerkas(foto.url, "fasilitas");
  await prisma.fasilitasFoto.delete({ where: { id: fotoId } });
  muatUlang();
}
