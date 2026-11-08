import HeroActions from "./hero/HeroActions";
import HeroStack from "./hero/HeroStack";

const Hero = () => {
  return (
    <section className="bg-white text-ink">
      <div className="mx-auto w-full max-w-300 px-5 pt-6 lg:px-6">
        <HeroStack />
      </div>
      <div className="mx-auto max-w-3xl px-5 py-16 text-center lg:px-6">
        <h1 className="text-4xl leading-[1.1] font-black tracking-tight md:text-6xl">
          Mengenal MTs Nurul Falah Serpong, Sekolah untuk Buah Hati Anda
        </h1>
        <span className="mx-auto mt-6 block h-1 w-16 bg-accent" aria-hidden="true" />
        <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
          Kenali profil MTs Nurul Falah Serpong, program unggulan, fasilitas, dan prestasi kami — semua informasi yang
          orang tua butuhkan, dalam satu tempat.
        </p>
        <HeroActions />
      </div>
    </section>
  );
};

export default Hero;
