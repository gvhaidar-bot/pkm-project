import { Suspense } from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";
import TeksBerformat from "@/components/TeksBerformat";

export const metadata = {
  title: "Fasilitas",
  description: "Fasilitas pendukung kegiatan belajar di MTs Nurul Falah Serpong.",
};

async function DaftarFasilitas() {
  const daftar = await prisma.fasilitas.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Data fasilitas belum tersedia</p>
        <p className="mt-2 text-base text-muted">
          Daftar fasilitas sedang disiapkan oleh pihak madrasah.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {daftar.map((fasilitas) => (
        <article
          key={fasilitas.id}
          className="overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
        >
          {fasilitas.gambarUrl ? (
            <Image
              src={fasilitas.gambarUrl}
              alt={`Foto ${fasilitas.nama}`}
              width={600}
              height={450}
              className="aspect-[4/3] w-full object-cover"
            />
          ) : (
            <div
              className="flex aspect-[4/3] w-full items-center justify-center bg-primary-soft"
              aria-hidden="true"
            >
              <span className="px-6 text-center font-serif text-base font-bold text-primary">{fasilitas.nama}</span>
            </div>
          )}
          <div className="p-5">
            <h2 className="text-lg font-bold tracking-tight text-ink">{fasilitas.nama}</h2>
            <div className="mt-2">
              <TeksBerformat teks={fasilitas.deskripsi} kelasTeks="text-[15px] leading-relaxed text-muted" />
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Kerangka() {
  return (
    <div className="mt-10 grid animate-pulse grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-72 rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]" />
      ))}
    </div>
  );
}

export default function FasilitasPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Sarana Madrasah</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Fasilitas</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Sarana dan prasarana yang mendukung kenyamanan belajar putra-putri Anda.
        </p>

        <Suspense fallback={<Kerangka />}>
          <DaftarFasilitas />
        </Suspense>
      </div>
    </div>
  );
}
