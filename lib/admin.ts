import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function adminLogin(): Promise<{ id: number; email: string } | null> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  const admin = await prisma.admin.findUnique({ where: { email } });
  if (!admin) return null;
  return { id: admin.id, email: admin.email };
}
