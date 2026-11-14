import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCalendarDays, LuChevronRight, LuNewspaper, LuSearch, LuSparkles, LuTag, LuX } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { urlFotoUtama } from "@/lib/foto";

export const metadata = {
  title: "Berita",
  description: "Warta, informasi terkini, dan agenda kegiatan MTs Nurul Falah Gunungsindur.",
};

function formatTanggal(t: Date | null) {
  if (!t) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(t);
}

function tautanFilter(kategori: string | null, q: string) {
  const params = new URLSearchParams();
  if (kategori) params.set("kategori", kategori);
  if (q) params.set("q", q);
  const s = params.toString();
  return s ? `/berita?${s}` : "/berita";
}

function FilterBerita({
  kategoriAktif,
  q,
  daftarKategori,
}: {
  kategoriAktif: string | null;
  q: string;
  daftarKategori: string[];
}) {
  const adaFilter = !!kategoriAktif || !!q;
  return (
    <div className="mb-10 space-y-5">
      <form action="/berita" method="get" className="flex flex-wrap items-stretch gap-3">
        <label className="relative min-w-60 flex-1">
          <span className="sr-only">Cari berita</span>
          <LuSearch className="pointer-events-none absolute top-1/2 left-4 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Cari judul atau isi berita..."
            className="min-h-12 w-full border border-line bg-white pr-4 pl-12 text-base text-ink shadow-xs transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
          />
        </label>
        {kategoriAktif && <input type="hidden" name="kategori" value={kategoriAktif} />}
        <button
          type="submit"
          className="inline-flex min-h-12 items-center justify-center border border-primary bg-primary px-7 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-primary-dark"
        >
          Cari
        </button>
        {adaFilter && (
          <Link
            href="/berita"
            className="inline-flex min-h-12 items-center justify-center gap-1.5 border border-line bg-white px-5 text-sm font-bold tracking-wide text-primary uppercase transition-colors hover:bg-primary-soft"
          >
            <LuX className="h-4 w-4" aria-hidden="true" />
            <span>Reset</span>
          </Link>
        )}
      </form>

      <div className="flex flex-wrap items-center gap-2" aria-label="Saring berdasarkan kategori">
        <Link
          href={tautanFilter(null, q)}
          aria-current={!kategoriAktif ? "page" : undefined}
          className={`inline-flex min-h-11 items-center border px-4 text-sm font-semibold transition-colors ${
            !kategoriAktif
              ? "border-primary bg-primary text-white"
              : "border-line bg-white text-primary hover:bg-primary-soft"
          }`}
        >
          Semua
        </Link>
        {daftarKategori.map((k) => {
          const aktif = kategoriAktif === k;
          return (
            <Link
              key={k}
              href={tautanFilter(k, q)}
              aria-current={aktif ? "page" : undefined}
              className={`inline-flex min-h-11 items-center border px-4 text-sm font-semibold transition-colors ${
                aktif
                  ? "border-primary bg-primary text-white"
                  : "border-line bg-white text-primary hover:bg-primary-soft"
              }`}
            >
              {k}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

async function DaftarBerita({ kategori, q }: { kategori: string | null; q: string }) {
  const daftarMentah = await prisma.berita.findMany({
    where: {
      published: true,
      ...(kategori ? { kategori: { nama: kategori } } : {}),
      ...(q
        ? {
            OR: [
              { judul: { contains: q, mode: "insensitive" as const } },
              { ringkasan: { contains: q, mode: "insensitive" as const } },
            ],
          }
        : {}),
    },
    orderBy: { publishedAt: "desc" },
    include: {
      kategori: { select: { nama: true } },
      foto: { orderBy: { urutan: "asc" } },
    },
  });
  const daftar = daftarMentah.map((b) => ({
    ...b,
    gambarUrl: urlFotoUtama(b.foto),
    kategoriNama: b.kategori.nama,
  }));

  if (daftar.length === 0) {
    if (kategori || q) {
      return (
        <div className="border border-line bg-white p-12 text-center shadow-xs">
          <LuSearch className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
          <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
            Tidak Ada Berita yang Cocok
          </h3>
          <p className="mx-auto mt-2 max-w-md text-sm text-muted">
            Tidak ditemukan berita
            {kategori ? ` pada kategori ${kategori}` : ""}
            {q ? ` dengan kata kunci "${q}"` : ""}. Coba kata kunci atau kategori lain.
          </p>
          <Link
            href="/berita"
            className="mt-6 inline-flex min-h-11 items-center justify-center border border-primary bg-primary px-6 text-sm font-bold tracking-wide text-white uppercase transition-colors hover:bg-primary-dark"
          >
            Lihat Semua Berita
          </Link>
        </div>
      );
    }
    return (
      <div className="border border-line bg-white p-12 text-center shadow-xs">
        <LuNewspaper className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
          Belum Ada Berita Diterbitkan
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Kabar dan informasi terbaru sedang disiapkan oleh redaksi madrasah.
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="mb-6 text-sm font-semibold text-muted" role="status">
        Menampilkan {daftar.length} berita
        {kategori ? ` pada kategori ${kategori}` : ""}
        {q ? ` untuk "${q}"` : ""}
      </p>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {daftar.map((berita) => (
          <article
            key={berita.id}
            className="group flex flex-col justify-between border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(11,79,58,0.12)]"
          >
            <div>
              <Link href={`/berita/${berita.slug}`} className="block relative overflow-hidden bg-primary-dark">
                {berita.gambarUrl ? (
                  <Image
                    src={berita.gambarUrl}
                    alt={`Sampul ${berita.judul}`}
                    width={600}
                    height={338}
                    className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex aspect-video w-full items-center justify-center bg-primary"
                    aria-hidden="true"
                  >
                    <span className="px-6 text-center font-serif text-lg font-bold text-white">
                      {berita.judul}
                    </span>
                  </div>
                )}
                {berita.unggulan && (
                  <span className="absolute top-3 left-3 bg-accent px-3 py-1 text-xs font-bold text-primary-dark shadow-sm">
                    Unggulan
                  </span>
                )}
                <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" aria-hidden="true" />
              </Link>

              <div className="p-7">
                <p className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs font-semibold text-muted">
                  <span className="flex items-center gap-1.5">
                    <LuCalendarDays className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
                    <span>{formatTanggal(berita.publishedAt)}</span>
                  </span>
                  <span className="flex items-center gap-1.5">
                    <LuTag className="h-3.5 w-3.5 text-accent-soft" aria-hidden="true" />
                    <span>{berita.kategoriNama}</span>
                  </span>
                </p>

                <h2 className="mt-2.5 font-serif text-xl font-bold tracking-tight text-primary-dark transition-colors group-hover:text-primary">
                  <Link href={`/berita/${berita.slug}`} className="hover:underline">
                    {berita.judul}
                  </Link>
                </h2>

                <p className="mt-3 text-sm leading-relaxed text-muted line-clamp-3">
                  {berita.ringkasan}
                </p>
              </div>
            </div>

            <div className="px-7 pb-7 pt-0">
              <Link
                href={`/berita/${berita.slug}`}
                className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent uppercase transition-colors hover:text-accent-soft"
              >
                <span>Baca Selengkapnya</span>
                <LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

async function IsiBerita({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}) {
  const sp = await searchParams;
  const semuaKategori = await prisma.kategoriBerita.findMany({ orderBy: { id: "asc" } });
  const namaKategori = semuaKategori.map((k) => k.nama);
  const kategoriMentah = sp.kategori?.trim();
  const kategori = kategoriMentah && namaKategori.includes(kategoriMentah) ? kategoriMentah : null;
  const q = (sp.q ?? "").trim().slice(0, 100);

  return (
    <>
      <FilterBerita kategoriAktif={kategori} q={q} daftarKategori={namaKategori} />
      <DaftarBerita kategori={kategori} q={q} />
    </>
  );
}

function Kerangka() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="border border-line bg-white">
          <div className="aspect-video bg-line/60" />
          <div className="p-7 space-y-3">
            <div className="h-4 w-28 bg-line/60" />
            <div className="h-6 w-52 bg-line/80" />
            <div className="h-16 w-full bg-line/40" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function BeritaPage({
  searchParams,
}: {
  searchParams: Promise<{ kategori?: string; q?: string }>;
}) {
  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=2000&auto=format&fit=crop"
          alt="Publikasi dan Kabar Berita MTs Nurul Falah Gunungsindur"
          fill
          className="object-cover opacity-80 sm:opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-transparent sm:via-primary-dark/75" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-300 px-5 py-16 lg:px-6 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Kabar & Informasi</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Berita &amp; Agenda Madrasah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Ikuti berbagai perkembangan kegiatan belajar mengajar, pengumuman resmi madrasah,
            dan kabar prestasi siswa MTs Nurul Falah Gunungsindur.
          </p>
        </div>
      </section>

      <nav aria-label="Breadcrumb" className="border-b border-line bg-white shadow-xs">
        <div className="mx-auto flex w-full max-w-300 items-center gap-2 px-5 py-3 text-xs font-medium lg:px-6">
          <Link href="/" className="text-primary hover:text-primary-dark hover:underline">
            Beranda
          </Link>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="font-semibold text-primary-dark" aria-current="page">
            Berita
          </span>
        </div>
      </nav>

      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiBerita searchParams={searchParams} />
        </Suspense>
      </div>
    </div>
  );
}
