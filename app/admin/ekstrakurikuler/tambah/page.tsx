import FormEkstrakurikuler from "../_components/FormEkstrakurikuler";
import { tambahEkstrakurikuler } from "../actions";

export const metadata = {
  title: "Tambah Ekstrakurikuler — Panel Admin",
  description: "Tambah ekstrakurikuler baru Madrasah Tsanawiyah.",
};

export default function TambahEkstrakurikulerPage() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Tambah Ekstrakurikuler</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Ekstrakurikuler nonaktif tidak tampil di website sampai diaktifkan.
      </p>
      <FormEkstrakurikuler aksi={tambahEkstrakurikuler} />
    </div>
  );
}
