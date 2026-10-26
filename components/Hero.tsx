import Image from "next/image";
import HeroActions from "./hero/HeroActions";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-primary-dark text-cream">
      <Image src="https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop" alt="Suasana ruang kelas" fill priority sizes="100vw" className="object-cover" />
      <div className="absolute inset-0 bg-primary-dark/75" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-300 px-5 py-24 lg:px-6">
        <div className=" items-center inline-flex rounded-full bg-primary-soft px-3.5 py-1.5 text-xs font-bold tracking-[0.12em] text-primary uppercase gap-2 duration-300">
          <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
          <span className="">Website Promosi Sekolah</span>
        </div>

        <h1 className="mt-6 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight md:text-[2.75rem] md:leading-[1.15]">Mengenal Madrasah Tsanawiyah, Sekolah untuk Buah Hati Anda</h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/80 md:text-lg">Kenali profil sekolah, program unggulan, fasilitas, dan prestasi kami — semua informasi yang orang tua butuhkan, dalam satu tempat.</p>
        <HeroActions />
      </div>
    </section>
  );
};

export default Hero;
