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
      className="fixed right-5 bottom-5 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-accent text-primary-dark shadow-lg transition-colors hover:bg-accent-soft"
    >
      <LuArrowUp className="h-6 w-6" aria-hidden="true" />
    </button>
  );
}
