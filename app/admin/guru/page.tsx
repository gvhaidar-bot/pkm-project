import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPencil, LuPlus } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import TombolHapus from "@/components/admin/TombolHapus";
import { hapusGuru } from "./actions";

export const metadata = {
  title: "Kelola Guru — Panel Admin",
  description: "Tambah, ubah, dan hapus data guru MTs Nurul Falah Serpong.",
};

async function TabelGuru() {
  const daftar = await prisma.guru.findMany({
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada data guru</p>
        <p className="mt-2 text-base text-muted">Tambahkan guru pertama lewat tombol di atas.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <table className="w-full min-w-[720px] text-left">
        <thead>
          <tr className="border-b border-line text-sm font-bold tracking-wide text-muted uppercase">
            <th className="px-6 py-4">Foto</th>
            <th className="px-6 py-4">Nama</th>
            <th className="px-6 py-4">Jabatan</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((guru) => (
            <tr key={guru.id} className="border-b border-line last:border-0">
              <td className="px-6 py-3">
                {guru.fotoUrl ? (
                  <Image
                    src={guru.fotoUrl}
                    alt={`Foto ${guru.nama}`}
                    width={48}
                    height={48}
                    className="h-12 w-12 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-base font-extrabold text-primary"
                    aria-hidden="true"
                  >
                    {guru.nama.charAt(0).toUpperCase()}
                  </span>
                )}
              </td>
              <td className="px-6 py-3 text-base font-semibold text-ink">{guru.nama}</td>
              <td className="px-6 py-3 text-base text-muted">{guru.jabatan}</td>
              <td className="px-6 py-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
                    guru.aktif ? "bg-primary-soft text-primary" : "bg-surface-warm text-muted"
                  }`}
                >
                  {guru.aktif ? "Aktif" : "Nonaktif"}
                </span>
              </td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/guru/${guru.id}/ubah`}
                    aria-label={`Ubah ${guru.nama}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-soft"
                  >
                    <LuPencil className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <TombolHapus nama={guru.nama} id={guru.id} aksi={hapusGuru} />
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

export default function DaftarGuruPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Guru</h1>
          <p className="mt-2 text-base text-muted">
            Tambah, ubah, atau hapus data guru yang tampil di halaman Profil.
          </p>
        </div>
        <Link
          href="/admin/guru/tambah"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <LuPlus className="h-5 w-5" aria-hidden="true" />
          Tambah Guru
        </Link>
      </div>

      <Suspense fallback={<KerangkaTabel />}>
        <TabelGuru />
      </Suspense>
    </div>
  );
}
