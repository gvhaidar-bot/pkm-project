import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuChevronRight, LuImage, LuSparkles } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Galeri",
  description: "Dinding foto MTs Nurul Falah Gunungsindur — momen kegiatan belajar, kebersamaan, dan kreativitas siswa.",
};

async function IsiGaleri() {
  const daftar = await prisma.galeri.findMany({
    where: { aktif: true },
    orderBy: { createdAt: "desc" },
  });

  if (daftar.length === 0) {
    return (
      <div className="border border-line bg-white p-12 text-center shadow-xs">
        <LuImage className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
          Galeri Foto Sedang Disiapkan
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Foto-foto madrasah sedang dikurasi dan akan segera ditampilkan di halaman ini.
        </p>
      </div>
    );
  }

  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
      {daftar.map((foto, i) => (
        <figure key={foto.id} className="break-inside-avoid overflow-hidden rounded-2xl bg-primary-dark">
          <img
            src={foto.gambarUrl}
            alt={`Foto galeri MTs Nurul Falah Gunungsindur ${i + 1}`}
            loading="lazy"
            className="w-full h-auto"
          />
        </figure>
      ))}
    </div>
  );
}

function Kerangka() {
  return (
    <div className="columns-2 gap-4 sm:columns-3 lg:columns-4 [&>*]:mb-4">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div
          key={i}
          className="animate-pulse break-inside-avoid border border-line bg-white"
          style={{ height: `${180 + (i % 3) * 70}px` }}
        />
      ))}
    </div>
  );
}

export default function GaleriPage() {
  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=2000&auto=format&fit=crop"
          alt="Lensa Dokumentasi Visual MTs Nurul Falah"
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
            Galeri
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Potret momen keseharian belajar, kebersamaan, dan kreativitas siswa MTs Nurul
            Falah Gunungsindur.
          </p>
        </div>
      </section>

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

      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiGaleri />
        </Suspense>
      </div>
    </div>
  );
}
