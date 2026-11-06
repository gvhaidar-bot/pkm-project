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
  title: "Berita — Madrasah Tsanawiyah",
  description: "Baca berita Madrasah Tsanawiyah.",
};

function formatTanggal(t: Date | null) {
  if (!t) return "";
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(t);
}

async function IsiBerita({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const berita = await prisma.berita.findUnique({
    where: { slug },
    include: {
      author: true,
      foto: { orderBy: { urutan: "asc" } },
    },
  });
  if (!berita || !berita.published) notFound();

  const paragraf = berita.isi.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);

  return (
    <article>
      <Link
        href="/berita"
        className="inline-flex min-h-11 items-center gap-2 rounded-full border border-line bg-white px-5 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
      >
        <LuArrowLeft className="h-5 w-5" aria-hidden="true" />
        Semua berita
      </Link>

      <p className="mt-8 text-sm font-semibold text-muted">
        {formatTanggal(berita.publishedAt)}
        {berita.author ? ` · oleh ${berita.author.nama}` : ""}
      </p>
      <h1 className="mt-2 max-w-3xl text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
        {berita.judul}
      </h1>
      <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{berita.ringkasan}</p>

      {berita.gambarUrl && (
        <Image
          src={berita.gambarUrl}
          alt={`Sampul ${berita.judul}`}
          width={1200}
          height={675}
          priority
          className="mt-8 aspect-video w-full rounded-3xl object-cover"
        />
      )}

      <div className="mt-8 max-w-3xl space-y-5">
        {paragraf.map((p, i) => (
          <p key={i} className="text-base leading-relaxed text-ink sm:text-lg">
            {p}
          </p>
        ))}
      </div>

      {berita.foto.length > 0 && (
        <div className="mt-10">
          <h2 className="text-xl font-bold tracking-tight text-ink">Galeri Foto</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {berita.foto.map((foto) => (
              <Image
                key={foto.id}
                src={foto.url}
                alt={foto.caption || `Foto galeri ${berita.judul}`}
                width={400}
                height={267}
                className="aspect-[3/2] w-full rounded-2xl object-cover"
              />
            ))}
          </div>
        </div>
      )}
    </article>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse">
      <div className="h-11 w-40 rounded-full bg-white" />
      <div className="mt-8 h-4 w-48 rounded-full bg-white" />
      <div className="mt-3 h-10 w-3/4 rounded-2xl bg-white" />
      <div className="mt-8 aspect-video w-full rounded-3xl bg-white" />
    </div>
  );
}

export default function DetailBeritaPage({ params }: { params: Promise<{ slug: string }> }) {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <Suspense fallback={<Kerangka />}>
          <IsiBerita params={params} />
        </Suspense>
      </div>
    </div>
  );
}
