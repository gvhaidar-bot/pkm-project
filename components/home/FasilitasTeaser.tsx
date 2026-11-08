import Image from "next/image";
import Link from "next/link";
import { prisma } from "@/lib/prisma";
import JudulBagian from "./JudulBagian";

export default async function FasilitasTeaser() {
  const unggulan = await prisma.fasilitas.findMany({
    where: { aktif: true, unggulan: true },
    orderBy: [{ urutan: "asc" }, { nama: "asc" }],
    take: 6,
  });

  let daftar = unggulan;
  if (daftar.length < 6) {
    const tambahan = await prisma.fasilitas.findMany({
      where: { aktif: true, id: { notIn: daftar.map((f) => f.id) } },
      orderBy: [{ urutan: "asc" }, { nama: "asc" }],
      take: 6 - daftar.length,
    });
    daftar = [...daftar, ...tambahan];
  }

  if (daftar.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Sarana Madrasah"
          judul="Fasilitas Sekolah"
          deskripsi="Sarana dan prasarana pendukung kegiatan belajar mengajar."
        />
        <div className="mt-10 grid grid-cols-1 gap-x-5 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {daftar.map((fasilitas) => (
            <div key={fasilitas.id}>
              {fasilitas.gambarUrl ? (
                <Image
                  src={fasilitas.gambarUrl}
                  alt={`Foto ${fasilitas.nama}`}
                  width={600}
                  height={375}
                  className="aspect-[16/10] w-full rounded-none object-cover"
                />
              ) : (
                <div
                  className="flex aspect-[16/10] w-full items-center justify-center rounded-none bg-primary-soft"
                  aria-hidden="true"
                >
                  <span className="px-6 text-center font-serif text-base font-bold break-words text-primary">
                    {fasilitas.nama}
                  </span>
                </div>
              )}
              <p className="mt-3 text-center font-serif text-base font-bold break-words text-ink">{fasilitas.nama}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/fasilitas"
            className="inline-flex min-h-11 items-center justify-center gap-1.5 bg-accent px-7 py-3 text-base font-bold text-white transition-colors hover:bg-accent-soft"
          >
            Lihat Semua Fasilitas
            →
          </Link>
        </div>
      </div>
    </section>
  );
}
