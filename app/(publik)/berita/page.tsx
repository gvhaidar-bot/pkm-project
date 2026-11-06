import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Berita — Madrasah Tsanawiyah",
  description: "Berita dan agenda terbaru Madrasah Tsanawiyah.",
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
      <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada berita</p>
        <p className="mt-2 text-base text-muted">Berita terbaru sedang disiapkan oleh pihak madrasah.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {daftar.map((berita) => (
        <Link
          key={berita.id}
          href={`/berita/${berita.slug}`}
          className="group overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
        >
          {berita.gambarUrl ? (
            <Image
              src={berita.gambarUrl}
              alt={`Sampul ${berita.judul}`}
              width={600}
              height={338}
              className="aspect-video w-full object-cover"
            />
          ) : (
            <div className="flex aspect-video w-full items-center justify-center bg-primary-soft" aria-hidden="true">
              <span className="px-6 text-center text-sm font-bold break-words text-primary">{berita.judul}</span>
            </div>
          )}
          <div className="p-5">
            <p className="text-sm font-semibold text-muted">{formatTanggal(berita.publishedAt)}</p>
            <h2 className="mt-2 text-lg font-bold tracking-tight break-words text-ink transition-colors group-hover:text-primary">
              {berita.judul}
            </h2>
            <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed break-words text-muted">{berita.ringkasan}</p>
            <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
              Baca selengkapnya
              <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

function Kerangka() {
  return (
    <div className="mt-10 grid animate-pulse grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-80 rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]" />
      ))}
    </div>
  );
}

export default function BeritaPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kabar Madrasah</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Berita & Agenda</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Kabar terbaru kegiatan, pengumuman, dan prestasi dari lingkungan madrasah.
        </p>

        <Suspense fallback={<Kerangka />}>
          <DaftarBerita />
        </Suspense>
      </div>
    </div>
  );
}
