import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuBookOpen, LuCheck, LuChevronRight, LuCompass, LuSparkles, LuTrophy } from "react-icons/lu";

export const metadata = {
  title: "Program",
  description: "Program pendidikan MTs Nurul Falah Serpong: program akademik, ekstrakurikuler, dan program unggulan madrasah.",
};

const pilarProgram = [
  {
    judul: "Program Akademik",
    tag: "Kurikulum Intrakurikuler",
    href: "/program/akademik",
    deskripsi:
      "Perpaduan kurikulum nasional dan kurikulum Kementerian Agama yang dirancang sistematis untuk membangun fondasi literasi, numerasi, sains, dan ilmu syar'i.",
    poin: [
      "Kurikulum Kemenag & Nasional terintegrasi",
      "Pembelajaran interaktif di kelas yang kondusif",
      "Evaluasi belajar berkala dan pendampingan siswa",
    ],
    cta: "Jelajahi Program Akademik",
    ikon: LuBookOpen,
  },
  {
    judul: "Kegiatan Ekstrakurikuler",
    tag: "Pengembangan Minat & Bakat",
    href: "/program/ekstrakurikuler",
    deskripsi:
      "Ruang aktualisasi diri di luar jam pelajaran untuk mengasah kepemimpinan, sportivitas, kreativitas seni, dan keterampilan sosial siswa.",
    poin: [
      "Pramuka, Paskibra, dan Kepanduan",
      "Olahraga (Futsal, Bulu Tangkis, Beladiri)",
      "Seni Islami, Marawis, dan Keterampilan",
    ],
    cta: "Lihat Ekstrakurikuler",
    ikon: LuCompass,
  },
  {
    judul: "Program Unggulan",
    tag: "Kekhasan Madrasah",
    href: "/program/unggulan",
    deskripsi:
      "Program-program prioritas yang menjadi identitas dan kebanggaan madrasah dalam memperkuat karakter Islami dan kesiapan siswa ke jenjang berikutnya.",
    poin: [
      "Pembiasaan Ibadah dan Tahsin Al-Qur'an",
      "Penguatan Karakter & Akhlakul Karimah",
      "Bimbingan Persiapan Lanjutan Studi",
    ],
    cta: "Pelajari Program Unggulan",
    ikon: LuTrophy,
  },
];

export default function ProgramPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=2000&auto=format&fit=crop"
          alt="Kolaborasi Siswa dalam Program Pendidikan MTs Nurul Falah"
          fill
          className="object-cover opacity-80 sm:opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-transparent sm:via-primary-dark/75" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-300 px-5 py-16 lg:px-6 lg:py-20">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Struktur Kurikulum & Pembinaan</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Program Pendidikan Madrasah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Tiga pilar program yang dirancang terpadu untuk mengembangkan potensi akademik, kepribadian Islami,
            dan kecakapan hidup putra-putri Anda.
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
            Program
          </span>
        </div>
      </nav>

      {/* Main 3 Pillar Cards */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          {pilarProgram.map((item) => (
            <article
              key={item.href}
              className="group flex flex-col justify-between border border-line bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(11,79,58,0.14)]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line pb-5">
                  <span className="flex h-12 w-12 items-center justify-center border border-accent/40 bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <item.ikon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
                    {item.tag}
                  </span>
                </div>

                <h2 className="mt-6 font-serif text-2xl font-bold tracking-tight text-primary-dark">
                  {item.judul}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.deskripsi}
                </p>

                <ul className="mt-6 space-y-2.5 border-t border-line/60 pt-5">
                  {item.poin.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-xs font-medium text-muted">
                      <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-5">
                <Link
                  href={item.href}
                  className="group/btn inline-flex min-h-11 w-full items-center justify-center gap-2 border border-primary bg-primary px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-all duration-200 group-hover:bg-accent group-hover:border-accent group-hover:text-primary-dark"
                >
                  <span>{item.cta}</span>
                  <LuArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
