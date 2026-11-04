import FormProgramAkademik from "../_components/FormProgramAkademik";
import { tambahProgramAkademik } from "../actions";

export const metadata = {
  title: "Tambah Program Akademik — Panel Admin",
  description: "Tambah program akademik baru Madrasah Tsanawiyah.",
};

export default function TambahProgramAkademikPage() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Tambah Program Akademik</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Program nonaktif tidak tampil di website sampai diaktifkan.
      </p>
      <FormProgramAkademik aksi={tambahProgramAkademik} />
    </div>
  );
}
