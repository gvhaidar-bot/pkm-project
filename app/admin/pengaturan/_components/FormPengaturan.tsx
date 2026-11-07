"use client";

import { useActionState } from "react";
import { simpanPengaturan, type HasilAksi } from "../actions";

export default function FormPengaturan({ tampilkanBeritaFooter }: { tampilkanBeritaFooter: boolean }) {
  const [hasil, aksi] = useActionState<HasilAksi, FormData>(simpanPengaturan, null);

  return (
    <form action={aksi} className="mt-8 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      <h2 className="text-lg font-extrabold text-ink">Footer Website</h2>
      <p className="mt-1 text-base text-muted">
        Atur bagian yang tampil di footer semua halaman publik.
      </p>

      <label className="mt-6 flex cursor-pointer items-start gap-3 rounded-2xl border border-line bg-cream px-4 py-4">
        <input
          type="checkbox"
          name="tampilkanBeritaFooter"
          defaultChecked={tampilkanBeritaFooter}
          className="mt-1 h-5 w-5 shrink-0 accent-[#0B5B3E]"
        />
        <span>
          <span className="block text-base font-bold text-ink">Tampilkan Berita Terbaru di Footer</span>
          <span className="mt-0.5 block text-sm leading-relaxed text-muted">
            Bila dicentang, kolom Berita Terbaru (3 berita terbit terbaru) tampil di footer. Bila tidak
            dicentang, kolom itu disembunyikan.
          </span>
        </span>
      </label>

      {hasil?.error && (
        <p className="mt-4 rounded-2xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700" role="alert">
          {hasil.error}
        </p>
      )}

      <button
        type="submit"
        className="mt-6 inline-flex min-h-11 items-center rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark"
      >
        Simpan Pengaturan
      </button>
    </form>
  );
}
