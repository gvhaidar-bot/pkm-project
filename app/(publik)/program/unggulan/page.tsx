export const metadata = {
  title: "Program Unggulan — Madrasah Tsanawiyah",
  description: "Program unggulan Madrasah Tsanawiyah.",
};

const programUnggulan = [1, 2, 3];

export default function UnggulanPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Program</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Program Unggulan</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Program khas yang menjadi ciri khas dan kebanggaan madrasah kami.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programUnggulan.map((nomor) => (
            <article
              key={nomor}
              className="flex flex-col rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <div
                className="flex h-36 items-center justify-center rounded-2xl bg-primary-soft px-6"
                aria-hidden="true"
              >
                <span className="text-center text-lg font-extrabold text-primary">
                  [Program Unggulan {nomor}]
                </span>
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">
                [Deskripsi program unggulan {nomor} — menunggu data resmi dari pihak sekolah]
              </p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
