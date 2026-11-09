"use client";

import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const foto = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
    alt: "Suasana ruang kelas dan sarana belajar MTs Nurul Falah",
    caption: "Suasana Belajar yang Kondusif & Terbina",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    alt: "Siswa aktif dalam pembelajaran",
    caption: "Pembelajaran Interaktif & Pembinaan Karakter",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600&auto=format&fit=crop",
    alt: "Guru mendampingi siswa di madrasah",
    caption: "Bimbingan Guru yang Tulus & Berpengalaman",
  },
];

const DURASI_TAMPIL = 8000;

export default function HeroStack() {
  const [aktif, setAktif] = useState(0);
  const [dijeda, setDijeda] = useState(false);

  useEffect(() => {
    if (dijeda) return;
    const timer = setInterval(() => setAktif((a) => (a + 1) % foto.length), DURASI_TAMPIL);
    return () => clearInterval(timer);
  }, [dijeda]);

  const sebelumnya = () => setAktif((a) => (a - 1 + foto.length) % foto.length);
  const berikutnya = () => setAktif((a) => (a + 1) % foto.length);

  return (
    <div
      className="relative aspect-[16/9] w-full overflow-hidden select-none border border-line bg-primary-dark sm:aspect-[21/10]"
      onMouseEnter={() => setDijeda(true)}
      onMouseLeave={() => setDijeda(false)}
    >
      {foto.map((item, i) => (
        <div
          key={item.src}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === aktif ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <img
            src={item.src}
            alt={item.alt}
            draggable={false}
            className="h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-primary-dark/85 via-primary-dark/30 to-black/10"
            aria-hidden="true"
          />
          {/* Subtle caption bottom left */}
          <div className="absolute bottom-5 left-5 z-10 hidden sm:block">
            <span className="inline-block bg-primary-dark/80 px-3 py-1 font-serif text-xs font-semibold tracking-wide text-white/90 backdrop-blur-xs border-l-2 border-accent">
              {item.caption}
            </span>
          </div>
        </div>
      ))}

      {/* Slide Indicators & Navigation Controls */}
      <div className="absolute right-4 bottom-4 z-20 flex items-center gap-3">
        <div className="flex gap-1.5" aria-hidden="true">
          {foto.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setAktif(i)}
              aria-label={`Lihat foto ${i + 1}`}
              className={`h-1.5 transition-all ${
                i === aktif ? "w-6 bg-accent" : "w-2 bg-white/50 hover:bg-white"
              }`}
            />
          ))}
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            aria-label="Foto sebelumnya"
            onClick={sebelumnya}
            className="flex h-9 w-9 items-center justify-center border border-white/20 bg-primary-dark/80 text-white transition-colors hover:bg-accent hover:text-primary-dark"
          >
            <LuChevronLeft className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            aria-label="Foto berikutnya"
            onClick={berikutnya}
            className="flex h-9 w-9 items-center justify-center border border-white/20 bg-primary-dark/80 text-white transition-colors hover:bg-accent hover:text-primary-dark"
          >
            <LuChevronRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
