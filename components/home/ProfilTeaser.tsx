import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCircleCheck } from "react-icons/lu";

const poinKeunggulan = [
  "Pendidikan akademik dan agama yang seimbang dan terstruktur",
  "Pembinaan karakter dan akhlak mulia dalam aktivitas harian",
  "Guru dan tenaga pendidik yang peduli pada perkembangan setiap siswa",
  "Lingkungan belajar madrasah yang aman, tertib, dan kondusif",
];

export default function ProfilTeaser() {
  return (
    <section className="relative overflow-hidden bg-accent-soft text-white py-20">
      {/* Subtle architectural background line */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" aria-hidden="true">
        <div className="h-full w-full bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative mx-auto grid w-full max-w-300 grid-cols-1 items-center gap-12 px-5 lg:grid-cols-12 lg:px-6">
        <div className="order-2 lg:order-1 lg:col-span-5">
          <div className="relative border-4 border-white/20 p-2 shadow-2xl">
            <Image
              src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
              alt="Siswa aktif dalam kegiatan pembelajaran di kelas"
              width={800}
              height={600}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute -bottom-4 -right-4 hidden border border-white/30 bg-primary-dark p-4 shadow-xl sm:block">
              <p className="font-serif text-2xl font-black text-accent">2001</p>
              <p className="text-[11px] font-bold tracking-wider text-white/90 uppercase">
                Tahun Berdiri
              </p>
            </div>
          </div>
        </div>

        <div className="order-1 lg:order-2 lg:col-span-7">
          <span className="inline-block text-xs font-bold tracking-[0.2em] text-white/80 uppercase">
            Tentang Madrasah Kami
          </span>
          <h2 className="mt-2.5 font-serif text-3xl font-black leading-tight tracking-tight sm:text-4xl lg:text-5xl">
            Profil MTs Nurul Falah Gunungsindur
          </h2>
          <div className="mt-4 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-12 bg-white" />
            <span className="h-1.5 w-1.5 rotate-45 bg-white" />
          </div>

          <p className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
            MTs Nurul Falah Gunungsindur hadir sebagai madrasah tsanawiyah swasta berciri khas
            Agama Islam yang terakreditasi A di Kabupaten Bogor, memadukan pendidikan akademik
            formal dengan penanaman nilai-nilai keislaman secara menyeluruh. Kami berkomitmen
            membentuk siswa yang cerdas, mandiri, dan berakhlakul karimah.
          </p>

          <ul className="mt-6 space-y-3.5">
            {poinKeunggulan.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-white/95 sm:text-base">
                <LuCircleCheck className="mt-0.5 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-9">
            <Link
              href="/profil"
              className="group inline-flex min-h-12 items-center justify-center gap-2 border border-white bg-white px-8 py-3.5 text-sm font-bold tracking-wide text-primary-dark uppercase transition-all duration-200 hover:bg-cream hover:shadow-lg"
            >
              <span>Selengkapnya Tentang Kami</span>
              <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
