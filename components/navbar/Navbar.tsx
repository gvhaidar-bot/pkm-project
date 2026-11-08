import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/95 shadow-[0_2px_16px_rgba(11,91,62,0.06)] backdrop-blur">
      <div className="mx-auto flex h-18 w-full max-w-300 items-center justify-between gap-4 px-5 lg:px-6">
        <Link href="/" className="flex min-w-0 items-center gap-3" aria-label="Beranda MTs Nurul Falah Serpong">
          <Image src="/logo.svg" alt="Logo MTs Nurul Falah Serpong" width={44} height={44} priority className="h-11 w-11 shrink-0" />
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate text-[17px] font-extrabold tracking-tight text-primary-dark">MTs Nurul Falah</span>

            <span className="text-[11px] font-bold tracking-[0.14em] text-primary uppercase"> Serpong, Tangerang Selatan</span>
          </span>
        </Link>

        <NavLink />

        <Link href="/kontak" className="hidden h-11 shrink-0 items-center bg-primary px-6 text-sm font-bold tracking-[0.12em] text-white uppercase transition-colors hover:bg-primary-dark lg:inline-flex">
          Hubungi Kami
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
