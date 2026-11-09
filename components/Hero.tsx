import { LuBookOpen, LuCompass, LuHeartHandshake } from "react-icons/lu";
import HeroActions from "./hero/HeroActions";
import HeroStack from "./hero/HeroStack";

const poinKepercayaan = [
  {
    ikon: LuHeartHandshake,
    judul: "Pembinaan Akhlak Mulia",
    keterangan: "Membiasakan nilai Islami dalam keseharian siswa",
  },
  {
    ikon: LuBookOpen,
    judul: "Kurikulum Terpadu",
    keterangan: "Sinergi pendidikan formal dan ilmu agama",
  },
  {
    ikon: LuCompass,
    judul: "Pengembangan Minat",
    keterangan: "Ekstrakurikuler beragam untuk potensi optimal",
  },
];

const Hero = () => {
  return (
    <section className="border-b border-line bg-white text-ink">
      <div className="mx-auto w-full max-w-300 px-5 pt-8 lg:px-6">
        <HeroStack />
      </div>

      <div className="mx-auto max-w-4xl px-5 pt-12 pb-16 text-center lg:px-6">
        <div className="inline-flex items-center gap-2 border border-accent/40 bg-primary-soft/50 px-3.5 py-1.5 text-xs font-bold tracking-[0.16em] text-primary uppercase">
          <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
          <span>Madrasah Tsanawiyah Terakreditasi B · Serpong</span>
        </div>

        <h1 className="mt-6 font-serif text-3xl leading-[1.15] font-black tracking-tight text-primary-dark sm:text-5xl lg:text-6xl">
          Mendidik Generasi Berilmu, Berakhlak, dan Siap Menghadapi Masa Depan
        </h1>

        <div className="mx-auto mt-6 flex items-center justify-center gap-2" aria-hidden="true">
          <span className="h-0.5 w-16 bg-accent" />
          <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          <span className="h-0.5 w-16 bg-accent" />
        </div>

        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Kenali profil MTs Nurul Falah Serpong, program unggulan, fasilitas, dan prestasi kami.
          Pilihan madrasah terpercaya untuk buah hati Anda di Tangerang Selatan.
        </p>

        <HeroActions />
      </div>

      {/* Trust points bar */}
      <div className="border-t border-line bg-cream/70 py-6">
        <div className="mx-auto grid w-full max-w-300 grid-cols-1 gap-6 px-5 sm:grid-cols-3 lg:px-6">
          {poinKepercayaan.map((item) => (
            <div key={item.judul} className="flex items-center gap-3.5">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/30 bg-white text-primary">
                <item.ikon className="h-5 w-5 text-accent-soft" aria-hidden="true" />
              </span>
              <div className="min-w-0">
                <h3 className="text-sm font-bold tracking-tight text-primary-dark">{item.judul}</h3>
                <p className="text-xs text-muted truncate">{item.keterangan}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
