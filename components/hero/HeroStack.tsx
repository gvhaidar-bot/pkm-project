"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
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
const DURASI_KELUAR = 500;

type Penempatan = { x: number; y: number; rotate: number; scale: number };

const penempatan = (posisi: number): Penempatan => ({
  x: 0,
  y: 0,
  rotate: posisi * 5,
  scale: 1 - posisi * 0.06,
});

export default function HeroStack() {
  const [urutan, setUrutan] = useState<number[]>([0, 1, 2]);
  const [keluar, setKeluar] = useState<number | null>(null);
  const [masuk, setMasuk] = useState<number | null>(null);
  const [dijeda, setDijeda] = useState(false);

  const urutanRef = useRef(urutan);
  const keluarRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    urutanRef.current = urutan;
  }, [urutan]);

  const kirimKeBelakang = useCallback(() => {
    if (keluarRef.current !== null) return;
    const atas = urutanRef.current[0];
    if (atas === undefined) return;
    keluarRef.current = atas;
    setKeluar(atas);
    timerRef.current = setTimeout(() => {
      setUrutan((u) => [...u.slice(1), u[0]]);
      keluarRef.current = null;
      setKeluar(null);
      setMasuk(atas);
    }, DURASI_KELUAR);
  }, []);

  const fotoSebelumnya = () => {
    if (keluarRef.current !== null) return;
    setUrutan((u) => [u[u.length - 1], ...u.slice(0, -1)]);
  };

  useEffect(() => {
    if (masuk === null) return;
    const raf = requestAnimationFrame(() => setMasuk(null));
    return () => cancelAnimationFrame(raf);
  }, [masuk]);

  useEffect(() => {
    if (dijeda) return;
    const timer = setInterval(() => kirimKeBelakang(), DURASI_TAMPIL);
    return () => clearInterval(timer);
  }, [dijeda, urutan, kirimKeBelakang]);

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    },
    []
  );

  const gayaKartu = (indeks: number): CSSProperties => {
    const posisi = urutan.indexOf(indeks);
    const tempat = penempatan(posisi);
    const sedangKeluar = keluar === indeks;
    const baruMasuk = masuk === indeks;
    return {
      transform: sedangKeluar
        ? "translate(500px, -150px) rotate(15deg) scale(0.9)"
        : `translate(${tempat.x}px, ${tempat.y}px) rotate(${tempat.rotate}deg) scale(${tempat.scale})`,
      transformOrigin: "90% 90%",
      opacity: sedangKeluar || baruMasuk ? 0 : 1,
      zIndex: sedangKeluar ? 40 : (foto.length - posisi) * 10,
      transition: baruMasuk ? "none" : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
    };
  };

  return (
    <div
      className="relative aspect-[4/3] w-full select-none lg:aspect-[4/5]"
      onMouseEnter={() => setDijeda(true)}
      onMouseLeave={() => setDijeda(false)}
    >
      {foto.map((item, i) => {
        const posisi = urutan.indexOf(i);
        return (
          <div key={item.src} className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl" style={gayaKartu(i)}>
            <img src={item.src} alt={item.alt} draggable={false} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: posisi * 0.08 }} />
          </div>
        );
      })}
      <button
        type="button"
        aria-label="Foto sebelumnya"
        onClick={fotoSebelumnya}
        className="absolute left-3 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors hover:bg-primary-soft"
      >
        <LuChevronLeft className="h-5 w-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Foto berikutnya"
        onClick={kirimKeBelakang}
        className="absolute right-3 top-1/2 z-50 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white text-primary shadow-lg transition-colors hover:bg-primary-soft"
      >
        <LuChevronRight className="h-5 w-5" aria-hidden="true" />
      </button>
    </div>
  );
}
