import { LuTrophy } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import JudulBagian from "./JudulBagian";

export default async function PrestasiTeaser() {
  const daftar = await prisma.prestasi.findMany({
    orderBy: { tahun: "desc" },
    take: 4,
  });

  if (daftar.length === 0) return null;

  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Penghargaan"
          judul="Prestasi"
          deskripsi="Berbagai penghargaan dan prestasi yang telah diraih siswa dan madrasah kami."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
          {daftar.map((prestasi) => (
            <article
              key={prestasi.id}
              className="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-accent text-white">
                <LuTrophy className="h-6 w-6" aria-hidden="true" />
              </span>
              <div className="min-w-0 flex-1">
                <h3 className="text-lg font-extrabold tracking-tight text-ink">{prestasi.judul}</h3>
                {prestasi.deskripsi ? (
                  <p className="mt-1 line-clamp-2 text-[15px] leading-relaxed text-muted">
                    {prestasi.deskripsi}
                  </p>
                ) : null}
                {prestasi.tingkat ? (
                  <p className="mt-1 text-sm font-semibold text-primary">{prestasi.tingkat}</p>
                ) : null}
              </div>
              <span className="shrink-0 text-2xl font-extrabold tracking-tight text-primary">
                {prestasi.tahun}
              </span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
