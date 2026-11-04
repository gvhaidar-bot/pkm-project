"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { buatSlug } from "@/lib/slug";
import { IKON_EKSTRAKURIKULER } from "@/components/ekstrakurikuler/ikon";

export type HasilAksi = { error?: string } | null;

async function slugUnik(dasar: string, kecualiId?: number): Promise<string> {
  let slug = dasar;
  let i = 2;
  while (true) {
    const ada = await prisma.ekstrakurikuler.findUnique({ where: { slug } });
    if (!ada || ada.id === kecualiId) return slug;
    slug = `${dasar}-${i++}`;
  }
}

function bacaForm(formData: FormData) {
  const nama = (formData.get("nama") as string | null)?.trim();
  const deskripsi = (formData.get("deskripsi") as string | null)?.trim();
  const tujuan = (formData.get("tujuan") as string | null)?.trim();
  const kegiatanRutin = (formData.get("kegiatanRutin") as string | null)?.trim();
  const fasilitas = (formData.get("fasilitas") as string | null)?.trim();
  const ikon = (formData.get("ikon") as string | null) ?? "sains";
  const aktif = formData.get("aktif") === "on";
  const urutan = Number(formData.get("urutan")) || 0;
  const jumlahMentah = (formData.get("jumlahAnggota") as string | null)?.trim();
  const jumlahAnggota = jumlahMentah ? Number(jumlahMentah) : null;
  const slugMasukan = (formData.get("slug") as string | null)?.trim();

  return {
    nama,
    deskripsi,
    tujuan,
    kegiatanRutin,
    fasilitas,
    ikon: IKON_EKSTRAKURIKULER[ikon] ? ikon : "sains",
    aktif,
    urutan,
    jumlahAnggota:
      jumlahAnggota !== null && Number.isFinite(jumlahAnggota) && jumlahAnggota >= 0
        ? Math.floor(jumlahAnggota)
        : null,
    slugMasukan,
  };
}

function muatUlang(slug?: string) {
  revalidatePath("/admin/ekstrakurikuler");
  revalidatePath("/program/ekstrakurikuler");
  if (slug) revalidatePath(`/program/ekstrakurikuler/${slug}`);
}

export async function tambahEkstrakurikuler(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  const data = bacaForm(formData);

  if (!data.nama || !data.deskripsi || !data.tujuan || !data.kegiatanRutin || !data.fasilitas) {
    return { error: "Nama, deskripsi, tujuan, kegiatan rutin, dan fasilitas wajib diisi." };
  }

  try {
    const slug = await slugUnik(buatSlug(data.slugMasukan || data.nama));
    await prisma.ekstrakurikuler.create({
      data: {
        nama: data.nama,
        slug,
        deskripsi: data.deskripsi,
        tujuan: data.tujuan,
        kegiatanRutin: data.kegiatanRutin,
        fasilitas: data.fasilitas,
        jumlahAnggota: data.jumlahAnggota,
        ikon: data.ikon,
        aktif: data.aktif,
        urutan: data.urutan,
      },
    });
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal menyimpan ekstrakurikuler." };
  }
  muatUlang();
  redirect("/admin/ekstrakurikuler");
}

export async function ubahEkstrakurikuler(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  const id = Number(formData.get("id"));
  if (!id) return { error: "ID ekstrakurikuler tidak valid." };

  const data = bacaForm(formData);
  if (!data.nama || !data.deskripsi || !data.tujuan || !data.kegiatanRutin || !data.fasilitas) {
    return { error: "Nama, deskripsi, tujuan, kegiatan rutin, dan fasilitas wajib diisi." };
  }

  const lama = await prisma.ekstrakurikuler.findUnique({ where: { id } });
  if (!lama) return { error: "Ekstrakurikuler tidak ditemukan." };

  try {
    const slug = await slugUnik(buatSlug(data.slugMasukan || data.nama), id);
    await prisma.ekstrakurikuler.update({
      where: { id },
      data: {
        nama: data.nama,
        slug,
        deskripsi: data.deskripsi,
        tujuan: data.tujuan,
        kegiatanRutin: data.kegiatanRutin,
        fasilitas: data.fasilitas,
        jumlahAnggota: data.jumlahAnggota,
        ikon: data.ikon,
        aktif: data.aktif,
        urutan: data.urutan,
      },
    });
    muatUlang(slug);
  } catch (e) {
    return { error: e instanceof Error ? e.message : "Gagal mengubah ekstrakurikuler." };
  }
  redirect("/admin/ekstrakurikuler");
}

export async function hapusEkstrakurikuler(id: number): Promise<void> {
  const ekstrakurikuler = await prisma.ekstrakurikuler.findUnique({ where: { id } });
  if (!ekstrakurikuler) return;
  await prisma.ekstrakurikuler.delete({ where: { id } });
  muatUlang(ekstrakurikuler.slug);
}
