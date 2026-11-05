import HeroActions from "./hero/HeroActions";
import HeroStack from "./hero/HeroStack";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-cream text-ink">
      <div className="relative mx-auto grid w-full max-w-300 grid-cols-1 items-center gap-12 px-5 py-24 lg:grid-cols-2 lg:px-6">
        <div>
          <div className=" items-center inline-flex rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] text-primary uppercase gap-2 duration-300">
            <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
            <span className="">Website Promosi Sekolah</span>
          </div>

          <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight md:text-[2.75rem] md:leading-[1.15]">Mengenal Madrasah Tsanawiyah, Sekolah untuk Buah Hati Anda</h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted md:text-lg">Kenali profil sekolah, program unggulan, fasilitas, dan prestasi kami — semua informasi yang orang tua butuhkan, dalam satu tempat.</p>
          <HeroActions />
        </div>
        <HeroStack />
      </div>
    </section>
  );
};

export default Hero;
