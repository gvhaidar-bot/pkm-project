"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";

const tentangAnak = [
  { label: "Profil Sekolah", href: "/profil", deskripsi: "Sejarah, identitas & struktur" },
  { label: "Visi & Misi", href: "/visi-misi", deskripsi: "Tujuan & arah pendidikan" },
  { label: "Staff & Guru", href: "/guru", deskripsi: "Pendidik & tenaga pembimbing" },
];

const programAnak = [
  { label: "Program Akademik", href: "/program/akademik", deskripsi: "Kurikulum & proses belajar" },
  { label: "Program Non Akademik", href: "/program/ekstrakurikuler", deskripsi: "Ekstrakurikuler & minat bakat" },
  { label: "Program Unggulan", href: "/program/unggulan", deskripsi: "Ciri khas & fokus madrasah" },
];

const links = [
  { label: "Beranda", href: "/" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
];

interface NavLinkProps {
  isTransparent?: boolean;
}

const NavLink = ({ isTransparent = false }: NavLinkProps) => {
  const [open, setOpen] = useState(false);
  const [tentangBuka, setTentangBuka] = useState(false);
  const [programBuka, setProgramBuka] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };
  const tentangAktif = pathname.startsWith("/profil") || pathname === "/visi-misi" || pathname === "/guru";
  const programAktif = pathname.startsWith("/program");

  const tutupSemua = () => {
    setOpen(false);
    setTentangBuka(false);
    setProgramBuka(false);
  };

  const tautanCls = (aktif: boolean) =>
    clsx(
      "relative flex min-h-11 items-center px-3.5 py-2 text-xs font-bold tracking-[0.14em] whitespace-nowrap uppercase transition-colors duration-200",
      // Mobile appearance (inside white popup drawer): always dark ink with hover
      aktif
        ? "bg-primary-soft/60 text-primary after:absolute after:bottom-0 after:left-3.5 after:right-3.5 after:hidden after:h-[2px] after:bg-accent lg:after:block"
        : "text-ink/80 hover:bg-primary-soft/40 hover:text-primary lg:hover:bg-transparent",
      // Desktop appearance (varies by isTransparent):
      isTransparent
        ? aktif
          ? "lg:bg-transparent lg:text-white"
          : "lg:text-white/90 lg:hover:text-accent"
        : aktif
          ? "lg:bg-transparent lg:text-primary"
          : "lg:text-ink/80 lg:hover:text-primary",
    );

  return (
    <nav aria-label="Menu utama" className="lg:flex lg:items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        className={clsx(
          "inline-flex h-11 w-11 items-center justify-center border transition-all duration-300 lg:hidden",
          isTransparent && !open
            ? "border-white/30 bg-black/20 text-white hover:bg-black/40"
            : "border-line bg-white text-primary-dark hover:bg-primary-soft",
        )}
      >
        {open ? <IoClose size={24} /> : <IoMenu size={24} />}
      </button>

      <div
        className={clsx(
          "absolute inset-x-4 top-20 border border-line bg-white p-3 shadow-xl lg:static lg:block lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none",
          { hidden: !open },
        )}
      >
        <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-0.5">
          <li>
            <Link
              href="/"
              onClick={tutupSemua}
              aria-current={isActive("/") ? "page" : undefined}
              className={tautanCls(isActive("/"))}
            >
              Beranda
            </Link>
          </li>

          {/* Desktop Dropdown: Tentang */}
          <li className="group relative hidden lg:block">
            <button
              type="button"
              aria-haspopup="true"
              className={clsx(tautanCls(tentangAktif), "gap-1")}
            >
              Tentang
              <LuChevronDown
                className={clsx(
                  "h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180",
                  isTransparent ? "text-white/70 group-hover:text-white" : "text-muted group-hover:text-primary",
                )}
                aria-hidden="true"
              />
            </button>
            <div className="invisible absolute top-full left-0 z-50 min-w-64 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="border border-line border-t-2 border-t-accent bg-white p-2 shadow-[0_16px_40px_rgba(11,79,58,0.12)]">
                <ul className="space-y-1">
                  {tentangAnak.map((anak) => (
                    <li key={anak.href}>
                      <Link
                        href={anak.href}
                        aria-current={isActive(anak.href) ? "page" : undefined}
                        className={clsx(
                          "block px-3 py-2.5 transition-colors",
                          isActive(anak.href)
                            ? "bg-primary-soft text-primary font-bold"
                            : "text-ink hover:bg-primary-soft/50 hover:text-primary",
                        )}
                      >
                        <span className="block text-sm font-bold tracking-tight">{anak.label}</span>
                        <span className="block text-xs font-normal text-muted">{anak.deskripsi}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          {/* Mobile Accordion: Tentang */}
          <li className="lg:hidden">
            <button
              type="button"
              onClick={() => setTentangBuka(!tentangBuka)}
              aria-expanded={tentangBuka}
              className={clsx(tautanCls(tentangAktif), "w-full justify-between")}
            >
              Tentang
              <LuChevronDown
                className={clsx("h-4 w-4 transition-transform duration-200", tentangBuka && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {tentangBuka && (
              <ul className="mt-1 mb-1 ml-3 space-y-1 border-l-2 border-accent/40 pl-3">
                {tentangAnak.map((anak) => (
                  <li key={anak.href}>
                    <Link
                      href={anak.href}
                      onClick={tutupSemua}
                      className="block px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-primary-soft hover:text-primary"
                    >
                      <span className="font-bold">{anak.label}</span>
                      <span className="block text-xs text-muted">{anak.deskripsi}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {/* Desktop Dropdown: Program */}
          <li className="group relative hidden lg:block">
            <button
              type="button"
              aria-haspopup="true"
              className={clsx(tautanCls(programAktif), "gap-1")}
            >
              Program
              <LuChevronDown
                className={clsx(
                  "h-3.5 w-3.5 transition-transform duration-200 group-hover:rotate-180",
                  isTransparent ? "text-white/70 group-hover:text-white" : "text-muted group-hover:text-primary",
                )}
                aria-hidden="true"
              />
            </button>
            <div className="invisible absolute top-full left-0 z-50 min-w-64 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <div className="border border-line border-t-2 border-t-accent bg-white p-2 shadow-[0_16px_40px_rgba(11,79,58,0.12)]">
                <ul className="space-y-1">
                  {programAnak.map((anak) => (
                    <li key={anak.href}>
                      <Link
                        href={anak.href}
                        aria-current={isActive(anak.href) ? "page" : undefined}
                        className={clsx(
                          "block px-3 py-2.5 transition-colors",
                          isActive(anak.href)
                            ? "bg-primary-soft text-primary font-bold"
                            : "text-ink hover:bg-primary-soft/50 hover:text-primary",
                        )}
                      >
                        <span className="block text-sm font-bold tracking-tight">{anak.label}</span>
                        <span className="block text-xs font-normal text-muted">{anak.deskripsi}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </li>

          {/* Mobile Accordion: Program */}
          <li className="lg:hidden">
            <button
              type="button"
              onClick={() => setProgramBuka(!programBuka)}
              aria-expanded={programBuka}
              className={clsx(tautanCls(programAktif), "w-full justify-between")}
            >
              Program
              <LuChevronDown
                className={clsx("h-4 w-4 transition-transform duration-200", programBuka && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {programBuka && (
              <ul className="mt-1 mb-1 ml-3 space-y-1 border-l-2 border-accent/40 pl-3">
                {programAnak.map((anak) => (
                  <li key={anak.href}>
                    <Link
                      href={anak.href}
                      onClick={tutupSemua}
                      className="block px-3 py-2 text-sm font-medium text-ink transition-colors hover:bg-primary-soft hover:text-primary"
                    >
                      <span className="font-bold">{anak.label}</span>
                      <span className="block text-xs text-muted">{anak.deskripsi}</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </li>

          {links.slice(1).map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={tutupSemua}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={tautanCls(isActive(link.href))}
              >
                {link.label}
              </Link>
            </li>
          ))}

          <li className="pt-3 lg:hidden">
            <Link
              href="/kontak"
              onClick={tutupSemua}
              className="flex min-h-11 items-center justify-center bg-primary px-6 text-xs font-bold tracking-[0.14em] text-white uppercase transition-colors hover:bg-primary-dark"
            >
              Hubungi Kami
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavLink;
