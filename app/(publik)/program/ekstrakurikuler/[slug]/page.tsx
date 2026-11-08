import { Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LuArrowLeft, LuCheck, LuInfo, LuPencil, LuTag, LuUsers } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import { IkonEkstrakurikuler, IKON_EKSTRAKURIKULER } from "@/components/ekstrakurikuler/ikon";
import { parseIsiBerita } from "@/lib/isiBerita";
import TeksBerformat, { CuplikanBerformat, Teks } from "@/components/TeksBerformat";

export const metadata = {
  title: "Ekstrakurikuler",
  description: "Detail kegiatan ekstrakurikuler MTs Nurul Falah Serpong.",
};

function ButirDaftar({ teks }: { teks: string }) {
  return (
    <li className="flex items-start gap-2.5 text-base leading-relaxed text-ink">
      <LuCheck className="mt-1 h-5 w-5 shrink-0 text-[#F97316]" aria-hidden="true" />
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
    <section aria-label={judul} className="mt-8">
      <h3 className="text-xl font-bold break-words text-ink">{judul}</h3>
      <div className="mt-4 space-y-4">
        {blok.map((b, i) => {
          if (b.jenis === "judul") {
            return (
              <h4 key={i} className="text-lg font-bold break-words text-ink">
                <Teks teks={b.teks} />
              </h4>
            );
          }
          if (b.jenis === "daftar") {
            return (
              <ul key={i} className="space-y-3">
                {b.butir.map((item, j) => (
                  <ButirDaftar key={j} teks={item} />
                ))}
              </ul>
            );
          }
          return (
            <ul key={i} className="space-y-3">
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
    { label: "Jadwal", nilai: "[Jadwal]" },
    { label: "Lokasi", nilai: "[Lokasi]" },
    { label: "Biaya", nilai: "[Biaya]" },
    { label: "Pembimbing", nilai: "[Pembimbing]" },
  ];

  return (
    <div>
      <Link
        href="/program/ekstrakurikuler"
        className="inline-flex min-h-11 items-center gap-2 text-base font-semibold text-primary transition-colors hover:text-primary-dark"
      >
        <LuArrowLeft className="h-5 w-5" aria-hidden="true" />
        Kembali ke Ekstrakurikuler
      </Link>

      {item.gambarUrl && (
        <Image
          src={item.gambarUrl}
          alt={`Foto ${item.nama}`}
          width={1200}
          height={675}
          priority
          className="mt-6 aspect-video w-full rounded-3xl object-cover"
        />
      )}

      <div className="mt-6 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
        <div className="flex items-start gap-5">
          <span className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-[#F97316]">
            <IkonEkstrakurikuler ikon={item.ikon} className="h-10 w-10 text-white" />
          </span>
          <div className="min-w-0">
            <h1 className="text-3xl font-extrabold tracking-tight break-words text-primary">{item.nama}</h1>
            <CuplikanBerformat
              teks={item.deskripsi}
              className="mt-1 line-clamp-2 text-sm leading-relaxed text-muted"
            />
          </div>
        </div>
        <div className="mt-6 flex flex-wrap gap-8 border-t border-line pt-5">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <LuUsers className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-muted">Anggota</span>
              <span className="mt-0.5 block text-base font-bold text-ink">
                {item.jumlahAnggota !== null ? item.jumlahAnggota : "[Jumlah Anggota]"}
              </span>
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-soft text-primary">
              <LuTag className="h-5 w-5" aria-hidden="true" />
            </span>
            <span>
              <span className="block text-xs font-semibold text-muted">Kategori</span>
              <span className="mt-0.5 block text-base font-bold break-words text-ink">{kategori}</span>
            </span>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px] lg:items-start">
        <div className="rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
          <h2 className="text-2xl font-extrabold tracking-tight break-words text-ink">Tentang Kegiatan Ini</h2>
          <div className="mt-4">
            <TeksBerformat teks={item.deskripsi} kelasTeks="text-base leading-relaxed text-muted" />
          </div>
          <BagianDaftar judul="Tujuan Kegiatan" teks={item.tujuan} />
          <BagianDaftar judul="Kegiatan Rutin" teks={item.kegiatanRutin} />
          <BagianDaftar judul="Fasilitas & Dukungan" teks={item.fasilitas} />
        </div>

        <aside className="lg:sticky lg:top-24">
          <div className="rounded-2xl bg-[#F97316] p-6 text-center">
            <h2 className="text-xl font-extrabold text-white">Bergabunglah!</h2>
            <p className="mt-2 text-sm leading-relaxed text-white/90">
              Jadilah bagian dari keluarga besar {item.nama}
            </p>
            <Link
              href="/kontak"
              className="mt-5 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-6 text-base font-bold text-[#EA580C] transition-colors hover:bg-cream"
            >
              <LuPencil className="h-4 w-4" aria-hidden="true" />
              Daftar Sekarang
            </Link>
          </div>

          <div className="mt-6 rounded-2xl bg-white p-6 shadow-[0_2px_16px_rgba(26,46,40,0.06)]">
            <h2 className="flex items-center gap-2 text-lg font-bold text-primary">
              <LuInfo className="h-5 w-5" aria-hidden="true" />
              Informasi Penting
            </h2>
            <ul className="mt-4 space-y-3">
              {infoPenting.map((info) => (
                <li key={info.label} className="text-sm leading-relaxed">
                  <span className="font-bold text-ink">{info.label}: </span>
                  <span className="text-muted">{info.nilai}</span>
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
    <div className="animate-pulse">
      <div className="h-6 w-52 rounded-full bg-white" />
      <div className="mt-6 aspect-video w-full rounded-3xl bg-white" />
      <div className="mt-6 h-40 rounded-3xl bg-white" />
      <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="h-96 rounded-3xl bg-white" />
        <div className="h-64 rounded-2xl bg-white" />
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
