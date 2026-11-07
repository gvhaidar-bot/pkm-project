import { LuCheck, LuGlobe, LuHeart, LuMedal, LuTrophy } from "react-icons/lu";
import type { IconType } from "react-icons";

export const metadata = {
  title: "Program Unggulan",
  description: "Program unggulan MTs Nurul Falah Serpong.",
};

type Program = {
  nama: string;
  deskripsi: string;
  keunggulan: string[];
  Icon: IconType;
};

const daftarProgram: Program[] = [
  {
    nama: "[Program Unggulan 1]",
    deskripsi: "[Deskripsi program unggulan 1 — menunggu data resmi dari pihak sekolah]",
    keunggulan: ["[Keunggulan 1]", "[Keunggulan 2]", "[Keunggulan 3]", "[Keunggulan 4]"],
    Icon: LuTrophy,
  },
  {
    nama: "[Program Unggulan 2]",
    deskripsi: "[Deskripsi program unggulan 2 — menunggu data resmi dari pihak sekolah]",
    keunggulan: ["[Keunggulan 1]", "[Keunggulan 2]", "[Keunggulan 3]", "[Keunggulan 4]"],
    Icon: LuGlobe,
  },
  {
    nama: "[Program Unggulan 3]",
    deskripsi: "[Deskripsi program unggulan 3 — menunggu data resmi dari pihak sekolah]",
    keunggulan: ["[Keunggulan 1]", "[Keunggulan 2]", "[Keunggulan 3]", "[Keunggulan 4]"],
    Icon: LuMedal,
  },
  {
    nama: "[Program Unggulan 4]",
    deskripsi: "[Deskripsi program unggulan 4 — menunggu data resmi dari pihak sekolah]",
    keunggulan: ["[Keunggulan 1]", "[Keunggulan 2]", "[Keunggulan 3]", "[Keunggulan 4]"],
    Icon: LuHeart,
  },
];

export default function UnggulanPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Program</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Program Unggulan</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Program khas yang menjadi ciri khas dan kebanggaan madrasah kami.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {daftarProgram.map((program) => (
            <article
              key={program.nama}
              className="rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <div className="flex items-center gap-3">
                <program.Icon className="h-8 w-8 text-accent" aria-hidden="true" />
                <h2 className="text-2xl font-extrabold tracking-tight text-primary">
                  {program.nama}
                </h2>
              </div>
              <p className="mt-4 text-base leading-relaxed text-muted">{program.deskripsi}</p>
              <ul className="mt-5 space-y-2.5">
                {program.keunggulan.map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-base text-muted">
                    <LuCheck className="mt-1 h-5 w-5 shrink-0 text-accent" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
