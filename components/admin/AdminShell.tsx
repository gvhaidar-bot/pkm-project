"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Suspense, useState } from "react";
import {
  LuBuilding2,
  LuCalendarDays,
  LuGlobe,
  LuGraduationCap,
  LuLayoutDashboard,
  LuLogOut,
  LuMenu,
  LuNewspaper,
  LuTrophy,
  LuUsers,
  LuX,
} from "react-icons/lu";
import { logout } from "@/app/admin/actions";

const menuUtama = [{ label: "Dasbor", href: "/admin", icon: LuLayoutDashboard }];

const menuKonten = [
  { label: "Berita", href: "/admin/berita", icon: LuNewspaper },
  { label: "Fasilitas", href: "/admin/fasilitas", icon: LuBuilding2 },
  { label: "Guru", href: "/admin/guru", icon: LuUsers },
  { label: "Prestasi", href: "/admin/prestasi", icon: LuTrophy },
  { label: "Kegiatan", href: "/admin/kegiatan", icon: LuCalendarDays },
  { label: "Program Akademik", href: "/admin/program-akademik", icon: LuGraduationCap },
];

function tautanAktif(pathname: string, href: string) {
  return href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);
}

function NavLink({
  href,
  label,
  icon: Icon,
  onNavigate,
}: {
  href: string;
  label: string;
  icon: typeof LuLayoutDashboard;
  onNavigate?: () => void;
}) {
  const pathname = usePathname();
  const aktif = tautanAktif(pathname, href);
  return (
    <Link
      href={href}
      onClick={onNavigate}
      aria-current={aktif ? "page" : undefined}
      className={`flex min-h-11 items-center gap-3 rounded-2xl px-4 text-[15px] font-medium transition-colors ${
        aktif ? "bg-primary text-white" : "text-cream/70 hover:bg-white/10 hover:text-cream"
      }`}
    >
      <Icon className="h-5 w-5 shrink-0" aria-hidden="true" />
      <span>{label}</span>
    </Link>
  );
}

function IsiSidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col">
      <Link href="/admin" onClick={onNavigate} className="flex items-center gap-3 px-5 pt-6 pb-5">
        <Image src="/logo.svg" alt="Logo Madrasah Tsanawiyah" width={40} height={40} className="h-10 w-10" />
        <span className="flex flex-col leading-tight">
          <span className="text-[15px] font-extrabold tracking-tight text-cream">
            Madrasah Tsanawiyah
          </span>
          <span className="text-[10px] font-bold tracking-[0.14em] text-accent uppercase">
            Panel Admin
          </span>
        </span>
      </Link>

      <nav className="flex-1 space-y-6 overflow-y-auto px-3" aria-label="Navigasi admin">
        <div>
          <p className="px-2 pb-2 text-[11px] font-bold tracking-[0.12em] text-cream/50 uppercase">
            Menu Utama
          </p>
          <div className="space-y-1">
            {menuUtama.map((item) => (
              <NavLink key={item.href} {...item} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
        <div>
          <p className="px-2 pb-2 text-[11px] font-bold tracking-[0.12em] text-cream/50 uppercase">
            Kelola Konten
          </p>
          <div className="space-y-1">
            {menuKonten.map((item) => (
              <NavLink key={item.href} {...item} onNavigate={onNavigate} />
            ))}
          </div>
        </div>
      </nav>

      <div className="space-y-1 border-t border-white/10 p-3">
        <Link
          href="/"
          onClick={onNavigate}
          className="flex min-h-11 items-center gap-3 rounded-2xl px-4 text-[15px] font-medium text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
        >
          <LuGlobe className="h-5 w-5 shrink-0" aria-hidden="true" />
          <span>Lihat Website</span>
        </Link>
        <form action={logout}>
          <button
            type="submit"
            className="flex min-h-11 w-full items-center gap-3 rounded-2xl px-4 text-[15px] font-medium text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
          >
            <LuLogOut className="h-5 w-5 shrink-0" aria-hidden="true" />
            <span>Keluar</span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const [buka, setBuka] = useState(false);

  return (
    <div className="flex min-h-screen bg-cream">
      <aside className="hidden w-72 shrink-0 bg-primary-dark lg:block" aria-label="Sidebar admin">
        <div className="sticky top-0 h-screen">
          <Suspense fallback={<div className="h-full" aria-hidden="true" />}>
            <IsiSidebar />
          </Suspense>
        </div>
      </aside>

      {buka && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/50" onClick={() => setBuka(false)} aria-hidden="true" />
          <aside className="absolute inset-y-0 left-0 w-72 bg-primary-dark shadow-xl" aria-label="Sidebar admin">
            <button
              type="button"
              onClick={() => setBuka(false)}
              aria-label="Tutup menu"
              className="absolute top-4 right-4 flex h-11 w-11 items-center justify-center rounded-full text-cream/70 transition-colors hover:bg-white/10 hover:text-cream"
            >
              <LuX className="h-6 w-6" aria-hidden="true" />
            </button>
            <Suspense fallback={<div className="h-full" aria-hidden="true" />}>
              <IsiSidebar onNavigate={() => setBuka(false)} />
            </Suspense>
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex min-h-16 items-center gap-3 border-b border-line bg-white/90 px-5 backdrop-blur">
          <button
            type="button"
            onClick={() => setBuka(true)}
            aria-label="Buka menu navigasi"
            className="flex h-11 w-11 items-center justify-center rounded-full transition-colors hover:bg-primary-soft lg:hidden"
          >
            <LuMenu className="h-6 w-6 text-ink" aria-hidden="true" />
          </button>
          <p className="text-base font-bold text-ink">Panel Admin</p>
        </header>
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
