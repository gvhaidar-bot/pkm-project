"use client";

import { useState } from "react";

const MAKS_BYTE = 2 * 1024 * 1024;
const TIPE_DIIZINKAN = ["image/jpeg", "image/png", "image/webp"];

export default function MasukanFoto({
  id = "foto",
  nama = "foto",
  label = "Foto",
  catatan,
  banyak = false,
  teksBantuan = "Format JPG, PNG, atau WebP, maksimal 2 MB.",
}: {
  id?: string;
  nama?: string;
  label?: string;
  catatan?: string;
  banyak?: boolean;
  teksBantuan?: string;
}) {
  const [galat, setGalat] = useState<string | null>(null);

  function periksa(pilihan: React.ChangeEvent<HTMLInputElement>) {
    const berkas = pilihan.target.files;
    if (!berkas || berkas.length === 0) {
      setGalat(null);
      return;
    }
    for (const f of Array.from(berkas)) {
      if (!TIPE_DIIZINKAN.includes(f.type)) {
        setGalat(`"${f.name}" bukan foto JPG, PNG, atau WebP.`);
        pilihan.target.value = "";
        return;
      }
      if (f.size > MAKS_BYTE) {
        setGalat(`"${f.name}" (${(f.size / 1048576).toFixed(1)} MB) melebihi batas 2 MB per foto.`);
        pilihan.target.value = "";
        return;
      }
    }
    setGalat(null);
  }

  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-semibold text-ink">
        {label} {catatan ? <span className="font-normal text-muted">{catatan}</span> : null}
      </label>
      <input
        id={id}
        name={nama}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        multiple={banyak || undefined}
        onChange={periksa}
        className="block w-full text-sm text-muted file:mr-4 file:min-h-11 file:rounded-full file:border-0 file:bg-primary-soft file:px-5 file:text-sm file:font-bold file:text-primary hover:file:bg-primary hover:file:text-white"
      />
      <p className="mt-1.5 text-sm text-muted">{teksBantuan}</p>
      {galat && (
        <p role="alert" className="mt-1.5 text-sm font-semibold text-red-700">
          {galat}
        </p>
      )}
    </div>
  );
}
