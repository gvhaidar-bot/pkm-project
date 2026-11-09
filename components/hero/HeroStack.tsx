"use client";

import { useEffect, useState } from "react";
import HeroActions from "./HeroActions";

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

const DURASI_TAMPIL = 6000;

export default function HeroStack() {
  const [aktif, setAktif] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setAktif((prev) => (prev + 1) % foto.length);
    }, DURASI_TAMPIL);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative flex min-h-[640px] w-full flex-col justify-between overflow-hidden bg-primary-dark select-none sm:min-h-[700px] lg:min-h-[780px] xl:min-h-[820px]">
      {/* Background Slideshow Photos */}
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
            className="h-full w-full object-cover object-center"
          />
        </div>
      ))}

      {/* Multi-layered High-Contrast Gradient Overlays */}
      <div
        className="absolute inset-0 bg-gradient-to-r from-primary-dark/95 via-primary-dark/85 to-primary-dark/50 sm:from-primary-dark/95 sm:via-primary-dark/75 sm:to-black/30"
        aria-hidden="true"
      />
      {/* Top vignette to ensure transparent navbar items are always crystal clear */}
      <div
        className="absolute inset-0 bg-gradient-to-b from-primary-dark/85 via-transparent to-primary-dark/70"
        aria-hidden="true"
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-primary-dark/95 via-transparent to-transparent"
        aria-hidden="true"
      />

      {/* Hero Content Overlay (Text & Actions) */}
      <div className="relative z-10 my-auto mx-auto w-full max-w-300 px-5 pt-28 pb-20 sm:pt-32 sm:pb-24 lg:pt-36 lg:px-6">
        <div className="max-w-3xl text-left">
          {/* Accreditation Tag */}
          <div className="inline-flex items-center gap-2 border border-accent/60 bg-primary-dark/80 px-3.5 py-1.5 text-xs font-bold tracking-[0.16em] text-accent uppercase backdrop-blur-xs">
            <span className="h-1.5 w-1.5 bg-accent" aria-hidden="true" />
            <span>Madrasah Tsanawiyah Terakreditasi B · Serpong</span>
          </div>

          {/* Main Headline H1 */}
          <h1 className="mt-5 font-serif text-3xl font-black leading-[1.14] tracking-tight text-white drop-shadow-sm sm:text-5xl lg:text-6xl">
            Mendidik Generasi Berilmu, Berakhlak, dan Siap Menghadapi Masa Depan
          </h1>

          {/* Gold Decorative Accent Divider */}
          <div className="mt-5 flex items-center gap-2" aria-hidden="true">
            <span className="h-0.5 w-16 bg-accent" />
            <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
            <span className="h-0.5 w-8 bg-accent" />
          </div>

          {/* Subtitle Description */}
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-white/90 sm:text-lg">
            Kenali profil MTs Nurul Falah Serpong, program unggulan, fasilitas, dan prestasi kami.
            Pilihan madrasah terpercaya untuk buah hati Anda di Tangerang Selatan.
          </p>

          {/* Action Buttons */}
          <HeroActions />
        </div>
      </div>

      {/* Bottom Bar: Slide Caption & Passive Slide Indicator Lines */}
      <div className="relative z-10 w-full border-t border-white/15 bg-primary-dark/75 py-3.5 backdrop-blur-xs">
        <div className="mx-auto flex w-full max-w-300 items-center justify-between px-5 lg:px-6">
          {/* Active Caption */}
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 bg-accent inline-block shrink-0" aria-hidden="true" />
            <span className="font-serif text-xs font-semibold tracking-wide text-white/90 sm:text-sm">
              {foto[aktif].caption}
            </span>
          </div>

          {/* Passive Slide Dots (No buttons, auto-progress indicator) */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            {foto.map((_, i) => (
              <span
                key={i}
                className={`h-1 transition-all duration-700 ${
                  i === aktif ? "w-7 bg-accent" : "w-2.5 bg-white/35"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
