import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuBookOpen, LuChevronRight, LuSparkles } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Program Akademik",
  description: "Program akademik MTs Nurul Falah Serpong: kurikulum terpadu dan proses pembelajaran berkualitas.",
};

const fallbackFotoAkademik = [
  "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?q=80&w=800&auto=format&fit=crop",
];

async function DaftarProgram() {
  const daftar = await prisma.programAkademik.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { judul: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="border border-line bg-white p-12 text-center shadow-xs">
        <LuBookOpen className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
          Program Akademik Sedang Disinkronkan
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Daftar kurikulum dan program akademik sedang disiapkan oleh pengelola madrasah.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {daftar.map((program, idx) => (
        <article
          key={program.id}
          className="group flex flex-col justify-between border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(11,79,58,0.12)]"
        >
          <div>
            <div className="relative overflow-hidden bg-primary-dark">
              <Image
                src={program.gambarUrl || fallbackFotoAkademik[idx % fallbackFotoAkademik.length]}
                alt={`Sampul ${program.judul}`}
                width={600}
                height={450}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              {program.unggulan && (
                <span className="absolute top-3 left-3 bg-accent px-3 py-1 text-xs font-bold text-primary-dark shadow-sm">
                  Program Unggulan
                </span>
              )}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" aria-hidden="true" />
            </div>

            <div className="p-7">
              <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
                Kurikulum Madrasah
              </span>
              <h2 className="mt-2 font-serif text-xl font-bold tracking-tight text-primary-dark">
                {program.judul}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                {program.ringkasan}
              </p>
            </div>
          </div>

          <div className="p-7 pt-0">
            <Link
              href={`/program/akademik/${program.slug}`}
              className="group/btn inline-flex min-h-11 w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-primary-dark"
            >
              <span>Pelajari Rincian Program</span>
              <LuArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
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
          <div className="aspect-[4/3] bg-line/60" />
          <div className="p-7 space-y-3">
            <div className="h-4 w-28 bg-line/60" />
            <div className="h-6 w-48 bg-line/80" />
            <div className="h-16 w-full bg-line/40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function AkademikPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=2000&auto=format&fit=crop"
          alt="Buku dan Kurikulum Program Akademik MTs Nurul Falah"
          fill
          className="object-cover opacity-80 sm:opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-transparent sm:via-primary-dark/75" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-300 px-5 py-16 lg:px-6 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Pendidikan Formal & Agama</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Program Akademik Madrasah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Ragam bidang studi dan kurikulum terintegrasi yang membentuk kecakapan berpikir kritis,
            literasi sains, dan pemahaman keagamaan yang mendalam bagi siswa.
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
          <Link href="/program" className="text-primary hover:text-primary-dark hover:underline">
            Program
          </Link>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="font-semibold text-primary-dark" aria-current="page">
            Akademik
          </span>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <DaftarProgram />
        </Suspense>
      </div>
    </div>
  );
}
