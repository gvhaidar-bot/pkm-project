import { Suspense } from "react";
import { prisma } from "@/lib/prisma";
import FormBerita from "../_components/FormBerita";
import { tambahBerita } from "../actions";

export const metadata = {
  title: "Tulis Berita — Panel Admin",
  description: "Tulis berita baru MTs Nurul Falah Serpong.",
};

async function KontenTambah() {
  const daftarKategori = await prisma.kategoriBerita.findMany({ orderBy: { id: "asc" } });
  return <FormBerita aksi={tambahBerita} daftarKategori={daftarKategori} />;
}

function Kerangka() {
  return (
    <div className="animate-pulse rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <div className="space-y-4">
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} className="h-14 rounded-2xl bg-primary-soft" />
        ))}
      </div>
    </div>
  );
}

export default function TambahBeritaPage() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Tulis Berita</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Berita berstatus draf tidak tampil di website sampai diterbitkan.
      </p>
      <Suspense fallback={<Kerangka />}>
        <KontenTambah />
      </Suspense>
    </div>
  );
}
