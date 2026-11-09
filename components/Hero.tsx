import Link from "next/link";
import { LuArrowRight, LuBookOpen, LuCompass, LuHeartHandshake } from "react-icons/lu";
import HeroStack from "./hero/HeroStack";

const poinKepercayaan = [
  {
    ikon: LuHeartHandshake,
    tag: "Karakter & Adab",
    judul: "Pembinaan Akhlak Mulia",
    keterangan: "Membiasakan nilai-nilai Islami, adab, dan ketertiban ibadah harian secara konsisten.",
    href: "/visi-misi",
  },
  {
    ikon: LuBookOpen,
    tag: "Akademik Terpadu",
    judul: "Kurikulum Terpadu",
    keterangan: "Sinergi seimbang antara kurikulum Kementerian Agama dan kurikulum nasional.",
    href: "/program/akademik",
  },
  {
    ikon: LuCompass,
    tag: "Potensi & Bakat",
    judul: "Pengembangan Minat",
    keterangan: "Ragam wadah ekstrakurikuler terarah untuk melatih bakat dan kepemimpinan siswa.",
    href: "/program/ekstrakurikuler",
  },
];

const Hero = () => {
  return (
    <section className="relative -mt-20 bg-cream">
      {/* Full-bleed edge-to-edge photo slider */}
      <HeroStack />

      {/* Floating / Overlapping Hero Cards (Card Ngegantung) */}
      <div className="relative z-30 -mt-14 sm:-mt-18 lg:-mt-22 mx-auto w-full max-w-300 px-5 lg:px-6 pb-12 sm:pb-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
          {poinKepercayaan.map((item) => (
            <Link
              key={item.judul}
              href={item.href}
              className="group relative flex flex-col justify-between border border-line/90 border-t-4 border-t-accent bg-white p-7 shadow-[0_12px_36px_rgba(11,79,58,0.12)] transition-all duration-300 hover:-translate-y-2.5 hover:border-accent hover:shadow-[0_24px_56px_rgba(11,79,58,0.2)]"
            >
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center border border-accent/40 bg-primary-soft text-primary transition-all duration-300 group-hover:scale-105 group-hover:bg-primary group-hover:text-white shadow-xs">
                    <item.ikon className="h-6 w-6 text-accent transition-colors group-hover:text-white" aria-hidden="true" />
                  </span>
                  <span className="text-[10px] font-bold tracking-[0.16em] text-accent uppercase">
                    {item.tag}
                  </span>
                </div>

                <h3 className="mt-5 font-serif text-lg font-bold tracking-tight text-primary-dark transition-colors duration-200 group-hover:text-primary sm:text-xl">
                  {item.judul}
                </h3>
                <p className="mt-2.5 text-xs sm:text-sm leading-relaxed text-muted">
                  {item.keterangan}
                </p>
              </div>

              <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-4 text-xs font-bold text-accent uppercase tracking-wider">
                <span>Pelajari Rincian</span>
                <LuArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1.5" aria-hidden="true" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
