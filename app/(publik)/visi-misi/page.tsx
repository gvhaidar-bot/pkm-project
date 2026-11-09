import Link from "next/link";
import { LuCircleCheck, LuChevronRight, LuCompass, LuSparkles, LuTarget } from "react-icons/lu";

export const metadata = {
  title: "Visi & Misi",
  description:
    "Visi dan misi MTs Nurul Falah Serpong: terwujudnya madrasah yang mampu membentuk generasi yang berakhlakul karimah.",
};

const misi = [
  {
    nomor: "01",
    judul: "Madrasah yang Inovatif",
    deskripsi: "Mewujudkan madrasah yang inovatif dalam metode pengajaran, pemanfaatan teknologi, dan kurikulum adaptif.",
  },
  {
    nomor: "02",
    judul: "Organisasi Terus Belajar",
    deskripsi: "Mewujudkan organisasi madrasah yang senantiasa belajar, berkembang, dan meningkatkan mutu secara berkelanjutan.",
  },
  {
    nomor: "03",
    judul: "Fasilitas Berkelanjutan",
    deskripsi: "Mewujudkan sarana dan fasilitas madrasah yang relevan, mutakhir, nyaman, dan berwawasan lingkungan.",
  },
  {
    nomor: "04",
    judul: "Pendidikan Terjangkau",
    deskripsi: "Mewujudkan pembiayaan pendidikan yang terjangkau tanpa mengurangi standar kualitas pendidikan putra-putri Anda.",
  },
  {
    nomor: "05",
    judul: "Pendidik Berakhlak Mulia",
    deskripsi: "Mewujudkan tenaga pendidik dan kependidikan yang kompeten, berintegritas tinggi, dan menjadi teladan akhlak bagi siswa.",
  },
  {
    nomor: "06",
    judul: "Manajemen Berbasis Madrasah",
    deskripsi: "Mewujudkan tata kelola manajemen madrasah yang handal, profesional, transparan, dan berorientasi pada kepuasan orang tua.",
  },
];

const tujuan = [
  "Terwujudnya perkembangan potensi siswa secara optimal, baik spiritual, intelektual, maupun emosional.",
  "Terwujudnya kemandirian madrasah dalam tata kelola dan pengembangan mutu pendidikan berkelanjutan.",
  "Tersedianya sarana dan prasarana pendidikan yang memadai, aman, dan menunjang efektivitas belajar.",
  "Tercapainya seluruh program kurikuler, kokurikuler, dan ekstrakurikuler madrasah dengan hasil memuaskan.",
  "Terlaksananya kehidupan madrasah yang bernuansa Islami, tertib, santun, dan penuh kasih sayang.",
  "Terwujudnya lulusan yang berkualitas, berprestasi, berakhlakul karimah, dan bertaqwa kepada Allah SWT.",
];

export default function VisiMisiPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="border-b border-primary-dark/30 bg-primary-dark text-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Landasan & Komitmen Pendidikan</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Visi &amp; Misi MTs Nurul Falah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Arah kebijakan, komitmen moral, dan cita-cita luhur madrasah dalam membimbing putra-putri Anda.
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
          <span className="text-muted">Tentang</span>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="font-semibold text-primary-dark" aria-current="page">
            Visi &amp; Misi
          </span>
        </div>
      </nav>

      {/* Main Content */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6 space-y-16">
        {/* Visi Section */}
        <section aria-label="Visi madrasah" className="border border-line bg-white p-8 shadow-sm lg:p-12">
          <div className="mx-auto max-w-3xl text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-accent-soft uppercase">
              Panduan Utama Kami
            </span>
            <h2 className="mt-2 font-serif text-3xl font-black text-primary-dark sm:text-4xl">
              Visi Madrasah
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-0.5 w-12 bg-accent" />
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
              <span className="h-0.5 w-12 bg-accent" />
            </div>

            <div className="mt-8 border-l-4 border-accent bg-primary-soft/50 p-6 sm:p-10">
              <blockquote className="font-serif text-2xl font-black leading-relaxed text-primary-dark sm:text-3xl">
                &ldquo;Terwujudnya Madrasah yang mampu membentuk generasi yang berakhlakul karimah.&rdquo;
              </blockquote>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
              Visi ini menjadi jiwa dari seluruh proses belajar mengajar, pembiasaan ibadah, dan
              pendampingan karakter siswa di MTs Nurul Falah Serpong setiap harinya.
            </p>
          </div>
        </section>

        {/* Misi Section */}
        <section aria-label="Misi madrasah">
          <div className="text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-accent-soft uppercase">
              Langkah Nyata
            </span>
            <h2 className="mt-2 font-serif text-3xl font-black text-primary-dark sm:text-4xl">
              Misi Madrasah
            </h2>
            <div className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
              <span className="h-0.5 w-12 bg-accent" />
              <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
              <span className="h-0.5 w-12 bg-accent" />
            </div>
            <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-muted sm:text-base">
              Enam pilar komitmen operasional yang kami jalankan secara konsisten untuk merealisasikan visi madrasah.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {misi.map((item) => (
              <article
                key={item.nomor}
                className="group relative border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_32px_rgba(11,79,58,0.1)]"
              >
                <div className="flex items-center justify-between">
                  <span className="flex h-10 w-10 items-center justify-center border border-accent/40 bg-primary-soft text-primary font-bold text-sm">
                    <LuCompass className="h-5 w-5 text-accent" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-2xl font-bold text-accent/50 group-hover:text-accent">
                    {item.nomor}
                  </span>
                </div>
                <h3 className="mt-5 font-serif text-lg font-bold text-primary-dark">
                  {item.judul}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-muted">
                  {item.deskripsi}
                </p>
              </article>
            ))}
          </div>
        </section>

        {/* Tujuan Section */}
        <section aria-label="Tujuan madrasah" className="border border-line bg-white p-8 shadow-sm lg:p-10">
          <div className="flex items-center gap-3 border-b border-line pb-4">
            <span className="flex h-10 w-10 items-center justify-center bg-primary text-accent">
              <LuTarget className="h-5 w-5" aria-hidden="true" />
            </span>
            <div>
              <span className="text-xs font-bold tracking-[0.16em] text-accent-soft uppercase">
                Hasil yang Diharapkan
              </span>
              <h2 className="font-serif text-2xl font-black text-primary-dark">
                Tujuan Pendidikan Madrasah
              </h2>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {tujuan.map((item, idx) => (
              <div
                key={idx}
                className="flex items-start gap-3.5 border border-line/60 bg-cream/40 p-4 transition-colors hover:bg-primary-soft/40 hover:border-accent/40"
              >
                <LuCircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                <p className="text-sm leading-relaxed text-muted">
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
