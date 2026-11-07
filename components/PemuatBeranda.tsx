"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

let sudahTampil = false;

export default function PemuatBeranda() {
  const [selesai, setSelesai] = useState(false);
  const [hilang, setHilang] = useState(sudahTampil);

  useEffect(() => {
    if (sudahTampil) return;
    sudahTampil = true;

    let timerMaks: ReturnType<typeof setTimeout> | undefined;
    let timerTunda: ReturnType<typeof setTimeout> | undefined;
    const mulai = Date.now();
    const sembunyikan = () => {
      const berlalu = Date.now() - mulai;
      const sisa = Math.max(0, 500 - berlalu);
      timerTunda = setTimeout(() => setSelesai(true), sisa);
    };
    if (document.readyState === "complete") {
      sembunyikan();
    } else {
      window.addEventListener("load", sembunyikan, { once: true });
      timerMaks = setTimeout(sembunyikan, 3000);
    }
    return () => {
      window.removeEventListener("load", sembunyikan);
      clearTimeout(timerMaks);
      clearTimeout(timerTunda);
    };
  }, []);

  useEffect(() => {
    if (!selesai) return;
    const timer = setTimeout(() => setHilang(true), 600);
    return () => clearTimeout(timer);
  }, [selesai]);

  if (hilang) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center gap-5 bg-primary-dark transition-opacity duration-500 ${
        selesai ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <Image src="/logo.svg" alt="" width={72} height={72} className="h-18 w-18" priority />
      <p className="text-lg font-extrabold tracking-tight text-cream">MTs Nurul Falah Serpong</p>
      <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-accent" />
    </div>
  );
}
