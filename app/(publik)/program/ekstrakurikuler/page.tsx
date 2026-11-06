import { Suspense } from "react";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { IkonEkstrakurikuler } from "@/components/ekstrakurikuler/ikon";

// Halaman ini membaca database langsung, jadi dirender per permintaan
// (bukan di-prerender) agar selalu menampilkan data terbaru.
export const instant = false;
export const metadata = {
  title: "Ekstrakurikuler — Madrasah Tsanawiyah",
  description: "Kegiatan ekstrakurikuler Madrasah Tsanawiyah.",
};

async function DaftarEkstrakurikuler() {
  const daftar = await prisma.ekstrakurikuler.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada ekstrakurikuler</p>
        <p className="mt-2 text-base text-muted">
          Kegiatan ekstrakurikuler sedang disiapkan oleh pihak madrasah.
        </p>
      </div>
    );
  }

  const totalAnggota = daftar.reduce((jumlah, item) => jumlah + (item.jumlahAnggota ?? 0), 0);

  return (
    <>
      <div className="mt-8 flex flex-wrap gap-8">
        <div className="text-center">
          <p className="text-3xl font-extrabold tracking-tight text-primary-dark">{daftar.length}</p>
          <p className="mt-1 text-sm font-semibold tracking-wide text-muted uppercase">Kegiatan</p>
        </div>
        <div className="text-center">
          <p className="text-3xl font-extrabold tracking-tight text-primary-dark">{totalAnggota}</p>
          <p className="mt-1 text-sm font-semibold tracking-wide text-muted uppercase">Anggota</p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {daftar.map((item) => {
          return (
            <article
              key={item.id}
              className="flex flex-col items-center rounded-3xl bg-white p-8 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-accent">
                <IkonEkstrakurikuler ikon={item.ikon} className="h-8 w-8 text-white" />
              </span>
              <h2 className="mt-5 text-xl font-extrabold tracking-tight text-primary">{item.nama}</h2>
              <p className="mt-2 flex-1 text-[15px] leading-relaxed text-muted">{item.deskripsi}</p>
              <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
                {item.jumlahAnggota !== null && (
                  <span className="inline-flex min-h-11 items-center rounded-full bg-primary-soft px-4 text-sm font-bold text-primary">
                    {item.jumlahAnggota} Anggota
                  </span>
                )}
                <Link
                  href={`/program/ekstrakurikuler/${item.slug}`}
                  className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-6 text-base font-bold text-white transition-colors hover:bg-primary-dark"
                >
                  Selengkapnya
                  <LuArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </>
  );
}

function Kerangka() {
  return (
    <div className="mt-8 grid animate-pulse grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-72 rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]" />
      ))}
    </div>
  );
}

export default function EkstrakurikulerPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">
          Program Pengembangan
        </p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">
          Kegiatan Ekstrakurikuler
        </h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Berbagai pilihan kegiatan untuk mengembangkan bakat, minat, dan karakter siswa.
        </p>

        <Suspense fallback={<Kerangka />}>
          <DaftarEkstrakurikuler />
        </Suspense>
      </div>
    </div>
  );
}
