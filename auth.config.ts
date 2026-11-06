import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const masuk = !!auth?.user;
      const { pathname } = request.nextUrl;
      if (pathname.startsWith("/admin")) return masuk;
      if (pathname === "/login" && masuk) {
        return Response.redirect(new URL("/admin", request.nextUrl));
      }
      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
