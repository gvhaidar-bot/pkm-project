import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";

const BATAS_GAGAL = 5;
const BLOKIR_MS = 15 * 60 * 1000;
const gagalLogin = new Map<string, { jumlah: number; sampai: number }>();

const HASH_DUMMY = "$2b$12$MGGErlXY.meZBQKuslvuAum4YkB2DJmtU94aJiXjFf/ZLc1gbr.mC";

function loginDiblokir(email: string): boolean {
  const data = gagalLogin.get(email);
  if (!data) return false;
  if (Date.now() > data.sampai) {
    gagalLogin.delete(email);
    return false;
  }
  return data.jumlah >= BATAS_GAGAL;
}

function catatLoginGagal(email: string) {
  const data = gagalLogin.get(email);
  const jumlah = (data?.jumlah ?? 0) + 1;
  gagalLogin.set(email, { jumlah, sampai: Date.now() + BLOKIR_MS });
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  session: { strategy: "jwt", maxAge: 8 * 60 * 60 },
  jwt: { maxAge: 8 * 60 * 60 },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Kata sandi", type: "password" },
      },
      authorize: async (credentials) => {
        const email = credentials?.email as string | undefined;
        const password = credentials?.password as string | undefined;
        if (!email || !password) return null;

        const kunci = email.toLowerCase().trim();
        if (loginDiblokir(kunci)) return null;

        const admin = await prisma.admin.findUnique({ where: { email } });
        const cocok = await bcrypt.compare(password, admin?.passwordHash ?? HASH_DUMMY);
        if (!admin || !cocok) {
          catatLoginGagal(kunci);
          return null;
        }

        gagalLogin.delete(kunci);
        return { id: String(admin.id), name: admin.nama, email: admin.email };
      },
    }),
  ],
});
