import FormFasilitas from "../_components/FormFasilitas";
import { tambahFasilitas } from "../actions";

export const metadata = {
  title: "Tambah Fasilitas — Panel Admin",
  description: "Tambah fasilitas baru Madrasah Tsanawiyah.",
};

export default function TambahFasilitasPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Tambah Fasilitas</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Fasilitas yang dicentang aktif akan tampil di halaman Fasilitas website.
      </p>
      <FormFasilitas aksi={tambahFasilitas} />
    </div>
  );
}
