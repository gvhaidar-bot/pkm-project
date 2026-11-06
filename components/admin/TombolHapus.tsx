"use client";

import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";

export default function TombolHapus({
  nama,
  id,
  aksi,
}: {
  nama: string;
  id: number;
  aksi: (id: number) => Promise<void>;
}) {
  const [menunggu, setMenunggu] = useState(false);
  const [galat, setGalat] = useState<string | null>(null);

  async function tangani() {
    if (!confirm(`Hapus "${nama}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setMenunggu(true);
    setGalat(null);
    try {
      await aksi(id);
    } catch {
      setGalat("Gagal menghapus. Coba lagi.");
    } finally {
      setMenunggu(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={tangani}
        disabled={menunggu}
        aria-label={`Hapus ${nama}`}
        className="flex h-11 w-11 items-center justify-center rounded-full text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
      >
        <LuTrash2 className="h-5 w-5" aria-hidden="true" />
      </button>
      {galat && (
        <span role="alert" className="text-xs font-semibold text-red-700">
          {galat}
        </span>
      )}
    </>
  );
}
