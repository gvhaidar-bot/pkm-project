"use client";

import { useEffect, useState } from "react";
import { LuArrowUp } from "react-icons/lu";

export default function TombolKeAtas() {
  const [tampil, setTampil] = useState(false);

  useEffect(() => {
    const cek = () => setTampil(window.scrollY > 400);
    cek();
    window.addEventListener("scroll", cek, { passive: true });
    return () => window.removeEventListener("scroll", cek);
  }, []);

  if (!tampil) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Kembali ke atas"
      className="fixed right-6 bottom-6 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-white/50 bg-accent text-white shadow-xl transition-all duration-200 hover:-translate-y-1 hover:bg-accent-soft hover:shadow-2xl"
    >
      <LuArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
