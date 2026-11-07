export const metadata = {
  title: "Visi & Misi",
  description:
    "Visi dan misi MTs Nurul Falah Serpong: terwujudnya madrasah yang mampu membentuk generasi yang berakhlakul karimah.",
};

const misi = [
  "Mewujudkan madrasah yang inovatif",
  "Mewujudkan organisasi madrasah yang terus belajar",
  "Mewujudkan fasilitas madrasah yang relevan, mutakhir, dan berwawasan lingkungan",
  "Mewujudkan pembiayaan yang terjangkau",
  "Mewujudkan pendidik dan tenaga kependidikan yang berakhlakul mulia",
  "Mewujudkan manajemen berbasis madrasah yang handal",
];

const tujuan = [
  "Terwujudnya perkembangan siswa secara optimal sesuai dengan potensi yang dimiliki",
  "Terwujudnya madrasah mandiri",
  "Tersedianya sarana dan prasarana pendidikan yang memadai",
  "Tercapainya program-program madrasah",
  "Terlaksananya kehidupan madrasah yang Islami",
  "Terwujudnya lulusan yang berkualitas, berprestasi, berakhlakul karimah, dan bertaqwa kepada Allah SWT",
];

export default function VisiMisiPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Tentang Kami</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Visi &amp; Misi MTs Nurul Falah Serpong</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Arah dan komitmen madrasah dalam mendidik putra-putri Anda.
        </p>

        <section
          aria-label="Visi madrasah"
          className="mt-10 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Visi</h2>
          <p className="mt-4 rounded-2xl bg-primary-soft px-6 py-8 text-center text-xl leading-relaxed font-bold text-primary-dark">
            &ldquo;Terwujudnya Madrasah yang mampu membentuk generasi yang berakhlakul karimah&rdquo;
          </p>
        </section>

        <section
          aria-label="Misi madrasah"
          className="mt-6 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Misi</h2>
          <ul className="mt-4 space-y-3">
            {misi.map((item, i) => (
              <li
                key={item}
                className="flex items-start gap-4 rounded-2xl bg-cream px-5 py-4"
              >
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-soft text-base font-extrabold text-primary"
                  aria-hidden="true"
                >
                  {i + 1}
                </span>
                <p className="text-base leading-relaxed text-muted">{item}</p>
              </li>
            ))}
          </ul>
        </section>

        <section
          aria-label="Tujuan madrasah"
          className="mt-6 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Tujuan</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted">
            {tujuan.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
