"use client";

import Galeri from "@/components/admin/Galeri";
import { hapusFotoKegiatan, tambahFotoKegiatan } from "../actions";

export type FotoKegiatan = {
  id: number;
  url: string;
  caption: string | null;
};

export default function GaleriKegiatan({
  kegiatanId,
  fotoAwal,
}: {
  kegiatanId: number;
  fotoAwal: FotoKegiatan[];
}) {
  return (
    <Galeri
      itemId={kegiatanId}
      fotoAwal={fotoAwal}
      judul="Galeri Foto"
      deskripsi="Foto-foto ini tampil di halaman Galeri website."
      teksKonfirmasi="Hapus foto ini dari galeri?"
      rasio="4/3"
      tambahFoto={tambahFotoKegiatan}
      hapusFoto={hapusFotoKegiatan}
    />
  );
}
