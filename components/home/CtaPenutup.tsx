import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export default function CtaPenutup() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 pb-16 lg:px-6">
        <div className="rounded-3xl bg-primary-dark px-6 py-14 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)] md:px-12">
          <h2 className="mx-auto max-w-2xl text-3xl font-extrabold tracking-tight text-cream md:text-4xl">
            Kenali MTs Nurul Falah Serpong Lebih Dekat
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-cream/80">
            Lihat profil sekolah, program, dan fasilitas kami — semua informasi yang orang tua butuhkan,
            dalam satu tempat.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link
              href="/profil"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent px-7 text-base font-bold text-primary-dark transition-colors hover:bg-accent-soft"
            >
              Lihat Profil Sekolah
              <LuArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
            <Link
              href="/program"
              className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-white px-7 text-base font-bold text-primary ring-1 ring-line transition-colors hover:bg-primary-soft"
            >
              Jelajahi Program
              <LuArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
