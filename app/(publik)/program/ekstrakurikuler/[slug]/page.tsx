import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuArrowRight, LuCheck, LuInfo, LuTag, LuUsers } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { IkonEkstrakurikuler, IKON_EKSTRAKURIKULER } from "@/components/ekstrakurikuler/ikon";
import { parseIsiBerita } from "@/lib/isiBerita";
import TeksBerformat, { CuplikanBerformat, Teks } from "@/components/TeksBerformat";

export const metadata = {
  title: "Ekstrakurikuler",
  description: "Rincian kegiatan ekstrakurikuler MTs Nurul Falah Serpong.",
};

function ButirDaftar({ teks }: { teks: string }) {
  return (
    <li className="flex items-start gap-3 text-sm leading-relaxed text-muted">
      <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
      <span>
        <Teks teks={teks} />
      </span>
    </li>
  );
}

function BagianDaftar({ judul, teks }: { judul: string; teks: string }) {
  const blok = parseIsiBerita(teks);
  if (blok.length === 0) return null;
  return (
    <section aria-label={judul} className="mt-8 border-t border-line/60 pt-6">
      <h3 className="font-serif text-lg font-bold text-primary-dark">{judul}</h3>
      <div className="mt-4 space-y-3">
        {blok.map((b, i) => {
          if (b.jenis === "judul") {
            return (
              <h4 key={i} className="font-serif text-base font-bold text-primary-dark pt-1">
                <Teks teks={b.teks} />
              </h4>
            );
          }
          if (b.jenis === "daftar") {
            return (
              <ul key={i} className="space-y-2.5">
                {b.butir.map((item, j) => (
                  <ButirDaftar key={j} teks={item} />
                ))}
              </ul>
            );
          }
          return (
            <ul key={i} className="space-y-2.5">
              <ButirDaftar teks={b.teks} />
            </ul>
          );
        })}
      </div>
    </section>
  );
}

