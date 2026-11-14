"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LuArrowRight } from "react-icons/lu";

const ruteDiizinkan = ["/profil", "/visi-misi", "/guru"];

export default function PitaVisiFooter() {
  const pathname = usePathname();

  const tampil = ruteDiizinkan.some(
    (rute) => pathname === rute || pathname.startsWith(`${rute}/`),
  );

  if (!tampil) return null;

  return (
    <div className="border-b border-white/10 bg-primary-dark/50 py-10">
      <div className="mx-auto flex w-full max-w-300 flex-col items-center justify-between gap-6 px-5 lg:flex-row lg:px-6">
        <div className="max-w-2xl text-center lg:text-left">
          <span className="text-xs font-bold tracking-[0.2em] text-accent uppercase">
            Berciri Khas Agama Islam
          </span>
          <p className="mt-2 font-serif text-2xl font-bold leading-snug text-white sm:text-3xl">
            &ldquo;Sekolah Lanjutan Tingkat Pertama Berciri Khas Agama Islam.&rdquo;
          </p>
        </div>
        <Link
          href="/kontak"
          className="group inline-flex min-h-11 shrink-0 items-center gap-2 border border-accent bg-accent px-6 py-3 text-xs font-bold tracking-wider text-white uppercase transition-all hover:bg-accent-soft"
        >
          <span>Hubungi Sekolah</span>
          <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

