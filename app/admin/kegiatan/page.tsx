import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPencil, LuPlus } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import KerangkaTabel from "@/components/admin/KerangkaTabel";
import TombolHapus from "@/components/admin/TombolHapus";
import { hapusKegiatan } from "./actions";

export const metadata = {
  title: "Kelola Kegiatan — Panel Admin",
  description: "Tambah, ubah, dan hapus kegiatan Madrasah Tsanawiyah.",
};

function formatTanggal(tanggal: Date) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

async function TabelKegiatan() {
  const daftar = await prisma.kegiatan.findMany({
    orderBy: { tanggal: "desc" },
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada kegiatan</p>
        <p className="mt-2 text-base text-muted">Tambahkan kegiatan pertama lewat tombol di atas.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-line text-sm font-bold tracking-wide text-muted uppercase">
            <th className="px-6 py-4">Foto</th>
            <th className="px-6 py-4">Judul</th>
            <th className="px-6 py-4">Tanggal</th>
            <th className="px-6 py-4">Lokasi</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((kegiatan) => (
            <tr key={kegiatan.id} className="border-b border-line last:border-0">
              <td className="px-6 py-3">
                {kegiatan.gambarUrl ? (
                  <Image
                    src={kegiatan.gambarUrl}
                    alt={`Foto ${kegiatan.judul}`}
                    width={96}
                    height={72}
                    className="aspect-[4/3] w-24 rounded-xl object-cover"
                  />
                ) : (
                  <span className="flex aspect-[4/3] w-24 items-center justify-center rounded-xl bg-primary-soft text-xs font-bold text-primary">
                    Tanpa foto
                  </span>
                )}
              </td>
              <td className="max-w-[260px] px-6 py-3 text-base font-semibold text-ink">{kegiatan.judul}</td>
              <td className="px-6 py-3 text-base whitespace-nowrap text-muted">
                {formatTanggal(kegiatan.tanggal)}
              </td>
              <td className="px-6 py-3 text-base text-muted">{kegiatan.lokasi || "-"}</td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/kegiatan/${kegiatan.id}/ubah`}
                    aria-label={`Ubah ${kegiatan.judul}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-soft"
                  >
                    <LuPencil className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <TombolHapus nama={kegiatan.judul} id={kegiatan.id} aksi={hapusKegiatan} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DaftarKegiatanPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Kegiatan</h1>
          <p className="mt-2 text-base text-muted">
            Catat agenda kegiatan — galeri fotonya tampil di halaman Galeri.
          </p>
        </div>
        <Link
          href="/admin/kegiatan/tambah"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <LuPlus className="h-5 w-5" aria-hidden="true" />
          Tambah Kegiatan
        </Link>
      </div>

      <Suspense fallback={<KerangkaTabel />}>
        <TabelKegiatan />
      </Suspense>
    </div>
  );
}
