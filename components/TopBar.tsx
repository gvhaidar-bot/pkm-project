import { LuAward, LuCalendar, LuMapPin } from "react-icons/lu";

export default function TopBar() {
  return (
    <div className="border-b border-primary-dark/40 bg-primary-dark text-white">
      <div className="mx-auto flex w-full max-w-300 items-center justify-between px-5 py-2 text-xs lg:px-6">
        <div className="flex items-center gap-2">
          <LuMapPin className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
          <span className="truncate font-medium text-white/90">
            Jl. Pahlawan No. 06, Cibadung, Gunungsindur, Bogor 16340
          </span>
        </div>
        <div className="hidden items-center gap-6 sm:flex">
          <span className="flex items-center gap-1.5 font-medium text-white/80">
            <LuCalendar className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            <span>Berdiri Sejak 2001</span>
          </span>
          <span className="h-3 w-px bg-white/20" aria-hidden="true" />
          <span className="flex items-center gap-1.5 font-semibold text-accent">
            <LuAward className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Akreditasi A (BAN-S/M)</span>
          </span>
        </div>
      </div>
    </div>
  );
}
