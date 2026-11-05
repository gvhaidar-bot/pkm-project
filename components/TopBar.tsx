import {
  LuFacebook,
  LuInstagram,
  LuMail,
  LuMapPin,
  LuMessageCircle,
  LuPhone,
  LuYoutube,
} from "react-icons/lu";

const kontak = [
  { label: "Telepon", value: "[Nomor Telepon]", Icon: LuPhone, kelas: "flex" },
  { label: "Email", value: "[Email Sekolah]", Icon: LuMail, kelas: "hidden sm:flex" },
  { label: "Alamat", value: "[Alamat Sekolah]", Icon: LuMapPin, kelas: "hidden lg:flex" },
];

const mediaSosial = [
  { label: "Facebook", href: "#", Icon: LuFacebook },
  { label: "Instagram", href: "#", Icon: LuInstagram },
  { label: "YouTube", href: "#", Icon: LuYoutube },
  { label: "WhatsApp", href: "#", Icon: LuMessageCircle },
];

export default function TopBar() {
  return (
    <div className="bg-primary-dark text-cream">
      <div className="mx-auto flex w-full max-w-300 items-center justify-between gap-4 px-5 py-2 lg:px-6">
        <ul className="flex min-w-0 items-center gap-5">
          {kontak.map((item) => (
            <li key={item.label} className={`min-w-0 items-center gap-2 text-sm ${item.kelas}`}>
              <item.Icon className="h-4 w-4 shrink-0 text-accent-soft" aria-hidden="true" />
              <span className="truncate">{item.value}</span>
            </li>
          ))}
        </ul>
        <ul className="flex shrink-0 items-center gap-1">
          {mediaSosial.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                aria-label={item.label}
                className="flex h-9 w-9 items-center justify-center rounded-full text-cream/80 transition-colors hover:bg-white/10 hover:text-cream"
              >
                <item.Icon className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
