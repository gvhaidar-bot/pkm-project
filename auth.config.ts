import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      // Seluruh area /admin (termasuk server action yang dipanggil dari sana)
      // hanya boleh diakses dengan sesi admin yang aktif.
      if (request.nextUrl.pathname.startsWith("/admin")) {
        return Boolean(auth?.user);
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
