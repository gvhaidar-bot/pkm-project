import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuClock, LuLayoutGrid, LuStar, LuUsers } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import IsiProgram from "@/components/program/IsiProgram";

export const metadata = {
  title: "Program Akademik",
  description: "Rincian dan silabus program akademik MTs Nurul Falah Serpong.",
};

async function IsiDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await prisma.programAkademik.findUnique({ where: { slug } });
  if (!program || !program.aktif) notFound();

  const info = [
    { ikon: LuLayoutGrid, label: "Tipe Program", nilai: program.judul },
    { ikon: LuClock, label: "Durasi Waktu", nilai: "[Durasi Belajar]" },
    { ikon: LuUsers, label: "Sasaran Peserta", nilai: "Siswa Kelas VII, VIII, IX" },
    { ikon: LuStar, label: "Status Program", nilai: program.unggulan ? "Program Prioritas Unggulan" : "Program Kurikuler Aktif" },
  ];

  return (
    <div>
      <Link
        href="/program/akademik"
        className="group inline-flex min-h-10 items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase transition-colors hover:text-primary-dark"
      >
        <LuArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        <span>Kembali ke Daftar Akademik</span>
      </Link>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
        {/* Main Column */}
        <div className="border border-line bg-white shadow-xs">
          {program.gambarUrl ? (
            <div className="relative overflow-hidden bg-primary-dark">
              <Image
                src={program.gambarUrl}
                alt={`Foto ${program.judul}`}
                width={1200}
                height={750}
                priority
                className="aspect-[16/10] w-full object-cover"
              />
              <div className="absolute inset-x-0 bottom-0 h-1 bg-accent" aria-hidden="true" />
            </div>
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center border-b border-accent bg-primary">
              <span className="px-6 text-center font-serif text-2xl font-bold text-white">
                {program.judul}
              </span>
            </div>
          )}

          <div className="p-7 sm:p-10">
            {program.unggulan && (
              <span className="inline-block border border-accent/40 bg-accent/15 px-3 py-1 text-xs font-bold text-primary-dark uppercase">
                Program Unggulan
              </span>
            )}
            <h1 className="mt-3 font-serif text-2xl font-black tracking-tight text-primary-dark sm:text-4xl">
              {program.judul}
            </h1>
            <p className="mt-4 text-base font-medium leading-relaxed text-muted border-b border-line pb-6">
              {program.ringkasan}
            </p>

            <div className="mt-6">
              <IsiProgram isi={program.isi} />
            </div>
          </div>
        </div>

        {/* Sidebar Sticky */}
        <aside className="space-y-6 lg:sticky lg:top-28">
          {/* Quick Facts Card */}
          <div className="border border-line bg-white p-6 shadow-xs">
            <h2 className="font-serif text-base font-bold text-primary-dark border-b border-line pb-3">
              Informasi Singkat Program
            </h2>
            <ul className="mt-5 space-y-4">
              {info.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="flex h-9 w-9 shrink-0 items-center justify-center border border-accent/30 bg-primary-soft text-primary">
                    <item.ikon className="h-4 w-4 text-accent" aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <span className="block text-[11px] font-bold text-muted uppercase">{item.label}</span>
                    <span className="mt-0.5 block text-sm font-bold text-primary-dark break-words">
                      {item.nilai}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Consultation CTA Card */}
          <div className="border-l-4 border-accent bg-accent-soft p-6 text-white shadow-sm">
            <span className="text-xs font-bold tracking-[0.16em] text-white/80 uppercase">
              Konsultasi Orang Tua
            </span>
            <h2 className="mt-2 font-serif text-xl font-bold leading-snug text-white">
              Ingin Mengetahui Rincian Pembelajaran Ini?
            </h2>
            <p className="mt-2.5 text-xs leading-relaxed text-white/90">
              Tim guru dan kurikulum kami siap berdiskusi mengenai kesiapan dan kesesuaian program untuk buah hati Anda.
            </p>
            <div className="mt-6">
              <Link
                href="/kontak"
                className="group inline-flex min-h-11 w-full items-center justify-center gap-2 border border-white bg-white px-5 py-2.5 text-xs font-bold tracking-wider text-primary-dark uppercase transition-colors hover:bg-cream"
              >
                <span>Hubungi Pihak Sekolah</span>
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 w-48 bg-line/80" />
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="border border-line bg-white p-8 space-y-6">
          <div className="aspect-[16/10] bg-line/60" />
          <div className="h-8 w-3/4 bg-line/80" />
          <div className="h-20 w-full bg-line/40" />
        </div>
        <div className="border border-line bg-white p-6 space-y-4">
          <div className="h-6 w-32 bg-line/60" />
          <div className="h-40 w-full bg-line/40" />
        </div>
      </div>
    </div>
  );
}

export default function DetailAkademikPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="bg-cream py-14">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiDetail params={params} />
        </Suspense>
      </div>
    </div>
  );
}
