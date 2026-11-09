import Image from "next/image";
import Link from "next/link";
import { LuChevronRight, LuCircleCheck, LuClock3, LuIdCard, LuNetwork, LuSparkles, LuTarget } from "react-icons/lu";

export const metadata = {
  title: "Profil Sekolah",
  description: "Profil MTs Nurul Falah Serpong: identitas resmi, sejarah perjalanan sejak 2001, visi misi, tujuan pendidikan, serta struktur organisasi madrasah tsanawiyah di Serpong.",
};

const menu = [
  { label: "Identitas Madrasah", href: "#identitas", Icon: LuIdCard },
  { label: "Sejarah Perjalanan", href: "#sejarah", Icon: LuClock3 },
  { label: "Visi, Misi & Tujuan", href: "#visi-misi", Icon: LuTarget },
  { label: "Struktur Organisasi", href: "#struktur-organisasi", Icon: LuNetwork },
];

const identitas = [
  { label: "Nama Madrasah", nilai: "MTs Nurul Falah Serpong" },
  { label: "Status Sekolah", nilai: "Swasta — di bawah naungan Kementerian Agama RI" },
  { label: "Yayasan Penyelenggara", nilai: "Yayasan Pendidikan Islam Yatim dan Duafa (YPYD)" },
  { label: "Tanggal Berdiri", nilai: "16 November 2001" },
  { label: "Luas Tanah", nilai: "1.400 m²" },
  { label: "Kurikulum", nilai: "KTSP / Kurikulum Kemenag terpadu dengan Kurikulum Nasional" },
  { label: "Jenjang & Kelas", nilai: "Madrasah Tsanawiyah (Kelas VII, VIII, IX)" },
  { label: "NPSN", nilai: "20623052" },
  { label: "NSM", nilai: "121236740033" },
  { label: "Peringkat Akreditasi", nilai: "Akreditasi B (Nilai 83, BAN-S/M 2019)" },
  {
    label: "Alamat Lengkap",
    nilai: "Jl. Serpong Raya, Lengkong Gudang RT 06/04, Kecamatan Serpong, Kota Tangerang Selatan, Banten 15310",
  },
];

const sejarah = [
  {
    tahun: "2001",
    judul: "Pendirian Madrasah",
    teks: "MTs Nurul Falah Serpong resmi didirikan pada 16 November 2001 berdasarkan SK Kepala Kanwil Kemenag Provinsi Jawa Barat Nomor D/Wi/MTs/965/2001. Diselenggarakan oleh Yayasan Pendidikan Islam Yatim dan Duafa (YPYD), madrasah memulai langkah awal dengan angkatan pertama sebanyak 25 siswa.",
  },
  {
    tahun: "2013",
    judul: "Legalitas Operasional Mandiri",
    teks: "Seiring pemekaran wilayah Tangerang Selatan dan perkembangan madrasah, MTs Nurul Falah memperoleh SK Operasional Nomor D/Kd.28.08/4/03.2/698/2013 tertanggal 06 September 2013 dari Kantor Kementerian Agama Kota Tangerang Selatan.",
  },
  {
    tahun: "2015",
    judul: "Peningkatan Kepercayaan Masyarakat",
    teks: "Pada tahun ajaran 2015/2016, jumlah siswa bertumbuh menjadi 129 siswa yang terbagi dalam lima rombongan belajar. Fasilitas belajar dan kegiatan ekstrakurikuler terus dikembangkan untuk memenuhi kebutuhan siswa.",
  },
  {
    tahun: "2019",
    judul: "Raihan Akreditasi B BAN-S/M",
    teks: "MTs Nurul Falah Serpong berhasil meraih status Akreditasi B dengan nilai 83 dari Badan Akreditasi Nasional Sekolah/Madrasah (BAN-S/M) berdasarkan SK Nomor 971/BAN-SM/SK/2019 tertanggal 05 November 2019.",
  },
];

const misi = [
  "Mewujudkan madrasah yang inovatif dalam metode pembelajaran dan teknologi",
  "Mewujudkan organisasi madrasah yang terus belajar dan adaptif terhadap perkembangan zaman",
  "Mewujudkan fasilitas madrasah yang relevan, mutakhir, dan berwawasan lingkungan",
  "Mewujudkan pembiayaan pendidikan yang terjangkau bagi seluruh lapisan masyarakat",
  "Mewujudkan pendidik dan tenaga kependidikan yang berakhlakul mulia dan kompeten",
  "Mewujudkan manajemen berbasis madrasah yang transparan, akuntabel, dan handal",
];

const tujuan = [
  "Terwujudnya perkembangan potensi siswa secara optimal, baik spiritual, intelektual, maupun emosional",
  "Terwujudnya kemandirian madrasah dalam tata kelola dan pengembangan mutu pendidikan",
  "Tersedianya sarana dan prasarana pendidikan yang aman, nyaman, dan memadai",
  "Tercapainya seluruh program kurikuler dan ekstrakurikuler madrasah dengan standar yang baik",
  "Terlaksananya budaya kehidupan madrasah yang Islami, ramah, dan berdisiplin",
  "Terwujudnya lulusan yang berkualitas, berprestasi, berakhlakul karimah, dan bertaqwa kepada Allah SWT",
];

