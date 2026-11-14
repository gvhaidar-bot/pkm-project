import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPencil, LuPlus } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { urlFotoUtama } from "@/lib/foto";
import TombolHapus from "@/components/admin/TombolHapus";
import { hapusPrestasi } from "./actions";

export const metadata = {
  title: "Kelola Prestasi — Panel Admin",
  description: "Tambah, ubah, dan hapus prestasi MTs Nurul Falah Gunungsindur.",
};

async function TabelPrestasi() {
  const daftarMentah = await prisma.prestasi.findMany({
    orderBy: [{ tahun: "desc" }, { createdAt: "desc" }],
    include: { foto: { orderBy: { urutan: "asc" } } },
  });
  const daftar = daftarMentah.map((p) => ({ ...p, gambarUrl: urlFotoUtama(p.foto) }));

  if (daftar.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada prestasi</p>
        <p className="mt-2 text-base text-muted">Tambahkan prestasi pertama lewat tombol di atas.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="border-b border-line text-sm font-bold tracking-wide text-muted uppercase">
            <th className="px-6 py-4">Foto</th>
            <th className="px-6 py-4">Judul</th>
            <th className="px-6 py-4">Tingkat</th>
            <th className="px-6 py-4">Tahun</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((prestasi) => (
            <tr key={prestasi.id} className="border-b border-line last:border-0">
              <td className="px-6 py-3">
                {prestasi.gambarUrl ? (
                  <Image
                    src={prestasi.gambarUrl}
                    alt={`Foto ${prestasi.judul}`}
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
              <td className="max-w-[280px] px-6 py-3 text-base font-semibold text-ink">{prestasi.judul}</td>
              <td className="px-6 py-3 text-base text-muted">{prestasi.tingkat || "-"}</td>
              <td className="px-6 py-3 text-base font-bold text-primary-dark">{prestasi.tahun}</td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/prestasi/${prestasi.id}/ubah`}
                    aria-label={`Ubah ${prestasi.judul}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-soft"
                  >
                    <LuPencil className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <TombolHapus nama={prestasi.judul} id={prestasi.id} aksi={hapusPrestasi} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function KerangkaTabel() {
  return (
    <div className="mt-8 animate-pulse rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 rounded-2xl bg-primary-soft" />
        ))}
      </div>
    </div>
  );
}

export default function DaftarPrestasiPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Prestasi</h1>
          <p className="mt-2 text-base text-muted">
            Catat prestasi sekolah — tampil di section Prestasi homepage.
          </p>
        </div>
        <Link
          href="/admin/prestasi/tambah"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <LuPlus className="h-5 w-5" aria-hidden="true" />
          Tambah Prestasi
        </Link>
      </div>

      <Suspense fallback={<KerangkaTabel />}>
        <TabelPrestasi />
      </Suspense>
    </div>
  );
}
