import FormBerita from "../_components/FormBerita";
import { tambahBerita } from "../actions";

export const metadata = {
  title: "Tulis Berita — Panel Admin",
  description: "Tulis berita baru Madrasah Tsanawiyah.",
};

export default function TambahBeritaPage() {
  return (
    <div className="mx-auto w-full max-w-[800px] px-5 py-10 lg:px-8">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">Kelola Konten</p>
      <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-ink">Tulis Berita</h1>
      <p className="mt-2 mb-6 text-base text-muted">
        Berita berstatus draf tidak tampil di website sampai diterbitkan.
      </p>
      <FormBerita aksi={tambahBerita} />
    </div>
  );
}
