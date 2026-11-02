import { Suspense, type ReactNode } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";

export default function PublikLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-[72px] bg-white" aria-hidden="true" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
