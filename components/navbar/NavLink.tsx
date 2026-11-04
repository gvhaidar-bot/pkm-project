"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";
import { LuChevronDown } from "react-icons/lu";

const tentangAnak = [
  { label: "Profil Sekolah", href: "/profil" },
  { label: "Visi & Misi", href: "/visi-misi" },
  { label: "Staff & Guru", href: "/profil#guru" },
];

const links = [
  { label: "Beranda", href: "/" },
  { label: "Program", href: "/program" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
];

const tautanCls = (aktif: boolean) =>
  clsx(
    "flex min-h-11 items-center rounded-full px-4 py-2 text-base font-medium whitespace-nowrap transition-colors",
    aktif ? "bg-primary-soft font-bold text-primary" : "text-ink hover:bg-primary-soft hover:text-primary",
  );

const NavLink = () => {
  const [open, setOpen] = useState(false);
  const [tentangBuka, setTentangBuka] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => {
    const path = href.split("#")[0];
    return path === "/" ? pathname === "/" : pathname.startsWith(path);
  };
  const tentangAktif = pathname.startsWith("/profil") || pathname === "/visi-misi";

  const tutupSemua = () => {
    setOpen(false);
    setTentangBuka(false);
  };

  return (
    <nav aria-label="Menu utama" className="lg:flex lg:items-center">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        className="inline-flex h-11 w-11 items-center justify-center rounded-full text-primary-dark transition-colors hover:bg-primary-soft lg:hidden"
      >
        {open ? <IoClose size={26} /> : <IoMenu size={26} />}
      </button>

      <div className={clsx("absolute inset-x-4 top-20 rounded-2xl border border-line bg-white p-3 shadow-[0_16px_40px_rgba(11,91,62,0.14)] lg:static lg:block lg:border-0 lg:bg-transparent lg:p-0 lg:shadow-none", { hidden: !open })}>
        <ul className="flex flex-col gap-1 lg:flex-row lg:items-center lg:gap-1">
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

          <li className="group relative hidden lg:block">
            <button
              type="button"
              aria-haspopup="true"
              className={clsx(tautanCls(tentangAktif), "gap-1")}
            >
              Tentang
              <LuChevronDown
                className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                aria-hidden="true"
              />
            </button>
            <div className="invisible absolute top-full left-0 z-50 min-w-60 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              <ul className="overflow-hidden rounded-2xl border border-line bg-white p-2 shadow-[0_16px_40px_rgba(11,91,62,0.14)]">
                {tentangAnak.map((anak) => (
                  <li key={anak.href}>
                    <Link
                      href={anak.href}
                      aria-current={isActive(anak.href) ? "page" : undefined}
                      className="flex min-h-11 items-center rounded-xl px-4 py-2 text-base font-medium whitespace-nowrap text-ink transition-colors hover:bg-primary-soft hover:text-primary"
                    >
                      {anak.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </li>

          <li className="lg:hidden">
            <button
              type="button"
              onClick={() => setTentangBuka(!tentangBuka)}
              aria-expanded={tentangBuka}
              className={clsx(tautanCls(tentangAktif), "w-full justify-between")}
            >
              Tentang
              <LuChevronDown
                className={clsx("h-5 w-5 transition-transform duration-200", tentangBuka && "rotate-180")}
                aria-hidden="true"
              />
            </button>
            {tentangBuka && (
              <ul className="mt-1 mb-1 ml-4 space-y-1 border-l-2 border-primary-soft pl-3">
                {tentangAnak.map((anak) => (
                  <li key={anak.href}>
                    <Link
                      href={anak.href}
                      onClick={tutupSemua}
                      className="flex min-h-11 items-center rounded-xl px-3 py-2 text-base font-medium text-ink transition-colors hover:bg-primary-soft hover:text-primary"
                    >
                      {anak.label}
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
          <li className="pt-2 lg:hidden">
            <Link href="/kontak" onClick={tutupSemua} className="flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark">
              Hubungi Kami
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavLink;
