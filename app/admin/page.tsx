import { Suspense } from "react";
import { connection } from "next/server";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Dasbor Admin",
  description: "Ringkasan dan pengelolaan konten website MTs Nurul Falah Serpong.",
};

async function Sapaan() {
  await connection();
  const session = await auth();
  return (
    <div>
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Dasbor Admin</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
        Halo, {session?.user?.name ?? "Admin"}
      </h1>
      <p className="mt-2 text-base leading-relaxed text-muted">
        Kelola seluruh konten website sekolah dari panel ini.
      </p>
    </div>
  );
}

async function KartuStatistik() {
  const [berita, fasilitas, guru, prestasi, kegiatan, programAkademik, ekstrakurikuler] =
    await Promise.all([
      prisma.berita.count(),
      prisma.fasilitas.count(),
      prisma.guru.count(),
      prisma.prestasi.count(),
      prisma.kegiatan.count(),
      prisma.programAkademik.count(),
      prisma.ekstrakurikuler.count(),
    ]);

  const data = [
    { label: "Berita", jumlah: berita, href: "/admin/berita" },
    { label: "Fasilitas", jumlah: fasilitas, href: "/admin/fasilitas" },
    { label: "Guru", jumlah: guru, href: "/admin/guru" },
    { label: "Prestasi", jumlah: prestasi, href: "/admin/prestasi" },
    { label: "Kegiatan", jumlah: kegiatan, href: "/admin/kegiatan" },
    { label: "Program Akademik", jumlah: programAkademik, href: "/admin/program-akademik" },
    { label: "Ekstrakurikuler", jumlah: ekstrakurikuler, href: "/admin/ekstrakurikuler" },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {data.map((item) => (
        <Link
          key={item.label}
          href={item.href}
          className="group rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
        >
          <p className="text-sm font-semibold text-muted">{item.label}</p>
          <p className="mt-1 text-4xl font-extrabold tracking-tight text-primary-dark">{item.jumlah}</p>
          <p className="mt-3 inline-flex items-center gap-1.5 text-sm font-bold text-primary">
            Kelola
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </p>
        </Link>
      ))}
    </div>
  );
}

function KerangkaStatistik() {
  return (
    <div className="grid animate-pulse grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="h-40 rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]" />
      ))}
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <Suspense
        fallback={
          <div className="animate-pulse">
            <div className="h-4 w-28 rounded-full bg-primary-soft" />
            <div className="mt-3 h-9 w-64 rounded-2xl bg-primary-soft" />
          </div>
        }
      >
        <Sapaan />
      </Suspense>

      <h2 className="mt-10 text-xl font-bold tracking-tight text-ink">Ringkasan Konten</h2>
      <div className="mt-4">
        <Suspense fallback={<KerangkaStatistik />}>
          <KartuStatistik />
        </Suspense>
      </div>
    </div>
  );
}
