"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import NavLink from "./NavLink";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  // On the homepage, navbar starts transparent over the full-bleed hero image.
  // When scrolled past 20px, it smoothly animates into a solid white header.
  // On interior pages, it maintains high contrast solid header.
  const isHomePage = pathname === "/";
  const isTransparent = isHomePage && !scrolled;

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={clsx(
        "sticky top-0 z-50 w-full transition-all duration-300 ease-in-out",
        isTransparent
          ? "bg-primary-dark/80 backdrop-blur-md border-b border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.12)]"
          : "bg-white/95 backdrop-blur-md border-b border-line shadow-[0_4px_24px_rgba(11,79,58,0.08)]",
      )}
    >
      <div
        className={clsx(
          "mx-auto flex w-full max-w-300 items-center justify-between gap-4 px-5 lg:px-6 transition-all duration-300 ease-in-out",
          isTransparent ? "h-20" : "h-18 lg:h-20",
        )}
      >
        <Link
          href="/"
          className="group flex min-w-0 items-center gap-3.5"
          aria-label="Beranda MTs Nurul Falah Gunungsindur"
        >
          <div
            className={clsx(
              "relative flex h-12 w-12 shrink-0 items-center justify-center p-1 transition-all duration-300",
              isTransparent
                ? "border border-white/30 bg-black/20 backdrop-blur-xs group-hover:border-accent"
                : "border border-accent/30 bg-primary-soft/40 group-hover:border-accent",
            )}
          >
            <Image
              src="/logo.svg"
              alt="Logo MTs Nurul Falah Gunungsindur"
              width={40}
              height={40}
              priority
              className="h-10 w-10 object-contain"
            />
          </div>
          <span className="flex min-w-0 flex-col leading-tight">
            <span
              className={clsx(
                "truncate font-serif text-[18px] font-bold tracking-tight transition-colors duration-300",
                isTransparent ? "text-white drop-shadow-xs" : "text-primary-dark",
              )}
            >
              MTs Nurul Falah
            </span>
            <span
              className={clsx(
                "text-[10px] font-bold tracking-[0.16em] uppercase transition-colors duration-300",
                isTransparent ? "text-accent-soft" : "text-accent",
              )}
            >
              Gunungsindur · Bogor
            </span>
          </span>
        </Link>

        <NavLink isTransparent={isTransparent} />

        <Link
          href="/kontak"
          className={clsx(
            "hidden h-11 shrink-0 items-center px-6 text-xs font-bold tracking-[0.14em] uppercase transition-all duration-300 lg:inline-flex",
            isTransparent
              ? "bg-accent text-white hover:bg-accent-hover shadow-md hover:shadow-lg"
              : "bg-primary text-white hover:bg-primary-dark shadow-xs hover:shadow-md",
          )}
        >
          Hubungi Kami
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
