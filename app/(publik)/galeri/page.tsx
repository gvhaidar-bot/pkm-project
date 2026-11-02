import { Suspense } from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Galeri — Madrasah Tsanawiyah",
  description: "Dokumentasi foto kegiatan Madrasah Tsanawiyah.",
};

function formatTanggal(tanggal: Date) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

async function IsiGaleri() {
  const daftar = await prisma.kegiatan.findMany({
    where: { foto: { some: {} } },
    orderBy: { tanggal: "desc" },
    include: { foto: { orderBy: { urutan: "asc" } } },
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Galeri foto belum tersedia</p>
        <p className="mt-2 text-base text-muted">
          Dokumentasi kegiatan sedang disiapkan oleh pihak madrasah.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 space-y-12">
      {daftar.map((kegiatan) => (
        <section key={kegiatan.id} aria-label={kegiatan.judul}>
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">{kegiatan.judul}</h2>
            <p className="text-sm font-semibold text-muted">
              {formatTanggal(kegiatan.tanggal)}
              {kegiatan.lokasi ? ` · ${kegiatan.lokasi}` : ""}
            </p>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {kegiatan.foto.map((foto) => (
              <figure key={foto.id} className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
                <Image
                  src={foto.url}
                  alt={foto.caption || `Foto ${kegiatan.judul}`}
                  width={600}
                  height={450}
                  className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {foto.caption && (
                  <figcaption className="px-3 py-2 text-sm text-muted">{foto.caption}</figcaption>
                )}
              </figure>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

function Kerangka() {
  return (
    <div className="mt-10 animate-pulse space-y-12">
      {[0, 1].map((i) => (
        <div key={i}>
          <div className="h-8 w-64 rounded-full bg-white" />
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {[0, 1, 2, 3].map((j) => (
              <div key={j} className="aspect-[4/3] rounded-2xl bg-white" />
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
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Dokumentasi</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Galeri</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Momen-momen kegiatan dan keseharian di madrasah kami.
        </p>

        <Suspense fallback={<Kerangka />}>
          <IsiGaleri />
        </Suspense>
      </div>
    </div>
  );
}
