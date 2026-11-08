import Link from "next/link";

export default function CtaPenutup() {
  return (
    <section className="bg-primary text-white">
      <div className="mx-auto w-full max-w-3xl px-5 py-16 text-center lg:px-6">
        <h2 className="text-4xl leading-[1.1] font-black tracking-tight md:text-5xl">
          Kenali MTs Nurul Falah Serpong Lebih Dekat
        </h2>
        <span className="mx-auto mt-6 block h-1 w-16 bg-accent" aria-hidden="true" />
        <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-white/85 md:text-lg">
          Lihat profil sekolah, program, dan fasilitas kami — semua informasi yang orang tua butuhkan, dalam satu
          tempat.
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
          <Link
            href="/profil"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 bg-accent px-7 py-3 text-base font-bold text-white transition-colors hover:bg-accent-soft"
          >
            Lihat Profil Sekolah →
          </Link>
          <Link
            href="/program"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 bg-white px-7 py-3 text-base font-bold text-primary transition-colors hover:bg-cream"
          >
            Jelajahi Program →
          </Link>
        </div>
      </div>
    </section>
  );
}
