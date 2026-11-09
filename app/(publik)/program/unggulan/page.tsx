import Link from "next/link";
import { LuArrowRight, LuCheck, LuChevronRight, LuGlobe, LuHeart, LuMedal, LuSparkles, LuTrophy } from "react-icons/lu";
import type { IconType } from "react-icons";

export const metadata = {
  title: "Program Unggulan",
  description: "Program unggulan khas MTs Nurul Falah Serpong: keistimewaan kurikulum dan pembiasaan karakter Islami.",
};

type Program = {
  nama: string;
  tag: string;
  deskripsi: string;
  keunggulan: string[];
  Icon: IconType;
};

const daftarProgram: Program[] = [
  {
    nama: "Pembinaan Akhlak & Tahsin Al-Qur'an",
    tag: "Fondasi Karakter",
    deskripsi:
      "Program pembiasaan ibadah praktis harian, shalat dhuha dan dhuhur berjamaah, serta bimbingan membaca dan tahsin Al-Qur'an secara tartil dengan bimbingan ustadz/ustadzah.",
    keunggulan: [
      "Pembiasaan shalat berjamaah dan tadarus pagi",
      "Bimbingan makhraj dan tajwid secara terstruktur",
      "Penanaman adab kepada orang tua, guru, dan teman",
      "Peringatan Hari Besar Islam terpadu",
    ],
    Icon: LuHeart,
  },
  {
    nama: "Integrasi Kurikulum Kemenag & Nasional",
    tag: "Keunggulan Akademik",
    deskripsi:
      "Sinergi seimbang antara mata pelajaran umum (IPA, Matematika, Bahasa Indonesia, Bahasa Inggris) dengan rumpun PAI (Aqidah Akhlak, Fikih, SKI, Al-Qur'an Hadits, dan Bahasa Arab).",
    keunggulan: [
      "Kesiapan menghadapi asesmen dan ujian kelulusan",
      "Penguasaan konsep dasar sains dan logika",
      "Pengenalan kosakata dan tata bahasa Arab dasar",
      "Dukungan bimbingan belajar menjelang ujian",
    ],
    Icon: LuTrophy,
  },
  {
    nama: "Pengembangan Wawasan & Kepemimpinan",
    tag: "Karakter Mandiri",
    deskripsi:
      "Melatih kemandirian, kerja sama tim, tanggung jawab sosial, dan rasa cinta tanah air melalui organisasi kesiswaan (OSIS) serta kepanduan Pramuka madrasah.",
    keunggulan: [
      "Latihan Dasar Kepemimpinan Siswa (LDKS)",
      "Kegiatan kepramukaan terpadu",
      "Pembiasaan disiplin dan ketepatan waktu",
      "Partisipasi aktif dalam kegiatan sosial kemasyarakatan",
    ],
    Icon: LuMedal,
  },
  {
    nama: "Literasi Digital & Lingkungan Ramah Belajar",
    tag: "Kesiapan Masa Depan",
    deskripsi:
      "Membiasakan pemanfaatan teknologi informasi untuk kebutuhan pembelajaran positif, diimbangi dengan pendampingan etika bermedia sosial dan lingkungan madrasah yang sehat.",
    keunggulan: [
      "Pengenalan aplikasi penunjang pembelajaran",
      "Edukasi literasi digital dan internet sehat",
      "Lingkungan madrasah yang asri dan aman",
      "Komunikasi aktif dengan paguyuban orang tua",
    ],
    Icon: LuGlobe,
  },
];

export default function UnggulanPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="border-b border-primary-dark/30 bg-primary-dark text-white py-16 lg:py-20">
        <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
          <div className="inline-flex items-center gap-2 border border-accent/40 bg-accent/10 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-accent uppercase">
            <LuSparkles className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Kekhasan & Prioritas Madrasah</span>
          </div>
          <h1 className="mt-4 font-serif text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
            Program Unggulan MTs Nurul Falah
          </h1>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          </div>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 sm:text-lg">
            Fokus pembinaan terarah yang membentuk ciri khas lulusan kami: berakhlak mulia, berprestasi akademik,
            dan berkarakter mandiri.
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
          <Link href="/program" className="text-primary hover:text-primary-dark hover:underline">
            Program
          </Link>
          <LuChevronRight className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
          <span className="font-semibold text-primary-dark" aria-current="page">
            Program Unggulan
          </span>
        </div>
      </nav>

      {/* Main Grid */}
      <div className="mx-auto w-full max-w-300 px-5 py-16 lg:px-6">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {daftarProgram.map((program) => (
            <article
              key={program.nama}
              className="group flex flex-col justify-between border border-line bg-white p-8 shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-accent hover:shadow-[0_16px_40px_rgba(11,79,58,0.12)]"
            >
              <div>
                <div className="flex items-center justify-between border-b border-line pb-5">
                  <span className="flex h-12 w-12 items-center justify-center border border-accent/40 bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <program.Icon className="h-6 w-6 text-accent" aria-hidden="true" />
                  </span>
                  <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
                    {program.tag}
                  </span>
                </div>

                <h2 className="mt-6 font-serif text-2xl font-bold tracking-tight text-primary-dark">
                  {program.nama}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {program.deskripsi}
                </p>

                <div className="mt-6 border-t border-line/60 pt-5">
                  <span className="text-xs font-bold tracking-wider text-primary-dark uppercase">
                    Keunggulan Program:
                  </span>
                  <ul className="mt-3 space-y-2.5">
                    {program.keunggulan.map((item) => (
                      <li key={item} className="flex items-start gap-2.5 text-xs font-medium text-muted">
                        <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Bottom Consultation Strip */}
        <div className="mt-14 border border-line bg-primary-soft/50 p-8 text-center sm:p-10">
          <h3 className="font-serif text-2xl font-bold text-primary-dark">
            Ingin Konsultasi Mengenai Program Unggulan Kami?
          </h3>
          <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-muted">
            Pintu madrasah kami selalu terbuka untuk kunjungan dan konsultasi orang tua.
          </p>
          <div className="mt-6">
            <Link
              href="/kontak"
              className="group inline-flex min-h-11 items-center justify-center gap-2 border border-primary bg-primary px-8 py-3 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-primary-dark"
            >
              <span>Hubungi Madrasah</span>
              <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
