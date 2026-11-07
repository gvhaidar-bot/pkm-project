import Image from "next/image";
import Link from "next/link";
import {
  LuChevronRight,
  LuCircleCheck,
  LuClock3,
  LuIdCard,
  LuNetwork,
  LuTarget,
} from "react-icons/lu";

export const metadata = {
  title: "Profil Sekolah",
  description:
    "Profil MTs Nurul Falah Serpong: identitas, sejarah, visi misi dan tujuan, serta struktur organisasi madrasah tsanawiyah swasta di Lengkong Gudang, Serpong, Kota Tangerang Selatan.",
};

const menu = [
  { label: "Identitas", href: "#identitas", Icon: LuIdCard },
  { label: "Sejarah", href: "#sejarah", Icon: LuClock3 },
  { label: "Visi Misi", href: "#visi-misi", Icon: LuTarget },
  { label: "Struktur Organisasi", href: "#struktur-organisasi", Icon: LuNetwork },
];

const identitas = [
  { label: "Status Sekolah", nilai: "Swasta — di bawah naungan Kementerian Agama" },
  { label: "Yayasan", nilai: "Yayasan Pendidikan Islam Yatim dan Duafa (YPYD)" },
  { label: "Didirikan", nilai: "16 November 2001" },
  { label: "Luas Tanah", nilai: "1.400 m²" },
  { label: "Kurikulum", nilai: "KTSP terpadu dengan kurikulum Departemen Agama" },
  { label: "Rentang Kelas", nilai: "VII, VIII, IX" },
  { label: "NPSN", nilai: "20623052" },
  { label: "NSM", nilai: "121236740033" },
  { label: "Akreditasi", nilai: "B (nilai 83, tahun 2019)" },
  { label: "Lokasi", nilai: "Jl. Serpong Raya, Lengkong Gudang RT 06/04, Kecamatan Serpong, Kota Tangerang Selatan, Banten 15310" },
];

const sejarah = [
  {
    tahun: "2001",
    teks: "MTs Nurul Falah Serpong berdiri pada 16 November 2001 berdasarkan SK Kepala Kanwil Kemenag Provinsi Jawa Barat Nomor D/Wi/MTs/965/2001. Madrasah ini diselenggarakan oleh Yayasan Pendidikan Islam Yatim dan Duafa (YPYD), dengan angkatan pertama sebanyak 25 siswa.",
  },
  {
    tahun: "2013",
    teks: "Madrasah memperoleh SK Operasional Nomor D/Kd.28.08/4/03.2/698/2013 pada 06 September 2013.",
  },
  {
    tahun: "2015",
    teks: "Pada tahun ajaran 2015/2016, madrasah ini memiliki 129 siswa dalam lima kelas, dan jumlah siswa terus berkembang dari tahun ke tahun.",
  },
  {
    tahun: "2019",
    teks: "MTs Nurul Falah Serpong meraih akreditasi B dengan nilai 83 dari BAN-S/M, berdasarkan SK Nomor 971/BAN-SM/SK/2019 tanggal 05 November 2019.",
  },
];

const misi = [
  "Mewujudkan madrasah yang inovatif",
  "Mewujudkan organisasi madrasah yang terus belajar",
  "Mewujudkan fasilitas madrasah yang relevan, mutakhir, dan berwawasan lingkungan",
  "Mewujudkan pembiayaan yang terjangkau",
  "Mewujudkan pendidik dan tenaga kependidikan yang berakhlakul mulia",
  "Mewujudkan manajemen berbasis madrasah yang handal",
];

const tujuan = [
  "Terwujudnya perkembangan siswa secara optimal sesuai dengan potensi yang dimiliki",
  "Terwujudnya madrasah mandiri",
  "Tersedianya sarana dan prasarana pendidikan yang memadai",
  "Tercapainya program-program madrasah",
  "Terlaksananya kehidupan madrasah yang Islami",
  "Terwujudnya lulusan yang berkualitas, berprestasi, berakhlakul karimah, dan bertaqwa kepada Allah SWT",
];

