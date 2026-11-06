import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { batasMasukTerlampaui, catatMasukBerhasil, catatMasukGagal } from "@/lib/rate-limit";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
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

        // Batas 5 percobaan gagal per email dalam 10 menit. Pesan galat
        // tetap umum agar penyerang tidak bisa membedakan akun yang ada.
        if (batasMasukTerlampaui(email)) return null;

        const admin = await prisma.admin.findUnique({ where: { email } });
        if (!admin || !admin.passwordHash) {
          catatMasukGagal(email);
          return null;
        }

        const cocok = await bcrypt.compare(password, admin.passwordHash);
        if (!cocok) {
          catatMasukGagal(email);
          return null;
        }

        catatMasukBerhasil(email);
        return { id: String(admin.id), name: admin.nama, email: admin.email };
      },
    }),
  ],
});
