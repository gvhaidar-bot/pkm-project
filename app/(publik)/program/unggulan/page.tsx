import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";
import { prisma } from "@/lib/prisma";

// Halaman ini membaca database langsung, jadi dirender per permintaan
// (bukan di-prerender) agar selalu menampilkan data terbaru.
export const instant = false;
export const metadata = {
  title: "Program Unggulan — Madrasah Tsanawiyah",
  description: "Program unggulan Madrasah Tsanawiyah.",
};

/**
 * Program unggulan dibaca langsung dari database (ProgramAkademik yang
 * ditandai unggulan dan aktif), bukan dari daftar hardcode.
 */
export default async function UnggulanPage() {
  const daftar = await prisma.programAkademik.findMany({
    where: { aktif: true, unggulan: true },
    orderBy: [{ urutan: "asc" }, { judul: "asc" }],
  });

  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Program</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Program Unggulan</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Program khas yang menjadi ciri khas dan kebanggaan madrasah kami.
        </p>

        {daftar.length === 0 ? (
          <div className="mt-10 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
            <p className="text-lg font-bold text-ink">Belum ada program unggulan</p>
            <p className="mt-2 text-base text-muted">
              Program yang ditandai sebagai unggulan akan tampil di sini.
            </p>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-5 lg:grid-cols-2">
            {daftar.map((program) => (
              <article
                key={program.id}
                className="rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
              >
                <span className="inline-block rounded-full bg-accent-soft px-3 py-1 text-xs font-bold tracking-wide text-primary-dark uppercase">
                  Unggulan
                </span>
                <h2 className="mt-3 text-2xl font-extrabold tracking-tight text-primary">
                  {program.judul}
                </h2>
                <p className="mt-3 text-base leading-relaxed text-muted">{program.ringkasan}</p>
                <Link
                  href={`/program/akademik/${program.slug}`}
                  className="mt-5 inline-flex min-h-11 items-center gap-1.5 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
                >
                  Selengkapnya
                  <LuArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
