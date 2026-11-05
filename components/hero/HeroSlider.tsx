"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { LuArrowUpRight, LuHeart } from "react-icons/lu";

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
const DURASI_TRANSISI = 1000;

export default function HeroSlider() {
  const [tampil, setTampil] = useState({ aktif: 0, sebelum: null as number | null });

  useEffect(() => {
    const timer = setInterval(() => {
      setTampil((s) => ({ aktif: (s.aktif + 1) % foto.length, sebelum: s.aktif }));
    }, DURASI_TAMPIL);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (tampil.sebelum === null) return;
    const timer = setTimeout(() => {
      setTampil((s) => ({ ...s, sebelum: null }));
    }, DURASI_TRANSISI);
    return () => clearTimeout(timer);
  }, [tampil.sebelum]);

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[2rem] shadow-2xl ring-1 ring-white/10 lg:aspect-[4/5]">
      {foto.map((item, i) => {
        const aktif = i === tampil.aktif;
        const keluar = i === tampil.sebelum;
        return (
          <Image
            key={item.src}
            src={item.src}
            alt={item.alt}
            fill
            priority={i === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className={`object-cover transition-all duration-1000 ease-in-out ${
              aktif ? "z-0 scale-100 opacity-100" : keluar ? "z-10 scale-90 opacity-0" : "z-0 scale-90 opacity-0"
            }`}
          />
        );
      })}
      <div className="absolute bottom-5 left-5 z-30 rounded-2xl bg-white px-5 py-4 text-ink shadow-xl">
        <span className="absolute -top-4 -right-4 flex h-9 w-9 items-center justify-center rounded-full bg-accent text-white shadow-md" aria-hidden="true">
          <LuHeart className="h-5 w-5 fill-current" />
        </span>
        <p className="flex items-center gap-1 text-3xl font-extrabold tracking-tight">
          [Jumlah]
          <LuArrowUpRight className="h-6 w-6" aria-hidden="true" />
        </p>
        <p className="mt-0.5 text-sm text-muted">Siswa</p>
      </div>
    </div>
  );
}
