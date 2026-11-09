import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const HeroActions = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link
        href="/program/unggulan"
        className="group inline-flex min-h-12 items-center justify-center gap-2 border border-accent bg-accent px-8 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-accent-soft hover:shadow-md"
      >
        <span>Lihat Program Unggulan</span>
        <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
      <Link
        href="/fasilitas"
        className="group inline-flex min-h-12 items-center justify-center gap-2 border border-primary bg-primary px-8 py-3.5 text-sm font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-primary-dark hover:shadow-md"
      >
        <span>Jelajahi Fasilitas</span>
        <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default HeroActions;
