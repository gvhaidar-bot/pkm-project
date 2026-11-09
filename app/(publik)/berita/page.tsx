import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCalendarDays, LuChevronRight, LuNewspaper, LuSparkles } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Berita",
  description: "Warta, informasi terkini, dan agenda kegiatan MTs Nurul Falah Serpong.",
};

function formatTanggal(t: Date | null) {
  if (!t) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(t);
}

async function DaftarBerita() {
  const daftar = await prisma.berita.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
  });

  if (daftar.length === 0) {
    return (
      <div className="border border-line bg-white p-12 text-center shadow-xs">
        <LuNewspaper className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
          Belum Ada Berita Diterbitkan
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Kabar dan informasi terbaru sedang disiapkan oleh redaksi madrasah.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {daftar.map((berita) => (
        <article
          key={berita.id}
          className="group flex flex-col justify-between border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(11,79,58,0.12)]"
        >
          <div>
            <Link href={`/berita/${berita.slug}`} className="block relative overflow-hidden bg-primary-dark">
              {berita.gambarUrl ? (
                <Image
                  src={berita.gambarUrl}
                  alt={`Sampul ${berita.judul}`}
                  width={600}
                  height={338}
                  className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div
                  className="flex aspect-video w-full items-center justify-center bg-primary"
                  aria-hidden="true"
                >
                  <span className="px-6 text-center font-serif text-lg font-bold text-white">
                    {berita.judul}
                  </span>
                </div>
              )}
              {berita.unggulan && (
                <span className="absolute top-3 left-3 bg-accent px-3 py-1 text-xs font-bold text-primary-dark shadow-sm">
                  Unggulan
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" aria-hidden="true" />
            </Link>

            <div className="p-7">
              <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                <LuCalendarDays className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
                <span>{formatTanggal(berita.publishedAt)}</span>
              </p>

              <h2 className="mt-2.5 font-serif text-xl font-bold tracking-tight text-primary-dark transition-colors group-hover:text-primary">
                <Link href={`/berita/${berita.slug}`} className="hover:underline">
                  {berita.judul}
                </Link>
              </h2>

              <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                {berita.ringkasan}
              </p>
            </div>
          </div>

          <div className="px-7 pb-7 pt-0">
            <Link
              href={`/berita/${berita.slug}`}
              className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent uppercase transition-colors hover:text-accent-soft"
            >
              <span>Baca Selengkapnya</span>
              <LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function Kerangka() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border border-line bg-white">
          <div className="aspect-video bg-line/60" />
          <div className="p-7 space-y-3">
            <div className="h-4 w-28 bg-line/60" />
            <div className="h-6 w-52 bg-line/80" />
            <div className="h-16 w-full bg-line/40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BeritaPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="border-b border-primary-dark/30 bg-primary-dark text-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Kabar & Informasi</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Berita &amp; Agenda Madrasah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Ikuti berbagai perkembangan kegiatan belajar mengajar, pengumuman resmi madrasah,
            dan kabar prestasi siswa MTs Nurul Falah Serpong.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-white shadow-xs">
        <div className="mx-auto flex w-full max-w-300 items-center gap-2 px-5 py-3 text-xs font-medium lg:px-6">
          <Link href="/" className="text-primary hover:text-primary-dark hover:underline">
            Beranda
          </Link>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="font-semibold text-primary-dark" aria-current="page">
            Berita
          </span>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <DaftarBerita />
        </Suspense>
      </div>
    </div>
  );
}
