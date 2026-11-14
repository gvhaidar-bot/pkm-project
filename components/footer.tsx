import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuInstagram, LuMapPin, LuMusic2 } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import PitaVisiFooter from "@/components/PitaVisiFooter";

const tautanInternal = [
  { label: "Profil Sekolah", href: "/profil" },
  { label: "Program Akademik", href: "/program/akademik" },
  { label: "Visi & Misi", href: "/visi-misi" },
  { label: "Staff & Guru", href: "/guru" },
  { label: "Ekstrakurikuler", href: "/program/ekstrakurikuler" },
  { label: "Fasilitas Belajar", href: "/fasilitas" },
  { label: "Galeri Foto", href: "/galeri" },
  { label: "Berita & Agenda", href: "/berita" },
];

const petaUrl = "https://maps.google.com/maps?q=MTs%20Nurul%20Falah%2C%20Jl.%20Pahlawan%20No.%2006%2C%20Cibadung%2C%20Gunungsindur%2C%20Kabupaten%20Bogor&output=embed";

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
    return {
      tampilkanBerita: true,
      berita: [] as { judul: string; slug: string; publishedAt: Date | null; createdAt: Date }[],
    };
  }
}

export default async function Footer() {
  const { tampilkanBerita, berita } = await muatDataFooter();

  return (
    <footer className="border-t-4 border-accent bg-primary text-white">
      {/* Top quote band: hanya tampil di /profil, /visi-misi, /guru */}
      <PitaVisiFooter />

      {/* Main 5-column / 4-column layout */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <div className={`grid grid-cols-1 gap-10 sm:grid-cols-2 ${tampilkanBerita ? "lg:grid-cols-3 xl:grid-cols-5" : "lg:grid-cols-2 xl:grid-cols-4"}`}>
          {/* Col 1: Identity & Motto */}
          <div>
            <Link href="/" className="flex items-center gap-3.5" aria-label="Beranda MTs Nurul Falah Gunungsindur">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center border border-accent/40 bg-white/10 p-1">
                <Image src="/logo.svg" alt="Logo MTs Nurul Falah Gunungsindur" width={44} height={44} className="h-10 w-10 object-contain" />
              </div>
              <span className="flex flex-col leading-tight">
                <span className="font-serif text-[18px] font-bold tracking-tight text-white">MTs Nurul Falah</span>
                <span className="text-[10px] font-bold tracking-[0.16em] text-accent uppercase">Gunungsindur · Bogor</span>
              </span>
            </Link>

            <p className="mt-5 font-serif text-xs leading-relaxed text-cream/70 italic">
              &ldquo;Ing ngarsa sung tulada, ing madya mangun karsa, tut wuri handayani.&rdquo;
              <span className="mt-1 block font-sans font-semibold text-accent not-italic">— Ki Hadjar Dewantara</span>
            </p>

            <div className="mt-5 border-t border-white/10 pt-4">
              <span className="inline-block border border-accent/30 bg-primary-dark/80 px-2.5 py-1 text-[11px] font-bold tracking-wider text-accent uppercase">Akreditasi A (BAN-S/M)</span>
            </div>
          </div>

          {/* Col 2: Internal Links */}
          <nav aria-label="Tautan internal footer">
            <h2 className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Navigasi Halaman</h2>
            <span className="mt-2.5 block h-0.5 w-8 bg-accent" aria-hidden="true" />
            <ul className="mt-4 space-y-1.5 text-sm">
              {tautanInternal.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="flex min-h-8 items-center text-cream/80 transition-colors hover:text-white hover:translate-x-0.5">
                    <span className="mr-2 text-accent/60">›</span>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Col 3: Latest News (Optional) */}
          {tampilkanBerita && (
            <nav aria-label="Berita terbaru footer">
              <h2 className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Berita Terbaru</h2>
              <span className="mt-2.5 block h-0.5 w-8 bg-accent" aria-hidden="true" />
              {berita.length === 0 ? (
                <p className="mt-4 text-sm text-cream/70">Belum ada kabar terbit.</p>
              ) : (
                <ul className="mt-4 space-y-4">
                  {berita.map((item) => (
                    <li key={item.slug} className="border-b border-white/10 pb-3 last:border-b-0">
                      <Link href={`/berita/${item.slug}`} className="block font-serif text-sm font-semibold leading-snug text-cream/90 transition-colors hover:text-accent">
                        {item.judul}
                      </Link>
                      <p className="mt-1 text-xs text-cream/60">{formatTanggal(item.publishedAt ?? item.createdAt)}</p>
                    </li>
                  ))}
                </ul>
              )}
              <Link href="/berita" className="mt-4 inline-flex items-center gap-1 text-xs font-bold text-accent uppercase tracking-wider transition-colors hover:text-white">
                <span>Lihat Semua Berita</span>
                <LuArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
              </Link>
            </nav>
          )}

          {/* Col 4: Contact & Social */}
          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Hubungi Kami</h2>
            <span className="mt-2.5 block h-0.5 w-8 bg-accent" aria-hidden="true" />
            <ul className="mt-4 space-y-3.5 text-sm text-cream/85">
              <li className="flex items-start gap-2.5">
                <LuMapPin className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                <span className="text-xs leading-relaxed">Jl. Pahlawan No. 06, Kp. Bulaksaga RT 03/06, Cibadung, Gunungsindur, Kabupaten Bogor, Jawa Barat 16340</span>
              </li>
              <li>
                <a href="https://www.instagram.com/mts_nurulfalah_lengkong/" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 text-xs text-cream/85 transition-colors hover:text-accent">
                  <LuInstagram className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>@mts_nurulfalah_lengkong</span>
                </a>
              </li>
              <li>
                <a href="#" className="flex items-center gap-2.5 text-xs text-cream/85 transition-colors hover:text-accent">
                  <LuMusic2 className="h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>TikTok</span>
                </a>
              </li>
            </ul>

            <div className="mt-6">
              <Link
                href="/kontak"
                className="inline-flex min-h-10 items-center justify-center border border-white/30 bg-primary-dark px-5 py-2 text-xs font-bold tracking-wider text-white uppercase transition-colors hover:border-accent hover:bg-accent hover:text-primary-dark"
              >
                Informasi Kontak Lengkap
              </Link>
            </div>
          </div>

          {/* Col 5: Location Map */}
          <div>
            <h2 className="text-xs font-bold tracking-[0.16em] text-accent uppercase">Peta Lokasi</h2>
            <span className="mt-2.5 block h-0.5 w-8 bg-accent" aria-hidden="true" />
            <div className="mt-4 overflow-hidden border border-white/20 bg-primary-dark p-1 shadow-sm">
              <iframe title="Peta lokasi MTs Nurul Falah Gunungsindur" src={petaUrl} loading="lazy" referrerPolicy="no-referrer-when-downgrade" className="h-40 w-full border-0" />
            </div>
            <p className="mt-2 text-[11px] text-cream/60">Berada di Jl. Pahlawan, Desa Cibadung, Gunungsindur.</p>
          </div>
        </div>

        {/* Bottom copyright line */}
        <div className="mt-14 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-center text-xs text-cream/70 sm:flex-row sm:text-left">
          <p>© 2026 MTs Nurul Falah Gunungsindur. Seluruh hak cipta dilindungi.</p>
          <p className="font-serif italic text-accent/90">Madrasah Tsanawiyah Berciri Khas Agama Islam</p>
        </div>
      </div>
    </footer>
  );
}
