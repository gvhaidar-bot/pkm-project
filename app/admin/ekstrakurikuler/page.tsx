import { Suspense } from "react";
import Link from "next/link";
import { LuPencil, LuPlus } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import KerangkaTabel from "@/components/admin/KerangkaTabel";
import TombolHapus from "@/components/admin/TombolHapus";
import { IkonEkstrakurikuler } from "@/components/ekstrakurikuler/ikon";
import { hapusEkstrakurikuler } from "./actions";

export const metadata = {
  title: "Kelola Ekstrakurikuler — Panel Admin",
  description: "Tambah, ubah, dan hapus ekstrakurikuler Madrasah Tsanawiyah.",
};

async function TabelEkstrakurikuler() {
  const daftar = await prisma.ekstrakurikuler.findMany({
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada ekstrakurikuler</p>
        <p className="mt-2 text-base text-muted">Tambah ekstrakurikuler pertama lewat tombol di atas.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-line text-sm font-bold tracking-wide text-muted uppercase">
            <th className="px-6 py-4">Ikon</th>
            <th className="px-6 py-4">Nama</th>
            <th className="px-6 py-4">Anggota</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((ekstrakurikuler) => {
            return (
              <tr key={ekstrakurikuler.id} className="border-b border-line last:border-0">
                <td className="px-6 py-3">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-accent">
                    <IkonEkstrakurikuler ikon={ekstrakurikuler.ikon} className="h-6 w-6 text-white" />
                  </span>
                </td>
                <td className="max-w-[280px] px-6 py-3">
                  <p className="truncate text-base font-semibold text-ink">{ekstrakurikuler.nama}</p>
                  <p className="truncate text-sm text-muted">/{ekstrakurikuler.slug}</p>
                </td>
                <td className="px-6 py-3 text-base text-muted">
                  {ekstrakurikuler.jumlahAnggota ?? "-"}
                </td>
                <td className="px-6 py-3">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
                      ekstrakurikuler.aktif
                        ? "bg-primary-soft text-primary"
                        : "bg-surface-warm text-muted"
                    }`}
                  >
                    {ekstrakurikuler.aktif ? "Aktif" : "Nonaktif"}
                  </span>
                </td>
                <td className="px-6 py-3">
                  <div className="flex items-center justify-end gap-1">
                    <Link
                      href={`/admin/ekstrakurikuler/${ekstrakurikuler.id}/ubah`}
                      aria-label={`Ubah ${ekstrakurikuler.nama}`}
                      className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-soft"
                    >
                      <LuPencil className="h-5 w-5" aria-hidden="true" />
                    </Link>
                    <TombolHapus
                      nama={ekstrakurikuler.nama}
                      id={ekstrakurikuler.id}
                      aksi={hapusEkstrakurikuler}
                    />
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default function DaftarEkstrakurikulerPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Ekstrakurikuler</h1>
          <p className="mt-2 text-base text-muted">
            Tambah dan kelola ekstrakurikuler yang tampil di halaman website.
          </p>
        </div>
        <Link
          href="/admin/ekstrakurikuler/tambah"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <LuPlus className="h-5 w-5" aria-hidden="true" />
          Tambah Ekstrakurikuler
        </Link>
      </div>

      <Suspense fallback={<KerangkaTabel />}>
        <TabelEkstrakurikuler />
      </Suspense>
    </div>
  );
}
