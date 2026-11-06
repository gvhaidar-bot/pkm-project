import Link from "next/link";
import { LuClock, LuMail, LuMapPin, LuPhone } from "react-icons/lu";

export const metadata = {
  title: "Kontak — Madrasah Tsanawiyah",
  description: "Hubungi Madrasah Tsanawiyah.",
};

const kontak = [
  { label: "Alamat", value: "[Alamat Sekolah]", Icon: LuMapPin },
  { label: "Telepon / WhatsApp", value: "[Nomor Telepon]", Icon: LuPhone },
  { label: "Email", value: "[Email Sekolah]", Icon: LuMail },
  { label: "Jam Layanan", value: "[Jam Layanan]", Icon: LuClock },
];

export default function KontakPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kontak</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Hubungi Kami</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Silakan hubungi kami melalui kontak berikut untuk pertanyaan seputar sekolah,
          program, dan kegiatan.
        </p>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {kontak.map((item) => (
            <div
              key={item.label}
              className="flex items-start gap-4 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary-soft text-primary">
                <item.Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <div>
                <h2 className="text-base font-bold text-ink">{item.label}</h2>
                <p className="mt-1 text-base text-muted">{item.value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-primary p-8 text-white shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-10">
          <h2 className="text-2xl font-extrabold tracking-tight">Kunjungi Sekolah</h2>
          <p className="mt-3 max-w-2xl text-base leading-relaxed text-cream/90">
            Alamat lengkap dan peta lokasi akan ditampilkan di sini setelah data resmi
            dari pihak sekolah tersedia.
          </p>
          <Link
            href="/profil"
            className="mt-6 inline-flex min-h-11 items-center rounded-full bg-white px-6 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            Lihat Profil Sekolah
          </Link>
        </div>
      </div>
    </div>
  );
}
