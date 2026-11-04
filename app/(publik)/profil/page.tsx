export const metadata = {
  title: "Profil Sekolah — Madrasah Tsanawiyah",
  description: "Profil Madrasah Tsanawiyah: sejarah dan identitas sekolah.",
};

const identitas = [
  { label: "Nama Madrasah", nilai: "[Nama Madrasah Tsanawiyah]" },
  { label: "NPSN", nilai: "[NPSN]" },
  { label: "Alamat", nilai: "[Alamat lengkap madrasah]" },
  { label: "Telepon / WhatsApp", nilai: "[Nomor telepon]" },
  { label: "Email", nilai: "[Email resmi]" },
  { label: "Tahun Berdiri", nilai: "[Tahun berdiri]" },
  { label: "Status", nilai: "[Swasta / Negeri]" },
];

export default function ProfilPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Tentang Kami</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Profil Sekolah</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Mengenal lebih dekat madrasah tempat putra-putri Anda menimba ilmu.
        </p>

        <section
          aria-label="Sejarah madrasah"
          className="mt-10 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Sejarah Singkat</h2>
          <div className="mt-4 space-y-3 rounded-2xl border-2 border-dashed border-line bg-cream px-6 py-8">
            <p className="text-base leading-relaxed text-muted">
              [Sejarah berdirinya madrasah — menunggu data resmi dari pihak sekolah]
            </p>
          </div>
        </section>

        <section
          aria-label="Identitas madrasah"
          className="mt-6 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Identitas Sekolah</h2>
          <dl className="mt-4 overflow-hidden rounded-2xl border border-line">
            {identitas.map((item, i) => (
              <div
                key={item.label}
                className={`grid grid-cols-1 gap-1 px-5 py-4 sm:grid-cols-[220px_1fr] sm:gap-4 ${
                  i % 2 === 0 ? "bg-cream" : "bg-white"
                }`}
              >
                <dt className="text-sm font-bold tracking-wide text-primary-dark uppercase">
                  {item.label}
                </dt>
                <dd className="text-base text-muted">{item.nilai}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
}
