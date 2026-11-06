import { LuClock, LuMail, LuMapPin, LuMessageCircle, LuPhone } from "react-icons/lu";

export const metadata = {
  title: "Kontak — Madrasah Tsanawiyah",
  description: "Hubungi Madrasah Tsanawiyah: alamat, telepon, WhatsApp, dan email sekolah.",
};

const daftar = [
  { label: "Alamat", nilai: "[Alamat Sekolah]", Icon: LuMapPin },
  { label: "Telepon", nilai: "[Nomor Telepon]", Icon: LuPhone },
  { label: "WhatsApp", nilai: "[Nomor WhatsApp]", Icon: LuMessageCircle },
  { label: "Email", nilai: "[Email Sekolah]", Icon: LuMail },
  { label: "Jam Layanan", nilai: "[Jam Layanan]", Icon: LuClock },
];

export default function KontakPage() {
  return (
    <div className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Hubungi Kami</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight text-ink">Kontak</h1>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-muted">
          Jangan ragu untuk menghubungi kami untuk informasi lebih lanjut tentang Madrasah Tsanawiyah.
        </p>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {daftar.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                <item.Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h2 className="mt-4 text-lg font-extrabold tracking-tight text-ink">{item.label}</h2>
              <p className="mt-1 text-base text-muted">{item.nilai}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
