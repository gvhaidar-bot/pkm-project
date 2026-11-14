import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuChevronRight, LuCompass, LuSparkles, LuUsers } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { IkonEkstrakurikuler } from "@/components/ekstrakurikuler/ikon";

export const metadata = {
  title: "Ekstrakurikuler",
  description: "Ragam kegiatan ekstrakurikuler MTs Nurul Falah Gunungsindur: wadah minat, bakat, kepemimpinan, dan kreativitas siswa.",
};

const fallbackFotoEkskul: Record<string, string> = {
  olahraga: "https://images.unsplash.com/photo-1510526292299-20af3f62d453?q=80&w=600&auto=format&fit=crop",
  futsal: "https://images.unsplash.com/photo-1510526292299-20af3f62d453?q=80&w=600&auto=format&fit=crop",
  seni: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop",
  marawis: "https://images.unsplash.com/photo-1511632765486-a01980e01a18?q=80&w=600&auto=format&fit=crop",
  pramuka: "https://images.unsplash.com/photo-1517649763962-0c623266ddc0?q=80&w=600&auto=format&fit=crop",
  paskibra: "https://images.unsplash.com/photo-1526676037777-05a232554f77?q=80&w=600&auto=format&fit=crop",
  sains: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=600&auto=format&fit=crop",
  bahasa: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=600&auto=format&fit=crop",
  keagamaan: "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=600&auto=format&fit=crop",
  default: "https://images.unsplash.com/photo-1510526292299-20af3f62d453?q=80&w=600&auto=format&fit=crop",
};

async function DaftarEkstrakurikuler() {
  const daftar = await prisma.ekstrakurikuler.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="border border-line bg-white p-12 text-center shadow-xs">
        <LuCompass className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
          Kegiatan Ekstrakurikuler Sedang Disiapkan
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Daftar kegiatan pengembangan minat dan bakat sedang diselaraskan oleh pembina madrasah.
        </p>
      </div>
    );
  }

  const totalAnggota = daftar.reduce((jumlah, item) => jumlah + (item.jumlahAnggota ?? 0), 0);

  return (
    <>
      {/* Metric Highlights */}
      <div className="mb-10 flex flex-wrap items-center gap-8 border-b border-line pb-8">
        <div className="border-l-4 border-accent pl-4">
          <p className="font-serif text-3xl font-black text-primary-dark">{daftar.length}</p>
          <p className="text-xs font-bold tracking-wider text-muted uppercase">Pilihan Kegiatan</p>
        </div>
        <div className="border-l-4 border-accent pl-4">
          <p className="font-serif text-3xl font-black text-primary-dark">{totalAnggota}</p>
          <p className="text-xs font-bold tracking-wider text-muted uppercase">Siswa Terbina</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {daftar.map((item) => {
          return (
            <article
              key={item.id}
              className="group flex flex-col justify-between border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(11,79,58,0.12)]"
            >
              <div>
                <div className="relative overflow-hidden bg-primary-dark">
                  <Image
                    src={item.gambarUrl || fallbackFotoEkskul[item.ikon] || fallbackFotoEkskul.default}
                    alt={`Dokumentasi ${item.nama}`}
                    width={600}
                    height={400}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" aria-hidden="true" />
                  {item.jumlahAnggota !== null && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 border border-line bg-white/95 px-2.5 py-1 text-xs font-bold text-primary-dark backdrop-blur-xs shadow-xs">
                      <LuUsers className="h-3 w-3 text-accent" aria-hidden="true" />
                      <span>{item.jumlahAnggota} Siswa</span>
                    </span>
                  )}
                </div>

                <div className="p-7">
                  <div className="flex items-center gap-2.5">
                    <span className="flex h-9 w-9 items-center justify-center border border-accent/40 bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <IkonEkstrakurikuler ikon={item.ikon} className="h-4.5 w-4.5 text-accent" />
                    </span>
                    <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
                      Ekstrakurikuler
                    </span>
                  </div>

                  <h2 className="mt-3.5 font-serif text-xl font-bold tracking-tight text-primary-dark">
                    {item.nama}
                  </h2>
                  <p className="mt-2.5 text-sm leading-relaxed text-muted line-clamp-3">
                    {item.deskripsi}
                  </p>
                </div>
              </div>

              <div className="px-7 pb-7 pt-0">
                <Link
                  href={`/program/ekstrakurikuler/${item.slug}`}
                  className="group/btn inline-flex min-h-11 w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-primary-dark"
                >
                  <span>Rincian Kegiatan</span>
                  <LuArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
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
    <div className="grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border border-line bg-white p-8 space-y-4">
          <div className="h-12 w-12 bg-line/60" />
          <div className="h-6 w-40 bg-line/80" />
          <div className="h-16 w-full bg-line/40" />
          <div className="h-10 w-full bg-line/60" />
        </div>
      ))}
    </div>
  );
}

export default function EkstrakurikulerPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1510526292299-20af3f62d453?q=80&w=2000&auto=format&fit=crop"
          alt="Aktivitas dan Semangat Ekstrakurikuler MTs Nurul Falah"
          fill
          className="object-cover opacity-80 sm:opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-transparent sm:via-primary-dark/75" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-300 px-5 py-16 lg:px-6 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Pengembangan Minat &amp; Bakat</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Kegiatan Ekstrakurikuler
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Menyediakan wadah positif bagi siswa untuk melatih kepemimpinan, sportivitas,
            kekompakan, dan kreativitas di luar jam pembelajaran kelas.
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
            Ekstrakurikuler
          </span>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <DaftarEkstrakurikuler />
        </Suspense>
      </div>
    </div>
  );
}
