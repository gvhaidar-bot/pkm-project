"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adminLogin } from "@/lib/admin";
import { cekPanjang } from "@/lib/validasi";
import { hapusBerkas, simpanFoto } from "@/lib/upload";

export type HasilAksi = { error: string } | null;

function muatUlang() {
  revalidatePath("/admin/guru");
  revalidatePath("/guru");
  revalidatePath("/profil");
  revalidatePath("/");
}

export async function tambahGuru(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const nama = (formData.get("nama") as string | null)?.trim();
  const jabatan = (formData.get("jabatan") as string | null)?.trim();
  const bio = (formData.get("bio") as string | null)?.trim() || null;
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";

  if (!nama || !jabatan) return { error: "Nama dan jabatan wajib diisi." };

  const batas = cekPanjang("Nama", nama, 200) ?? cekPanjang("Jabatan", jabatan, 200) ?? cekPanjang("Bio", bio, 2000);
  if (batas) return { error: batas };

  let fotoUrl: string | null = null;
  try {
    fotoUrl = await simpanFoto(formData.get("foto"), "guru");
    const guru = await prisma.guru.create({ data: { nama, jabatan, bio, urutan, aktif } });
    if (fotoUrl) {
      await prisma.guruFoto.create({
        data: { url: fotoUrl, guruId: guru.id, urutan: 0, utama: true },
      });
    }
  } catch (e) {
    if (fotoUrl) await hapusBerkas(fotoUrl, "guru");
    console.error(e);
    return { error: "Gagal menyimpan data guru." };
  }
  muatUlang();
  redirect("/admin/guru");
}

export async function ubahGuru(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const id = Number(formData.get("id"));
  const nama = (formData.get("nama") as string | null)?.trim();
  const jabatan = (formData.get("jabatan") as string | null)?.trim();
  const bio = (formData.get("bio") as string | null)?.trim() || null;
  const urutan = Number(formData.get("urutan") ?? 0) || 0;
  const aktif = formData.get("aktif") === "on";

  if (!id) return { error: "ID guru tidak valid." };
  if (!nama || !jabatan) return { error: "Nama dan jabatan wajib diisi." };

  const batas = cekPanjang("Nama", nama, 200) ?? cekPanjang("Jabatan", jabatan, 200) ?? cekPanjang("Bio", bio, 2000);
  if (batas) return { error: batas };

  const lama = await prisma.guru.findUnique({ where: { id } });
  if (!lama) return { error: "Data guru tidak ditemukan." };

  let fotoBaru: string | null = null;
  try {
    fotoBaru = await simpanFoto(formData.get("foto"), "guru");
    await prisma.guru.update({ where: { id }, data: { nama, jabatan, bio, urutan, aktif } });
    if (fotoBaru) {
      const sampulLama = await prisma.guruFoto.findFirst({
        where: { guruId: id, utama: true },
      });
      if (sampulLama) {
        await hapusBerkas(sampulLama.url, "guru");
        await prisma.guruFoto.delete({ where: { id: sampulLama.id } });
      }
      await prisma.guruFoto.create({
        data: { url: fotoBaru, guruId: id, urutan: 0, utama: true },
      });
    }
  } catch (e) {
    if (fotoBaru) await hapusBerkas(fotoBaru, "guru");
    console.error(e);
    return { error: "Gagal mengubah data guru." };
  }
  muatUlang();
  redirect("/admin/guru");
}

export async function hapusGuru(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const guru = await prisma.guru.findUnique({
    where: { id },
    include: { foto: true },
  });
  if (!guru) return;
  for (const f of guru.foto) await hapusBerkas(f.url, "guru");
  await prisma.guru.delete({ where: { id } });
  muatUlang();
}

export async function tambahFotoGuru(
  guruId: number,
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const guru = await prisma.guru.findUnique({ where: { id: guruId } });
  if (!guru) return { error: "Data guru tidak ditemukan." };

  const files = (formData.getAll("foto") as File[]).filter((f) => f instanceof File && f.size > 0);
  if (files.length === 0) return { error: "Pilih minimal satu foto." };
  if (files.length > 10) return { error: "Maksimal 10 foto sekali unggah." };

  const tersimpan: string[] = [];
  try {
    const jumlah = await prisma.guruFoto.count({ where: { guruId } });
    let n = 0;
    for (const file of files) {
      const url = await simpanFoto(file, "guru");
      if (!url) continue;
      tersimpan.push(url);
      await prisma.guruFoto.create({
        data: { url, guruId, urutan: jumlah + n++ },
      });
    }
  } catch (e) {
    for (const url of tersimpan) await hapusBerkas(url, "guru");
    console.error(e);
    return { error: "Gagal mengunggah foto." };
  }
  muatUlang();
  return null;
}

export async function hapusFotoGuru(fotoId: number): Promise<void> {
  if (!(await adminLogin())) return;
  const foto = await prisma.guruFoto.findUnique({ where: { id: fotoId } });
  if (!foto) return;
  await hapusBerkas(foto.url, "guru");
  await prisma.guruFoto.delete({ where: { id: fotoId } });
  muatUlang();
}
