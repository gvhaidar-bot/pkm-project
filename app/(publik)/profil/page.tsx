import Link from "next/link";

export const metadata = {
  title: "Profil Sekolah",
  description:
    "Profil MTs Nurul Falah Serpong: sejarah, identitas, dan sarana prasarana madrasah tsanawiyah swasta di Lengkong Gudang, Serpong, Kota Tangerang Selatan.",
};

const identitas = [
  { label: "Nama Madrasah", nilai: "MTs Nurul Falah Serpong" },
  { label: "NPSN", nilai: "20623052" },
  { label: "NSM", nilai: "121236740033" },
  { label: "Yayasan", nilai: "Yayasan Pendidikan Islam Yatim dan Duafa (YPYD)" },
  { label: "Tahun Berdiri", nilai: "2001 (16 November 2001)" },
  { label: "Status", nilai: "Swasta — Terakreditasi B (nilai 83, tahun 2019)" },
  { label: "Alamat", nilai: "Jl. Serpong Raya, Lengkong Gudang RT 06/04, Kecamatan Serpong, Kota Tangerang Selatan, Banten 15310" },
  { label: "Instagram", nilai: "@mts_nurulfalah_lengkong" },
  { label: "TikTok", nilai: "@mtsnurulfalahlengkong" },
];

const sarana = [
  "6 ruang kelas (3 ruang lantai 1 dan 3 ruang lantai 2)",
  "Ruang kepala madrasah dan ruang tata usaha",
  "WC guru dan 4 WC siswa",
  "Kantin dan gudang",
  "Luas tanah 1.400 m² dengan halaman 200 m²",
];

export default function ProfilPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Tentang Kami</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Profil MTs Nurul Falah Serpong</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Mengenal lebih dekat madrasah tempat putra-putri Anda menimba ilmu — berdiri sejak 2001,
          terakreditasi B, dan berkomitmen membentuk generasi yang berakhlakul karimah.
        </p>

        <section
          aria-label="Sejarah madrasah"
          className="mt-10 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Sejarah Singkat</h2>
          <div className="mt-4 space-y-3 text-base leading-relaxed text-muted">
            <p>
              MTs Nurul Falah Serpong diselenggarakan oleh Yayasan Pendidikan Islam Yatim dan Duafa
              (YPYD). Madrasah ini berdiri pada 16 November 2001 berdasarkan SK Kepala Kanwil Kemenag
              Provinsi Jawa Barat Nomor D/Wi/MTs/965/2001, dengan angkatan pertama sebanyak 25 siswa.
            </p>
            <p>
              Jumlah siswa terus berkembang dari tahun ke tahun. Pada tahun ajaran 2015/2016, madrasah
              ini memiliki 129 siswa dalam lima kelas.
            </p>
            <p>
              Kurikulum yang diterapkan memadukan KTSP dengan kurikulum Departemen Agama, dan pada kelas
              VII dan VIII beberapa mata pelajaran menggunakan Kurikulum 2013.
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
                <dd className="text-base break-words text-muted">{item.nilai}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section
          aria-label="Sarana dan prasarana madrasah"
          className="mt-6 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8"
        >
          <h2 className="text-2xl font-extrabold tracking-tight text-ink">Sarana &amp; Prasarana</h2>
          <ul className="mt-4 list-disc space-y-2 pl-6 text-base leading-relaxed text-muted">
            {sarana.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <p className="mt-6 text-base leading-relaxed text-muted">
            Lihat daftar fasilitas selengkapnya di halaman{" "}
            <Link href="/fasilitas" className="font-bold text-primary underline underline-offset-4 hover:text-primary-dark">
              Fasilitas
            </Link>
            .
          </p>
        </section>
      </div>
    </div>
  );
}
