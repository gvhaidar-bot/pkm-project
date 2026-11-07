import { Suspense, type ReactNode } from "react";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import TombolKeAtas from "@/components/TombolKeAtas";
import TopBar from "@/components/TopBar";

export default function PublikLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <TopBar />
      <Suspense fallback={<div className="h-[72px] bg-white" aria-hidden="true" />}>
        <Navbar />
      </Suspense>
      <main className="flex-1">{children}</main>
      <Suspense fallback={<div className="bg-primary-dark py-16" aria-hidden="true" />}>
        <Footer />
      </Suspense>
      <TombolKeAtas />
    </>
  );
}
