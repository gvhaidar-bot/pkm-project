import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import FormKegiatan, { type DataKegiatan } from "../../_components/FormKegiatan";
import GaleriKegiatan from "../../_components/GaleriKegiatan";
import { ubahKegiatan } from "../../actions";

export const metadata = {
  title: "Ubah Kegiatan — Panel Admin",
  description: "Ubah kegiatan MTs Nurul Falah Serpong.",
};

function keTanggalLokal(tanggal: Date) {
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${tanggal.getFullYear()}-${pad(tanggal.getMonth() + 1)}-${pad(tanggal.getDate())}T${pad(tanggal.getHours())}:${pad(tanggal.getMinutes())}`;
}

async function KontenUbah({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const kegiatan = await prisma.kegiatan.findUnique({
    where: { id: Number(id) },
    include: { foto: { orderBy: { urutan: "asc" } } },
  });
  if (!kegiatan) notFound();

  const data: DataKegiatan = {
    id: kegiatan.id,
    judul: kegiatan.judul,
    deskripsi: kegiatan.deskripsi,
    tanggalAwal: keTanggalLokal(kegiatan.tanggal),
    lokasi: kegiatan.lokasi,
    gambarUrl: kegiatan.gambarUrl,
  };

  return (
    <>
      <FormKegiatan kegiatan={data} aksi={ubahKegiatan} />
      <GaleriKegiatan kegiatanId={kegiatan.id} fotoAwal={kegiatan.foto} />
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

export default function UbahKegiatanPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Ubah Kegiatan</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Perubahan langsung tampil di website setelah disimpan.
      </p>
      <Suspense fallback={<Kerangka />}>
        <KontenUbah params={params} />
      </Suspense>
    </div>
  );
}
