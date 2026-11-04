export const metadata = {
  title: "Visi & Misi — Madrasah Tsanawiyah",
  description: "Visi dan misi Madrasah Tsanawiyah.",
};

export default function VisiMisiPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Tentang Kami</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Visi & Misi</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Arah dan komitmen madrasah dalam mendidik putra-putri Anda.
        </p>

        <section
          aria-label="Visi madrasah"
          className="mt-10 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Visi</h2>
          <p className="mt-4 rounded-2xl border-2 border-dashed border-line bg-cream px-6 py-8 text-center text-lg leading-relaxed font-medium text-muted">
            [Visi madrasah — menunggu data resmi dari pihak sekolah]
          </p>
        </section>

        <section
          aria-label="Misi madrasah"
          className="mt-6 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Misi</h2>
          <ul className="mt-4 space-y-3">
            {[1, 2, 3].map((nomor) => (
              <li
                key={nomor}
                className="flex items-start gap-4 rounded-2xl border-2 border-dashed border-line bg-cream px-5 py-4"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-base font-extrabold text-primary"
                  aria-hidden="true"
                >
                  {nomor}
                </span>
                <p className="text-base leading-relaxed text-muted">
                  [Misi {nomor} — menunggu data resmi dari pihak sekolah]
                </p>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
