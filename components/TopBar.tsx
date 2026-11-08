import { LuMapPin } from "react-icons/lu";

export default function TopBar() {
  return (
    <div className="bg-primary text-white">
      <div className="mx-auto flex w-full max-w-300 items-center justify-center gap-2 px-5 py-1.5 text-center lg:px-6">
        <LuMapPin className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
        <p className="truncate text-xs font-semibold tracking-wide">
          Lengkong Gudang, Serpong, Tangerang Selatan, Banten 15310
        </p>
      </div>
    </div>
  );
}
