import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import JudulBagian from "./JudulBagian";

export default async function GaleriTeaser() {
  const semua = await prisma.kegiatan.findMany({
    orderBy: { tanggal: "desc" },
    include: { foto: { orderBy: { urutan: "asc" }, take: 1 } },
    take: 10,
  });

  const daftar = semua
    .filter((k) => k.foto.length > 0 || k.gambarUrl)
    .slice(0, 6)
    .map((k) => ({ id: k.id, judul: k.judul, sampul: k.gambarUrl ?? k.foto[0].url }));

  if (daftar.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Dokumentasi"
          judul="Galeri"
          deskripsi="Momen-momen kegiatan dan keseharian di madrasah kami."
        />
        <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {daftar.map((item) => (
            <figure
              key={item.id}
              className="overflow-hidden rounded-none bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <Image
                src={item.sampul}
                alt={`Foto ${item.judul}`}
                width={600}
                height={450}
                className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
              />
              <figcaption className="px-3 py-2 text-sm font-semibold text-ink">{item.judul}</figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/galeri"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 bg-accent px-7 py-3 text-base font-bold text-white transition-colors hover:bg-accent-soft"
          >
            Lihat Semua Galeri
            →
          </Link>
        </div>
      </div>
    </section>
  );
}
