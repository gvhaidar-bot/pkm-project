import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPencil, LuPlus } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import TombolHapus from "@/components/admin/TombolHapus";
import { hapusProgramAkademik } from "./actions";

export const metadata = {
  title: "Kelola Program Akademik — Panel Admin",
  description: "Tambah, ubah, dan hapus program akademik MTs Nurul Falah Serpong.",
};

async function TabelProgram() {
  const daftar = await prisma.programAkademik.findMany({
    orderBy: [{ urutan: "asc" }, { judul: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada program akademik</p>
        <p className="mt-2 text-base text-muted">Tambah program pertama lewat tombol di atas.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 overflow-x-auto rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <table className="w-full min-w-[760px] text-left">
        <thead>
          <tr className="border-b border-line text-sm font-bold tracking-wide text-muted uppercase">
            <th className="px-6 py-4">Sampul</th>
            <th className="px-6 py-4">Judul</th>
            <th className="px-6 py-4">Unggulan</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((program) => (
            <tr key={program.id} className="border-b border-line last:border-0">
              <td className="px-6 py-3">
                {program.gambarUrl ? (
                  <Image
                    src={program.gambarUrl}
                    alt={`Sampul ${program.judul}`}
                    width={96}
                    height={72}
                    className="aspect-[4/3] w-24 rounded-xl object-cover"
                  />
                ) : (
                  <span className="flex aspect-[4/3] w-24 items-center justify-center rounded-xl bg-primary-soft text-xs font-bold text-primary">
                    Tanpa gambar
                  </span>
                )}
              </td>
              <td className="max-w-[280px] px-6 py-3">
                <p className="truncate text-base font-semibold text-ink">{program.judul}</p>
                <p className="truncate text-sm text-muted">/{program.slug}</p>
              </td>
              <td className="px-6 py-3">
                {program.unggulan ? (
                  <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-bold tracking-wide text-primary-dark uppercase">
                    Unggulan
                  </span>
                ) : (
                  <span className="text-base text-muted">-</span>
                )}
              </td>
              <td className="px-6 py-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
                    program.aktif ? "bg-primary-soft text-primary" : "bg-surface-warm text-muted"
                  }`}
                >
                  {program.aktif ? "Aktif" : "Nonaktif"}
                </span>
              </td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/program-akademik/${program.id}/ubah`}
                    aria-label={`Ubah ${program.judul}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-soft"
                  >
                    <LuPencil className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <TombolHapus nama={program.judul} id={program.id} aksi={hapusProgramAkademik} />
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

export default function DaftarProgramAkademikPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Program Akademik</h1>
          <p className="mt-2 text-base text-muted">
            Tambah dan kelola program yang tampil di halaman Akademik website.
          </p>
        </div>
        <Link
          href="/admin/program-akademik/tambah"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <LuPlus className="h-5 w-5" aria-hidden="true" />
          Tambah Program
        </Link>
      </div>

      <Suspense fallback={<KerangkaTabel />}>
        <TabelProgram />
      </Suspense>
    </div>
  );
}
