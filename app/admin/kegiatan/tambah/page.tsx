import FormKegiatan from "../_components/FormKegiatan";
import { tambahKegiatan } from "../actions";

export const metadata = {
  title: "Tambah Kegiatan — Panel Admin",
  description: "Tambah kegiatan baru MTs Nurul Falah Serpong.",
};

export default function TambahKegiatanPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Tambah Kegiatan</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Setelah disimpan, tambahkan foto-foto kegiatan lewat halaman ubah.
      </p>
      <FormKegiatan aksi={tambahKegiatan} />
    </div>
  );
}
