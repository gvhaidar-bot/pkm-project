import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import JudulBagian from "./JudulBagian";

function formatTanggal(t: Date | null) {
  if (!t) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(t);
}

export default async function BeritaTeaser() {
  const daftar = await prisma.berita.findMany({
    where: { published: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  if (daftar.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Kabar Madrasah"
          judul="Berita & Agenda"
          deskripsi="Kabar terbaru kegiatan, pengumuman, dan prestasi dari lingkungan madrasah."
        />
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
                <div
                  className="flex aspect-video w-full items-center justify-center bg-primary-soft"
                  aria-hidden="true"
                >
                  <span className="px-6 text-center text-sm font-bold text-primary">{berita.judul}</span>
                </div>
              )}
              <div className="p-5">
                <p className="text-sm font-semibold text-muted">{formatTanggal(berita.publishedAt)}</p>
                <h3 className="mt-2 text-lg font-bold tracking-tight text-ink transition-colors group-hover:text-primary">
                  {berita.judul}
                </h3>
                <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">
                  {berita.ringkasan}
                </p>
                <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
                  Baca selengkapnya
                  <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </p>
              </div>
            </Link>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/berita"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent px-7 text-base font-bold text-primary-dark transition-colors hover:bg-accent-soft"
          >
            Lihat Semua Berita
            <LuArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
