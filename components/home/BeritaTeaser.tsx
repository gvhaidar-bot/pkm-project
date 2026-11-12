import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCalendarDays, LuNewspaper, LuSparkles } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { urlFotoUtama } from "@/lib/foto";
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
  const unggulanMentah = await prisma.berita.findMany({
    where: { published: true, unggulan: true },
    orderBy: { publishedAt: "desc" },
    take: 3,
    include: {
      author: { select: { nama: true } },
      foto: { orderBy: { urutan: "asc" } },
    },
  });
  const unggulan = unggulanMentah.map((b) => ({ ...b, gambarUrl: urlFotoUtama(b.foto) }));

  let daftar = unggulan;
  if (daftar.length < 3) {
    const tambahanMentah = await prisma.berita.findMany({
      where: { published: true, id: { notIn: daftar.map((b) => b.id) } },
      orderBy: { publishedAt: "desc" },
      take: 3 - daftar.length,
      include: {
        author: { select: { nama: true } },
        foto: { orderBy: { urutan: "asc" } },
      },
    });
    const tambahan = tambahanMentah.map((b) => ({ ...b, gambarUrl: urlFotoUtama(b.foto) }));
    daftar = [...daftar, ...tambahan];
  }

  if (daftar.length === 0) return null;

  const [utama, ...lainnya] = daftar;

  return (
    <section className="bg-white py-20 border-b border-line">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <JudulBagian
          label="Kabar Madrasah"
          judul="Berita & Informasi Terbaru"
          deskripsi="Pantau berbagai aktivitas, pengumuman, dan kabar prestasi terkini dari lingkungan madrasah."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Main featured news article */}
          <Link
            href={`/berita/${utama.slug}`}
            className={`group relative block overflow-hidden border border-line bg-primary-dark transition-all duration-300 hover:shadow-[0_16px_40px_rgba(11,79,58,0.18)] ${
              lainnya.length > 0 ? "lg:col-span-7" : "lg:col-span-12"
            }`}
          >
            {utama.gambarUrl ? (
              <Image
                src={utama.gambarUrl}
                alt={`Sampul ${utama.judul}`}
                width={900}
                height={563}
                className="aspect-[4/3] w-full object-cover transition-transform duration-700 group-hover:scale-105 sm:aspect-[16/10]"
              />
            ) : (
              <div
                className="flex aspect-[4/3] w-full items-center justify-center bg-primary-dark sm:aspect-[16/10]"
                aria-hidden="true"
              >
                <span className="px-6 text-center font-serif text-xl font-bold break-words text-white">
                  {utama.judul}
                </span>
              </div>
            )}
            <div
              className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/65 to-transparent"
              aria-hidden="true"
            />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              {utama.unggulan && (
                <span className="inline-flex items-center gap-1.5 bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
                  <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
                  Unggulan
                </span>
              )}
              <p className="mt-3 flex flex-wrap items-center gap-2 text-xs font-semibold text-white/80">
                <LuCalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span>{formatTanggal(utama.publishedAt)}</span>
                {utama.author ? <span>· Oleh {utama.author.nama}</span> : null}
              </p>
              <h3 className="mt-2 font-serif text-xl font-bold tracking-tight text-white sm:text-2xl lg:text-3xl">
                {utama.judul}
              </h3>
              <p className="mt-2 hidden text-sm leading-relaxed text-white/85 sm:block sm:line-clamp-2">
                {utama.ringkasan}
              </p>
              <div className="mt-5">
                <span className="inline-flex items-center gap-1.5 border border-accent bg-accent px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase transition-colors group-hover:bg-accent-soft">
                  <span>Baca Selengkapnya</span>
                  <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                </span>
              </div>
            </div>
          </Link>

          {/* Secondary news articles */}
          {lainnya.length > 0 && (
            <div className="flex flex-col gap-6 lg:col-span-5">
              {lainnya.map((berita) => (
                <Link
                  key={berita.id}
                  href={`/berita/${berita.slug}`}
                  className="group flex flex-1 gap-4 border border-line bg-cream p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-accent hover:bg-white hover:shadow-md"
                >
                  {berita.gambarUrl ? (
                    <Image
                      src={berita.gambarUrl}
                      alt={`Sampul ${berita.judul}`}
                      width={180}
                      height={140}
                      className="h-28 w-28 shrink-0 object-cover sm:h-32 sm:w-36"
                    />
                  ) : (
                    <div
                      className="flex h-28 w-28 shrink-0 items-center justify-center border border-accent/20 bg-primary-soft sm:h-32 sm:w-36"
                      aria-hidden="true"
                    >
                      <LuNewspaper className="h-8 w-8 text-primary" aria-hidden="true" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col justify-between py-0.5">
                    <div>
                      <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                        <LuCalendarDays className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
                        <span>{formatTanggal(berita.publishedAt)}</span>
                      </p>
                      <h4 className="mt-1.5 font-serif text-base font-bold tracking-tight text-primary-dark transition-colors group-hover:text-primary sm:text-lg">
                        {berita.judul}
                      </h4>
                      <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted">
                        {berita.ringkasan}
                      </p>
                    </div>

                    <span className="mt-3 inline-flex items-center gap-1 text-xs font-bold text-accent transition-colors group-hover:text-accent-soft uppercase tracking-wider">
                      <span>Selengkapnya</span>
                      <LuArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/berita"
            className="group inline-flex min-h-12 items-center justify-center gap-2 border border-primary bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
          >
            <span>Lihat Semua Berita & Agenda</span>
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
