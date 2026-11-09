import Link from "next/link";
import {
  LuClock,
  LuChevronRight,
  LuCompass,
  LuInstagram,
  LuMail,
  LuMapPin,
  LuMessageCircle,
  LuMusic2,
  LuPhone,
  LuSparkles,
} from "react-icons/lu";

export const metadata = {
  title: "Kontak",
  description:
    "Hubungi MTs Nurul Falah Serpong: Jl. Serpong Raya, Lengkong Gudang, Kecamatan Serpong, Kota Tangerang Selatan, Banten 15310.",
};

const daftarKontak = [
  {
    label: "Alamat Madrasah",
    nilai: "Jl. Serpong Raya, Lengkong Gudang RT 06/04, Kecamatan Serpong, Kota Tangerang Selatan, Banten 15310",
    keterangan: "Akses mudah di tepi jalan utama Serpong Raya",
    Icon: LuMapPin,
  },
  {
    label: "Jam Layanan Tata Usaha",
    nilai: "Senin – Jumat: 07.30 – 15.00 WIB",
    keterangan: "Sabtu & Minggu: Tutup (Konfirmasi untuk janji temu)",
    Icon: LuClock,
  },
  {
    label: "Layanan WhatsApp",
    nilai: "[Nomor WhatsApp Resmi Madrasah]",
    keterangan: "Pusat informasi dan konsultasi wali murid",
    Icon: LuMessageCircle,
  },
  {
    label: "Telepon Kantor",
    nilai: "[Nomor Telepon Kantor Madrasah]",
    keterangan: "Hubungi pada hari dan jam kerja operasional",
    Icon: LuPhone,
  },
  {
    label: "Email Resmi",
    nilai: "[Email Resmi Madrasah]",
    keterangan: "Surat menyurat dan korespondensi resmi",
    Icon: LuMail,
  },
  {
    label: "Media Sosial Resmi",
    nilai: "Instagram: @mts_nurulfalah_lengkong",
    keterangan: "TikTok: @mtsnurulfalahlengkong",
    Icon: LuInstagram,
  },
];

const petaUrl =
  "https://maps.google.com/maps?q=MTs%20Nurul%20Falah%20Serpong%2C%20Lengkong%20Gudang%2C%20Serpong%2C%20Kota%20Tangerang%20Selatan&output=embed";

export default function KontakPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="border-b border-primary-dark/30 bg-primary-dark text-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Pusat Informasi &amp; Kunjungan</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Hubungi MTs Nurul Falah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Kami siap menyambut pertanyaan, konsultasi pendidikan, serta kunjungan silaturahmi
            dari bapak/ibu orang tua calon siswa ke madrasah kami.
          </p>
        </div>
      </section>

      {/* Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="border-b border-line bg-white shadow-xs">
        <div className="mx-auto flex w-full max-w-300 items-center gap-2 px-5 py-3 text-xs font-medium lg:px-6">
          <Link href="/" className="text-primary hover:text-primary-dark hover:underline">
            Beranda
          </Link>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="font-semibold text-primary-dark" aria-current="page">
            Kontak
          </span>
        </div>
      </nav>

      {/* Contact Cards Grid */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6 space-y-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {daftarKontak.map((item) => (
            <article
              key={item.label}
              className="group border border-line bg-white p-7 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_32px_rgba(11,79,58,0.1)]"
            >
              <span className="flex h-12 w-12 items-center justify-center border border-accent/40 bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                <item.Icon className="h-6 w-6 text-accent" aria-hidden="true" />
              </span>
              <h2 className="mt-5 font-serif text-lg font-bold text-primary-dark">
                {item.label}
              </h2>
              <p className="mt-2 text-sm font-semibold leading-relaxed text-ink break-words">
                {item.nilai}
              </p>
              <p className="mt-1 text-xs text-muted">
                {item.keterangan}
              </p>
            </article>
          ))}
        </div>

        {/* Location & Visiting Guidelines Grid */}
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:items-start">
          {/* Map Column */}
          <div className="border border-line bg-white p-6 shadow-xs lg:col-span-7 sm:p-8">
            <div className="border-b border-line pb-4">
              <span className="text-xs font-bold tracking-[0.16em] text-accent-soft uppercase">
                Akses Navigasi
              </span>
              <h2 className="font-serif text-2xl font-bold text-primary-dark">
                Peta Lokasi Madrasah
              </h2>
            </div>
            <div className="mt-6 overflow-hidden border border-line bg-primary-dark p-1">
              <iframe
                title="Peta lokasi MTs Nurul Falah Serpong"
                src={petaUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-80 w-full border-0"
              />
            </div>
            <p className="mt-4 text-xs text-muted leading-relaxed">
              Alamat: Jl. Serpong Raya, Lengkong Gudang RT 06/04, Kecamatan Serpong, Kota Tangerang Selatan, Banten 15310.
            </p>
          </div>

          {/* Visiting Guidelines Column */}
          <div className="border border-line bg-white p-6 shadow-xs lg:col-span-5 sm:p-8">
            <div className="border-b border-line pb-4">
              <span className="text-xs font-bold tracking-[0.16em] text-accent-soft uppercase">
                Petunjuk Orang Tua
              </span>
              <h2 className="font-serif text-2xl font-bold text-primary-dark">
                Panduan Kunjungan
              </h2>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-muted">
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-accent bg-primary-soft font-bold text-xs text-primary">
                  1
                </span>
                <p>
                  <strong className="text-primary-dark font-semibold">Waktu Terbaik:</strong> Dianjurkan hadir pada hari kerja pukul 08.00 – 14.00 WIB untuk dapat melihat langsung lingkungan belajar madrasah.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-accent bg-primary-soft font-bold text-xs text-primary">
                  2
                </span>
                <p>
                  <strong className="text-primary-dark font-semibold">Pakaian Sopan:</strong> Harap mengenakan pakaian yang rapi dan sopan sesuai dengan norma lingkungan madrasah.
                </p>
              </li>
              <li className="flex items-start gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-accent bg-primary-soft font-bold text-xs text-primary">
                  3
                </span>
                <p>
                  <strong className="text-primary-dark font-semibold">Pelayanan Ramah:</strong> Petugas tata usaha dan dewan guru kami siap mendampingi bapak/ibu berkeliling fasilitas sekolah.
                </p>
              </li>
            </ul>

            <div className="mt-8 border-t border-line/60 pt-6">
              <div className="flex items-center gap-4">
                <a
                  href="https://www.instagram.com/mts_nurulfalah_lengkong/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-primary hover:text-accent"
                >
                  <LuInstagram className="h-4 w-4" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <span className="h-3 w-px bg-line" aria-hidden="true" />
                <a
                  href="https://www.tiktok.com/@mtsnurulfalahlengkong"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 text-xs font-bold text-primary hover:text-accent"
                >
                  <LuMusic2 className="h-4 w-4" aria-hidden="true" />
                  <span>TikTok</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
