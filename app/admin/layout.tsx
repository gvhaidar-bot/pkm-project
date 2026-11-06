import type { ReactNode } from "react";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { auth } from "@/auth";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  await connection();
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  return <AdminShell>{children}</AdminShell>;
}
