"use client";

import { useActionState, useState } from "react";
import Image from "next/image";
import { LuImagePlus, LuTrash2 } from "react-icons/lu";
import MasukanFoto from "@/components/admin/MasukanFoto";
import { hapusFotoKegiatan, tambahFotoKegiatan, type HasilAksi } from "../actions";

type Foto = {
  id: number;
  url: string;
  caption: string | null;
};

export default function GaleriKegiatan({
  kegiatanId,
  fotoAwal,
}: {
  kegiatanId: number;
  fotoAwal: Foto[];
}) {
  const [hasil, jalankan, menunggu] = useActionState(
    tambahFotoKegiatan.bind(null, kegiatanId),
    null as HasilAksi,
  );
  const [menghapus, setMenghapus] = useState<number | null>(null);

  async function tanganiHapus(id: number) {
    if (!confirm("Hapus foto ini dari galeri?")) return;
    setMenghapus(id);
    try {
      await hapusFotoKegiatan(id);
    } finally {
      setMenghapus(null);
    }
  }

  return (
    <div className="mt-8 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      <h2 className="text-xl font-extrabold tracking-tight text-ink">Galeri Foto</h2>
      <p className="mt-1 text-base text-muted">
        Foto-foto ini tampil di halaman Galeri website.
      </p>

      {fotoAwal.length > 0 && (
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {fotoAwal.map((foto) => (
            <div key={foto.id} className="relative overflow-hidden rounded-2xl">
              <Image
                src={foto.url}
                alt={foto.caption || "Foto kegiatan"}
                width={400}
                height={300}
                className="aspect-[4/3] w-full object-cover"
              />
              <button
                type="button"
                onClick={() => tanganiHapus(foto.id)}
                disabled={menghapus === foto.id}
                aria-label="Hapus foto galeri"
                className="absolute top-2 right-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/90 text-red-700 shadow transition-colors hover:bg-white disabled:opacity-50"
              >
                <LuTrash2 className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      )}

      <form action={jalankan} className="mt-4 flex flex-wrap items-end gap-3">
        <div className="min-w-64 flex-1">
          <MasukanFoto
            id="foto-galeri"
            label="Tambah foto galeri"
            banyak
            teksBantuan="Boleh pilih beberapa sekaligus. Maksimal 2 MB per foto."
          />
        </div>
        <button
          type="submit"
          disabled={menunggu}
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          <LuImagePlus className="h-5 w-5" aria-hidden="true" />
          {menunggu ? "Mengunggah..." : "Tambah Foto"}
        </button>
      </form>

      {hasil?.error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
          {hasil.error}
        </p>
      )}
    </div>
  );
}
