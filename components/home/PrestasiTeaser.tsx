import { LuTrophy } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import JudulBagian from "./JudulBagian";
import { CuplikanBerformat } from "@/components/TeksBerformat";

export default async function PrestasiTeaser() {
  const daftar = await prisma.prestasi.findMany({
    orderBy: { tahun: "desc" },
    take: 4,
  });

  if (daftar.length === 0) return null;

  return (
    <section className="bg-cream py-20 border-b border-line">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <JudulBagian
          label="Bukti Keunggulan"
          judul="Prestasi & Penghargaan"
          deskripsi="Apresiasi atas kerja keras dan bakat siswa-siswi kami dalam berbagai ajang kompetisi akademik maupun non-akademik."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
          {daftar.map((prestasi) => (
            <article
              key={prestasi.id}
              className="group relative flex items-start gap-5 border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent hover:shadow-[0_12px_32px_rgba(11,79,58,0.1)]"
            >
              <span className="flex h-14 w-14 shrink-0 items-center justify-center border border-accent/40 bg-primary-soft text-primary transition-colors group-hover:bg-accent group-hover:text-primary-dark">
                <LuTrophy className="h-7 w-7 text-accent group-hover:text-primary-dark" aria-hidden="true" />
              </span>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  {prestasi.tingkat ? (
                    <span className="inline-block border border-accent/30 bg-primary-soft/60 px-2.5 py-0.5 text-[11px] font-bold tracking-wider text-primary uppercase">
                      {prestasi.tingkat}
                    </span>
                  ) : <span />}
                  <span className="font-serif text-xl font-bold tracking-tight text-accent-soft">
                    {prestasi.tahun}
                  </span>
                </div>

                <h3 className="mt-2.5 font-serif text-lg font-bold tracking-tight text-primary-dark">
                  {prestasi.judul}
                </h3>

                {prestasi.deskripsi ? (
                  <CuplikanBerformat
                    teks={prestasi.deskripsi}
                    className="mt-2 text-sm leading-relaxed text-muted line-clamp-2"
                  />
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
