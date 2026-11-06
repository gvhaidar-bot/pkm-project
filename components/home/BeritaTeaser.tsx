import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCalendarDays, LuNewspaper, LuSparkles } from "react-icons/lu";
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
  const unggulan = await prisma.berita.findMany({
    where: { published: true, unggulan: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: { author: true },
  });

  let daftar = unggulan;
  if (daftar.length < 3) {
    const tambahan = await prisma.berita.findMany({
      where: { published: true, id: { notIn: daftar.map((b) => b.id) } },
      orderBy: { publishedAt: "desc" },
      take: 3 - daftar.length,
      include: { author: true },
    });
    daftar = [...daftar, ...tambahan];
  }

  if (daftar.length === 0) return null;

  const [utama, ...lainnya] = daftar;

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Kabar Madrasah"
          judul="Berita Terbaru"
          deskripsi="Kabar pilihan dari lingkungan madrasah — kegiatan, pengumuman, dan prestasi."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-5">
          <Link
            href={`/berita/${utama.slug}`}
            className={`group relative block overflow-hidden rounded-3xl shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)] ${
              lainnya.length > 0 ? "lg:col-span-3" : "lg:col-span-5"
            }`}
          >
            {utama.gambarUrl ? (
              <Image
                src={utama.gambarUrl}
                alt={`Sampul ${utama.judul}`}
                width={900}
                height={563}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105 sm:aspect-[16/10]"
              />
            ) : (
              <div
                className="flex aspect-[4/3] w-full items-center justify-center bg-primary sm:aspect-[16/10]"
                aria-hidden="true"
              >
                <span className="px-6 text-center text-lg font-bold text-white">{utama.judul}</span>
              </div>
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/60 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              {utama.unggulan && (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
                  <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Unggulan
                </span>
              )}
              <p className="mt-3 flex flex-wrap items-center gap-1.5 text-sm font-semibold text-cream/90">
                <LuCalendarDays className="h-4 w-4" aria-hidden="true" />
                {formatTanggal(utama.publishedAt)}
                {utama.author ? ` · oleh ${utama.author.nama}` : ""}
              </p>
              <h3 className="mt-2 text-xl font-extrabold tracking-tight text-white sm:text-3xl">
                {utama.judul}
              </h3>
              <p className="mt-2 hidden max-w-2xl text-base leading-relaxed text-cream/90 sm:block sm:line-clamp-2">
                {utama.ringkasan}
              </p>
              <span className="mt-4 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-5 text-sm font-bold text-primary transition-colors group-hover:bg-accent group-hover:text-primary-dark">
                Baca Selengkapnya
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </span>
            </div>
          </Link>

          {lainnya.length > 0 && (
            <div className="flex flex-col gap-5 lg:col-span-2">
              {lainnya.map((berita) => (
                <Link
                  key={berita.id}
                  href={`/berita/${berita.slug}`}
                  className="group flex flex-1 gap-4 rounded-3xl bg-white p-4 shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
                >
                  {berita.gambarUrl ? (
                    <Image
                      src={berita.gambarUrl}
                      alt={`Sampul ${berita.judul}`}
                      width={160}
                      height={128}
                      className="h-28 w-32 shrink-0 rounded-2xl object-cover sm:h-32 sm:w-40"
                    />
                  ) : (
                    <div
                      className="flex h-28 w-32 shrink-0 items-center justify-center rounded-2xl bg-primary-soft sm:h-32 sm:w-40"
                      aria-hidden="true"
                    >
                      <LuNewspaper className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>
                  )}
                  <div className="min-w-0 py-1">
                    <p className="flex flex-wrap items-center gap-x-1.5 gap-y-1 text-xs font-semibold text-muted">
                      <LuCalendarDays className="h-3.5 w-3.5" aria-hidden="true" />
                      {formatTanggal(berita.publishedAt)}
                      {berita.unggulan && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-accent px-2 py-0.5 text-[11px] font-bold text-primary-dark">
                          <LuSparkles className="h-3 w-3" aria-hidden="true" />
                          Unggulan
                        </span>
                      )}
                    </p>
                    <h3 className="mt-1.5 line-clamp-2 text-base font-bold tracking-tight text-ink transition-colors group-hover:text-primary sm:text-lg">
                      {berita.judul}
                    </h3>
                    <p className="mt-2 hidden items-center gap-1 text-sm font-bold text-primary sm:inline-flex">
                      Baca Selengkapnya
                      <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          )}
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
