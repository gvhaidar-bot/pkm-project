"use client";

import { useActionState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HasilAksi } from "../actions";
import MasukanFoto from "@/components/admin/MasukanFoto";
import ToolbarFormat, { PetunjukFormat } from "@/components/admin/ToolbarFormat";

export type DataFasilitas = {
  id: number;
  nama: string;
  deskripsi: string;
  gambarUrl: string | null;
  urutan: number;
  aktif: boolean;
  unggulan: boolean;
};

type AksiForm = (sebelumnya: HasilAksi, formData: FormData) => Promise<HasilAksi>;

const inputCls =
  "flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none";

export default function FormFasilitas({ fasilitas, aksi }: { fasilitas?: DataFasilitas; aksi: AksiForm }) {
  const [hasil, jalankan, menunggu] = useActionState(aksi, null);
  const deskripsiRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form action={jalankan} className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      {fasilitas && <input type="hidden" name="id" value={fasilitas.id} />}

      <div>
        <label htmlFor="nama" className="mb-1.5 block text-sm font-semibold text-ink">
          Nama fasilitas
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          required
          defaultValue={fasilitas?.nama ?? ""}
          placeholder="mis. Ruang Kelas, Laboratorium Komputer, Masjid"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="deskripsi" className="mb-1.5 block text-sm font-semibold text-ink">
          Deskripsi
        </label>
        <ToolbarFormat areaRef={deskripsiRef} />
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={5}
          required
          ref={deskripsiRef}
          defaultValue={fasilitas?.deskripsi ?? ""}
          placeholder="Jelaskan fasilitas ini: fungsi, kapasitas, kondisi"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base leading-relaxed text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
        <PetunjukFormat />
      </div>

      <div>
        {fasilitas?.gambarUrl && (
          <div className="mb-3">
            <Image
              src={fasilitas.gambarUrl}
              alt={`Foto ${fasilitas.nama}`}
              width={320}
              height={240}
              className="aspect-[4/3] w-80 rounded-2xl object-cover"
            />
          </div>
        )}
        <MasukanFoto
          label="Foto"
          catatan={fasilitas ? "(kosongkan jika tidak diganti)" : undefined}
          teksBantuan="Format gambar, maksimal 2 MB. Rasio 4:3 disarankan."
        />
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
            defaultValue={fasilitas?.urutan ?? 0}
            className={inputCls}
          />
        </div>
        <div className="flex items-end pb-1">
          <label htmlFor="aktif" className="flex min-h-11 cursor-pointer items-center gap-3 text-base font-medium text-ink">
            <input
              id="aktif"
              name="aktif"
              type="checkbox"
              defaultChecked={fasilitas?.aktif ?? true}
              className="h-5 w-5 accent-[#0B5B3E]"
            />
            Tampilkan di website
          </label>
        </div>
      </div>

      <div>
        <div className="flex items-center pb-1">
          <label htmlFor="unggulan" className="flex min-h-11 cursor-pointer items-center gap-3 text-base font-medium text-ink">
            <input
              id="unggulan"
              name="unggulan"
              type="checkbox"
              defaultChecked={fasilitas?.unggulan ?? false}
              className="h-5 w-5 accent-[#0B5B3E]"
            />
            Tampilkan di Beranda
          </label>
        </div>
        <p className="text-sm text-muted">
          Fasilitas yang ditandai tampil di bagian Fasilitas pada halaman utama. Maksimal 6 fasilitas, diurutkan
          sesuai Urutan tampil.
        </p>
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
          href="/admin/fasilitas"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-8 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
