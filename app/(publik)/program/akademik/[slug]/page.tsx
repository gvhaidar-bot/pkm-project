import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuClock, LuLayoutGrid, LuStar, LuUsers } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import IsiProgram from "@/components/program/IsiProgram";

export const metadata = {
  title: "Program Akademik",
  description: "Detail program akademik MTs Nurul Falah Serpong.",
};

async function IsiDetail({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const program = await prisma.programAkademik.findUnique({ where: { slug } });
  if (!program || !program.aktif) notFound();

  const info = [
    { ikon: LuLayoutGrid, label: "Tipe Program", nilai: program.judul },
    { ikon: LuClock, label: "Durasi", nilai: "[Durasi]" },
    { ikon: LuUsers, label: "Peserta", nilai: "[Peserta]" },
    { ikon: LuStar, label: "Status", nilai: program.unggulan ? "Program Unggulan" : "Program Aktif" },
  ];

  return (
    <div>
      <Link
        href="/program/akademik"
        className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-dark"
      >
        <LuArrowLeft className="h-5 w-5" aria-hidden="true" />
        Kembali ke Program
      </Link>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <div>
          {program.gambarUrl ? (
            <Image
              src={program.gambarUrl}
              alt={`Foto ${program.judul}`}
              width={1200}
              height={750}
              priority
              className="aspect-[16/10] w-full rounded-none object-cover"
            />
          ) : (
            <div className="flex aspect-[16/10] w-full items-center justify-center rounded-none bg-primary-soft">
              <span className="px-6 text-center font-serif text-xl font-bold break-words text-primary">
                {program.judul}
              </span>
            </div>
          )}

          <div className="mt-6 rounded-none bg-white p-6 shadow-[0_2px_16px_rgba(26,46,40,0.06)] sm:p-8">
            <h1 className="text-2xl font-extrabold tracking-tight break-words text-primary sm:text-3xl">
              {program.judul}
            </h1>
            <p className="mt-3 text-base leading-relaxed text-muted">{program.ringkasan}</p>
            <IsiProgram isi={program.isi} />
          </div>
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-none bg-white p-6 shadow-[0_2px_16px_rgba(26,46,40,0.06)]">
            <ul className="space-y-5">
              {info.map((item) => (
                <li key={item.label} className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                    <item.ikon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-semibold text-muted">{item.label}</span>
                    <span className="mt-0.5 block text-sm font-bold break-words text-ink">{item.nilai}</span>
                  </span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-none bg-accent-soft p-6 text-center">
            <h2 className="text-lg font-extrabold text-white">Tertarik Bergabung?</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              Daftarkan diri Anda sekarang untuk mengikuti program akademik unggulan kami
            </p>
            <Link
              href="/kontak"
              className="mt-5 inline-flex min-h-11 items-center justify-center gap-1.5 bg-white px-6 py-3 text-base font-bold text-accent-soft transition-colors hover:bg-cream"
            >
                            Hubungi Kami →
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse">
      <div className="h-6 w-44 rounded-full bg-white" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div>
          <div className="aspect-[16/10] w-full rounded-none bg-white" />
          <div className="mt-6 h-96 rounded-none bg-white" />
        </div>
        <div className="h-64 rounded-none bg-white" />
      </div>
    </div>
  );
}

export default function DetailProgramAkademikPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiDetail params={params} />
        </Suspense>
      </div>
    </div>
  );
}
