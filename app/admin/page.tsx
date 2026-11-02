import Link from "next/link";
import { redirect } from "next/navigation";
import { auth, signOut } from "@/auth";

export const metadata = {
  title: "Dasbor Admin — Madrasah Tsanawiyah",
  description: "Dasbor pengelola website Madrasah Tsanawiyah.",
};

const menu = [
  { label: "Berita", deskripsi: "Kelola publikasi berita dan agenda sekolah." },
  { label: "Fasilitas", deskripsi: "Kelola daftar fasilitas beserta fotonya." },
  { label: "Guru", deskripsi: "Kelola data guru beserta fotonya." },
  { label: "Prestasi", deskripsi: "Kelola daftar prestasi sekolah." },
  { label: "Kegiatan", deskripsi: "Kelola agenda kegiatan beserta fotonya." },
];

export default async function AdminPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <main className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Dasbor Admin</p>
            <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">
              Halo, {session.user.name ?? "Admin"}
            </h1>
            <p className="mt-2 text-base text-muted">{session.user.email}</p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/login" });
            }}
          >
            <button
              type="submit"
              className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-6 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
            >
              Keluar
            </button>
          </form>
        </div>

        <h2 className="mt-12 text-xl font-bold text-ink">Kelola Konten Website</h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {menu.map((item) => (
            <div
              key={item.label}
              className="rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <div className="flex items-center justify-between gap-2">
                <h3 className="text-lg font-bold text-ink">{item.label}</h3>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold tracking-[0.12em] text-primary uppercase">
                  Segera hadir
                </span>
              </div>
              <p className="mt-2 text-base leading-relaxed text-muted">{item.deskripsi}</p>
            </div>
          ))}
          <Link
            href="/"
            className="flex min-h-11 items-center justify-center rounded-3xl border border-line bg-white p-6 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            Lihat Website
          </Link>
        </div>
      </div>
    </main>
  );
}
