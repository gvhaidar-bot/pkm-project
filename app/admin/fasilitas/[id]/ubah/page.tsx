import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { urlFotoUtama } from "@/lib/foto";
import FormFasilitas from "../../_components/FormFasilitas";
import GaleriFasilitas from "../../_components/GaleriFasilitas";
import { ubahFasilitas } from "../../actions";

export const metadata = {
  title: "Ubah Fasilitas — Panel Admin",
  description: "Ubah fasilitas MTs Nurul Falah Serpong.",
};

async function KontenUbah({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const fasilitas = await prisma.fasilitas.findUnique({
    where: { id: Number(id) },
    include: { foto: { orderBy: { urutan: "asc" } } },
  });
  if (!fasilitas) notFound();
  return (
    <>
      <FormFasilitas fasilitas={{ ...fasilitas, gambarUrl: urlFotoUtama(fasilitas.foto) }} aksi={ubahFasilitas} />
      <GaleriFasilitas fasilitasId={fasilitas.id} fotoAwal={fasilitas.foto} />
    </>
  );
}

function Kerangka() {
  return (
    <div className="animate-pulse rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <div className="space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-2xl bg-primary-soft" />
        ))}
      </div>
    </div>
  );
}

export default function UbahFasilitasPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Ubah Fasilitas</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Perubahan langsung tampil di website setelah disimpan.
      </p>
      <Suspense fallback={<Kerangka />}>
        <KontenUbah params={params} />
      </Suspense>
    </div>
  );
}