async function IsiEkstrakurikuler({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const item = await prisma.ekstrakurikuler.findUnique({ where: { slug } });
  if (!item || !item.aktif) notFound();

  const kategori = IKON_EKSTRAKURIKULER[item.ikon]?.label ?? "Ekstrakurikuler";
  const infoPenting = [
    { label: "Jadwal Latihan", nilai: item.jadwal ?? "[Jadwal Kegiatan]" },
    { label: "Lokasi Latihan", nilai: item.lokasi ?? "Lingkungan Madrasah" },
    { label: "Biaya / Iuran", nilai: item.biaya ?? "Termasuk Fasilitas Siswa" },
    { label: "Guru Pembimbing", nilai: item.pembimbing ?? "Pembina Ekstrakurikuler" },
  ];

  return (
    <div>
      <Link
        href="/program/ekstrakurikuler"
        className="group inline-flex min-h-10 items-center gap-2 text-xs font-bold tracking-wider text-primary uppercase transition-colors hover:text-primary-dark"
      >
        <LuArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" aria-hidden="true" />
        <span>Kembali ke Ekstrakurikuler</span>
      </Link>

      {item.gambarUrl && (
        <div className="mt-6 overflow-hidden border border-line bg-primary-dark shadow-xs">
          <Image
            src={item.gambarUrl}
            alt={`Foto kegiatan ${item.nama}`}
            width={1200}
            height={675}
            priority
            className="aspect-video w-full object-cover"
          />
        </div>
      )}

      {/* Header Profile Block */}
      <div className="mt-6 border border-line bg-white p-7 shadow-xs sm:p-10">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center border-2 border-accent bg-accent-soft text-white">
            <IkonEkstrakurikuler ikon={item.ikon} className="h-10 w-10 text-white" />
          </span>
          <div className="min-w-0">
            <span className="text-[11px] font-bold tracking-[0.16em] text-accent uppercase">
              {kategori}
            </span>
            <h1 className="mt-1 font-serif text-2xl font-black text-primary-dark sm:text-4xl">
              {item.nama}
            </h1>
            <CuplikanBerformat
              teks={item.deskripsi}
              className="mt-2 text-sm leading-relaxed text-muted line-clamp-2"
            />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-8 border-t border-line/60 pt-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-primary-soft text-primary">
              <LuUsers className="h-5 w-5 text-accent" aria-hidden="true" />
            </span>
            <div>
              <span className="block text-[11px] font-bold text-muted uppercase">Anggota Aktif</span>
              <span className="block text-sm font-bold text-primary-dark">
                {item.jumlahAnggota !== null ? `${item.jumlahAnggota} Siswa` : "Terbuka untuk Siswa"}
              </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center border border-accent/30 bg-primary-soft text-primary">
              <LuTag className="h-5 w-5 text-accent" aria-hidden="true" />
            </span>
            <div>
              <span className="block text-[11px] font-bold text-muted uppercase">Kategori Minat</span>
              <span className="block text-sm font-bold text-primary-dark">{kategori}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content & Sidebar Grid */}
      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px] lg:items-start">
        {/* Main Details */}
        <div className="border border-line bg-white p-7 shadow-xs sm:p-10">
          <h2 className="font-serif text-2xl font-bold text-primary-dark">Tentang Kegiatan Ini</h2>
          <div className="mt-4">
            <TeksBerformat teks={item.deskripsi} kelasTeks="text-sm leading-relaxed text-muted" />
          </div>

          <BagianDaftar judul="Tujuan Pembinaan" teks={item.tujuan} />
          <BagianDaftar judul="Agenda & Kegiatan Rutin" teks={item.kegiatanRutin} />
          <BagianDaftar judul="Fasilitas & Dukungan Sekolah" teks={item.fasilitas} />
        </div>

        {/* Aside Sidebar */}
        <aside className="space-y-6 lg:sticky lg:top-28">
          {/* CTA Box */}
          <div className="border-l-4 border-accent bg-accent-soft p-6 text-white shadow-sm">
            <span className="text-xs font-bold tracking-[0.16em] text-white/80 uppercase">
              Peluang Bergabung
            </span>
            <h2 className="mt-2 font-serif text-xl font-bold text-white">
              Tertarik Mengikuti Kegiatan Ini?
            </h2>
            <p className="mt-2 text-xs leading-relaxed text-white/90">
              Siswa MTs Nurul Falah didorong aktif mengikuti minimal satu kegiatan ekstrakurikuler untuk membentuk karakter dan pertemanan yang sehat.
            </p>
            <div className="mt-6">
              <Link
                href="/kontak"
                className="group inline-flex min-h-11 w-full items-center justify-center gap-2 border border-white bg-white px-5 py-2.5 text-xs font-bold tracking-wider text-primary-dark uppercase transition-colors hover:bg-cream"
              >
                <span>Tanya Informasi Lebih Lanjut</span>
                <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
              </Link>
            </div>
          </div>

          {/* Important Info Card */}
          <div className="border border-line bg-white p-6 shadow-xs">
            <h2 className="flex items-center gap-2 font-serif text-base font-bold text-primary-dark border-b border-line pb-3">
              <LuInfo className="h-4 w-4 text-accent" aria-hidden="true" />
              Informasi Penting
            </h2>
            <ul className="mt-4 space-y-3.5">
              {infoPenting.map((info) => (
                <li key={info.label} className="text-xs leading-relaxed">
                  <span className="block font-bold text-primary-dark uppercase text-[10px] tracking-wider text-muted">
                    {info.label}
                  </span>
                  <span className="mt-0.5 block text-sm font-medium text-ink">
                    {info.nilai}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="h-6 w-52 bg-line/80" />
      <div className="border border-line bg-white p-8 space-y-4">
        <div className="h-16 w-16 bg-line/60" />
        <div className="h-8 w-64 bg-line/80" />
        <div className="h-16 w-full bg-line/40" />
      </div>
      <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
        <div className="border border-line bg-white p-8 h-96" />
        <div className="border border-line bg-white p-6 h-64" />
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
    <div className="bg-cream py-14">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiEkstrakurikuler params={params} />
        </Suspense>
      </div>
    </div>
  );
}
