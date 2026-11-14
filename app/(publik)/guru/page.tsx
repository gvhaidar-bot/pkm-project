import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuChevronRight, LuSparkles, LuUsers } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { urlFotoUtama } from "@/lib/foto";
import DaftarGuruStruktur from "@/components/guru/DaftarGuruStruktur";

export const metadata = {
  title: "Staff & Guru",
  description: "Dewan guru dan staf pengajar MTs Nurul Falah Gunungsindur: tenaga pendidik berdedikasi membimbing putra-putri Anda.",
};

async function DaftarGuru() {
  const daftarMentah = await prisma.guru.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
    include: { foto: { orderBy: { urutan: "asc" } } },
  });
  const daftar = daftarMentah.map((g) => ({ ...g, fotoUrl: urlFotoUtama(g.foto) }));

  if (daftar.length === 0) {
    return (
      <div className="border border-line bg-white p-12 text-center shadow-xs">
        <LuUsers className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
          Data Pengajar Sedang Diperbarui
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Daftar guru dan tenaga kependidikan sedang disinkronkan oleh pengelola madrasah.
        </p>
      </div>
    );
  }

  return <DaftarGuruStruktur daftar={daftar} />;
}

function KerangkaGuru() {
  return (
    <div className="animate-pulse space-y-12">
      {/* Principal skeleton */}
      <div className="mx-auto max-w-4xl border border-line bg-white p-8">
        <div className="grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8">
          <div className="aspect-square bg-line/60" />
          <div className="space-y-4">
            <div className="h-6 w-36 bg-line/80" />
            <div className="h-10 w-3/4 bg-line/80" />
            <div className="h-20 w-full bg-line/40" />
          </div>
        </div>
      </div>
      {/* Grid skeleton */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="border border-line bg-white">
            <div className="aspect-square bg-line/60" />
            <div className="p-6 space-y-3">
              <div className="h-4 w-24 bg-line/60" />
              <div className="h-6 w-36 bg-line/80" />
              <div className="h-12 w-full bg-line/40" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function GuruPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=2000&auto=format&fit=crop"
          alt="Tenaga Pendidik & Guru MTs Nurul Falah Gunungsindur"
          fill
          className="object-cover opacity-80 sm:opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-transparent sm:via-primary-dark/75" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-300 px-5 py-16 lg:px-6 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Pendidik & Pembimbing</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Staff &amp; Guru Madrasah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Mengenal para guru dan tenaga kependidikan yang berdedikasi membimbing perkembangan
            intelektual, akhlak, dan kepribadian siswa setiap hari di MTs Nurul Falah Gunungsindur.
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
          <span className="text-muted">Tentang</span>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="font-semibold text-primary-dark" aria-current="page">
            Staff &amp; Guru
          </span>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <Suspense fallback={<KerangkaGuru />}>
          <DaftarGuru />
        </Suspense>
      </div>
    </div>
  );
}
