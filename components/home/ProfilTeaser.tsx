import Image from "next/image";
import Link from "next/link";
import { LuCircleCheck } from "react-icons/lu";

const daftar = [
  "Pendidikan akademik dan agama yang seimbang",
  "Pembinaan karakter dan akhlak mulia",
  "Guru dan staff yang peduli pada setiap siswa",
  "Lingkungan belajar yang aman dan nyaman",
];

export default function ProfilTeaser() {
  return (
    <section className="bg-accent-soft text-white">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 items-center gap-10 px-5 py-16 lg:grid-cols-2 lg:px-6">
        <div className="order-2 lg:order-1">
          <Image
            src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop"
            alt="Siswa di ruang kelas"
            width={800}
            height={600}
            className="aspect-[4/3] w-full object-cover shadow-[0_4px_24px_rgba(0,0,0,0.2)]"
          />
        </div>
        <div className="order-1 lg:order-2">
          <h2 className="text-4xl leading-[1.1] font-black tracking-tight md:text-5xl">
            Profil MTs Nurul Falah Serpong
          </h2>
          <span className="mt-5 block h-1 w-16 bg-white" aria-hidden="true" />
          <p className="mt-5 text-base leading-relaxed text-white/90 md:text-lg">
            Berdiri sejak 2001 dan terakreditasi B, MTs Nurul Falah Serpong adalah madrasah tsanawiyah
            swasta di Lengkong Gudang, Serpong, yang memadukan pendidikan akademik dan pembinaan
            karakter, agar putra-putri Anda tumbuh menjadi generasi yang cerdas dan berakhlak mulia.
          </p>
          <ul className="mt-6 space-y-3">
            {daftar.map((item) => (
              <li key={item} className="flex items-start gap-2.5 text-base text-white/90">
                <LuCircleCheck className="mt-1 h-5 w-5 shrink-0 text-white" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <Link
            href="/profil"
            className="mt-8 inline-flex min-h-11 items-center justify-center gap-1.5 bg-white px-7 py-3 text-base font-bold text-primary transition-colors hover:bg-cream"
          >
            Selengkapnya tentang Kami →
          </Link>
        </div>
      </div>
    </section>
  );
}
