"use client";

import { useActionState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import type { HasilAksi } from "../actions";
import MasukanFoto from "@/components/admin/MasukanFoto";
import ToolbarFormat, { PetunjukFormat } from "@/components/admin/ToolbarFormat";

export type DataPrestasi = {
  id: number;
  judul: string;
  deskripsi: string | null;
  tahun: number;
  tingkat: string | null;
  gambarUrl: string | null;
};

type AksiForm = (sebelumnya: HasilAksi, formData: FormData) => Promise<HasilAksi>;

const inputCls =
  "flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none";

export default function FormPrestasi({ prestasi, aksi }: { prestasi?: DataPrestasi; aksi: AksiForm }) {
  const [hasil, jalankan, menunggu] = useActionState(aksi, null);
  const deskripsiRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form action={jalankan} className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      {prestasi && <input type="hidden" name="id" value={prestasi.id} />}

      <div>
        <label htmlFor="judul" className="mb-1.5 block text-sm font-semibold text-ink">
          Judul prestasi
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          required
          defaultValue={prestasi?.judul ?? ""}
          placeholder="mis. Juara 1 Lomba Tahfidz Tingkat Kabupaten"
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
          rows={4}
          ref={deskripsiRef}
          defaultValue={prestasi?.deskripsi ?? ""}
          placeholder="Ceritakan prestasi ini: siapa, kapan, di mana"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base leading-relaxed text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
        <PetunjukFormat tambahan="Deskripsi tampil sebagai cuplikan singkat di beranda, jadi utamakan kalimat pertama." />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tahun" className="mb-1.5 block text-sm font-semibold text-ink">
            Tahun
          </label>
          <input
            id="tahun"
            name="tahun"
            type="number"
            min={1900}
            max={2100}
            required
            defaultValue={prestasi?.tahun ?? ""}
            placeholder="mis. 2026"
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="tingkat" className="mb-1.5 block text-sm font-semibold text-ink">
            Tingkat
          </label>
          <input
            id="tingkat"
            name="tingkat"
            type="text"
            defaultValue={prestasi?.tingkat ?? ""}
            placeholder="mis. Sekolah, Kecamatan, Kabupaten, Provinsi, Nasional"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        {prestasi?.gambarUrl && (
          <div className="mb-3">
            <Image
              src={prestasi.gambarUrl}
              alt={`Foto ${prestasi.judul}`}
              width={320}
              height={240}
              className="aspect-[4/3] w-80 rounded-2xl object-cover"
            />
          </div>
        )}
        <MasukanFoto label="Foto" catatan={prestasi ? "(kosongkan jika tidak diganti)" : undefined} />
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
          href="/admin/prestasi"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-8 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
