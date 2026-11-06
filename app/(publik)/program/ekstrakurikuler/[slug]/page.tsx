import { Suspense } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuCircleCheck } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { IkonEkstrakurikuler } from "@/components/ekstrakurikuler/ikon";

// Halaman ini membaca database langsung, jadi dirender per permintaan
// (bukan di-prerender) agar selalu menampilkan data terbaru.
export const instant = false;
export const metadata = {
  title: "Ekstrakurikuler — Madrasah Tsanawiyah",
  description: "Detail kegiatan ekstrakurikuler Madrasah Tsanawiyah.",
};

function daftarPoin(teks: string): string[] {
  return teks
    .split("\n")
    .map((baris) => baris.trim().replace(/^[-•*]\s*/, ""))
    .filter(Boolean);
}

function BagianDaftar({ judul, teks }: { judul: string; teks: string }) {
  const poin = daftarPoin(teks);
  if (poin.length === 0) return null;
  return (
    <section aria-label={judul} className="mt-10">
      <h2 className="text-2xl font-extrabold tracking-tight text-ink">{judul}</h2>
      <ul className="mt-4 space-y-3">
        {poin.map((item, i) => (
          <li key={i} className="flex items-start gap-3 text-base leading-relaxed text-ink">
            <LuCircleCheck
              className="mt-1 h-5 w-5 shrink-0 text-primary"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

async function IsiEkstrakurikuler({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await prisma.ekstrakurikuler.findUnique({ where: { slug } });
  if (!item || !item.aktif) notFound();

  return (
    <article>
      <Link
        href="/program/ekstrakurikuler"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
      >
        <LuArrowLeft className="h-5 w-5" aria-hidden="true" />
        Semua ekstrakurikuler
      </Link>

      <div className="mt-8 flex items-center gap-5">
        <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-accent">
          <IkonEkstrakurikuler ikon={item.ikon} className="h-10 w-10 text-white" />
        </span>
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">{item.nama}</h1>
          {item.jumlahAnggota !== null && (
            <p className="mt-2 inline-block rounded-full bg-primary-soft px-4 py-1 text-sm font-bold text-primary">
              {item.jumlahAnggota} Anggota
            </p>
          )}
        </div>
      </div>

      <section aria-label="Tentang kegiatan ini" className="mt-10">
        <h2 className="text-2xl font-extrabold tracking-tight text-ink">Tentang Kegiatan Ini</h2>
        <p className="mt-4 max-w-3xl text-base leading-relaxed text-ink sm:text-lg">
          {item.deskripsi}
        </p>
      </section>

      <BagianDaftar judul="Tujuan Kegiatan" teks={item.tujuan} />
      <BagianDaftar judul="Kegiatan Rutin" teks={item.kegiatanRutin} />
      <BagianDaftar judul="Fasilitas & Dukungan" teks={item.fasilitas} />
    </article>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse">
      <div className="h-11 w-52 rounded-full bg-white" />
      <div className="mt-8 h-10 w-2/3 rounded-2xl bg-white" />
      <div className="mt-6 space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-5 rounded-full bg-white" />
        ))}
      </div>
    </div>
  );
}

export default function DetailEkstrakurikulerPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiEkstrakurikuler params={params} />
        </Suspense>
      </div>
    </div>
  );
}
