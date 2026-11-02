import FormPrestasi from "../_components/FormPrestasi";
import { tambahPrestasi } from "../actions";

export const metadata = {
  title: "Tambah Prestasi — Panel Admin",
  description: "Tambah prestasi baru Madrasah Tsanawiyah.",
};

export default function TambahPrestasiPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Tambah Prestasi</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Prestasi tersimpan akan tampil di section Prestasi homepage.
      </p>
      <FormPrestasi aksi={tambahPrestasi} />
    </div>
  );
}
