"use client";

import { useState } from "react";
import Image from "next/image";
import {
  LuAward,
  LuBookOpen,
  LuBriefcase,
  LuCircleCheck,
  LuGraduationCap,
  LuSparkles,
  LuUsers,
} from "react-icons/lu";
import TeksBerformat from "@/components/TeksBerformat";

export type ItemGuru = {
  id: number;
  nama: string;
  jabatan: string;
  fotoUrl: string | null;
  bio: string | null;
  urutan: number;
  aktif: boolean;
};

interface DaftarGuruStrukturProps {
  daftar: ItemGuru[];
}

function tentukanKategori(jabatan: string): "pimpinan" | "wakil" | "guru" | "staf" {
  const j = (jabatan || "").toLowerCase().trim();

  // Pimpinan tertinggi: Kepala Madrasah, Kepala Sekolah, Kamad, Pimpinan, Direktur
  if (
    j.includes("kepala madrasah") ||
    j.includes("kepala sekolah") ||
    j.includes("kamad") ||
    j.includes("pimpinan madrasah") ||
    j.includes("pimpinan sekolah") ||
    j.includes("direktur") ||
    (j.startsWith("kepala") &&
      !j.includes("tata usaha") &&
      !j.includes("tu") &&
      !j.includes("lab") &&
      !j.includes("perpus") &&
      !j.includes("bidang"))
  ) {
    return "pimpinan";
  }

  // Wakil Kepala / Pimpinan Bidang
  if (
    j.includes("wakil") ||
    j.includes("waka") ||
    j.includes("koordinator") ||
    j.includes("kepala tata usaha") ||
    j.includes("ka. tu") ||
    j.includes("ka tu") ||
    j.includes("kepala lab") ||
    j.includes("kepala perpus") ||
    j.includes("ketua bidang") ||
    j.includes("bendahara") ||
    j.includes("sekretaris")
  ) {
    return "wakil";
  }

  // Staf Tenaga Kependidikan / Administrasi
  if (
    j.includes("tata usaha") ||
    j.includes("tu") ||
    j.includes("staf") ||
    j.includes("staff") ||
    j.includes("administrasi") ||
    j.includes("operator") ||
    j.includes("pustakawan") ||
    j.includes("laboran") ||
    j.includes("kebersihan") ||
    j.includes("keamanan") ||
    j.includes("satpam") ||
    j.includes("security")
  ) {
    return "staf";
  }

  // Default: Dewan Guru Mata Pelajaran
  return "guru";
}

