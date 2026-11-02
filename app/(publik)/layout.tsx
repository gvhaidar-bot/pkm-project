import type { ReactNode } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";

export default function PublikLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
