import { Suspense } from "react";
import Image from "next/image";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Staff & Guru",
  description: "Staff dan guru MTs Nurul Falah Serpong.",
};

async function DaftarGuru() {
  const daftar = await prisma.guru.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Data guru belum tersedia</p>
        <p className="mt-2 text-base text-muted">Daftar guru sedang disiapkan oleh pihak madrasah.</p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {daftar.map((guru) => (
        <article
          key={guru.id}
          className="overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
        >
          {guru.fotoUrl ? (
            <Image
              src={guru.fotoUrl}
              alt={`Foto ${guru.nama}, ${guru.jabatan}`}
              width={400}
              height={400}
              className="aspect-square w-full object-cover"
            />
          ) : (
            <div
              className="flex aspect-square w-full items-center justify-center bg-primary-soft"
              aria-hidden="true"
            >
              <span className="text-6xl font-extrabold text-primary">
                {guru.nama.charAt(0).toUpperCase()}
              </span>
            </div>
          )}
          <div className="p-5">
            <h2 className="text-lg font-bold tracking-tight text-ink">{guru.nama}</h2>
            <p className="mt-1 text-sm font-bold tracking-wide text-primary uppercase">{guru.jabatan}</p>
            {guru.bio && <p className="mt-3 text-[15px] leading-relaxed text-muted">{guru.bio}</p>}
          </div>
        </article>
      ))}
    </div>
  );
}

function KerangkaGuru() {
  return (
    <div className="mt-10 grid animate-pulse grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="h-80 rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]" />
      ))}
    </div>
  );
}

export default function GuruPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Tentang Kami</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Staff & Guru</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Para pendidik dan tenaga kependidikan yang membersamai putra-putri Anda setiap hari di
          madrasah.
        </p>

        <Suspense fallback={<KerangkaGuru />}>
          <DaftarGuru />
        </Suspense>
      </div>
    </div>
  );
}
