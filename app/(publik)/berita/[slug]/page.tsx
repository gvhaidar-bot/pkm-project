import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuCalendarDays, LuClock, LuSparkles, LuUser } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import IsiArtikel from "@/components/berita/IsiArtikel";

export const metadata = {
  title: "Berita",
  description: "Warta dan pengumuman resmi MTs Nurul Falah Serpong.",
};

function formatTanggal(t: Date | null) {
  if (!t) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(t);
}

function formatTanggalLengkap(t: Date | null) {
  if (!t) return "";
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(t);
}

function hitungMenitBaca(isi: string) {
  const kata = isi.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(kata / 200));
}

async function IsiBerita({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const berita = await prisma.berita.findUnique({
    where: { slug },
    include: {
      author: true,
      foto: { orderBy: { urutan: "asc" } },
    },
  });
  if (!berita || !berita.published) notFound();

  const menitBaca = hitungMenitBaca(berita.isi);
  const terkait = await prisma.berita.findMany({
    where: { published: true, id: { not: berita.id } },
    orderBy: { publishedAt: "desc" },
    take: 3,
  });

  return (
    <article>
      <div className="mx-auto max-w-3xl">
        <Link
          href="/berita"
          className="group inline-flex min-h-10 items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase transition-colors hover:text-primary-dark"
        >
          <LuArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
          <span>Kembali ke Berita</span>
        </Link>

        <h1 className="mt-6 font-serif text-3xl font-black tracking-tight text-primary-dark sm:text-4xl lg:text-5xl">
          {berita.judul}
        </h1>

        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 border-y border-line py-4 text-xs">
          <div className="flex items-center gap-1.5 text-muted">
            <LuUser className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>Oleh <strong className="text-primary-dark">{berita.author?.nama ?? "Humas Madrasah"}</strong></span>
          </div>
          <div className="flex items-center gap-1.5 text-muted">
            <LuCalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>{formatTanggalLengkap(berita.publishedAt)}</span>
          </div>
          <div className="flex items-center gap-1.5 text-muted">
            <LuClock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>{menitBaca} menit baca</span>
          </div>
          {berita.unggulan && (
            <span className="inline-flex items-center gap-1 bg-accent px-2.5 py-0.5 text-[11px] font-bold text-primary-dark">
              <LuSparkles className="h-3 w-3" aria-hidden="true" />
              Unggulan
            </span>
          )}
        </div>

        {berita.ringkasan && (
          <p className="mt-6 font-serif text-lg font-medium leading-relaxed text-primary-dark/90 sm:text-xl border-l-4 border-accent pl-4">
            {berita.ringkasan}
          </p>
        )}
      </div>

      {berita.gambarUrl && (
        <div className="mx-auto mt-10 max-w-4xl border border-line bg-cream p-2 shadow-xs">
          <Image
            src={berita.gambarUrl}
            alt={`Sampul ${berita.judul}`}
            width={1200}
            height={675}
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl">
        <IsiArtikel isi={berita.isi} />
      </div>

      {berita.foto.length > 0 && (
        <div className="mx-auto mt-14 max-w-4xl border-t border-line pt-10">
          <h2 className="font-serif text-xl font-bold text-primary-dark">Dokumentasi Terkait</h2>
          <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {berita.foto.map((foto) => (
              <figure key={foto.id} className="overflow-hidden border border-line bg-primary-dark">
                <Image
                  src={foto.url}
                  alt={foto.caption || `Foto ${berita.judul}`}
                  width={400}
                  height={267}
                  className="aspect-[3/2] w-full object-cover transition-transform duration-300 hover:scale-105"
                />
                {foto.caption && (
                  <figcaption className="bg-white p-2.5 text-xs text-muted">
                    {foto.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        </div>
      )}

      {/* Author Card */}
      <div className="mx-auto mt-14 max-w-3xl border border-line bg-cream/50 p-6 shadow-xs">
        <div className="flex items-center gap-4">
          <span
            className="flex h-14 w-14 shrink-0 items-center justify-center border border-accent/40 bg-primary font-serif text-2xl font-bold text-accent"
            aria-hidden="true"
          >
            {(berita.author?.nama ?? "H").charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-[11px] font-bold tracking-wider text-muted uppercase">Diterbitkan Oleh</p>
            <p className="font-serif text-base font-bold text-primary-dark">
              {berita.author?.nama ?? "Tim Humas MTs Nurul Falah"}
            </p>
            <p className="text-xs text-muted">MTs Nurul Falah Serpong, Tangerang Selatan</p>
          </div>
        </div>
      </div>

      {/* Related News */}
      {terkait.length > 0 && (
        <div className="mx-auto mt-16 max-w-4xl border-t-2 border-primary-dark pt-12">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-bold text-primary-dark">Kabar Pilihan Lainnya</h2>
            <Link
              href="/berita"
              className="inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider hover:text-accent-soft"
            >
              <span>Semua Berita</span>
              <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {terkait.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="group flex flex-col justify-between border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-md"
              >
                <div>
                  {item.gambarUrl ? (
                    <Image
                      src={item.gambarUrl}
                      alt={`Sampul ${item.judul}`}
                      width={400}
                      height={225}
                      className="aspect-video w-full object-cover"
                    />
                  ) : (
                    <div
                      className="flex aspect-video w-full items-center justify-center bg-primary"
                      aria-hidden="true"
                    >
                      <span className="px-4 text-center font-serif text-sm font-bold text-white line-clamp-2">
                        {item.judul}
                      </span>
                    </div>
                  )}
                  <div className="p-5">
                    <p className="text-xs text-muted">{formatTanggal(item.publishedAt)}</p>
                    <h3 className="mt-1.5 font-serif text-base font-bold text-primary-dark line-clamp-2 transition-colors group-hover:text-primary">
                      {item.judul}
                    </h3>
                  </div>
                </div>

                <div className="px-5 pb-5 pt-0">
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider">
                    <span>Baca</span>
                    <LuArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function Kerangka() {
  return (
    <div className="mx-auto max-w-3xl animate-pulse space-y-6">
      <div className="h-5 w-32 bg-line/80" />
      <div className="h-10 w-full bg-line/80" />
      <div className="h-6 w-3/4 bg-line/60" />
      <div className="aspect-video w-full bg-line/40" />
      <div className="space-y-3 pt-6">
        <div className="h-4 w-full bg-line/60" />
        <div className="h-4 w-full bg-line/60" />
        <div className="h-4 w-2/3 bg-line/60" />
      </div>
    </div>
  );
}

export default function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="bg-white py-14">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiBerita params={params} />
        </Suspense>
      </div>
    </div>
  );
}
