import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
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

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin || !admin.passwordHash) return null;

        const cocok = await bcrypt.compare(password, admin.passwordHash);
        if (!cocok) return null;

        return { id: String(admin.id), name: admin.nama, email: admin.email };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
