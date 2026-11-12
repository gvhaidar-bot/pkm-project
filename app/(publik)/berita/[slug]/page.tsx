import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  LuArrowLeft,
  LuArrowRight,
  LuCalendarDays,
  LuChevronRight,
  LuCircleCheck,
  LuClock,
  LuImage,
  LuNewspaper,
  LuPhone,
  LuSparkles,
  LuUser,
} from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import IsiArtikel from "@/components/berita/IsiArtikel";
import BagikanBerita from "@/components/berita/BagikanBerita";

const fallbackSampulBerita =
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200&auto=format&fit=crop";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const berita = await prisma.berita.findFirst({
    where: { slug, published: true },
    select: { judul: true, ringkasan: true },
  });
  if (!berita) return { title: "Berita Tidak Ditemukan" };
  return {
    title: berita.judul,
    description: berita.ringkasan || "Warta resmi MTs Nurul Falah Serpong, Tangerang Selatan.",
  };
}

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
      author: { select: { nama: true } },
      foto: { orderBy: { urutan: "asc" } },
    },
  });
  if (!berita || !berita.published) notFound();

  const menitBaca = hitungMenitBaca(berita.isi);
  const wartaTerkini = await prisma.berita.findMany({
    where: { published: true, id: { not: berita.id } },
    orderBy: { publishedAt: "desc" },
    take: 4,
  });

  const sampulUtama = berita.gambarUrl || fallbackSampulBerita;

  return (
    <div>
      {/* Breadcrumbs Navigation */}
      <nav aria-label="Breadcrumb" className="border-b border-line pb-4 mb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted">
          <Link href="/" className="text-primary hover:text-primary-dark hover:underline">
            Beranda
          </Link>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <Link href="/berita" className="text-primary hover:text-primary-dark hover:underline">
            Berita
          </Link>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="truncate max-w-[240px] sm:max-w-md font-semibold text-primary-dark" aria-current="page">
            {berita.judul}
          </span>
        </div>
      </nav>

      {/* Article Header */}
      <header className="border-b border-line pb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <Link
            href="/berita"
            className="group inline-flex items-center gap-2 text-xs font-bold tracking-wider text-accent uppercase transition-colors hover:text-accent-soft"
          >
            <LuArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
            <span>Kembali ke Indeks Warta</span>
          </Link>

          <div className="inline-flex items-center gap-2 border border-accent/40 bg-primary-soft px-3 py-1 text-xs font-bold tracking-[0.14em] text-primary uppercase">
            <LuNewspaper className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>Warta & Informasi Madrasah</span>
          </div>
        </div>

        {/* Main Headline */}
        <h1 className="mt-5 font-serif text-3xl font-black leading-[1.18] tracking-tight text-primary-dark sm:text-4xl lg:text-5xl">
          {berita.judul}
        </h1>

        {/* Metadata & Actions Bar */}
        <div className="mt-6 flex flex-col gap-4 border-t border-line/80 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2.5 text-xs text-muted">
            <div className="flex items-center gap-1.5 font-medium">
              <span className="flex h-6 w-6 items-center justify-center border border-accent/40 bg-primary font-serif text-xs font-bold text-accent">
                {(berita.author?.nama ?? "H").charAt(0).toUpperCase()}
              </span>
              <span>
                Oleh <strong className="text-primary-dark">{berita.author?.nama ?? "Humas MTs Nurul Falah"}</strong>
              </span>
            </div>

            <span className="h-3 w-px bg-line" aria-hidden="true" />

            <div className="flex items-center gap-1.5 font-medium">
              <LuCalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>{formatTanggalLengkap(berita.publishedAt)}</span>
            </div>

            <span className="h-3 w-px bg-line" aria-hidden="true" />

            <div className="flex items-center gap-1.5 font-medium">
              <LuClock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              <span>{menitBaca} menit baca</span>
            </div>

            {berita.unggulan && (
              <span className="inline-flex items-center gap-1 bg-accent px-2.5 py-0.5 text-[11px] font-bold text-primary-dark shadow-2xs">
                <LuSparkles className="h-3 w-3" aria-hidden="true" />
                Unggulan
              </span>
            )}
          </div>

          <BagikanBerita judul={berita.judul} />
        </div>
      </header>

      {/* Main Content & Sidebar Grid */}
      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[1fr_360px] lg:items-start">
        {/* Main Editorial Column */}
        <main className="min-w-0">
          {/* Featured Hero Photo */}
          <div className="relative overflow-hidden border border-line bg-cream shadow-xs">
            <Image
              src={sampulUtama}
              alt={`Dokumentasi warta: ${berita.judul}`}
              width={1200}
              height={675}
              priority
              className="aspect-[16/9] w-full object-cover object-center"
            />
            <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" aria-hidden="true" />
            <div className="flex items-center justify-between border-t border-line/60 bg-white px-4 py-2.5 text-xs text-muted">
              <span className="flex items-center gap-1.5">
                <LuImage className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                <span className="font-medium text-ink/75">Dokumentasi Resmi MTs Nurul Falah Serpong</span>
              </span>
              <span className="text-[11px] font-bold tracking-wider text-accent uppercase">Publikasi Humas</span>
            </div>
          </div>

          {/* Excerpt / Lead Callout Box */}
          {berita.ringkasan && (
            <div className="mt-8 border-l-4 border-accent bg-primary-soft/40 p-6 sm:p-7 shadow-xs">
              <span className="text-[10px] font-bold tracking-[0.18em] text-accent uppercase block mb-1.5">
                Ringkasan Warta
              </span>
              <p className="font-serif text-lg font-medium leading-relaxed text-primary-dark sm:text-xl">
                {berita.ringkasan}
              </p>
            </div>
          )}

          {/* Article Prose Content */}
          <article className="mt-8">
            <IsiArtikel isi={berita.isi} />
          </article>

          {/* Additional Photo Gallery */}
          {berita.foto.length > 0 && (
            <section className="mt-14 border-t-2 border-primary-dark pt-8" aria-label="Galeri dokumentasi kegiatan">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Arsip Visual</span>
                  <h2 className="mt-1 font-serif text-2xl font-bold text-primary-dark">Dokumentasi Terkait Kegiatan</h2>
                </div>
                <span className="text-xs font-bold text-muted">{berita.foto.length} Foto</span>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                {berita.foto.map((foto) => (
                  <figure
                    key={foto.id}
                    className="group relative overflow-hidden border border-line bg-white shadow-xs transition-all duration-300 hover:border-accent hover:shadow-md"
                  >
                    <Image
                      src={foto.url}
                      alt={foto.caption || `Foto dokumentasi ${berita.judul}`}
                      width={600}
                      height={400}
                      className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {foto.caption && (
                      <figcaption className="border-t border-line/60 bg-white p-3 text-xs leading-relaxed text-muted">
                        {foto.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            </section>
          )}

          {/* Official Publisher Seal / Byline Card */}
          <div className="mt-14 border border-line bg-cream p-7 shadow-xs">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="relative flex h-14 w-14 shrink-0 items-center justify-center border border-accent/40 bg-primary p-1">
                  <Image
                    src="/logo.svg"
                    alt="Logo MTs Nurul Falah"
                    width={44}
                    height={44}
                    className="h-10 w-10 object-contain"
                  />
                </div>
                <div>
                  <span className="inline-flex items-center gap-1.5 text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
                    <LuCircleCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                    <span>Diterbitkan Oleh Redaksi Resmi</span>
                  </span>
                  <p className="mt-1 font-serif text-lg font-bold text-primary-dark">
                    {berita.author?.nama ?? "Tim Humas & Publikasi Madrasah"}
                  </p>
                  <p className="text-xs text-muted">
                    MTs Nurul Falah Serpong · Lengkong Gudang, Tangerang Selatan
                  </p>
                </div>
              </div>

              <Link
                href="/berita"
                className="inline-flex h-11 shrink-0 items-center justify-center border border-primary bg-primary px-5 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:bg-primary-dark"
              >
                Lihat Warta Lain
              </Link>
            </div>
            <p className="mt-4 border-t border-line/60 pt-3 text-[11px] leading-relaxed text-muted">
              Warta ini diterbitkan untuk konsumsi publik sebagai media informasi resmi kegiatan, program, dan prestasi di lingkungan MTs Nurul Falah Serpong.
            </p>
          </div>
        </main>

        {/* Right Sticky Sidebar */}
        <aside className="space-y-8 lg:sticky lg:top-28">
          {/* Recent News Widget */}
          <div className="border border-line bg-white shadow-xs">
            <div className="border-b border-line bg-primary-soft px-5 py-4">
              <span className="text-[10px] font-bold tracking-[0.16em] text-accent uppercase block">
                Kabar Terbaru
              </span>
              <h3 className="font-serif text-lg font-bold text-primary-dark">Warta Terkini Madrasah</h3>
            </div>

            <div className="divide-y divide-line/70">
              {wartaTerkini.map((item) => (
                <Link
                  key={item.id}
                  href={`/berita/${item.slug}`}
                  className="group flex items-start gap-3.5 p-4 transition-colors hover:bg-primary-soft/40"
                >
                  <div className="relative h-18 w-18 shrink-0 overflow-hidden border border-line bg-cream">
                    <Image
                      src={item.gambarUrl || fallbackSampulBerita}
                      alt={`Thumbnail ${item.judul}`}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="text-[11px] font-semibold text-muted">
                      {formatTanggal(item.publishedAt)}
                    </span>
                    <h4 className="mt-1 font-serif text-sm font-bold leading-snug text-primary-dark line-clamp-2 transition-colors group-hover:text-primary">
                      {item.judul}
                    </h4>
                  </div>
                </Link>
              ))}
            </div>

            <div className="border-t border-line p-4 text-center bg-cream/30">
              <Link
                href="/berita"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider transition-colors hover:text-accent-soft"
              >
                <span>Buka Seluruh Direktori Berita</span>
                <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* School PR Contact Box */}
          <div className="border border-line border-t-4 border-t-accent bg-primary-dark text-white p-6 shadow-sm">
            <span className="text-[10px] font-bold tracking-[0.16em] text-accent uppercase block">
              Pusat Informasi & Humas
            </span>
            <h3 className="mt-2 font-serif text-lg font-bold text-white">
              Punya Pertanyaan Seputar Madrasah?
            </h3>
            <p className="mt-2 text-xs leading-relaxed text-white/80">
              Tim pelayanan informasi madrasah kami siap menyambut pertanyaan orang tua calon siswa dan masyarakat.
            </p>
            <div className="mt-5 pt-4 border-t border-white/15">
              <Link
                href="/kontak"
                className="flex h-11 w-full items-center justify-center gap-2 bg-accent px-4 text-xs font-bold tracking-wider text-primary-dark uppercase transition-colors hover:bg-accent-hover"
              >
                <LuPhone className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Hubungi Tata Usaha</span>
              </Link>
            </div>
          </div>

          {/* Fast Links */}
          <div className="border border-line bg-white p-6 shadow-xs">
            <span className="text-[10px] font-bold tracking-[0.16em] text-accent uppercase block mb-3">
              Jelajahi MTs Nurul Falah
            </span>
            <ul className="space-y-2.5 text-xs font-semibold text-primary-dark">
              <li>
                <Link href="/profil" className="flex items-center justify-between border-b border-line/60 pb-2 hover:text-primary">
                  <span>Profil & Sejarah Madrasah</span>
                  <LuChevronRight className="h-3.5 w-3.5 text-accent" />
                </Link>
              </li>
              <li>
                <Link href="/visi-misi" className="flex items-center justify-between border-b border-line/60 pb-2 hover:text-primary">
                  <span>Visi & Misi Pendidikan</span>
                  <LuChevronRight className="h-3.5 w-3.5 text-accent" />
                </Link>
              </li>
              <li>
                <Link href="/guru" className="flex items-center justify-between border-b border-line/60 pb-2 hover:text-primary">
                  <span>Dewan Pendidik & Guru</span>
                  <LuChevronRight className="h-3.5 w-3.5 text-accent" />
                </Link>
              </li>
              <li>
                <Link href="/program/unggulan" className="flex items-center justify-between hover:text-primary">
                  <span>Program Unggulan Madrasah</span>
                  <LuChevronRight className="h-3.5 w-3.5 text-accent" />
                </Link>
              </li>
            </ul>
          </div>
        </aside>
      </div>

      {/* Related News Carousel / Grid at Bottom */}
      {wartaTerkini.length > 0 && (
        <section className="mt-20 border-t-2 border-primary-dark pt-12" aria-label="Warta pilihan lainnya">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <span className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Rekomendasi Bacaan</span>
              <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">
                Kabar Pilihan Lainnya
              </h2>
            </div>
            <Link
              href="/berita"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-accent uppercase tracking-wider transition-colors hover:text-accent-soft"
            >
              <span>Semua Berita</span>
              <LuArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {wartaTerkini.slice(0, 3).map((item) => (
              <article
                key={item.id}
                className="group flex flex-col justify-between border border-line bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(11,79,58,0.12)]"
              >
                <div>
                  <Link href={`/berita/${item.slug}`} className="block relative overflow-hidden bg-primary-dark">
                    <Image
                      src={item.gambarUrl || fallbackSampulBerita}
                      alt={`Sampul ${item.judul}`}
                      width={600}
                      height={338}
                      className="aspect-video w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {item.unggulan && (
                      <span className="absolute top-3 left-3 bg-accent px-3 py-1 text-xs font-bold text-primary-dark shadow-xs">
                        Unggulan
                      </span>
                    )}
                    <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" aria-hidden="true" />
                  </Link>

                  <div className="p-6">
                    <p className="flex items-center gap-1.5 text-xs font-semibold text-muted">
                      <LuCalendarDays className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                      <span>{formatTanggal(item.publishedAt)}</span>
                    </p>

                    <h3 className="mt-2.5 font-serif text-lg font-bold tracking-tight text-primary-dark transition-colors group-hover:text-primary line-clamp-2">
                      <Link href={`/berita/${item.slug}`} className="hover:underline">
                        {item.judul}
                      </Link>
                    </h3>

                    {item.ringkasan && (
                      <p className="mt-2 text-xs leading-relaxed text-muted line-clamp-2">
                        {item.ringkasan}
                      </p>
                    )}
                  </div>
                </div>

                <div className="px-6 pb-6 pt-0">
                  <Link
                    href={`/berita/${item.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold tracking-wider text-accent uppercase transition-colors hover:text-accent-soft"
                  >
                    <span>Baca Selengkapnya</span>
                    <LuArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse space-y-8">
      <div className="h-4 w-48 bg-line/80" />
      <div className="space-y-4">
        <div className="h-10 w-full bg-line/80" />
        <div className="h-5 w-64 bg-line/60" />
      </div>
      <div className="aspect-[16/9] w-full bg-line/40" />
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          <div className="h-4 w-full bg-line/60" />
          <div className="h-4 w-full bg-line/60" />
          <div className="h-4 w-3/4 bg-line/60" />
        </div>
        <div className="h-80 border border-line bg-line/20" />
      </div>
    </div>
  );
}

export default function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="bg-cream/40 py-12 sm:py-16">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiBerita params={params} />
        </Suspense>
      </div>
    </div>
  );
}
