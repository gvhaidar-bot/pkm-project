import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuCalendar, LuChevronRight, LuImage, LuMapPin, LuSparkles } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Galeri",
  description: "Dokumentasi foto kegiatan belajar mengajar dan aktivitas madrasah di MTs Nurul Falah Serpong.",
};

function formatTanggal(tanggal: Date) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function IsiGaleri() {
  const semua = await prisma.kegiatan.findMany({
    orderBy: { tanggal: "desc" },
    include: { foto: { orderBy: { urutan: "asc" } } },
  });

  const daftar = semua.filter((k) => k.foto.length > 0 || k.gambarUrl);

  if (daftar.length === 0) {
    return (
      <div className="border border-line bg-white p-12 text-center shadow-xs">
        <LuImage className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
          Dokumentasi Galeri Sedang Disiapkan
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Foto-foto kegiatan madrasah sedang dikurasi dan akan segera ditampilkan di halaman ini.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-16">
      {daftar.map((kegiatan) => {
        const semuaFoto = [
          ...(kegiatan.gambarUrl
            ? [{ id: "sampul", url: kegiatan.gambarUrl, caption: null as string | null }]
            : []),
          ...kegiatan.foto,
        ];
        return (
          <section
            key={kegiatan.id}
            aria-label={kegiatan.judul}
            className="border-b border-line pb-12 last:border-b-0 last:pb-0"
          >
            <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between border-l-4 border-accent pl-4">
              <h2 className="font-serif text-2xl font-bold tracking-tight text-primary-dark sm:text-3xl">
                {kegiatan.judul}
              </h2>
              <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted">
                <span className="flex items-center gap-1.5">
                  <LuCalendar className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
                  <span>{formatTanggal(kegiatan.tanggal)}</span>
                </span>
                {kegiatan.lokasi ? (
                  <span className="flex items-center gap-1.5">
                    <LuMapPin className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
                    <span>{kegiatan.lokasi}</span>
                  </span>
                ) : null}
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {semuaFoto.map((foto) => (
                <figure
                  key={foto.id}
                  className="group relative overflow-hidden border border-line bg-primary-dark shadow-xs transition-all duration-300 hover:shadow-lg"
                >
                  <Image
                    src={foto.url}
                    alt={foto.caption || `Foto ${kegiatan.judul}`}
                    width={600}
                    height={450}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  {foto.caption && (
                    <figcaption className="absolute inset-x-0 bottom-0 bg-primary-dark/85 p-3 text-xs text-white">
                      {foto.caption}
                    </figcaption>
                  )}
                </figure>
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse space-y-14">
      {[0, 1].map((i) => (
        <div key={i} className="space-y-6">
          <div className="h-8 w-64 bg-line/80" />
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="aspect-[4/3] border border-line bg-white" />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default function GaleriPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
          alt="Lensa Dokumentasi Visual Kegiatan MTs Nurul Falah"
          fill
          className="object-cover opacity-80 sm:opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-transparent sm:via-primary-dark/75" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-300 px-5 py-16 lg:px-6 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Dokumentasi Visual</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Galeri Kegiatan Madrasah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Potret ragam dinamika kegiatan belajar, peringatan hari besar, kegiatan sosial, dan kreativitas siswa MTs Nurul Falah Serpong.
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
            Galeri
          </span>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiGaleri />
        </Suspense>
      </div>
    </div>
  );
}
