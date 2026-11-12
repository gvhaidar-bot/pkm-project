"use client";

import { useState } from "react";
import { LuCheck, LuCopy, LuPrinter, LuShare2 } from "react-icons/lu";
import { FaWhatsapp } from "react-icons/fa6";

interface BagikanBeritaProps {
  judul: string;
}

export default function BagikanBerita({ judul }: BagikanBeritaProps) {
  const [tersalin, setTersalin] = useState(false);

  const salinTautan = async () => {
    if (typeof window === "undefined") return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      setTersalin(true);
      setTimeout(() => setTersalin(false), 2500);
    } catch {
      // fallback
    }
  };

  const bagikanWa = () => {
    if (typeof window === "undefined") return;
    const url = encodeURIComponent(window.location.href);
    const teks = encodeURIComponent(`${judul} - Baca selengkapnya di MTs Nurul Falah Serpong:\n`);
    window.open(`https://api.whatsapp.com/send?text=${teks}${url}`, "_blank", "noopener,noreferrer");
  };

  const cetakHalaman = () => {
    if (typeof window === "undefined") return;
    window.print();
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-bold tracking-wider text-muted uppercase flex items-center gap-1.5 mr-1">
        <LuShare2 className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
        <span>Bagikan:</span>
      </span>

      <button
        type="button"
        onClick={bagikanWa}
        className="inline-flex items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:border-[#25D366] hover:bg-[#25D366]/10 hover:text-[#25D366]"
        aria-label="Bagikan warta ini ke WhatsApp"
      >
        <FaWhatsapp className="h-3.5 w-3.5 text-[#25D366]" aria-hidden="true" />
        <span>WhatsApp</span>
      </button>

      <button
        type="button"
        onClick={salinTautan}
        className="inline-flex items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:border-accent hover:bg-primary-soft hover:text-primary"
        aria-label="Salin tautan warta ini"
      >
        {tersalin ? (
          <>
            <LuCheck className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span className="text-accent">Tersalin!</span>
          </>
        ) : (
          <>
            <LuCopy className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
            <span>Salin Tautan</span>
          </>
        )}
      </button>

      <button
        type="button"
        onClick={cetakHalaman}
        className="hidden sm:inline-flex items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-xs font-bold text-ink transition-colors hover:border-primary hover:bg-primary-soft hover:text-primary"
        aria-label="Cetak lembar warta ini"
      >
        <LuPrinter className="h-3.5 w-3.5 text-muted" aria-hidden="true" />
        <span>Cetak</span>
      </button>
    </div>
  );
}

