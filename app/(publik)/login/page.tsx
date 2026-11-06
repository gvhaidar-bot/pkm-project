import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import LoginForm from "./LoginForm";

export const metadata = {
  title: "Login Admin — Madrasah Tsanawiyah",
  description: "Halaman login khusus pengelola website Madrasah Tsanawiyah.",
};

export default async function LoginPage() {
  await connection();
  const session = await auth();
  if (session?.user?.email) redirect("/admin");
  return (
    <main className="flex min-h-[80vh] items-center justify-center bg-cream px-5 py-16">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <Link href="/" className="flex items-center gap-3" aria-label="Kembali ke beranda">
          <Image src="/logo.svg" alt="Logo Madrasah Tsanawiyah" width={44} height={44} className="h-11 w-11" />
          <span className="flex flex-col leading-tight">
            <span className="text-[17px] font-extrabold tracking-tight text-primary-dark">
              Madrasah Tsanawiyah
            </span>
            <span className="text-[11px] font-bold tracking-[0.14em] text-primary uppercase">
              Login Admin
            </span>
          </span>
        </Link>

        <h1 className="mt-6 text-2xl font-bold tracking-tight text-ink">Masuk sebagai Admin</h1>
        <p className="mt-2 text-base leading-relaxed text-muted">
          Khusus pengelola website. Akun dibuat langsung oleh tim, tidak ada pendaftaran mandiri.
        </p>

        <LoginForm />
      </div>
    </main>
  );
}
