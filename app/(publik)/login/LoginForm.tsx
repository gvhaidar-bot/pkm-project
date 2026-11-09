"use client";

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { LuCircleAlert } from "react-icons/lu";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);

    if (result?.error) {
      setError("Email atau kata sandi tidak cocok. Silakan coba kembali.");
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-xs font-bold tracking-wider text-primary-dark uppercase">
          Alamat Email Admin
        </label>
        <input
          id="email"
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@mtsnurulfalah.sch.id"
          className="flex min-h-11 w-full items-center border border-line bg-cream/30 px-4 text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-accent focus:bg-white focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-xs font-bold tracking-wider text-primary-dark uppercase">
          Kata Sandi
        </label>
        <input
          id="password"
          type="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••••••"
          className="flex min-h-11 w-full items-center border border-line bg-cream/30 px-4 text-sm text-ink transition-colors placeholder:text-muted/60 focus:border-accent focus:bg-white focus:outline-none"
        />
      </div>

      {error && (
        <div role="alert" className="flex items-start gap-2 border border-red-200 bg-red-50 p-3 text-xs font-medium text-red-800">
          <LuCircleAlert className="mt-0.5 h-4 w-4 shrink-0 text-red-600" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex min-h-11 w-full items-center justify-center border border-primary bg-primary px-6 text-xs font-bold tracking-[0.14em] text-white uppercase transition-all duration-200 hover:bg-primary-dark disabled:opacity-60"
      >
        {loading ? "Memverifikasi Akun..." : "Masuk ke Panel Admin"}
      </button>
    </form>
  );
}
