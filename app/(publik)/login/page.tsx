import Image from "next/image";
import Link from "next/link";
import { LuArrowLeft, LuShieldCheck } from "react-icons/lu";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login Admin",
  description: "Portal masuk pengelola dan tim administrator website MTs Nurul Falah Serpong.",
};

export default function LoginPage() {
  return (
    <main className="flex min-h-[85vh] items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-md border border-line border-t-4 border-t-accent bg-white p-8 shadow-md sm:p-10">
        <div className="flex items-center justify-between border-b border-line pb-6">
          <Link href="/" className="flex items-center gap-3" aria-label="Kembali ke beranda">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center border border-accent/40 bg-primary-soft p-1">
              <Image src="/logo.svg" alt="Logo MTs Nurul Falah Serpong" width={40} height={40} className="h-9 w-9 object-contain" />
            </div>
            <span className="flex flex-col leading-tight">
              <span className="font-serif text-base font-bold text-primary-dark">
                MTs Nurul Falah
              </span>
              <span className="text-[10px] font-bold tracking-widest text-accent uppercase">
                Portal Pengelola
              </span>
            </span>
          </Link>
          <Link
            href="/"
            className="flex items-center gap-1 text-xs font-semibold text-muted hover:text-primary"
            aria-label="Kembali ke beranda"
          >
            <LuArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Beranda</span>
          </Link>
        </div>

        <div className="mt-6">
          <div className="flex items-center gap-2">
            <LuShieldCheck className="h-5 w-5 text-accent" aria-hidden="true" />
            <span className="text-xs font-bold tracking-wider text-muted uppercase">Autentikasi Aman</span>
          </div>
          <h1 className="mt-2 font-serif text-2xl font-black tracking-tight text-primary-dark">
            Masuk sebagai Admin
          </h1>
          <p className="mt-1 text-xs text-muted leading-relaxed">
            Akses khusus staf pengelola website dan madrasah.
          </p>
        </div>

        <LoginForm />

        <div className="mt-8 border-t border-line/60 pt-4 text-center">
          <p className="text-[11px] text-muted">
            MTs Nurul Falah Serpong · Sistem Informasi Manajemen
          </p>
        </div>
      </div>
    </main>
  );
}
