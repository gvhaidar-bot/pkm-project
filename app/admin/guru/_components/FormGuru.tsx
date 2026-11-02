"use client";

import { useActionState } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HasilAksi } from "../actions";

export type DataGuru = {
  id: number;
  nama: string;
  jabatan: string;
  bio: string | null;
  fotoUrl: string | null;
  urutan: number;
  aktif: boolean;
};

type AksiForm = (sebelumnya: HasilAksi, formData: FormData) => Promise<HasilAksi>;

export default function FormGuru({ guru, aksi }: { guru?: DataGuru; aksi: AksiForm }) {
  const [hasil, jalankan, menunggu] = useActionState(aksi, null);

  return (
    <form action={jalankan} className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      {guru && <input type="hidden" name="id" value={guru.id} />}

      <div>
        <label htmlFor="nama" className="mb-1.5 block text-sm font-semibold text-ink">
          Nama lengkap
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          required
          defaultValue={guru?.nama ?? ""}
          placeholder="Nama guru"
          className="flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="jabatan" className="mb-1.5 block text-sm font-semibold text-ink">
          Jabatan
        </label>
        <input
          id="jabatan"
          name="jabatan"
          type="text"
          required
          defaultValue={guru?.jabatan ?? ""}
          placeholder="mis. Guru Matematika, Kepala Madrasah"
          className="flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="bio" className="mb-1.5 block text-sm font-semibold text-ink">
          Biodata singkat
        </label>
        <textarea
          id="bio"
          name="bio"
          rows={4}
          defaultValue={guru?.bio ?? ""}
          placeholder="Latar pendidikan dan pengalaman mengajar (tanpa data sensitif seperti NIP, alamat, atau nomor HP)"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="foto" className="mb-1.5 block text-sm font-semibold text-ink">
          Foto {guru ? "(kosongkan jika tidak diganti)" : ""}
        </label>
        {guru?.fotoUrl && (
          <div className="mb-3">
            <Image
              src={guru.fotoUrl}
              alt={`Foto ${guru.nama}`}
              width={120}
              height={120}
              className="h-24 w-24 rounded-2xl object-cover"
            />
          </div>
        )}
        <input
          id="foto"
          name="foto"
          type="file"
          accept="image/*"
          className="block w-full text-sm text-muted file:mr-4 file:min-h-11 file:rounded-full file:border-0 file:bg-primary-soft file:px-5 file:text-sm file:font-bold file:text-primary hover:file:bg-primary hover:file:text-white"
        />
        <p className="mt-1.5 text-sm text-muted">Format gambar, maksimal 2 MB.</p>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="urutan" className="mb-1.5 block text-sm font-semibold text-ink">
            Urutan tampil
          </label>
          <input
            id="urutan"
            name="urutan"
            type="number"
            min={0}
            defaultValue={guru?.urutan ?? 0}
            className="flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors focus:border-primary focus:outline-none"
          />
        </div>
        <div className="flex items-end pb-1">
          <label htmlFor="aktif" className="flex min-h-11 cursor-pointer items-center gap-3 text-base font-medium text-ink">
            <input
              id="aktif"
              name="aktif"
              type="checkbox"
              defaultChecked={guru?.aktif ?? true}
              className="h-5 w-5 accent-[#0B5B3E]"
            />
            Tampilkan di website
          </label>
        </div>
      </div>

      {hasil?.error && (
        <p role="alert" className="text-sm font-semibold text-red-700">
          {hasil.error}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={menunggu}
          className="inline-flex min-h-11 items-center rounded-full bg-primary px-8 text-base font-semibold text-white transition-colors hover:bg-primary-dark disabled:opacity-60"
        >
          {menunggu ? "Menyimpan..." : "Simpan"}
        </button>
        <Link
          href="/admin/guru"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-8 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
