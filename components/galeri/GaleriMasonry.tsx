"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  LuCalendar,
  LuChevronLeft,
  LuChevronRight,
  LuFolder,
  LuImage,
  LuMapPin,
  LuMaximize2,
  LuSearch,
  LuSparkles,
  LuX,
  LuExternalLink,
} from "react-icons/lu";

export interface ItemFotoGaleri {
  id: string;
  url: string;
  caption: string | null;
  kegiatanId: number;
  kegiatanJudul: string;
  kegiatanDeskripsi?: string;
  tanggalLabel: string;
  lokasi: string | null;
}

export interface ItemAlbumKegiatan {
  id: number;
  judul: string;
  deskripsi: string;
  tanggalLabel: string;
  lokasi: string | null;
  jumlahFoto: number;
}

interface GaleriMasonryProps {
  daftarFoto: ItemFotoGaleri[];
  daftarAlbum: ItemAlbumKegiatan[];
}

export default function GaleriMasonry({ daftarFoto, daftarAlbum }: GaleriMasonryProps) {
  const [albumAktif, setAlbumAktif] = useState<number | "semua">("semua");
  const [kataKunci, setKataKunci] = useState("");
  const [fotoTerpilihIndex, setFotoTerpilihIndex] = useState<number | null>(null);

  // Filter foto berdasarkan album kegiatan & pencarian kata kunci
  const fotoTersaring = useMemo(() => {
    return daftarFoto.filter((f) => {
      const cocokAlbum = albumAktif === "semua" || f.kegiatanId === albumAktif;
      if (!cocokAlbum) return false;

      if (!kataKunci.trim()) return true;
      const k = kataKunci.toLowerCase();
      const dalamJudul = f.kegiatanJudul.toLowerCase().includes(k);
      const dalamCaption = f.caption ? f.caption.toLowerCase().includes(k) : false;
      const dalamLokasi = f.lokasi ? f.lokasi.toLowerCase().includes(k) : false;
      return dalamJudul || dalamCaption || dalamLokasi;
    });
  }, [daftarFoto, albumAktif, kataKunci]);

  // Info album yang sedang aktif
  const infoAlbumAktif = useMemo(() => {
    if (albumAktif === "semua") return null;
    return daftarAlbum.find((a) => a.id === albumAktif) || null;
  }, [daftarAlbum, albumAktif]);

  // Navigasi Lightbox (Sebelumnya / Selanjutnya)
  const navigasiSebelumnya = useCallback(() => {
    setFotoTerpilihIndex((prev) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : fotoTersaring.length - 1;
    });
  }, [fotoTersaring.length]);

  const navigasiSelanjutnya = useCallback(() => {
    setFotoTerpilihIndex((prev) => {
      if (prev === null) return null;
      return prev < fotoTersaring.length - 1 ? prev + 1 : 0;
    });
  }, [fotoTersaring.length]);

  // Keyboard navigation & body lock scroll untuk Lightbox
  useEffect(() => {
    if (fotoTerpilihIndex === null) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setFotoTerpilihIndex(null);
      if (e.key === "ArrowLeft") navigasiSebelumnya();
      if (e.key === "ArrowRight") navigasiSelanjutnya();
    };

    window.addEventListener("keydown", handleKeyDown);
    const scrollAsal = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = scrollAsal;
    };
  }, [fotoTerpilihIndex, navigasiSebelumnya, navigasiSelanjutnya]);

  const fotoSedangDilihat =
    fotoTerpilihIndex !== null && fotoTersaring[fotoTerpilihIndex]
      ? fotoTersaring[fotoTerpilihIndex]
      : null;

  if (daftarFoto.length === 0) {
    return (
      <div className="border border-line bg-white p-12 text-center shadow-xs">
        <LuImage className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <h3 className="mt-4 font-serif text-xl font-bold text-primary-dark">
          Dokumentasi Galeri Sedang Disiapkan
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted">
          Foto-foto kegiatan madrasah sedang dikurasi dan akan segera ditampilkan di halaman ini.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* FILTER & STATS BAR (UNSPLASH COLLECTIONS STYLE) */}
      <div className="border border-line bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 border border-accent/40 bg-primary-soft px-3 py-1 text-xs font-bold tracking-[0.16em] text-primary uppercase">
              <LuFolder className="h-3.5 w-3.5 text-accent" />
              <span>Arsip Lensa Madrasah</span>
            </div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-primary-dark sm:text-3xl">
              Dokumentasi Foto Kegiatan
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Menampilkan {fotoTersaring.length} dari {daftarFoto.length} potret momen berharga MTs Nurul Falah.
            </p>
          </div>

          {/* Kotak Pencarian Foto */}
          <div className="relative w-full md:w-72">
            <input
              type="text"
              value={kataKunci}
              onChange={(e) => setKataKunci(e.target.value)}
              placeholder="Cari dokumentasi..."
              aria-label="Cari dokumentasi foto"
              className="w-full border border-line bg-cream py-2.5 pr-9 pl-3.5 text-xs font-medium text-ink transition-colors placeholder:text-muted focus:border-accent focus:bg-white focus:outline-none"
            />
            {kataKunci ? (
              <button
                type="button"
                onClick={() => setKataKunci("")}
                aria-label="Bersihkan pencarian"
                className="absolute top-1/2 right-2.5 -translate-y-1/2 text-muted hover:text-ink"
              >
                <LuX className="h-4 w-4" />
              </button>
            ) : (
              <LuSearch className="pointer-events-none absolute top-1/2 right-2.5 h-4 w-4 -translate-y-1/2 text-muted" />
            )}
          </div>
        </div>

        {/* Tab Album Kegiatan (Scrollable Horizontal Chips) */}
        <div className="mt-6 border-t border-line/60 pt-5">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
            <button
              type="button"
              onClick={() => setAlbumAktif("semua")}
              className={`shrink-0 px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                albumAktif === "semua"
                  ? "bg-primary text-white shadow-xs border border-primary"
                  : "border border-line bg-cream text-ink hover:border-accent hover:text-primary"
              }`}
            >
              Semua Koleksi ({daftarFoto.length})
            </button>

            {daftarAlbum.map((album) => (
              <button
                key={album.id}
                type="button"
                onClick={() => setAlbumAktif(album.id)}
                className={`shrink-0 px-4 py-2 text-xs font-bold tracking-wider uppercase transition-all duration-200 ${
                  albumAktif === album.id
                    ? "bg-accent text-primary-dark shadow-xs border border-accent font-black"
                    : "border border-line bg-cream text-ink hover:border-accent hover:text-primary"
                }`}
              >
                {album.judul} ({album.jumlahFoto})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* DETAIL ALBUM TERPILIH (JIKA SEDANG MEMILIH SATU KEGIATAN) */}
      {infoAlbumAktif && (
        <div className="border-l-4 border-accent bg-white p-6 shadow-xs sm:p-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between">
            <div>
              <span className="text-[11px] font-bold tracking-[0.16em] text-accent uppercase">
                Album Terpilih
              </span>
              <h3 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">
                {infoAlbumAktif.judul}
              </h3>
            </div>
            <div className="flex flex-wrap items-center gap-4 text-xs font-semibold text-muted">
              <span className="flex items-center gap-1.5">
                <LuCalendar className="h-3.5 w-3.5 text-accent" />
                <span>{infoAlbumAktif.tanggalLabel}</span>
              </span>
              {infoAlbumAktif.lokasi && (
                <span className="flex items-center gap-1.5">
                  <LuMapPin className="h-3.5 w-3.5 text-accent" />
                  <span>{infoAlbumAktif.lokasi}</span>
                </span>
              )}
            </div>
          </div>
          {infoAlbumAktif.deskripsi && (
            <p className="mt-3 text-xs leading-relaxed text-muted sm:text-sm">
              {infoAlbumAktif.deskripsi}
            </p>
          )}
        </div>
      )}

      {/* UNSPLASH-STYLE MASONRY GRID */}
      {fotoTersaring.length > 0 ? (
        <div className="columns-1 gap-5 sm:columns-2 lg:columns-3 [column-fill:_balance]">
          {fotoTersaring.map((foto, index) => (
            <figure
              key={foto.id}
              onClick={() => setFotoTerpilihIndex(index)}
              className="group relative mb-5 break-inside-avoid overflow-hidden border border-line bg-primary-dark shadow-xs transition-all duration-300 hover:border-accent hover:shadow-[0_20px_45px_rgba(11,79,58,0.18)] cursor-pointer"
            >
              {/* Natural Proportion Image (No Forced Crop) */}
              <Image
                src={foto.url}
                alt={foto.caption || `Dokumentasi ${foto.kegiatanJudul}`}
                width={1200}
                height={900}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="block h-auto w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                unoptimized={!foto.url.startsWith("/") && !foto.url.includes("unsplash.com")}
              />

              {/* Unsplash Dark Gradient Hover Overlay */}
              <div
                className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-black/30 opacity-0 transition-opacity duration-300 group-hover:opacity-100 flex flex-col justify-between p-4"
                aria-hidden="true"
              >
                {/* Overlay Top Bar: Tag & Zoom Icon */}
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex max-w-[80%] items-center gap-1.5 truncate border border-white/20 bg-black/60 px-2.5 py-1 text-[10px] font-bold tracking-wider text-white uppercase backdrop-blur-xs">
                    <LuFolder className="h-3 w-3 shrink-0 text-accent" />
                    <span className="truncate">{foto.kegiatanJudul}</span>
                  </span>

                  <span className="flex h-7 w-7 shrink-0 items-center justify-center border border-white/20 bg-black/60 text-white transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-primary-dark">
                    <LuMaximize2 className="h-3.5 w-3.5" />
                  </span>
                </div>

                {/* Overlay Bottom Bar: Caption, Date, Location */}
                <div className="text-left">
                  {foto.caption ? (
                    <p className="font-serif text-sm font-bold leading-snug text-white line-clamp-2">
                      {foto.caption}
                    </p>
                  ) : (
                    <p className="font-serif text-sm font-bold leading-snug text-white line-clamp-2">
                      {foto.kegiatanJudul}
                    </p>
                  )}

                  <div className="mt-2 flex flex-wrap items-center gap-3 text-[11px] font-medium text-white/80">
                    <span className="flex items-center gap-1">
                      <LuCalendar className="h-3 w-3 text-accent" />
                      <span>{foto.tanggalLabel}</span>
                    </span>
                    {foto.lokasi && (
                      <span className="flex items-center gap-1">
                        <LuMapPin className="h-3 w-3 text-accent" />
                        <span>{foto.lokasi}</span>
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </figure>
          ))}
        </div>
      ) : (
        <div className="border border-line bg-white p-12 text-center shadow-xs">
          <LuSearch className="mx-auto h-10 w-10 text-muted" />
          <h3 className="mt-3 font-serif text-lg font-bold text-primary-dark">
            Tidak Ada Foto Ditemukan
          </h3>
          <p className="mx-auto mt-1 max-w-sm text-xs text-muted">
            Tidak ada foto yang cocok dengan kata kunci &quot;{kataKunci}&quot;. Coba gunakan kata kunci lain atau pilih album &quot;Semua Koleksi&quot;.
          </p>
          <button
            type="button"
            onClick={() => {
              setKataKunci("");
              setAlbumAktif("semua");
            }}
            className="mt-4 border border-primary bg-primary px-4 py-2 text-xs font-bold tracking-wider text-white uppercase hover:bg-primary-dark"
          >
            Reset Filter
          </button>
        </div>
      )}

      {/* FULLSCREEN LIGHTBOX MODAL VIEWER */}
      {fotoSedangDilihat && fotoTerpilihIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau Foto Galeri"
          className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 p-4 backdrop-blur-md sm:p-6 animate-fadeIn"
        >
          {/* Lightbox Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3 text-white">
            <div className="flex items-center gap-3">
              <span className="border border-accent/60 bg-accent/20 px-2.5 py-0.5 text-[10px] font-bold tracking-wider text-accent uppercase">
                {fotoSedangDilihat.kegiatanJudul}
              </span>
              <span className="text-xs text-white/60">
                Foto {fotoTerpilihIndex + 1} dari {fotoTersaring.length}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={fotoSedangDilihat.url}
                target="_blank"
                rel="noopener noreferrer"
                title="Buka Berkas Asli di Tab Baru"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-accent hover:bg-white/10 hover:text-white"
              >
                <LuExternalLink className="h-4 w-4" />
              </a>

              <button
                type="button"
                onClick={() => setFotoTerpilihIndex(null)}
                aria-label="Tutup Pratinjau Foto"
                className="flex h-9 w-9 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-accent hover:bg-accent hover:text-primary-dark"
              >
                <LuX className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Lightbox Center Image Stage with Floating Arrows */}
          <div className="relative flex flex-1 items-center justify-center py-4">
            {/* Previous Button */}
            {fotoTersaring.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigasiSebelumnya();
                }}
                aria-label="Foto Sebelumnya"
                className="absolute left-2 sm:left-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/60 text-white backdrop-blur-xs transition-all hover:border-accent hover:bg-accent hover:text-primary-dark"
              >
                <LuChevronLeft className="h-6 w-6" />
              </button>
            )}

            {/* Main Stage Image */}
            <div className="relative max-h-[72vh] max-w-full overflow-hidden">
              <Image
                src={fotoSedangDilihat.url}
                alt={fotoSedangDilihat.caption || fotoSedangDilihat.kegiatanJudul}
                width={1600}
                height={1200}
                priority
                className="max-h-[72vh] w-auto max-w-full object-contain shadow-2xl"
                unoptimized={!fotoSedangDilihat.url.startsWith("/") && !fotoSedangDilihat.url.includes("unsplash.com")}
              />
            </div>

            {/* Next Button */}
            {fotoTersaring.length > 1 && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  navigasiSelanjutnya();
                }}
                aria-label="Foto Selanjutnya"
                className="absolute right-2 sm:right-4 z-10 flex h-12 w-12 items-center justify-center border border-white/20 bg-black/60 text-white backdrop-blur-xs transition-all hover:border-accent hover:bg-accent hover:text-primary-dark"
              >
                <LuChevronRight className="h-6 w-6" />
              </button>
            )}
          </div>

          {/* Lightbox Footer Bar */}
          <div className="border-t border-white/10 pt-3 text-white">
            <div className="mx-auto flex max-w-3xl flex-col items-center justify-between gap-2 text-center sm:flex-row sm:text-left">
              <div>
                <p className="font-serif text-sm font-bold text-white sm:text-base">
                  {fotoSedangDilihat.caption || fotoSedangDilihat.kegiatanJudul}
                </p>
                <div className="mt-1 flex flex-wrap items-center justify-center gap-3 text-xs text-white/70 sm:justify-start">
                  <span className="flex items-center gap-1">
                    <LuCalendar className="h-3 w-3 text-accent" />
                    <span>{fotoSedangDilihat.tanggalLabel}</span>
                  </span>
                  {fotoSedangDilihat.lokasi && (
                    <span className="flex items-center gap-1">
                      <LuMapPin className="h-3 w-3 text-accent" />
                      <span>{fotoSedangDilihat.lokasi}</span>
                    </span>
                  )}
                </div>
              </div>

              <span className="text-[11px] font-bold tracking-wider text-accent uppercase">
                MTs Nurul Falah Gunungsindur
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

