import Link from "next/link";
import { LuArrowRight, LuMapPin, LuPhoneCall } from "react-icons/lu";

export default function CtaPenutup() {
  return (
    <section className="relative overflow-hidden bg-primary text-white py-24">
      {/* Subtle geometric lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" aria-hidden="true">
        <div className="h-full w-full bg-[radial-gradient(#c19a3d_1px,transparent_1px)] [background-size:20px_20px]" />
      </div>

      <div className="relative mx-auto w-full max-w-3xl px-5 text-center lg:px-6">
        <span className="inline-block text-xs font-bold tracking-[0.2em] text-accent uppercase">
          Masa Depan Buah Hati Anda
        </span>
        <h2 className="mt-3 font-serif text-3xl leading-tight font-black tracking-tight sm:text-4xl md:text-5xl">
          Kenali MTs Nurul Falah Gunungsindur Lebih Dekat
        </h2>
        <div className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
          <span className="h-0.5 w-12 bg-accent" />
          <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
          <span className="h-0.5 w-12 bg-accent" />
        </div>

        <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-white/90 md:text-lg">
          Kami menyambut hangat para orang tua yang ingin berkonsultasi mengenai pendidikan dan
          lingkungan belajar terbaik untuk putra-putrinya.
        </p>

        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/profil"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 border border-accent bg-accent px-8 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-accent-soft hover:shadow-lg sm:w-auto"
          >
            <span>Lihat Profil Sekolah</span>
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/program"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 border border-white bg-white px-8 py-3.5 text-sm font-bold tracking-wide text-primary-dark uppercase transition-all duration-200 hover:bg-cream hover:shadow-lg sm:w-auto"
          >
            <span>Jelajahi Program</span>
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
          <Link
            href="/kontak"
            className="group inline-flex min-h-12 w-full items-center justify-center gap-2 border border-white/40 bg-primary-dark/60 px-8 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-primary-dark hover:border-white sm:w-auto"
          >
            <LuPhoneCall className="h-4 w-4 text-accent" aria-hidden="true" />
            <span>Hubungi Kami</span>
          </Link>
        </div>

        <div className="mt-10 flex items-center justify-center gap-2 text-xs text-white/70">
          <LuMapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
          <span>Jl. Pahlawan No. 06, Kp. Bulaksaga RT 03/06, Cibadung, Gunungsindur, Bogor</span>
        </div>
      </div>
    </section>
  );
}
