import { Suspense } from "react";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { urlFotoUtama } from "@/lib/foto";
import FormGuru from "../../_components/FormGuru";
import GaleriGuru from "../../_components/GaleriGuru";
import { ubahGuru } from "../../actions";

export const metadata = {
  title: "Ubah Guru — Panel Admin",
  description: "Ubah data guru MTs Nurul Falah Serpong.",
};

async function FormUbah({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const guru = await prisma.guru.findUnique({
    where: { id: Number(id) },
    include: { foto: { orderBy: { urutan: "asc" } } },
  });
  if (!guru) notFound();
  return (
    <>
      <FormGuru guru={{ ...guru, fotoUrl: urlFotoUtama(guru.foto) }} aksi={ubahGuru} />
      <GaleriGuru guruId={guru.id} fotoAwal={guru.foto} />
    </>
  );
}

export default function UbahGuruPage({ params }: { params: Promise<{ id: string }> }) {

  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Ubah Guru</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Isi biodata yang layak tampil publik — tanpa NIP, alamat, atau nomor HP.
      </p>
      <Suspense
        fallback={
          <div className="animate-pulse rounded-3xl bg-white p-8 shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
            <div className="space-y-4">
              {[0, 1, 2, 3].map((i) => (
                <div key={i} className="h-14 rounded-2xl bg-primary-soft" />
              ))}
            </div>
          </div>
        }
      >
        <FormUbah params={params} />
      </Suspense>
    </div>
  );
}
