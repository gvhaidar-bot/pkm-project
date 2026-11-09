import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
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
    <section className="bg-white py-20 border-b border-line">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <JudulBagian
          label="Dokumentasi & Aktivitas"
          judul="Galeri Kegiatan Siswa"
          deskripsi="Momen berharga keseharian belajar, upacara, peringatan hari besar, dan ragam kreativitas di madrasah."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {daftar.map((item) => (
            <figure
              key={item.id}
              className="group relative overflow-hidden border border-line bg-primary-dark shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={item.sampul}
                alt={`Dokumentasi kegiatan ${item.judul}`}
                width={600}
                height={450}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                className="absolute inset-0 bg-gradient-to-t from-primary-dark/90 via-primary-dark/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-95"
                aria-hidden="true"
              />
              <figcaption className="absolute inset-x-0 bottom-0 p-3 sm:p-4">
                <p className="font-serif text-xs font-bold leading-snug text-white sm:text-sm line-clamp-2">
                  {item.judul}
                </p>
              </figcaption>
            </figure>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/galeri"
            className="group inline-flex min-h-12 items-center justify-center gap-2 border border-primary bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
          >
            <span>Buka Seluruh Galeri Foto</span>
            <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