export default function DaftarGuruStruktur({ daftar }: DaftarGuruStrukturProps) {
  const [tabAktif, setTabAktif] = useState<"semua" | "pimpinan" | "guru" | "staf">("semua");

  const pimpinanList = daftar.filter((g) => tentukanKategori(g.jabatan) === "pimpinan");
  const wakilList = daftar.filter((g) => tentukanKategori(g.jabatan) === "wakil");
  const guruList = daftar.filter((g) => tentukanKategori(g.jabatan) === "guru");
  const stafList = daftar.filter((g) => tentukanKategori(g.jabatan) === "staf");

  // Komponen Kartu Pimpinan Utama (Kepala Madrasah)
  const renderKartuPimpinan = (guru: ItemGuru) => (
    <article
      key={guru.id}
      className="group relative mx-auto w-full max-w-4xl border-2 border-accent/60 bg-white shadow-[0_20px_50px_rgba(11,79,58,0.12)] transition-all duration-300 hover:border-accent hover:shadow-[0_28px_64px_rgba(11,79,58,0.18)]"
    >
      <div className="h-1.5 w-full bg-gradient-to-r from-accent via-accent-hover to-accent" />

      <div className="grid grid-cols-1 gap-8 p-7 sm:p-10 md:grid-cols-[280px_1fr] md:items-center">
        {/* Foto Pimpinan */}
        <div className="relative mx-auto w-full max-w-[280px]">
          <div className="relative overflow-hidden border-2 border-accent bg-primary-dark p-1 shadow-md">
            {guru.fotoUrl ? (
              <Image
                src={guru.fotoUrl}
                alt={`Foto resmi ${guru.nama}`}
                width={500}
                height={500}
                priority
                className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div
                className="flex aspect-square w-full items-center justify-center bg-primary"
                aria-hidden="true"
              >
                <span className="font-serif text-7xl font-black text-accent">
                  {guru.nama.charAt(0).toUpperCase()}
                </span>
              </div>
            )}
            <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" />
          </div>

          <div className="mt-3 flex items-center justify-center gap-1.5 text-[11px] font-bold tracking-wider text-accent uppercase">
            <LuCircleCheck className="h-3.5 w-3.5 text-accent" />
            <span>Pimpinan Resmi Madrasah</span>
          </div>
        </div>

        {/* Informasi & Sambutan Pimpinan */}
        <div className="flex flex-col text-center md:text-left">
          <div className="inline-flex self-center md:self-start items-center gap-2 border border-accent/60 bg-accent/15 px-3.5 py-1 text-xs font-bold tracking-[0.16em] text-primary-dark uppercase shadow-2xs">
            <LuAward className="h-3.5 w-3.5 text-accent" />
            <span>{guru.jabatan}</span>
          </div>

          <h3 className="mt-4 font-serif text-2xl font-black tracking-tight text-primary-dark sm:text-3xl lg:text-4xl">
            {guru.nama}
          </h3>

          <p className="mt-1 text-xs font-bold tracking-[0.14em] text-muted uppercase">
            MTs Nurul Falah Gunungsindur · Kabupaten Bogor
          </p>

          {guru.bio ? (
            <div className="mt-5 border-l-4 border-accent bg-primary-soft/40 p-4 sm:p-5 text-left shadow-2xs">
              <span className="mb-1 block text-[10px] font-bold tracking-widest text-accent uppercase">
                Amanat &amp; Bimbingan Pendidik
              </span>
              <TeksBerformat teks={guru.bio} kelasTeks="font-serif text-sm sm:text-base italic leading-relaxed text-primary-dark" />
            </div>
          ) : (
            <div className="mt-5 border-l-4 border-accent bg-primary-soft/40 p-4 sm:p-5 text-left shadow-2xs">
              <p className="font-serif text-sm sm:text-base italic leading-relaxed text-primary-dark">
                “Memimpin dengan keteladanan akhlak dan keikhlasan, membimbing putra-putri madrasah menjadi insan berilmu, bertakwa, dan siap menyongsong masa depan.”
              </p>
            </div>
          )}
        </div>
      </div>
    </article>
  );

  // Komponen Kartu Standar (Wakil, Guru, Staf)
  const renderKartuStandar = (guru: ItemGuru, kategori: "wakil" | "guru" | "staf") => (
    <article
      key={guru.id}
      className={`group flex flex-col justify-between border bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_16px_40px_rgba(11,79,58,0.12)] ${
        kategori === "wakil"
          ? "border-line border-t-4 border-t-accent hover:border-accent"
          : "border-line hover:border-accent"
      }`}
    >
      <div>
        <div className="relative overflow-hidden bg-primary-dark">
          {guru.fotoUrl ? (
            <Image
              src={guru.fotoUrl}
              alt={`Foto ${guru.nama}`}
              width={400}
              height={400}
              className="aspect-square w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div
              className="flex aspect-square w-full items-center justify-center bg-primary"
              aria-hidden="true"
            >
              <span className="font-serif text-6xl font-black text-accent/80">
                {guru.nama.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" />

          {kategori === "wakil" && (
            <span className="absolute top-3 left-3 bg-accent px-2.5 py-0.5 text-[10px] font-bold text-primary-dark uppercase shadow-xs">
              Wakil Pimpinan
            </span>
          )}
        </div>

        <div className="p-6">
          <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase block">
            {guru.jabatan}
          </span>
          <h3 className="mt-2 font-serif text-lg font-bold tracking-tight text-primary-dark transition-colors group-hover:text-primary">
            {guru.nama}
          </h3>

          {guru.bio && (
            <div className="mt-3 border-t border-line/60 pt-3">
              <TeksBerformat teks={guru.bio} kelasTeks="text-xs leading-relaxed text-muted line-clamp-4" />
            </div>
          )}
        </div>
      </div>

      <div className="px-6 pb-6 pt-0">
        <span className="block border-t border-line/40 pt-3 text-[10px] font-bold tracking-wider text-muted uppercase">
          MTs Nurul Falah
        </span>
      </div>
    </article>
  );

  return (
    <div className="space-y-16">
      {/* Structural Statistics & Filters */}
      <div className="border border-line bg-white p-6 shadow-xs sm:p-8">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 border border-accent/40 bg-primary-soft px-3 py-1 text-xs font-bold tracking-[0.16em] text-primary uppercase">
              <LuGraduationCap className="h-3.5 w-3.5 text-accent" />
              <span>Struktur Organisasi Pendidik</span>
            </div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-primary-dark sm:text-3xl">
              Dewan Guru &amp; Tenaga Kependidikan
            </h2>
            <p className="mt-1 text-xs text-muted sm:text-sm">
              Total {daftar.length} tenaga pendidik dan kependidikan terdaftar di MTs Nurul Falah Gunungsindur.
            </p>
          </div>

          {/* Interactive Filter Tabs */}
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setTabAktif("semua")}
              className={`h-10 px-4 text-xs font-bold tracking-wider uppercase transition-all ${
                tabAktif === "semua"
                  ? "bg-primary text-white shadow-xs"
                  : "border border-line bg-cream text-ink hover:border-accent hover:text-primary"
              }`}
            >
              Semua ({daftar.length})
            </button>

            {pimpinanList.length > 0 && (
              <button
                type="button"
                onClick={() => setTabAktif("pimpinan")}
                className={`h-10 px-4 text-xs font-bold tracking-wider uppercase transition-all ${
                  tabAktif === "pimpinan"
                    ? "bg-accent text-primary-dark shadow-xs"
                    : "border border-line bg-cream text-ink hover:border-accent hover:text-primary"
                }`}
              >
                Pimpinan ({pimpinanList.length})
              </button>
            )}

            <button
              type="button"
              onClick={() => setTabAktif("guru")}
              className={`h-10 px-4 text-xs font-bold tracking-wider uppercase transition-all ${
                tabAktif === "guru"
                  ? "bg-primary text-white shadow-xs"
                  : "border border-line bg-cream text-ink hover:border-accent hover:text-primary"
              }`}
            >
              Dewan Guru ({guruList.length + wakilList.length})
            </button>

            {stafList.length > 0 && (
              <button
                type="button"
                onClick={() => setTabAktif("staf")}
                className={`h-10 px-4 text-xs font-bold tracking-wider uppercase transition-all ${
                  tabAktif === "staf"
                    ? "bg-primary text-white shadow-xs"
                    : "border border-line bg-cream text-ink hover:border-accent hover:text-primary"
                }`}
              >
                Tata Usaha ({stafList.length})
              </button>
            )}
          </div>
        </div>
      </div>

      {/* VIEW: SEMUA (STRUKTUR ORGANISASI KELUARGA BESAR MADRASAH) */}
      {tabAktif === "semua" && (
        <div className="space-y-16">
          {/* BAGIAN 1: PIMPINAN MADRASAH (KEPALA MADRASAH / KEPALA SEKOLAH) */}
          <section aria-label="Pimpinan Madrasah" className="relative">
            <div className="mb-8 text-center">
              <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                Kepemimpinan Madrasah
              </span>
              <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">
                Kepala Madrasah
              </h2>
              <div className="mx-auto mt-3 flex items-center justify-center gap-2" aria-hidden="true">
                <span className="h-0.5 w-10 bg-accent" />
                <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                <span className="h-0.5 w-10 bg-accent" />
              </div>
            </div>

            {pimpinanList.length > 0 ? (
              <div className="space-y-8">
                {pimpinanList.map((g) => renderKartuPimpinan(g))}
              </div>
            ) : (
              <div className="mx-auto max-w-2xl border-2 border-dashed border-accent/40 bg-white p-8 text-center shadow-xs">
                <LuAward className="mx-auto h-12 w-12 text-accent" />
                <h3 className="mt-3 font-serif text-lg font-bold text-primary-dark">
                  Pimpinan Madrasah
                </h3>
                <p className="mx-auto mt-2 max-w-md text-xs leading-relaxed text-muted">
                  Tetapkan data guru dengan jabatan <strong className="text-primary-dark">&quot;Kepala Madrasah&quot;</strong> atau <strong className="text-primary-dark">&quot;Kepala Sekolah&quot;</strong> melalui panel admin untuk menampilkannya di bagian pimpinan ini.
                </p>
              </div>
            )}

            {/* Visual Tree Connector Line down to Wakil / Guru */}
            <div className="mt-10 flex flex-col items-center" aria-hidden="true">
              <span className="h-10 w-0.5 bg-accent/60" />
              <span className="h-2 w-2 rotate-45 bg-accent" />
            </div>
          </section>

          {/* BAGIAN 2: WAKIL KEPALA MADRASAH & PIMPINAN BIDANG (JIKA ADA) */}
          {wakilList.length > 0 && (
            <section aria-label="Wakil Kepala Madrasah" className="relative">
              <div className="mb-8 text-center">
                <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                  Pimpinan Bidang
                </span>
                <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">
                  Wakil Kepala &amp; Koordinator
                </h2>
                <div className="mx-auto mt-3 flex items-center justify-center gap-2" aria-hidden="true">
                  <span className="h-0.5 w-10 bg-accent" />
                  <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
                  <span className="h-0.5 w-10 bg-accent" />
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
                {wakilList.map((g) => renderKartuStandar(g, "wakil"))}
              </div>

              {/* Visual Tree Connector Line down to Guru */}
              <div className="mt-10 flex flex-col items-center" aria-hidden="true">
                <span className="h-10 w-0.5 bg-accent/60" />
                <span className="h-2 w-2 rotate-45 bg-accent" />
              </div>
            </section>
          )}

          {/* BAGIAN 3: DEWAN GURU & PENDIDIK MATA PELAJARAN */}
          <section aria-label="Dewan Pendidik dan Guru">
            <div className="border-b-2 border-primary-dark pb-4 mb-8">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <div>
                  <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                    Tenaga Pendidik
                  </span>
                  <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">
                    Dewan Guru &amp; Pengajar Mata Pelajaran
                  </h2>
                  <p className="mt-1 text-xs text-muted sm:text-sm">
                    Membimbing pembelajaran formal, ilmu agama, dan pembinaan karakter di kelas.
                  </p>
                </div>
                <span className="border border-line bg-white px-3 py-1 text-xs font-bold text-primary-dark">
                  {guruList.length} Guru Pengajar
                </span>
              </div>
            </div>

            {guruList.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {guruList.map((g) => renderKartuStandar(g, "guru"))}
              </div>
            ) : (
              <div className="border border-line bg-white p-8 text-center text-xs text-muted">
                Belum ada data guru pengajar yang terdaftar.
              </div>
            )}
          </section>

          {/* BAGIAN 4: TENAGA KEPENDIDIKAN & TATA USAHA (JIKA ADA) */}
          {stafList.length > 0 && (
            <section aria-label="Tenaga Kependidikan">
              <div className="border-b-2 border-primary-dark pb-4 mb-8">
                <div className="flex flex-wrap items-end justify-between gap-3">
                  <div>
                    <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
                      Tenaga Kependidikan
                    </span>
                    <h2 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-3xl">
                      Staf Administrasi &amp; Tata Usaha
                    </h2>
                    <p className="mt-1 text-xs text-muted sm:text-sm">
                      Mendukung ketertiban administrasi, kearsipan, dan fasilitas operasional madrasah.
                    </p>
                  </div>
                  <span className="border border-line bg-white px-3 py-1 text-xs font-bold text-primary-dark">
                    {stafList.length} Staf
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {stafList.map((g) => renderKartuStandar(g, "staf"))}
              </div>
            </section>
          )}
        </div>
      )}

      {/* VIEW: TAB PIMPINAN */}
      {tabAktif === "pimpinan" && (
        <section aria-label="Daftar Pimpinan">
          <div className="mb-8 border-b-2 border-primary-dark pb-4">
            <span className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
              Struktur Kepemimpinan
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-primary-dark sm:text-3xl">
              Pimpinan Utama Madrasah ({pimpinanList.length})
            </h2>
          </div>
          <div className="space-y-8">
            {pimpinanList.map((g) => renderKartuPimpinan(g))}
          </div>
        </section>
      )}

      {/* VIEW: TAB GURU */}
      {tabAktif === "guru" && (
        <section aria-label="Daftar Dewan Guru">
          <div className="mb-8 border-b-2 border-primary-dark pb-4">
            <span className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
              Tenaga Pendidik
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-primary-dark sm:text-3xl">
              Dewan Guru &amp; Wakil Kepala ({guruList.length + wakilList.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {wakilList.map((g) => renderKartuStandar(g, "wakil"))}
            {guruList.map((g) => renderKartuStandar(g, "guru"))}
          </div>
        </section>
      )}

      {/* VIEW: TAB STAF TATA USAHA */}
      {tabAktif === "staf" && (
        <section aria-label="Daftar Tenaga Kependidikan">
          <div className="mb-8 border-b-2 border-primary-dark pb-4">
            <span className="text-xs font-bold tracking-[0.16em] text-accent uppercase">
              Tenaga Kependidikan
            </span>
            <h2 className="mt-1 font-serif text-2xl font-bold text-primary-dark sm:text-3xl">
              Staf Administrasi &amp; Tata Usaha ({stafList.length})
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stafList.map((g) => renderKartuStandar(g, "staf"))}
          </div>
        </section>
      )}
    </div>
  );
}

