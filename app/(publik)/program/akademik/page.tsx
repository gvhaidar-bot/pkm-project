export const metadata = {
  title: "Akademik — Madrasah Tsanawiyah",
  description: "Program akademik Madrasah Tsanawiyah: kurikulum dan pembelajaran.",
};

const programAkademik = [
  {
    judul: "[Program Akademik 1]",
    deskripsi: "[Deskripsi program akademik 1 — menunggu data resmi dari pihak sekolah]",
  },
  {
    judul: "[Program Akademik 2]",
    deskripsi: "[Deskripsi program akademik 2 — menunggu data resmi dari pihak sekolah]",
  },
  {
    judul: "[Program Akademik 3]",
    deskripsi: "[Deskripsi program akademik 3 — menunggu data resmi dari pihak sekolah]",
  },
];

export default function AkademikPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Program</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Akademik</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Program pembelajaran intrakurikuler yang dirancang untuk mengembangkan potensi akademik
          siswa secara maksimal.
        </p>

        <section
          aria-label="Kurikulum"
          className="mt-10 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Kurikulum</h2>
          <p className="mt-4 rounded-2xl border-2 border-dashed border-line bg-cream px-6 py-8 text-base leading-relaxed text-muted">
            [Kurikulum yang digunakan madrasah — menunggu data resmi dari pihak sekolah]
          </p>
        </section>

        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {programAkademik.map((item) => (
            <article
              key={item.judul}
              className="flex flex-col rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <div
                className="flex h-28 items-center justify-center rounded-2xl bg-primary-soft px-6"
                aria-hidden="true"
              >
                <span className="text-center text-base font-bold text-primary">{item.judul}</span>
              </div>
              <p className="mt-4 flex-1 text-[15px] leading-relaxed text-muted">{item.deskripsi}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
