"use client";

import { useState } from "react";
import { LuTrash2 } from "react-icons/lu";

export default function TombolHapus({
  nama,
  onHapus,
}: {
  nama: string;
  onHapus: () => Promise<void>;
}) {
  const [menunggu, setMenunggu] = useState(false);

  async function tangani() {
    if (!confirm(`Hapus "${nama}"? Tindakan ini tidak bisa dibatalkan.`)) return;
    setMenunggu(true);
    try {
      await onHapus();
    } finally {
      setMenunggu(false);
    }
  }

  return (
    <button
      type="button"
      onClick={tangani}
      disabled={menunggu}
      aria-label={`Hapus ${nama}`}
      className="flex h-11 w-11 items-center justify-center rounded-full text-red-700 transition-colors hover:bg-red-50 disabled:opacity-50"
    >
      <LuTrash2 className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
