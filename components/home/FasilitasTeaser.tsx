import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
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
    <section className="bg-cream py-20 border-b border-line">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <JudulBagian
          label="Sarana & Prasarana"
          judul="Fasilitas Penunjang Belajar"
          deskripsi="Fasilitas fisik yang terawat dan dirancang untuk memberikan kenyamanan, keamanan, serta fokus maksimal dalam belajar."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {daftar.map((fasilitas) => (
            <article
              key={fasilitas.id}
              className="group overflow-hidden border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_32px_rgba(11,79,58,0.1)]"
            >
              <div className="relative overflow-hidden">
                {fasilitas.gambarUrl ? (
                  <Image
                    src={fasilitas.gambarUrl}
                    alt={`Foto ${fasilitas.nama}`}
                    width={600}
                    height={375}
                    className="aspect-[16/10] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div
                    className="flex aspect-[16/10] w-full items-center justify-center bg-primary-soft"
                    aria-hidden="true"
                  >
                    <span className="px-6 text-center font-serif text-lg font-bold text-primary">
                      {fasilitas.nama}
                    </span>
                  </div>
                )}
                {fasilitas.unggulan && (
                  <span className="absolute top-3 left-3 bg-accent px-3 py-1 text-xs font-bold text-primary-dark shadow-sm">
                    Fasilitas Unggulan
                  </span>
                )}
              </div>

              <div className="p-5 text-center">
                <h3 className="font-serif text-lg font-bold tracking-tight text-primary-dark">
                  {fasilitas.nama}
                </h3>
                <span className="mx-auto mt-2 block h-0.5 w-8 bg-accent/40 transition-all duration-300 group-hover:w-16 group-hover:bg-accent" />
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/fasilitas"
            className="group inline-flex min-h-12 items-center justify-center gap-2 border border-accent bg-accent px-8 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-accent-soft hover:shadow-md"
          >
            <span>Lihat Seluruh Fasilitas</span>
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
