import { LuQuote, LuUser } from "react-icons/lu";
import JudulBagian from "./JudulBagian";

const daftar = [
  {
    kutipan: "[Testimoni orang tua siswa — menunggu data resmi dari pihak sekolah]",
    nama: "[Nama Orang Tua]",
    peran: "Orang Tua Siswa",
  },
  {
    kutipan: "[Testimoni orang tua siswa — menunggu data resmi dari pihak sekolah]",
    nama: "[Nama Orang Tua]",
    peran: "Orang Tua Siswa",
  },
  {
    kutipan: "[Testimoni orang tua siswa — menunggu data resmi dari pihak sekolah]",
    nama: "[Nama Orang Tua]",
    peran: "Orang Tua Siswa",
  },
];

export default function Testimoni() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Testimoni"
          judul="Kata Orang Tua"
          deskripsi="Pengalaman orang tua yang mempercayakan pendidikan putra-putrinya kepada kami."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {daftar.map((item, i) => (
            <figure
              key={i}
              className="flex flex-col rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <LuQuote className="h-8 w-8 text-accent" aria-hidden="true" />
              <blockquote className="mt-4 flex-1 text-base leading-relaxed text-muted">
                {item.kutipan}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-soft text-primary">
                  <LuUser className="h-5 w-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-base font-bold text-ink">{item.nama}</span>
                  <span className="block text-sm text-muted">{item.peran}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
