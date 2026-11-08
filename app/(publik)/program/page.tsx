import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

export const metadata = {
  title: "Program",
  description: "Program akademik, ekstrakurikuler, dan program unggulan MTs Nurul Falah Serpong.",
};

const daftar = [
  {
    judul: "Akademik",
    href: "/program/akademik",
    deskripsi: "Kurikulum dan program pembelajaran intrakurikuler madrasah.",
  },
  {
    judul: "Ekstrakurikuler",
    href: "/program/ekstrakurikuler",
    deskripsi: "Wadah minat dan bakat siswa di luar jam pelajaran.",
  },
  {
    judul: "Program Unggulan",
    href: "/program/unggulan",
    deskripsi: "Program khas yang menjadi ciri khas madrasah kami.",
  },
];

export default function ProgramPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Penawaran Kami</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Program</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Tiga pilar program yang dirancang untuk mengembangkan potensi putra-putri Anda secara
          maksimal.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {daftar.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex flex-col rounded-none bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
            >
              <h2 className="text-2xl font-extrabold tracking-tight text-ink">{item.judul}</h2>
              <p className="mt-3 flex-1 text-base leading-relaxed text-muted">{item.deskripsi}</p>
              <span className="mt-6 inline-flex items-center gap-1.5 text-base font-bold text-primary">
                Selengkapnya
                <LuArrowRight
                  className="h-5 w-5 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
