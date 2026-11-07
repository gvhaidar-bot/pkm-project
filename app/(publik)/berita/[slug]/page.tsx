import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuSparkles } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import IsiArtikel from "@/components/berita/IsiArtikel";

export const metadata = {
  title: "Berita",
  description: "Baca berita MTs Nurul Falah Serpong.",
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
          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          <LuArrowLeft className="h-5 w-5" aria-hidden="true" />
          Semua berita
        </Link>

        <h1 className="mt-8 text-3xl font-extrabold tracking-tight break-words text-ink sm:text-4xl">
          {berita.judul}
        </h1>

        <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3 border-y border-line py-4">
          <div>
            <p className="text-xs font-semibold text-muted">Ditulis oleh</p>
            <p className="mt-0.5 text-base font-bold break-words text-ink">{berita.author?.nama ?? "Administrator"}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Tanggal</p>
            <p className="mt-0.5 text-base font-bold text-ink">{formatTanggalLengkap(berita.publishedAt)}</p>
          </div>
          <div>
            <p className="text-xs font-semibold text-muted">Waktu baca</p>
            <p className="mt-0.5 text-base font-bold text-ink">{menitBaca} menit</p>
          </div>
          {berita.unggulan && (
            <div>
              <p className="text-xs font-semibold text-muted">Status</p>
              <p className="mt-1.5 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-xs font-bold text-primary-dark">
                <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
                Unggulan
              </p>
            </div>
          )}
        </div>

        <p className="mt-8 text-xl leading-relaxed font-bold break-words text-ink">{berita.ringkasan}</p>
      </div>

      {berita.gambarUrl && (
        <div className="mx-auto mt-10 max-w-4xl">
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

      <IsiArtikel isi={berita.isi} />

      {berita.foto.length > 0 && (
        <div className="mx-auto mt-12 max-w-4xl">
          <h2 className="text-xl font-bold tracking-tight text-ink">Galeri Foto</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {berita.foto.map((foto) => (
              <Image
                key={foto.id}
                src={foto.url}
                alt={foto.caption || `Foto galeri ${berita.judul}`}
                width={400}
                height={267}
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      )}

      <div className="mx-auto mt-12 max-w-3xl rounded-2xl border border-line bg-white p-6">
        <div className="flex items-center gap-4">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-surface-warm text-2xl font-extrabold text-primary"
            aria-hidden="true"
          >
            {(berita.author?.nama ?? "A").charAt(0).toUpperCase()}
          </span>
          <div>
            <p className="text-xs font-bold tracking-wide text-muted uppercase">Penulis</p>
            <p className="text-lg font-extrabold break-words text-ink">{berita.author?.nama ?? "Administrator"}</p>
          </div>
        </div>
      </div>

      {terkait.length > 0 && (
        <div className="mx-auto mt-16 max-w-4xl border-t border-line pt-10">
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Berita Terkait</h2>
          <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {terkait.map((item) => (
              <Link
                key={item.id}
                href={`/berita/${item.slug}`}
                className="group overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
              >
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
                    className="flex aspect-video w-full items-center justify-center bg-primary-soft"
                    aria-hidden="true"
                  >
                    <span className="px-4 text-center text-sm font-bold break-words text-primary">{item.judul}</span>
                  </div>
                )}
                <div className="p-4">
                  <p className="text-xs font-semibold text-muted">{formatTanggal(item.publishedAt)}</p>
                  <h3 className="mt-1.5 line-clamp-2 text-base font-bold tracking-tight break-words text-ink transition-colors group-hover:text-primary">
                    {item.judul}
                  </h3>
                  <p className="mt-2 inline-flex items-center gap-1 text-sm font-bold text-primary">
                    Baca selengkapnya
                    <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                  </p>
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
    <div className="mx-auto max-w-3xl animate-pulse">
      <div className="h-11 w-40 rounded-full bg-surface-warm" />
      <div className="mt-8 h-10 w-3/4 rounded-2xl bg-surface-warm" />
      <div className="mt-6 h-16 w-full rounded-2xl bg-surface-warm" />
      <div className="mt-8 h-24 w-full rounded-2xl bg-surface-warm" />
      <div className="mt-10 aspect-video w-full rounded-3xl bg-surface-warm" />
      <div className="mt-10 space-y-4">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 w-full rounded-full bg-surface-warm" />
        ))}
      </div>
    </div>
  );
}

export default function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="bg-white">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiBerita params={params} />
        </Suspense>
      </div>
    </div>
  );
}