export default function ProfilPage() {
  return (
    <div className="bg-cream">
      <section className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000&auto=format&fit=crop"
          alt="Gedung MTs Nurul Falah Serpong"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-primary-dark/70" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-[1200px] px-5 py-20 lg:px-6">
          <h1 className="border-l-4 border-accent pl-4 text-3xl font-extrabold tracking-tight text-white uppercase sm:text-4xl">
            Profil MTs Nurul Falah Serpong
          </h1>
        </div>
      </section>

      <nav aria-label="Breadcrumb" className="border-b border-line bg-white">
        <div className="mx-auto flex w-full max-w-[1200px] items-center gap-1 px-5 py-3 text-sm lg:px-6">
          <Link href="/" className="font-semibold text-primary hover:underline">
            Home
          </Link>
          <LuChevronRight className="h-4 w-4 text-muted" aria-hidden="true" />
          <span className="text-muted" aria-current="page">
            Profil Sekolah
          </span>
        </div>
      </nav>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-8 px-5 py-10 lg:grid-cols-[280px_1fr] lg:px-6">
        <aside>
          <nav
            aria-label="Navigasi profil"
            className="overflow-hidden rounded-2xl border border-line bg-white lg:sticky lg:top-24"
          >
            <ul>
              {menu.map((item) => (
                <li key={item.href} className="border-b border-line last:border-b-0">
                  <a
                    href={item.href}
                    className="flex items-center gap-3 px-5 py-4 text-base font-semibold text-ink transition-colors hover:bg-primary-soft hover:text-primary"
                  >
                    <item.Icon className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        <div>
          <section id="identitas" aria-label="Identitas madrasah" className="scroll-mt-28">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Identitas</h2>
            <dl className="mt-4 overflow-hidden rounded-2xl border border-line bg-white">
              {identitas.map((item, i) => (
                <div
                  key={item.label}
                  className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[200px_1fr] sm:gap-4 ${
                    i % 2 === 0 ? "bg-cream" : "bg-white"
                  }`}
                >
                  <dt className="text-sm font-bold tracking-wide text-primary-dark">{item.label}</dt>
                  <dd className="text-base break-words text-muted">{item.nilai}</dd>
                </div>
              ))}
            </dl>
          </section>

          <section id="sejarah" aria-label="Sejarah madrasah" className="mt-12 scroll-mt-28">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">
              Sejarah MTs Nurul Falah Serpong
            </h2>
            {sejarah.map((item) => (
              <div key={item.tahun} className="mt-6">
                <h3 className="text-xl font-extrabold text-ink">{item.tahun}</h3>
                <p className="mt-2 text-base leading-relaxed text-muted">{item.teks}</p>
              </div>
            ))}
          </section>

          <section id="visi-misi" aria-label="Visi misi dan tujuan madrasah" className="mt-12 scroll-mt-28">
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Visi Misi Dan Tujuan</h2>

            <h3 className="mt-6 border-b-2 border-line pb-2 text-xl font-extrabold text-ink">Visi</h3>
            <p className="mt-4 flex items-start gap-3 text-base leading-relaxed font-bold text-ink uppercase">
              <LuTarget className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
              Terwujudnya madrasah yang mampu membentuk generasi yang berakhlakul karimah
            </p>

            <h3 className="mt-8 border-b-2 border-line pb-2 text-xl font-extrabold text-ink">Misi</h3>
            <ul className="mt-4 space-y-2.5">
              {misi.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed text-muted">
                  <LuCircleCheck className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-8 border-b-2 border-line pb-2 text-xl font-extrabold text-ink">Tujuan</h3>
            <ul className="mt-4 space-y-2.5">
              {tujuan.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-base leading-relaxed text-muted">
                  <LuCircleCheck className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section
            id="struktur-organisasi"
            aria-label="Struktur organisasi madrasah"
            className="mt-12 scroll-mt-28"
          >
            <h2 className="text-2xl font-extrabold tracking-tight text-ink">Struktur Organisasi</h2>
            <div className="mt-4 rounded-2xl border-2 border-dashed border-line bg-white px-6 py-8">
              <p className="text-base leading-relaxed text-muted">
                Bagan struktur organisasi MTs Nurul Falah Serpong akan ditampilkan di sini setelah pihak
                sekolah memberikan gambarnya.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
