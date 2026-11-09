import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import FormPengaturan from "./_components/FormPengaturan";

export const metadata = {
  title: "Pengaturan — Panel Admin",
  description: "Atur tampilan website MTs Nurul Falah Serpong.",
};

async function muatPengaturan() {
  try {
    const data = await prisma.pengaturan.findUnique({
      where: { kunci: "tampilkanBeritaFooter" },
    });
    return data?.nilai !== "false";
  } catch {
    return true;
  }
}

function KerangkaPengaturan() {
  return (
    <div className="h-64 animate-pulse bg-primary-soft/40" aria-hidden="true" />
  );
}

async function IsiPengaturan() {
  const tampilkanBeritaFooter = await muatPengaturan();
  return <FormPengaturan tampilkanBeritaFooter={tampilkanBeritaFooter} />;
}

export default function PengaturanPage() {
  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-8 lg:px-6">
      <h1 className="font-serif text-2xl font-black tracking-tight text-primary">
        Pengaturan
      </h1>
      <p className="mt-1 text-base text-secondary">
        Atur tampilan website MTs Nurul Falah Serpong.
      </p>

      <Suspense fallback={<KerangkaPengaturan />}>
        <IsiPengaturan />
      </Suspense>
    </div>
  );
}