import FormGuru from "../_components/FormGuru";
import { tambahGuru } from "../actions";

export const metadata = {
  title: "Tambah Guru — Panel Admin",
  description: "Tambah data guru baru MTs Nurul Falah Gunungsindur.",
};

export default function TambahGuruPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Tambah Guru</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Isi biodata yang layak tampil publik — tanpa NIP, alamat, atau nomor HP.
      </p>
      <FormGuru aksi={tambahGuru} />
    </div>
  );
}
