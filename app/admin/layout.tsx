import type { ReactNode } from "react";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import AdminShell from "@/components/admin/AdminShell";

async function Penjaga({ children }: { children: ReactNode }) {
  await connection();
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  return <AdminShell>{children}</AdminShell>;
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-background">
          <p className="text-base font-semibold text-secondary">Memuat panel admin...</p>
        </div>
      }
    >
      <Penjaga>{children}</Penjaga>
    </Suspense>
  );
}
