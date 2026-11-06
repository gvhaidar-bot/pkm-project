import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuPencil, LuPlus } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import KerangkaTabel from "@/components/admin/KerangkaTabel";
import TombolHapus from "@/components/admin/TombolHapus";
import { hapusBerita } from "./actions";

export const metadata = {
  title: "Kelola Berita — Panel Admin",
  description: "Tambah, ubah, dan hapus berita Madrasah Tsanawiyah.",
};

function formatTanggal(t: Date | null) {
  if (!t) return "-";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(t);
}

async function TabelBerita() {
  const daftar = await prisma.berita.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada berita</p>
        <p className="mt-2 text-base text-muted">Tulis berita pertama lewat tombol di atas.</p>
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
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Tanggal</th>
            <th className="px-6 py-4 text-right">Aksi</th>
          </tr>
        </thead>
        <tbody>
          {daftar.map((berita) => (
            <tr key={berita.id} className="border-b border-line last:border-0">
              <td className="px-6 py-3">
                {berita.gambarUrl ? (
                  <Image
                    src={berita.gambarUrl}
                    alt={`Sampul ${berita.judul}`}
                    width={96}
                    height={54}
                    className="aspect-video w-24 rounded-xl object-cover"
                  />
                ) : (
                  <span className="flex aspect-video w-24 items-center justify-center rounded-xl bg-primary-soft text-xs font-bold text-primary">
                    Tanpa gambar
                  </span>
                )}
              </td>
              <td className="max-w-[280px] px-6 py-3">
                <p className="truncate text-base font-semibold text-ink">{berita.judul}</p>
                <p className="truncate text-sm text-muted">/{berita.slug}</p>
              </td>
              <td className="px-6 py-3">
                <span
                  className={`inline-block rounded-full px-3 py-1 text-xs font-bold tracking-wide uppercase ${
                    berita.published ? "bg-primary-soft text-primary" : "bg-surface-warm text-muted"
                  }`}
                >
                  {berita.published ? "Terbit" : "Draf"}
                </span>
              </td>
              <td className="px-6 py-3 text-base text-muted">
                {formatTanggal(berita.publishedAt ?? berita.createdAt)}
              </td>
              <td className="px-6 py-3">
                <div className="flex items-center justify-end gap-1">
                  <Link
                    href={`/admin/berita/${berita.id}/ubah`}
                    aria-label={`Ubah ${berita.judul}`}
                    className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-soft"
                  >
                    <LuPencil className="h-5 w-5" aria-hidden="true" />
                  </Link>
                  <TombolHapus nama={berita.judul} id={berita.id} aksi={hapusBerita} />
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function DaftarBeritaPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
          <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Berita</h1>
          <p className="mt-2 text-base text-muted">
            Tulis dan terbitkan berita yang tampil di halaman Berita website.
          </p>
        </div>
        <Link
          href="/admin/berita/tambah"
          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
        >
          <LuPlus className="h-5 w-5" aria-hidden="true" />
          Tulis Berita
        </Link>
      </div>

      <Suspense fallback={<KerangkaTabel />}>
        <TabelBerita />
      </Suspense>
    </div>
  );
}
