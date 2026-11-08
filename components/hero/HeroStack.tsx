"use client";

import { useEffect, useState } from "react";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

const foto = [
  {
    src: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?q=80&w=1600&auto=format&fit=crop",
    alt: "Suasana ruang kelas",
  },
  {
    src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1600&auto=format&fit=crop",
    alt: "Siswa mengangkat tangan di kelas",
  },
  {
    src: "https://images.unsplash.com/photo-1427504494785-3a9ca7044f45?q=80&w=1600&auto=format&fit=crop",
    alt: "Guru bersama siswa di kelas",
  },
];

const DURASI_TAMPIL = 10000;

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
      className="relative aspect-video w-full overflow-hidden select-none"
      onMouseEnter={() => setDijeda(true)}
      onMouseLeave={() => setDijeda(false)}
    >
      {foto.map((item, i) => (
        <img
          key={item.src}
          src={item.src}
          alt={item.alt}
          draggable={false}
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ${
            i === aktif ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary-dark/60 to-transparent" aria-hidden="true" />
      <div className="absolute right-4 bottom-4 z-10 flex gap-2">
        <button
          type="button"
          aria-label="Foto sebelumnya"
          onClick={sebelumnya}
          className="flex h-11 w-11 items-center justify-center bg-white text-primary shadow-lg transition-colors hover:bg-primary-soft"
        >
          <LuChevronLeft className="h-5 w-5" aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Foto berikutnya"
          onClick={berikutnya}
          className="flex h-11 w-11 items-center justify-center bg-white text-primary shadow-lg transition-colors hover:bg-primary-soft"
        >
          <LuChevronRight className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
