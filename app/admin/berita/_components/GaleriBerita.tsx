"use client";

import Galeri from "@/components/admin/Galeri";
import { hapusFotoBerita, tambahFotoBerita } from "../actions";

export type FotoBerita = {
  id: number;
  url: string;
};

export default function GaleriBerita({
  beritaId,
  fotoAwal,
}: {
  beritaId: number;
  fotoAwal: FotoBerita[];
}) {
  return (
    <Galeri
      itemId={beritaId}
      fotoAwal={fotoAwal}
      judul="Foto Galeri"
      deskripsi="Foto tambahan selain gambar sampul. Bisa pilih beberapa sekaligus."
      teksKonfirmasi="Hapus foto ini dari galeri berita?"
      rasio="3/2"
      tambahFoto={tambahFotoBerita}
      hapusFoto={hapusFotoBerita}
    />
  );
}
