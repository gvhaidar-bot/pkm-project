import Link from "next/link";

const HeroActions = () => {
  return (
    <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
      <Link
        href="/program"
        className="inline-flex min-h-11 items-center justify-center bg-accent px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-accent-soft"
      >
        Lihat Program Unggulan
      </Link>
      <Link
        href="/fasilitas"
        className="inline-flex min-h-11 items-center justify-center bg-primary px-7 py-3.5 text-base font-bold text-white transition-colors hover:bg-primary-dark"
      >
        Lihat Fasilitas
      </Link>
    </div>
  );
};

export default HeroActions;
