import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

// Halaman ini membaca database langsung, jadi dirender per permintaan
// (bukan di-prerender) agar selalu menampilkan data terbaru.
export const instant = false;
export const metadata = {
  title: "Program Akademik — Madrasah Tsanawiyah",
  description: "Detail program akademik Madrasah Tsanawiyah.",
};

async function IsiProgram({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await prisma.programAkademik.findUnique({ where: { slug } });
  if (!program || !program.aktif) notFound();

  const paragraf = program.isi.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <article>
      <Link
        href="/program/akademik"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
      >
        <LuArrowLeft className="h-5 w-5" aria-hidden="true" />
        Semua program
      </Link>

      <h1 className="mt-8 max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {program.judul}
      </h1>
      {program.unggulan && (
        <p className="mt-3">
          <span className="inline-block rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-primary-dark">
            Unggulan
          </span>
        </p>
      )}
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{program.ringkasan}</p>

      {program.gambarUrl && (
        <Image
          src={program.gambarUrl}
          alt={`Sampul ${program.judul}`}
          width={1200}
          height={900}
          priority
          className="mt-8 aspect-[4/3] w-full rounded-3xl object-cover"
        />
      )}

      <div className="mt-8 max-w-3xl space-y-5">
        {paragraf.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-ink sm:text-lg">
            {p}
          </p>
        ))}
      </div>
    </article>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse">
      <div className="h-11 w-44 rounded-full bg-white" />
      <div className="mt-8 h-10 w-3/4 rounded-2xl bg-white" />
      <div className="mt-8 aspect-[4/3] w-full rounded-3xl bg-white" />
    </div>
  );
}

export default function DetailProgramAkademikPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiProgram params={params} />
        </Suspense>
      </div>
    </div>
  );
}
