import { Suspense } from "react";
import Image from "next/image";
import { LuEye, LuEyeOff, LuImage } from "react-icons/lu";
import { prisma } from "@/lib/prisma";
import TombolHapus from "@/components/admin/TombolHapus";
import FormUnggahGaleri from "./_components/FormUnggahGaleri";
import { hapusFotoGaleri, ubahAktifGaleri } from "./actions";

export const metadata = {
  title: "Kelola Galeri — Panel Admin",
  description: "Unggah, tampilkan, sembunyikan, dan hapus foto galeri MTs Nurul Falah Gunungsindur.",
};

function formatTanggal(tanggal: Date) {
  return tanggal.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

async function DaftarFoto() {
  const daftar = await prisma.galeri.findMany({
    orderBy: { createdAt: "desc" },
  });

  if (daftar.length === 0) {
    return (
      <div className="mt-8 rounded-3xl bg-white p-10 text-center shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
        <LuImage className="mx-auto h-12 w-12 text-accent" aria-hidden="true" />
        <p className="mt-4 text-lg font-bold text-ink">Belum ada foto galeri</p>
        <p className="mt-2 text-base text-muted">Unggah foto pertama lewat formulir di atas.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {daftar.map((foto) => (
        <figure
          key={foto.id}
          className="group relative overflow-hidden rounded-3xl border border-line bg-white shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
        >
          <div className="relative aspect-[4/3] bg-primary-soft">
            <Image
              src={foto.gambarUrl}
              alt={`Foto galeri ${formatTanggal(foto.createdAt)}`}
              fill
              className={`object-cover ${foto.aktif ? "" : "opacity-40 grayscale"}`}
            />
          </div>
          <figcaption className="flex items-center justify-between gap-2 px-3 py-2.5">
            <span className="text-xs font-semibold text-muted">
              {formatTanggal(foto.createdAt)}
              {!foto.aktif && " · Disembunyikan"}
            </span>
            <span className="flex items-center gap-1">
              <form action={ubahAktifGaleri.bind(null, foto.id, !foto.aktif)}>
                <button
                  type="submit"
                  aria-label={foto.aktif ? "Sembunyikan foto" : "Tampilkan foto"}
                  title={foto.aktif ? "Sembunyikan dari galeri" : "Tampilkan di galeri"}
                  className="flex h-11 w-11 items-center justify-center rounded-full text-primary transition-colors hover:bg-primary-soft"
                >
                  {foto.aktif ? (
                    <LuEye className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <LuEyeOff className="h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </form>
              <TombolHapus nama="foto galeri ini" id={foto.id} aksi={hapusFotoGaleri} />
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}

function KerangkaDaftar() {
  return (
    <div className="mt-8 grid animate-pulse grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className="aspect-[4/3] rounded-3xl bg-white" />
      ))}
    </div>
  );
}

export default function DaftarGaleriPage() {
  return (
    <div className="mx-auto w-full max-w-[1200px] px-5 py-10 lg:px-8">
      <div>
        <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Galeri</h1>
        <p className="mt-2 text-base text-muted">
          Unggah foto langsung ke galeri — tanpa perlu membuat kegiatan. Foto yang aktif
          tampil di halaman Galeri sebagai dinding foto.
        </p>
      </div>

      <FormUnggahGaleri />

      <Suspense fallback={<KerangkaDaftar />}>
        <DaftarFoto />
      </Suspense>
    </div>
  );
}
