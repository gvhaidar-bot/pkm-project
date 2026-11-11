"use client";

import { useActionState } from "react";
import { LuUpload } from "react-icons/lu";
import MasukanFoto from "@/components/admin/MasukanFoto";
import { tambahFotoGaleri } from "../actions";

export default function FormUnggahGaleri() {
  const [hasil, aksi, menunggu] = useActionState(tambahFotoGaleri, null);

  return (
    <form
      action={aksi}
      className="mt-8 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
    >
      <MasukanFoto
        nama="foto"
        label="Foto galeri"
        banyak
        teksBantuan="Pilih satu atau beberapa foto sekaligus (maksimal 10). Format JPG, PNG, atau WebP, maksimal 2 MB per foto. Foto tampil di halaman Galeri."
      />
      {hasil?.error && (
        <p role="alert" className="mt-3 text-sm font-semibold text-red-700">
          {hasil.error}
        </p>
      )}
      <button
        type="submit"
        disabled={menunggu}
        className="mt-4 inline-flex min-h-11 items-center gap-2 rounded-full bg-primary px-6 text-base font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-50"
      >
        <LuUpload className="h-5 w-5" aria-hidden="true" />
        {menunggu ? "Mengunggah..." : "Unggah Foto"}
      </button>
    </form>
  );
}
