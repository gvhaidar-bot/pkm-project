import Image from "next/image";
import Link from "next/link";

const menu = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Program", href: "/program" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
  { label: "Kontak", href: "/kontak" },
];

const program = [
  { label: "[Program Unggulan 1]", href: "/program" },
  { label: "[Program Unggulan 2]", href: "/program" },
  { label: "[Program Unggulan 3]", href: "/program" },
];

const kontak = [
  { label: "Alamat", value: "[Alamat Sekolah]" },
  { label: "Telepon", value: "[Nomor Telepon]" },
  { label: "WhatsApp", value: "[Nomor WhatsApp]" },
  { label: "Email", value: "[Email Sekolah]" },
  { label: "Jam Layanan", value: "[Jam Layanan]" },
];

const Footer = () => {
  return (
    <footer className="bg-primary-dark text-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="flex items-center gap-3" aria-label="Beranda Madrasah Tsanawiyah">
              <Image
                src="/logo.svg"
                alt="Logo Madrasah Tsanawiyah"
                width={48}
                height={48}
                className="h-12 w-12 shrink-0"
              />
              <span className="flex flex-col leading-tight">
                <span className="text-[17px] font-extrabold tracking-tight">Madrasah Tsanawiyah</span>
                <span className="text-[11px] font-bold tracking-[0.14em] text-accent-soft uppercase">
                  Website Promosi Sekolah
                </span>
              </span>
            </Link>
            <p className="mt-5 text-base leading-relaxed text-cream/80">
              Website promosi Madrasah Tsanawiyah untuk orang tua: profil sekolah, program unggulan,
              fasilitas, galeri, prestasi, dan berita sekolah.
            </p>
          </div>

          <nav aria-label="Menu footer">
            <h2 className="text-xs font-bold tracking-[0.12em] uppercase">Menu</h2>
            <span className="mt-3 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <ul className="mt-4">
              {menu.map((item) => (
                <li key={item.href + item.label}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center text-base text-cream/80 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Program unggulan">
            <h2 className="text-xs font-bold tracking-[0.12em] uppercase">Program Unggulan</h2>
            <span className="mt-3 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <ul className="mt-4">
              {program.map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex min-h-11 items-center text-base text-cream/80 transition-colors hover:text-cream"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-bold tracking-[0.12em] uppercase">Kontak</h2>
            <span className="mt-3 block h-1 w-10 rounded-full bg-accent" aria-hidden="true" />
            <dl className="mt-4 space-y-3">
              {kontak.map((item) => (
                <div key={item.label}>
                  <dt className="text-sm font-semibold text-cream/60">{item.label}</dt>
                  <dd className="mt-0.5 text-base text-cream/80">{item.value}</dd>
                </div>
              ))}
            </dl>
            <Link
              href="/kontak"
              className="mt-6 inline-flex min-h-11 items-center rounded-full bg-accent px-6 text-base font-semibold text-primary-dark transition-colors hover:bg-accent-soft"
            >
              Hubungi Kami
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-cream/20 pt-6 text-center sm:flex-row sm:text-left">
          <p className="text-sm text-cream/70">© 2026 Madrasah Tsanawiyah. Seluruh hak cipta dilindungi.</p>
          <p className="text-sm text-cream/70">Profil, program, fasilitas, dan prestasi sekolah.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
