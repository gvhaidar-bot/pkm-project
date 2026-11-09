import Image from "next/image";
import Link from "next/link";
import NavLink from "./NavLink";

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-line bg-white/95 shadow-[0_2px_16px_rgba(11,79,58,0.06)] backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-300 items-center justify-between gap-4 px-5 lg:px-6">
        <Link href="/" className="group flex min-w-0 items-center gap-3.5" aria-label="Beranda MTs Nurul Falah Serpong">
          <div className="relative flex h-12 w-12 shrink-0 items-center justify-center border border-accent/30 bg-primary-soft/40 p-1 transition-colors group-hover:border-accent">
            <Image
              src="/logo.svg"
              alt="Logo MTs Nurul Falah Serpong"
              width={40}
              height={40}
              priority
              className="h-10 w-10 object-contain"
            />
          </div>
          <span className="flex min-w-0 flex-col leading-tight">
            <span className="truncate font-serif text-[18px] font-bold tracking-tight text-primary-dark">
              MTs Nurul Falah
            </span>
            <span className="text-[10px] font-bold tracking-[0.16em] text-accent uppercase">
              Serpong · Tangerang Selatan
            </span>
          </span>
        </Link>

        <NavLink />

        <Link
          href="/kontak"
          className="hidden h-11 shrink-0 items-center bg-primary px-6 text-xs font-bold tracking-[0.14em] text-white uppercase transition-all duration-200 hover:bg-primary-dark hover:shadow-md lg:inline-flex"
        >
          Hubungi Kami
        </Link>
      </div>
    </header>
  );
};

export default Navbar;
