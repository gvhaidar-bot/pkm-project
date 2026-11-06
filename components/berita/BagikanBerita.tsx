"use client";

import { useState } from "react";
import { LuCheck, LuFacebook, LuLink2, LuMessageCircle, LuShare2, LuTwitter } from "react-icons/lu";

export default function BagikanBerita({ judul }: { judul: string }) {
  const [disalin, setDisalin] = useState(false);

  function bukaTautan(tautan: string) {
    window.open(tautan, "_blank", "noopener,noreferrer");
  }

  function bagikanWa() {
    bukaTautan(`https://wa.me/?text=${encodeURIComponent(`${judul} ${window.location.href}`)}`);
  }

  function bagikanFb() {
    bukaTautan(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`);
  }

  function bagikanX() {
    bukaTautan(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(judul)}&url=${encodeURIComponent(window.location.href)}`,
    );
  }

  async function salinTautan() {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setDisalin(true);
      setTimeout(() => setDisalin(false), 2000);
    } catch {
      setDisalin(false);
    }
  }

  const tombolCls =
    "flex h-10 w-10 items-center justify-center rounded-full border border-line bg-white text-primary transition-colors hover:border-primary hover:bg-primary hover:text-white";

  return (
    <div className="flex items-center gap-2">
      <span className="mr-1 hidden items-center gap-1.5 text-sm font-bold text-muted sm:inline-flex">
        <LuShare2 className="h-4 w-4" aria-hidden="true" />
        Bagikan:
      </span>
      <button type="button" onClick={bagikanWa} aria-label="Bagikan ke WhatsApp" className={tombolCls}>
        <LuMessageCircle className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={bagikanFb} aria-label="Bagikan ke Facebook" className={tombolCls}>
        <LuFacebook className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={bagikanX} aria-label="Bagikan ke X" className={tombolCls}>
        <LuTwitter className="h-5 w-5" aria-hidden="true" />
      </button>
      <button type="button" onClick={salinTautan} aria-label="Salin tautan" className={tombolCls}>
        {disalin ? (
          <LuCheck className="h-5 w-5" aria-hidden="true" />
        ) : (
          <LuLink2 className="h-5 w-5" aria-hidden="true" />
        )}
      </button>
      {disalin && <span className="text-sm font-bold text-primary">Disalin!</span>}
    </div>
  );
}
