import Image from "next/image";
import Link from "next/link";
import { LuArrowRight, LuCircleCheck } from "react-icons/lu";

const daftar = [
  "Pendidikan akademik dan agama yang seimbang",
  "Pembinaan karakter dan akhlak mulia",
  "Guru dan staff yang peduli pada setiap siswa",
  "Lingkungan belajar yang aman dan nyaman",
];

export default function ProfilTeaser() {
  return (
    <section className="bg-cream">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-6">
        <div className="order-2 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
            alt="Siswa di ruang kelas"
            width={800}
            height={600}
            className="aspect-[4/3] w-full rounded-3xl object-cover shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
          />
        </div>
        <div className="order-1 lg:order-2">
          <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Tentang Kami</p>
          <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">
            Profil Madrasah Tsanawiyah
          </h2>
          <p className="mt-4 text-base leading-relaxed text-muted">
            Madrasah Tsanawiyah adalah sekolah menengah pertama berbasis Islam yang memadukan pendidikan
            akademik dan pembinaan karakter, agar putra-putri Anda tumbuh menjadi generasi yang cerdas dan
            berakhlak mulia.
          </p>
          <ul className="mt-6 space-y-3">
            {daftar.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-base text-muted">
                <LuCircleCheck className="mt-1 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/profil"
            className="mt-8 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-6 text-base font-bold text-white transition-colors hover:bg-primary-dark"
          >
            Selengkapnya tentang Kami
            <LuArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
