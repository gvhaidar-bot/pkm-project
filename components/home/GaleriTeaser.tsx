import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import JudulBagian from "./JudulBagian";

export default async function GaleriTeaser() {
  const daftar = await prisma.galeri.findMany({
    where: { aktif: true },
    orderBy: { createdAt: "desc" },
    take: 6,
  });

  if (daftar.length === 0) return null;

  return (
    <section className="bg-white py-20 border-b border-line">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <JudulBagian
          label="Dokumentasi & Aktivitas"
          judul="Galeri Madrasah"
          deskripsi="Momen berharga keseharian belajar, kebersamaan, dan ragam kreativitas di madrasah."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:gap-6">
          {daftar.map((foto, i) => (
            <figure
              key={foto.id}
              className="group relative overflow-hidden rounded-2xl border border-line bg-primary-dark shadow-sm transition-all duration-300 hover:shadow-lg"
            >
              <Image
                src={foto.gambarUrl}
                alt={`Foto galeri MTs Nurul Falah Serpong ${i + 1}`}
                width={600}
                height={450}
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
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
