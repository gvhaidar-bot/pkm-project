import Link from "next/link";
import { LuArrowRight } from "react-icons/lu";

const HeroActions = () => {
  return (
    <div className="mt-8 flex flex-col items-stretch gap-4 sm:flex-row sm:items-center">
      <Link
        href="/program/unggulan"
        className="group inline-flex min-h-12 items-center justify-center gap-2 border border-accent bg-accent px-8 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase transition-all duration-200 hover:bg-accent-soft hover:shadow-lg"
      >
        <span>Lihat Program Unggulan</span>
        <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
      <Link
        href="/fasilitas"
        className="group inline-flex min-h-12 items-center justify-center gap-2 border border-white/80 bg-white/10 px-8 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase backdrop-blur-xs transition-all duration-200 hover:bg-white hover:text-primary-dark hover:border-white hover:shadow-lg"
      >
        <span>Jelajahi Fasilitas</span>
        <LuArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
      </Link>
    </div>
  );
};

export default HeroActions;
