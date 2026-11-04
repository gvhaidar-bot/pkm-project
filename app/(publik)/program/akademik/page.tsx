import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

export const metadata = {
  title: "Akademik — Madrasah Tsanawiyah",
  description: "Program akademik Madrasah Tsanawiyah: kurikulum dan pembelajaran.",
};

async function DaftarProgram() {
  const daftar = await prisma.programAkademik.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { judul: "asc" }],
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <p className="text-lg font-bold text-ink">Belum ada program akademik</p>
        <p className="mt-2 text-base text-muted">
          Program akademik sedang disiapkan oleh pihak madrasah.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {daftar.map((program) => (
        <article
          key={program.id}
          className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
        >
          <div className="relative">
            {program.gambarUrl ? (
              <Image
                src={program.gambarUrl}
                alt={`Sampul ${program.judul}`}
                width={600}
                height={450}
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <div
                className="flex aspect-[4/3] w-full items-center justify-center bg-primary-soft"
                aria-hidden="true"
              >
                <span className="px-6 text-center text-base font-bold text-primary">
                  {program.judul}
                </span>
              </div>
            )}
            {program.unggulan && (
              <span className="absolute top-4 left-4 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-primary-dark shadow">
                Unggulan
              </span>
            )}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <h2 className="text-xl font-extrabold tracking-tight text-primary">{program.judul}</h2>
            <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{program.ringkasan}</p>
            <Link
              href={`/program/akademik/${program.slug}`}
              className="mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full bg-primary px-6 text-base font-bold text-white transition-colors hover:bg-primary-dark"
            >
              Selengkapnya
              <LuArrowRight className="h-5 w-5" aria-hidden="true" />
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function Kerangka() {
  return (
    <div className="mt-10 grid animate-pulse grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <div key={i} className="h-96 rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]" />
      ))}
    </div>
  );
}

export default function AkademikPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Program Kami</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Program Akademik</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Berbagai program pendidikan yang dirancang untuk mengembangkan potensi siswa secara
          maksimal.
        </p>

        <Suspense fallback={<Kerangka />}>
          <DaftarProgram />
        </Suspense>
      </div>
    </div>
  );
}
