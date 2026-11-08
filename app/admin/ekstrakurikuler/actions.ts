"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { adalahGalatDuplikat, buatSlug } from "@/lib/slug";
import { adminLogin } from "@/lib/admin";
import { cekPanjang } from "@/lib/validasi";
import { hapusBerkas, simpanFoto } from "@/lib/upload";
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
  const jadwal = (formData.get("jadwal") as string | null)?.trim() || null;
  const lokasi = (formData.get("lokasi") as string | null)?.trim() || null;
  const biaya = (formData.get("biaya") as string | null)?.trim() || null;
  const pembimbing = (formData.get("pembimbing") as string | null)?.trim() || null;

  return {
    nama,
    deskripsi,
    tujuan,
    kegiatanRutin,
    fasilitas,
    jadwal,
    lokasi,
    biaya,
    pembimbing,
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
  revalidatePath("/");
  if (slug) revalidatePath(`/program/ekstrakurikuler/${slug}`);
}

export async function tambahEkstrakurikuler(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const data = bacaForm(formData);

  if (!data.nama || !data.deskripsi || !data.tujuan || !data.kegiatanRutin || !data.fasilitas) {
    return { error: "Nama, deskripsi, tujuan, kegiatan rutin, dan fasilitas wajib diisi." };
  }

  const batas =
    cekPanjang("Nama", data.nama, 200) ??
    cekPanjang("Deskripsi", data.deskripsi, 5000) ??
    cekPanjang("Tujuan", data.tujuan, 5000) ??
    cekPanjang("Kegiatan rutin", data.kegiatanRutin, 5000) ??
    cekPanjang("Fasilitas", data.fasilitas, 5000) ??
    cekPanjang("Jadwal", data.jadwal ?? "", 200) ??
    cekPanjang("Lokasi", data.lokasi ?? "", 200) ??
    cekPanjang("Biaya", data.biaya ?? "", 200) ??
    cekPanjang("Pembimbing", data.pembimbing ?? "", 200);
  if (batas) return { error: batas };

  try {
    const slug = await slugUnik(buatSlug(data.slugMasukan || data.nama));
    let fotoUrl: string | null = null;
    try {
      fotoUrl = await simpanFoto(formData.get("foto"), "ekstrakurikuler");
      await prisma.ekstrakurikuler.create({
        data: {
          nama: data.nama,
          slug,
          deskripsi: data.deskripsi,
          tujuan: data.tujuan,
          kegiatanRutin: data.kegiatanRutin,
          fasilitas: data.fasilitas,
          gambarUrl: fotoUrl,
          jadwal: data.jadwal,
          lokasi: data.lokasi,
          biaya: data.biaya,
          pembimbing: data.pembimbing,
          jumlahAnggota: data.jumlahAnggota,
          ikon: data.ikon,
          aktif: data.aktif,
          urutan: data.urutan,
        },
      });
    } catch (e) {
      if (fotoUrl) await hapusBerkas(fotoUrl, "ekstrakurikuler");
      throw e;
    }
  } catch (e) {
    if (adalahGalatDuplikat(e)) return { error: "Nama sudah dipakai. Coba nama lain." };
    console.error(e);
    return { error: "Gagal menyimpan ekstrakurikuler." };
  }
  muatUlang();
  redirect("/admin/ekstrakurikuler");
}

export async function ubahEkstrakurikuler(
  _sebelumnya: HasilAksi,
  formData: FormData,
): Promise<HasilAksi> {
  if (!(await adminLogin())) return { error: "Anda harus login sebagai admin." };

  const id = Number(formData.get("id"));
  if (!id) return { error: "ID ekstrakurikuler tidak valid." };

  const data = bacaForm(formData);
  if (!data.nama || !data.deskripsi || !data.tujuan || !data.kegiatanRutin || !data.fasilitas) {
    return { error: "Nama, deskripsi, tujuan, kegiatan rutin, dan fasilitas wajib diisi." };
  }

  const batas =
    cekPanjang("Nama", data.nama, 200) ??
    cekPanjang("Deskripsi", data.deskripsi, 5000) ??
    cekPanjang("Tujuan", data.tujuan, 5000) ??
    cekPanjang("Kegiatan rutin", data.kegiatanRutin, 5000) ??
    cekPanjang("Fasilitas", data.fasilitas, 5000) ??
    cekPanjang("Jadwal", data.jadwal ?? "", 200) ??
    cekPanjang("Lokasi", data.lokasi ?? "", 200) ??
    cekPanjang("Biaya", data.biaya ?? "", 200) ??
    cekPanjang("Pembimbing", data.pembimbing ?? "", 200);
  if (batas) return { error: batas };

  const lama = await prisma.ekstrakurikuler.findUnique({ where: { id } });
  if (!lama) return { error: "Ekstrakurikuler tidak ditemukan." };

  try {
    const slug = await slugUnik(buatSlug(data.slugMasukan || data.nama), id);
    let fotoUrl = lama.gambarUrl;
    const baru = await simpanFoto(formData.get("foto"), "ekstrakurikuler");
    if (baru) {
      fotoUrl = baru;
      await hapusBerkas(lama.gambarUrl, "ekstrakurikuler");
    }
    await prisma.ekstrakurikuler.update({
      where: { id },
      data: {
        nama: data.nama,
        slug,
        deskripsi: data.deskripsi,
        tujuan: data.tujuan,
        kegiatanRutin: data.kegiatanRutin,
        fasilitas: data.fasilitas,
        gambarUrl: fotoUrl,
        jadwal: data.jadwal,
        lokasi: data.lokasi,
        biaya: data.biaya,
        pembimbing: data.pembimbing,
        jumlahAnggota: data.jumlahAnggota,
        ikon: data.ikon,
        aktif: data.aktif,
        urutan: data.urutan,
      },
    });
    muatUlang(slug);
  } catch (e) {
    if (adalahGalatDuplikat(e)) return { error: "Nama sudah dipakai. Coba nama lain." };
    console.error(e);
    return { error: "Gagal mengubah ekstrakurikuler." };
  }
  redirect("/admin/ekstrakurikuler");
}

export async function hapusEkstrakurikuler(id: number): Promise<void> {
  if (!(await adminLogin())) return;
  const ekstrakurikuler = await prisma.ekstrakurikuler.findUnique({ where: { id } });
  if (!ekstrakurikuler) return;
  await hapusBerkas(ekstrakurikuler.gambarUrl, "ekstrakurikuler");
  await prisma.ekstrakurikuler.delete({ where: { id } });
  muatUlang(ekstrakurikuler.slug);
}
