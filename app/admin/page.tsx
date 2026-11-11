import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  LuArrowRight,
  LuBookOpen,
  LuBuilding2,
  LuImage,
  LuMedal,
  LuNewspaper,
  LuTrophy,
  LuUsers,
} from "react-icons/lu";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Dasbor Admin",
  description:
    "Ringkasan dan pengelolaan konten website MTs Nurul Falah Serpong.",
};

type KartuData = {
  label: string;
  jumlah: number;
  href: string;
  ikon: IconType;
};

function salam(): string {
  const jam = new Date().getHours();
  if (jam < 11) return "Selamat pagi";
  if (jam < 15) return "Selamat siang";
  if (jam < 18) return "Selamat sore";
  return "Selamat malam";
}

function tanggalHariIni(): string {
  return new Intl.DateTimeFormat("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date());
}

function inisial(nama: string): string {
  const bagian = nama.trim().split(/\s+/).filter(Boolean);
  const depan = bagian[0]?.[0] ?? "";
  const belakang = bagian.length > 1 ? bagian[bagian.length - 1][0] : "";
  return (depan + belakang).toUpperCase() || "A";
}

async function Sapaan() {
  await connection();
  const session = await auth();
  const nama = session?.user?.name ?? "Admin";
  return (
    <div className="flex items-start gap-4 sm:items-center">
      <div
        className="grid h-12 w-12 flex-none place-items-center rounded-full bg-primary-soft text-base font-black text-primary sm:h-14 sm:w-14 sm:text-lg"
        aria-hidden="true"
      >
        {inisial(nama)}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-primary">
          Dasbor Admin
        </p>
        <h1 className="mt-1 font-serif text-2xl font-black leading-tight break-words text-primary sm:text-3xl">
          {salam()}, {nama}
        </h1>
        <p className="mt-1 text-sm text-secondary">{tanggalHariIni()}</p>
      </div>
    </div>
  );
}

function KartuStat({ item }: { item: KartuData }) {
  const kosong = item.jumlah === 0;
  const Ikon = item.ikon;
  return (
    <Link
      href={item.href}
      className="group flex h-full flex-col bg-surface p-5 shadow-[0_4px_24px_rgba(11,79,58,0.08)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(11,79,58,0.14)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
    >
      <span
        className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"
        aria-hidden="true"
      >
        <Ikon className="h-5 w-5" />
      </span>
      <div className="mt-5">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-secondary">
          {item.label}
        </p>
        <p
          className={
            "mt-1 font-serif text-4xl font-black tabular-nums leading-none " +
            (kosong ? "text-secondary/50" : "text-primary")
          }
        >
          {item.jumlah}
        </p>
        <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
          {kosong ? "Belum ada data" : "Kelola"}
          {!kosong && (
            <LuArrowRight
              className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          )}
        </p>
      </div>
    </Link>
  );
}

function BagianStatistik({
  judul,
  items,
  kolom,
}: {
  judul: string;
  items: KartuData[];
  kolom: string;
}) {
  return (
    <section>
      <h2 className="font-serif text-xl font-black text-primary">{judul}</h2>
      <span className="mt-2 block h-[2px] w-10 bg-accent" aria-hidden="true" />
      <div className={`mt-4 grid grid-cols-2 gap-4 ${kolom}`}>
        {items.map((item) => (
          <KartuStat key={item.label} item={item} />
        ))}
      </div>
    </section>
  );
}

async function DaftarStatistik() {
  const [
    berita,
    fasilitas,
    guru,
    prestasi,
    galeri,
    programAkademik,
    ekstrakurikuler,
  ] = await Promise.all([
    prisma.berita.count(),
    prisma.fasilitas.count(),
    prisma.guru.count(),
    prisma.prestasi.count(),
    prisma.galeri.count(),
    prisma.programAkademik.count(),
    prisma.ekstrakurikuler.count(),
  ]);

  const konten: KartuData[] = [
    { label: "Berita", jumlah: berita, href: "/admin/berita", ikon: LuNewspaper },
    { label: "Fasilitas", jumlah: fasilitas, href: "/admin/fasilitas", ikon: LuBuilding2 },
    { label: "Prestasi", jumlah: prestasi, href: "/admin/prestasi", ikon: LuTrophy },
    { label: "Galeri", jumlah: galeri, href: "/admin/galeri", ikon: LuImage },
  ];

  const akademik: KartuData[] = [
    { label: "Guru", jumlah: guru, href: "/admin/guru", ikon: LuUsers },
    { label: "Program Akademik", jumlah: programAkademik, href: "/admin/program-akademik", ikon: LuBookOpen },
    { label: "Ekstrakurikuler", jumlah: ekstrakurikuler, href: "/admin/ekstrakurikuler", ikon: LuMedal },
  ];

  return (
    <div className="space-y-10">
      <BagianStatistik judul="Konten Website" items={konten} kolom="lg:grid-cols-4" />
      <BagianStatistik judul="Data Akademik" items={akademik} kolom="lg:grid-cols-3" />
    </div>
  );
}

function KerangkaSapaan() {
  return (
    <div className="flex items-start gap-4 sm:items-center">
      <div className="h-12 w-12 flex-none animate-pulse rounded-full bg-primary-soft/60 sm:h-14 sm:w-14" />
      <div className="flex-1 animate-pulse space-y-2 pt-1">
        <div className="h-3 w-24 bg-primary-soft/60" />
        <div className="h-7 w-48 max-w-full bg-primary-soft/60" />
        <div className="h-3 w-40 bg-primary-soft/60" />
      </div>
    </div>
  );
}

function KerangkaKartu() {
  return (
    <div className="bg-surface p-5 shadow-[0_4px_24px_rgba(11,79,58,0.08)]">
      <div className="h-10 w-10 animate-pulse rounded-full bg-primary-soft/60" />
      <div className="mt-5 space-y-2">
        <div className="h-3 w-16 animate-pulse bg-primary-soft/60" />
        <div className="h-9 w-12 animate-pulse bg-primary-soft/60" />
        <div className="h-3 w-20 animate-pulse bg-primary-soft/60" />
      </div>
    </div>
  );
}

function KerangkaBagian({
  judul,
  kolom,
  jumlah,
}: {
  judul: string;
  kolom: string;
  jumlah: number;
}) {
  return (
    <section>
      <h2 className="font-serif text-xl font-black text-primary">{judul}</h2>
      <span className="mt-2 block h-[2px] w-10 bg-accent" aria-hidden="true" />
      <div className={`mt-4 grid grid-cols-2 gap-4 ${kolom}`}>
        {Array.from({ length: jumlah }).map((_, i) => (
          <KerangkaKartu key={i} />
        ))}
      </div>
    </section>
  );
}

function KerangkaStatistik() {
  return (
    <div className="space-y-10">
      <KerangkaBagian judul="Konten Website" kolom="lg:grid-cols-4" jumlah={4} />
      <KerangkaBagian judul="Data Akademik" kolom="lg:grid-cols-3" jumlah={3} />
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <Suspense fallback={<KerangkaSapaan />}>
        <Sapaan />
      </Suspense>

      <div className="mt-10">
        <Suspense fallback={<KerangkaStatistik />}>
          <DaftarStatistik />
        </Suspense>
      </div>
    </div>
  );
}