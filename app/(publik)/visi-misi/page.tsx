import Image from "next/image";
import Link from "next/link";
import { LuChevronRight, LuCompass, LuSparkles, LuTarget } from "react-icons/lu";

export const metadata = {
  title: "Visi & Misi",
  description:
    "Visi dan misi MTs Nurul Falah Gunungsindur, Madrasah Tsanawiyah berciri khas Agama Islam di Gunungsindur, Kabupaten Bogor.",
};

export default function VisiMisiPage() {
  return (
    <div className="bg-cream">
      {/* Editorial Header Banner */}
      <section className="relative overflow-hidden bg-primary-dark text-white">
        <Image
          src="https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=2000&auto=format&fit=crop"
          alt="Al-Qur'an dan Landasan Nilai Islami MTs Nurul Falah"
          fill
          className="object-cover opacity-80 sm:opacity-85"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-dark via-primary-dark/85 to-transparent sm:via-primary-dark/75" aria-hidden="true" />
        <div className="relative mx-auto w-full max-w-300 px-5 py-16 lg:px-6 lg:py-20">
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
              Berciri Khas Agama Islam
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
                &ldquo;Sekolah Lanjutan Tingkat Pertama Berciri Khas Agama Islam.&rdquo;
              </blockquote>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted sm:text-base">
              Rumusan visi, misi, dan tujuan resmi MTs Nurul Falah Gunungsindur akan ditampilkan di
              halaman ini setelah data resmi diterima dari pihak madrasah.
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
              Rumusan misi resmi madrasah sedang dilengkapi bersama pihak sekolah.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-2xl border-2 border-dashed border-accent/40 bg-white p-8 text-center">
            <LuCompass className="mx-auto h-10 w-10 text-accent" aria-hidden="true" />
            <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Rumusan misi resmi madrasah akan ditampilkan setelah data resmi diterima dari pihak madrasah.
            </p>
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

          <div className="mt-8 border-2 border-dashed border-accent/40 bg-cream/40 p-6 text-center">
            <p className="mx-auto max-w-lg text-sm leading-relaxed text-muted">
              Rumusan tujuan resmi madrasah akan ditampilkan setelah data resmi diterima dari pihak madrasah.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
