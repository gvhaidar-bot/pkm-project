"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, PointerEvent as ReactPointerEvent } from "react";
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
const DURASI_KELUAR = 500;
const AMBANG = 90;
const BATAS_KLIK = 6;
const KECEPATAN_SENTAK = 650;

type Penempatan = { x: number; y: number; rotate: number; scale: number };
type Sampel = { x: number; y: number; t: number };

const penempatan = (posisi: number): Penempatan => ({
  x: 0,
  y: 0,
  rotate: posisi * 5,
  scale: 1 - posisi * 0.06,
});

const campur = (a: number, b: number, t: number) => a + (b - a) * t;

const campurPenempatan = (a: Penempatan, b: Penempatan, t: number): Penempatan => ({
  x: campur(a.x, b.x, t),
  y: campur(a.y, b.y, t),
  rotate: campur(a.rotate, b.rotate, t),
  scale: campur(a.scale, b.scale, t),
});

export default function HeroStack() {
  const [urutan, setUrutan] = useState<number[]>([0, 1, 2]);
  const [keluar, setKeluar] = useState<number | null>(null);
  const [masuk, setMasuk] = useState<number | null>(null);
  const [seret, setSeret] = useState<{ x: number; y: number } | null>(null);
  const [dijeda, setDijeda] = useState(false);
  const [arahKeluar, setArahKeluar] = useState({ x: 500, y: -150 });

  const urutanRef = useRef(urutan);
  const keluarRef = useRef<number | null>(null);
  const seretRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const seretDataRef = useRef<{
    id: number;
    mulaiX: number;
    mulaiY: number;
    bergerak: boolean;
    sampel: Sampel[];
  } | null>(null);

  useEffect(() => {
    urutanRef.current = urutan;
  }, [urutan]);

  const kirimKeBelakang = useCallback((arah?: { x: number; y: number }) => {
    if (keluarRef.current !== null || seretRef.current) return;
    const atas = urutanRef.current[0];
    if (atas === undefined) return;
    setArahKeluar(arah ?? { x: 500, y: -150 });
    keluarRef.current = atas;
    setKeluar(atas);
    timerRef.current = setTimeout(() => {
      setUrutan((u) => [...u.slice(1), u[0]]);
      keluarRef.current = null;
      setKeluar(null);
      setMasuk(atas);
    }, DURASI_KELUAR);
  }, []);

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

  const mulaiSeret = (event: ReactPointerEvent<HTMLDivElement>, indeks: number) => {
    if (event.button !== 0 || urutanRef.current[0] !== indeks || keluarRef.current !== null) return;
    seretRef.current = true;
    seretDataRef.current = {
      id: event.pointerId,
      mulaiX: event.clientX,
      mulaiY: event.clientY,
      bergerak: false,
      sampel: [{ x: event.clientX, y: event.clientY, t: event.timeStamp }],
    };
    try {
      event.currentTarget.setPointerCapture(event.pointerId);
    } catch {
      seretRef.current = false;
      seretDataRef.current = null;
    }
  };

  const gerakSeret = (event: ReactPointerEvent<HTMLDivElement>) => {
    const data = seretDataRef.current;
    if (!data || event.pointerId !== data.id) return;
    const dx = event.clientX - data.mulaiX;
    const dy = event.clientY - data.mulaiY;
    if (!data.bergerak && Math.hypot(dx, dy) < BATAS_KLIK) return;
    data.bergerak = true;
    data.sampel.push({ x: event.clientX, y: event.clientY, t: event.timeStamp });
    if (data.sampel.length > 12) data.sampel.shift();
    setSeret({ x: dx, y: dy });
  };

  const lepasSeret = (event: ReactPointerEvent<HTMLDivElement>) => {
    const data = seretDataRef.current;
    if (!data || event.pointerId !== data.id) return;
    seretDataRef.current = null;
    seretRef.current = false;
    const dx = event.clientX - data.mulaiX;
    const dy = event.clientY - data.mulaiY;
    const jarak = Math.hypot(dx, dy);
    setSeret(null);
    if (!data.bergerak) {
      kirimKeBelakang();
      return;
    }
    const baru = data.sampel.filter((s) => event.timeStamp - s.t <= 100);
    let vx = 0;
    let vy = 0;
    if (baru.length >= 2) {
      const awal = baru[0];
      const akhir = baru[baru.length - 1];
      const detik = Math.max((akhir.t - awal.t) / 1000, 0.008);
      vx = (akhir.x - awal.x) / detik;
      vy = (akhir.y - awal.y) / detik;
    }
    const cepat = Math.hypot(vx, vy);
    const sentak = cepat > KECEPATAN_SENTAK && jarak > 16 && vx * dx + vy * dy > 0;
    if (jarak > AMBANG || sentak) {
      kirimKeBelakang({ x: dx * 3, y: dy * 3 });
    }
  };

  const gayaKartu = (indeks: number): CSSProperties => {
    const posisi = urutan.indexOf(indeks);
    const atas = posisi === 0;
    let tempat = penempatan(posisi);
    if (seret && atas) {
      tempat = { x: seret.x, y: seret.y, rotate: seret.x * 0.05, scale: 1 };
    } else if (seret && posisi > 0) {
      const jarak = Math.hypot(seret.x, seret.y);
      const angkat = Math.min(jarak / AMBANG, 1) * 0.5;
      tempat = campurPenempatan(penempatan(posisi), penempatan(posisi - 1), angkat);
    }
    const sedangKeluar = keluar === indeks;
    const baruMasuk = masuk === indeks;
    return {
      transform: sedangKeluar
        ? `translate(${arahKeluar.x}px, ${arahKeluar.y}px) rotate(15deg) scale(0.9)`
        : `translate(${tempat.x}px, ${tempat.y}px) rotate(${tempat.rotate}deg) scale(${tempat.scale})`,
      transformOrigin: "90% 90%",
      opacity: sedangKeluar || baruMasuk ? 0 : 1,
      zIndex: sedangKeluar ? 40 : (foto.length - posisi) * 10,
      transition:
        seret || baruMasuk ? "none" : "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1), opacity 0.5s ease",
      pointerEvents: atas ? "auto" : "none",
      touchAction: atas ? "pan-y" : "auto",
      cursor: atas ? "grab" : "default",
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
          <div
            key={item.src}
            className="absolute inset-0 overflow-hidden rounded-[2rem] shadow-2xl"
            style={gayaKartu(i)}
            onPointerDown={(event) => mulaiSeret(event, i)}
            onPointerMove={gerakSeret}
            onPointerUp={lepasSeret}
            onPointerCancel={lepasSeret}
          >
            <img src={item.src} alt={item.alt} draggable={false} className="h-full w-full object-cover" />
            <div className="pointer-events-none absolute inset-0 bg-black" style={{ opacity: posisi * 0.08 }} />
          </div>
        );
      })}
      <div className="absolute bottom-5 left-5 z-50 rounded-2xl bg-white px-5 py-4 text-ink shadow-xl">
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
