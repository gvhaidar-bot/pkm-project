import Image from "next/image";
import Link from "next/link";
import { LuInstagram, LuMapPin, LuMusic2 } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

const tautanInternal = [
  { label: "Profil Sekolah", href: "/profil" },
  { label: "Akademik", href: "/program/akademik" },
  { label: "Visi Misi", href: "/visi-misi" },
  { label: "Ekstrakurikuler", href: "/program/ekstrakurikuler" },
  { label: "Berita", href: "/berita" },
];

const petaUrl =
  "https://maps.google.com/maps?q=MTs%20Nurul%20Falah%20Serpong%2C%20Lengkong%20Gudang%2C%20Serpong%2C%20Kota%20Tangerang%20Selatan&output=embed";

function formatTanggal(t: Date | null) {
  if (!t) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(t);
}

async function muatDataFooter() {
  try {
    const [pengaturan, berita] = await Promise.all([
      prisma.pengaturan.findUnique({ where: { kunci: "tampilkanBeritaFooter" } }),
      prisma.berita.findMany({
        where: { published: true },
        orderBy: { publishedAt: "desc" },
        take: 3,
        select: { judul: true, slug: true, publishedAt: true, createdAt: true },
      }),
    ]);
    return { tampilkanBerita: pengaturan?.nilai !== "false", berita };
  } catch (e) {
    console.error(e);
    return { tampilkanBerita: true, berita: [] as { judul: string; slug: string; publishedAt: Date | null; createdAt: Date }[] };
  }
}

export default async function Footer() {
  const { tampilkanBerita, berita } = await muatDataFooter();

  return (
    <footer className="bg-primary-dark text-cream">
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <div
          className={`grid grid-cols-1 gap-10 sm:grid-cols-2 ${
            tampilkanBerita ? "lg:grid-cols-3 xl:grid-cols-5" : "lg:grid-cols-2 xl:grid-cols-4"
          }`}
        >
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="Beranda MTs Nurul Falah Serpong">
              <Image src="/logo.svg" alt="Logo MTs Nurul Falah Serpong" width={48} height={48} className="h-12 w-12 shrink-0" />
              <span className="flex flex-col leading-tight">
                <span className="text-[17px] font-extrabold tracking-tight">MTs Nurul Falah</span>
                <span className="text-[11px] font-bold tracking-[0.14em] text-accent-soft uppercase">Serpong, Tangerang Selatan</span>
              </span>
            </Link>
            <p className="mt-5 font-serif text-base leading-relaxed text-cream/80 italic">
              &ldquo;Terwujudnya Madrasah yang mampu membentuk generasi yang berakhlakul karimah.&rdquo;
            </p>
            <p className="mt-4 font-serif text-sm leading-relaxed text-cream/60 italic">
              &ldquo;Ing ngarsa sung tulada, ing madya mangun karsa, tut wuri handayani.&rdquo;
              <span className="mt-1 block font-semibold text-cream/70 not-italic">— Ki Hadjar Dewantara</span>
            </p>
          </div>

          <nav aria-label="Tautan internal footer">
            <h2 className="text-xs font-bold tracking-[0.12em] uppercase">Links Internal</h2>
            <span className="mt-3 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <ul className="mt-4">
              {tautanInternal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-11 items-center text-base text-cream/80 transition-colors hover:text-cream">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {tampilkanBerita && (
            <nav aria-label="Berita terbaru footer">
              <h2 className="text-xs font-bold tracking-[0.12em] uppercase">Berita Terbaru</h2>
              <span className="mt-3 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
              {berita.length === 0 ? (
                <p className="mt-4 text-base text-cream/80">Belum ada berita yang terbit.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {berita.map((item) => (
                    <li key={item.slug}>
                      <Link href={`/berita/${item.slug}`} className="block text-base leading-snug font-semibold text-cream/90 transition-colors hover:text-cream">
                        {item.judul}
                      </Link>
                      <p className="mt-1 text-sm text-cream/60">
                        {formatTanggal(item.publishedAt ?? item.createdAt)}
                      </p>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/berita" className="mt-5 inline-flex min-h-11 items-center text-base font-semibold text-accent-soft transition-colors hover:text-accent">
                Lihat Semua Berita
              </Link>
            </nav>
          )}

          <div>
            <h2 className="text-xs font-bold tracking-[0.12em] uppercase">Hubungi Kami</h2>
            <span className="mt-3 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <ul className="mt-4 space-y-4 text-base text-cream/80">
              <li className="flex items-start gap-3">
                <LuMapPin className="mt-1 h-5 w-5 shrink-0 text-accent-soft" aria-hidden="true" />
                <span>Jl. Serpong Raya, Lengkong Gudang RT 06/04, Kecamatan Serpong, Kota Tangerang Selatan, Banten 15310</span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/mts_nurulfalah_lengkong/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-cream"
                >
                  <LuInstagram className="h-5 w-5 shrink-0 text-accent-soft" aria-hidden="true" />
                  <span>Instagram @mts_nurulfalah_lengkong</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@mtsnurulfalahlengkong"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 transition-colors hover:text-cream"
                >
                  <LuMusic2 className="h-5 w-5 shrink-0 text-accent-soft" aria-hidden="true" />
                  <span>TikTok @mtsnurulfalahlengkong</span>
                </a>
              </li>
            </ul>
            <Link href="/kontak" className="mt-6 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-base font-semibold text-primary-dark transition-colors hover:bg-accent-soft">
              Hubungi Kami
            </Link>
          </div>

          <div>
            <h2 className="text-xs font-bold tracking-[0.12em] uppercase">Lokasi</h2>
            <span className="mt-3 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <iframe
              title="Peta lokasi MTs Nurul Falah Serpong"
              src={petaUrl}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="mt-4 h-44 w-full rounded-2xl border-0"
            />
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/20 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-cream/70">© 2026 MTs Nurul Falah Serpong. Seluruh hak cipta dilindungi.</p>
          <p className="text-sm text-cream/70">Membentuk Generasi yang Berakhlakul Karimah.</p>
        </div>
      </div>
    </footer>
  );
}
