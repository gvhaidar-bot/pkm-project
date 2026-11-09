import { Suspense } from "react";
import Hero from "@/components/Hero";
import PemuatBeranda from "@/components/PemuatBeranda";
import TampilSaatScroll from "@/components/TampilSaatScroll";
import Statistik from "@/components/home/Statistik";
import KenapaMemilihKami from "@/components/home/KenapaMemilihKami";
import ProfilTeaser from "@/components/home/ProfilTeaser";
import BeritaTeaser from "@/components/home/BeritaTeaser";
import FasilitasTeaser from "@/components/home/FasilitasTeaser";
import GaleriTeaser from "@/components/home/GaleriTeaser";
import PrestasiTeaser from "@/components/home/PrestasiTeaser";
import CtaPenutup from "@/components/home/CtaPenutup";

function KerangkaKartu() {
  return (
    <div className="bg-cream py-20">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <div className="mx-auto h-10 w-72 animate-pulse bg-line/80" />
        <div className="mx-auto mt-4 h-4 w-96 max-w-full animate-pulse bg-line/60" />
        <div className="mt-12 grid animate-pulse grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-80 border border-line bg-white" />
          ))}
        </div>
      </div>
    </div>
  );
}

function KerangkaPita() {
  return <div className="h-36 animate-pulse bg-primary" aria-hidden="true" />;
}

export default function Home() {
  return (
    <div>
      <PemuatBeranda />
      <TampilSaatScroll>
        <Hero />
      </TampilSaatScroll>
      <Suspense fallback={<KerangkaPita />}>
        <TampilSaatScroll>
          <Statistik />
        </TampilSaatScroll>
      </Suspense>
      <TampilSaatScroll>
        <KenapaMemilihKami />
      </TampilSaatScroll>
      <TampilSaatScroll>
        <ProfilTeaser />
      </TampilSaatScroll>
      <Suspense fallback={<KerangkaKartu />}>
        <TampilSaatScroll>
          <BeritaTeaser />
        </TampilSaatScroll>
      </Suspense>
      <Suspense fallback={<KerangkaKartu />}>
        <TampilSaatScroll>
          <FasilitasTeaser />
        </TampilSaatScroll>
      </Suspense>
      <Suspense fallback={<KerangkaKartu />}>
        <TampilSaatScroll>
          <GaleriTeaser />
        </TampilSaatScroll>
      </Suspense>
      <Suspense fallback={<KerangkaKartu />}>
        <TampilSaatScroll>
          <PrestasiTeaser />
        </TampilSaatScroll>
      </Suspense>
      <TampilSaatScroll>
        <CtaPenutup />
      </TampilSaatScroll>
    </div>
  );
}
