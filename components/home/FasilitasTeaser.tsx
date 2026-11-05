import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import JudulBagian from "./JudulBagian";

export default async function FasilitasTeaser() {
  const daftar = await prisma.fasilitas.findMany({
    where: { aktif: true },
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
    take: 4,
  });

  if (daftar.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Sarana Madrasah"
          judul="Fasilitas"
          deskripsi="Sarana dan prasarana yang mendukung kenyamanan belajar putra-putri Anda."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {daftar.map((fasilitas) => (
            <article
              key={fasilitas.id}
              className="overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
            >
              {fasilitas.gambarUrl ? (
                <Image
                  src={fasilitas.gambarUrl}
                  alt={`Foto ${fasilitas.nama}`}
                  width={600}
                  height={450}
                  className="aspect-[4/3] w-full object-cover"
                />
              ) : (
                <div
                  className="flex aspect-[4/3] w-full items-center justify-center bg-primary-soft"
                  aria-hidden="true"
                >
                  <span className="px-6 text-center text-base font-bold text-primary">{fasilitas.nama}</span>
                </div>
              )}
              <div className="p-5">
                <h3 className="text-lg font-bold tracking-tight text-ink">{fasilitas.nama}</h3>
                <p className="mt-2 line-clamp-2 text-[15px] leading-relaxed text-muted">
                  {fasilitas.deskripsi}
                </p>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/fasilitas"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent px-7 text-base font-bold text-primary-dark transition-colors hover:bg-accent-soft"
          >
            Lihat Semua Fasilitas
            <LuArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
