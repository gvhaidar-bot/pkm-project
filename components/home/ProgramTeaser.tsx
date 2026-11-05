import Image from "next/image";
import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import JudulBagian from "./JudulBagian";

export default async function ProgramTeaser() {
  const daftar = await prisma.programAkademik.findMany({
    where: { aktif: true },
    orderBy: [{ unggulan: "desc" }, { urutan: "asc" }, { judul: "asc" }],
    take: 3,
  });

  if (daftar.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Program Kami"
          judul="Program Akademik"
          deskripsi="Berbagai program pendidikan yang dirancang untuk mengembangkan potensi siswa secara maksimal."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {daftar.map((program) => (
            <article
              key={program.id}
              className="group flex flex-col overflow-hidden rounded-3xl bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-shadow hover:shadow-[0_8px_32px_rgba(11,91,62,0.14)]"
            >
              <div className="relative">
                {program.gambarUrl ? (
                  <Image
                    src={program.gambarUrl}
                    alt={`Sampul ${program.judul}`}
                    width={600}
                    height={450}
                    className="aspect-[4/3] w-full object-cover"
                  />
                ) : (
                  <div
                    className="flex aspect-[4/3] w-full items-center justify-center bg-primary-soft"
                    aria-hidden="true"
                  >
                    <span className="px-6 text-center text-base font-bold text-primary">{program.judul}</span>
                  </div>
                )}
                {program.unggulan && (
                  <span className="absolute top-4 left-4 rounded-full bg-accent px-4 py-1.5 text-sm font-bold text-primary-dark shadow">
                    Unggulan
                  </span>
                )}
              </div>
              <div className="flex flex-1 flex-col p-6">
                <h3 className="text-xl font-extrabold tracking-tight text-primary">{program.judul}</h3>
                <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{program.ringkasan}</p>
                <Link
                  href={`/program/akademik/${program.slug}`}
                  className="mt-5 inline-flex min-h-11 w-fit items-center gap-1.5 rounded-full bg-primary px-6 text-base font-bold text-white transition-colors hover:bg-primary-dark"
                >
                  Selengkapnya
                  <LuArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Link
            href="/program/akademik"
            className="inline-flex min-h-11 items-center gap-1.5 rounded-full bg-accent px-7 text-base font-bold text-primary-dark transition-colors hover:bg-accent-soft"
          >
            Lihat Semua Program
            <LuArrowRight className="h-5 w-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
