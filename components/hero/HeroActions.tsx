import Link from "next/link";

const HeroActions = () => {
  return (
    <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
      <Link
        href="/program"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-primary-dark transition-colors hover:bg-accent-soft"
      >
        Lihat Program Unggulan
      </Link>
      <Link
        href="/fasilitas"
        className="inline-flex min-h-11 items-center justify-center rounded-full bg-white px-7 py-3.5 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
      >
        Lihat Fasilitas
      </Link>
    </div>
  );
};

export default HeroActions;