export default function ProfilPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=2000&auto=format&fit=crop" alt="Gedung MTs Nurul Falah Serpong" fill className="object-cover opacity-25" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/95 to-primary-dark/80" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-300 px-5 py-16 lg:px-6 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Profil Resmi Lembaga</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">Profil MTs Nurul Falah Serpong</h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">Mengenal lebih dekat identitas, sejarah pendirian sejak 2001, visi misi, serta komitmen pendidikan MTs Nurul Falah di Lengkong Gudang, Serpong.</p>
        </div>
      </section>

      {/* Breadcrumb Nav */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-white shadow-xs">
        <div className="mx-auto flex w-full max-w-300 items-center gap-2 px-5 py-3 text-xs font-medium lg:px-6">
          <Link href="/" className="text-primary hover:text-primary-dark hover:underline">
            Beranda
          </Link>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="text-muted">Tentang</span>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="font-semibold text-primary-dark" aria-current="page">
            Profil Sekolah
          </span>
        </div>
      </nav>

      {/* Main Content Area */}
      <div className="mx-auto grid w-full max-w-300 grid-cols-1 gap-10 px-5 py-14 lg:grid-cols-[300px_1fr] lg:px-6">
        {/* Sticky Sidebar Navigation */}
        <aside>
          <nav aria-label="Navigasi cepat profil" className="border border-line bg-white shadow-sm lg:sticky lg:top-28">
            <div className="border-b border-line bg-primary-soft/50 px-5 py-3.5">
              <span className="text-xs font-bold tracking-[0.14em] text-primary uppercase">Daftar Isi Halaman</span>
            </div>
            <ul>
              {menu.map((item) => (
                <li key={item.href} className="border-b border-line last:border-b-0">
                  <a href={item.href} className="group flex items-center gap-3 px-5 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-primary-soft hover:text-primary">
                    <item.Icon className="h-4 w-4 shrink-0 text-accent transition-colors group-hover:text-primary" aria-hidden="true" />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Content Column */}
        <div className="space-y-16">
          {/* Identitas Section */}
          <section id="identitas" aria-label="Identitas madrasah" className="scroll-mt-28">
            <div className="border-b-2 border-primary-dark pb-3">
              <span className="text-xs font-bold tracking-[0.16em] text-accent-soft uppercase">Data Pokok</span>
              <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">Identitas Madrasah</h2>
            </div>

            <dl className="mt-6 border border-line bg-white shadow-xs">
              {identitas.map((item, i) => (
                <div key={item.label} className={`grid grid-cols-1 gap-1 border-b border-line/60 px-6 py-4 last:border-b-0 sm:grid-cols-[220px_1fr] sm:gap-4 ${i % 2 === 0 ? "bg-cream/40" : "bg-white"}`}>
                  <dt className="text-xs font-bold tracking-wider text-primary-dark uppercase">{item.label}</dt>
                  <dd className="text-sm font-medium leading-relaxed text-muted break-words">{item.nilai}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* Sejarah Section */}
          <section id="sejarah" aria-label="Sejarah madrasah" className="scroll-mt-28">
            <div className="border-b-2 border-primary-dark pb-3">
              <span className="text-xs font-bold tracking-[0.16em] text-accent-soft uppercase">Lintas Masa</span>
              <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">Sejarah Perjalanan MTs Nurul Falah</h2>
            </div>

            <div className="mt-8 space-y-6">
              {sejarah.map((item) => (
                <div key={item.tahun} className="relative border border-line bg-white p-6 shadow-xs transition-all hover:border-accent hover:shadow-md sm:p-7">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <span className="font-serif text-3xl font-black tracking-tight text-accent">{item.tahun}</span>
                    <span className="h-4 w-px bg-line" aria-hidden="true" />
                    <h3 className="font-serif text-lg font-bold text-primary-dark">{item.judul}</h3>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{item.teks}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Visi Misi Dan Tujuan Section */}
          <section id="visi-misi" aria-label="Visi misi dan tujuan madrasah" className="scroll-mt-28">
            <div className="border-b-2 border-primary-dark pb-3">
              <span className="text-xs font-bold tracking-[0.16em] text-accent-soft uppercase">Arah & Cita-Cita</span>
              <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">Visi, Misi & Tujuan Pendidikan</h2>
            </div>

            {/* Misi Box */}
            <div className="mt-8 border border-line bg-white p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-2 border-b border-line pb-3">
                <LuTarget className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold text-primary-dark">Misi Madrasah</h3>
              </div>
              <ul className="mt-5 space-y-3.5">
                {misi.map((item, idx) => (
                  <li key={item} className="flex items-start gap-3.5 text-sm leading-relaxed text-muted">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-accent/40 bg-primary-soft font-bold text-xs text-primary">{idx + 1}</span>
                    <span className="pt-0.5">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tujuan Box */}
            <div className="mt-8 border border-line bg-white p-6 shadow-xs sm:p-8">
              <div className="flex items-center gap-2 border-b border-line pb-3">
                <LuCircleCheck className="h-5 w-5 text-accent" aria-hidden="true" />
                <h3 className="font-serif text-xl font-bold text-primary-dark">Tujuan Pendidikan</h3>
              </div>
              <ul className="mt-5 space-y-3.5">
                {tujuan.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm leading-relaxed text-muted">
                    <LuCircleCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Struktur Organisasi Section */}
          <section id="struktur-organisasi" aria-label="Struktur organisasi madrasah" className="scroll-mt-28">
            <div className="border-b-2 border-primary-dark pb-3">
              <span className="text-xs font-bold tracking-[0.16em] text-accent-soft uppercase">Tata Kelola</span>
              <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">Struktur Organisasi</h2>
            </div>
            <div className="mt-6 border-2 border-dashed border-accent/40 bg-white p-8 text-center sm:p-12">
              <LuNetwork className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
              <h3 className="mt-4 font-serif text-lg font-bold text-primary-dark">Bagan Kepengurusan MTs Nurul Falah</h3>
              <p className="mx-auto mt-2 max-w-lg text-sm leading-relaxed text-muted">Bagan struktur organisasi resmi madrasah akan diperbarui secara berkala sesuai dengan ketetapan yayasan dan pihak madrasah.</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
