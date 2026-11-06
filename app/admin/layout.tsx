import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminShell from "@/components/admin/AdminShell";

// Area admin selalu dirender per sesi (tidak pernah statis): pemeriksaan sesi
// di bawah membaca cookie, sehingga halaman admin tidak boleh di-prerender.
export const instant = false;

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const session = await auth();
  if (!session?.user) redirect("/login");
  return <AdminShell>{children}</AdminShell>;
}
