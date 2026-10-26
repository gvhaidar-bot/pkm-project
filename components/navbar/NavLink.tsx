"use client";

import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IoClose, IoMenu } from "react-icons/io5";

const links = [
  { label: "Beranda", href: "/" },
  { label: "Profil", href: "/profil" },
  { label: "Program", href: "/program" },
  { label: "Fasilitas", href: "/fasilitas" },
  { label: "Galeri", href: "/galeri" },
  { label: "Berita", href: "/berita" },
  { label: "Tentang", href: "/tentang" },
];

const NavLink = () => {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

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
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={clsx(
                  "flex min-h-11 items-center rounded-full px-4 py-2 text-base font-medium whitespace-nowrap transition-colors",
                  isActive(link.href) ? "bg-primary-soft font-bold text-primary" : "text-ink hover:bg-primary-soft hover:text-primary",
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
          <li className="pt-2 lg:hidden">
            <Link href="/kontak" onClick={() => setOpen(false)} className="flex min-h-11 items-center justify-center rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark">
              Hubungi Kami
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavLink;
