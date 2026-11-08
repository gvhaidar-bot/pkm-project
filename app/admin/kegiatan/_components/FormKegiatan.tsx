"use client";

import { useActionState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import MasukanFoto from "@/components/admin/MasukanFoto";
import type { HasilAksi } from "../actions";
import ToolbarFormat, { PetunjukFormat } from "@/components/admin/ToolbarFormat";

export type DataKegiatan = {
  id: number;
  judul: string;
  deskripsi: string;
  tanggalAwal: string;
  lokasi: string | null;
  gambarUrl: string | null;
};

type AksiForm = (sebelumnya: HasilAksi, formData: FormData) => Promise<HasilAksi>;

const inputCls =
  "flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none";

export default function FormKegiatan({ kegiatan, aksi }: { kegiatan?: DataKegiatan; aksi: AksiForm }) {
  const [hasil, jalankan, menunggu] = useActionState(aksi, null);
  const deskripsiRef = useRef<HTMLTextAreaElement>(null);

  return (
    <form action={jalankan} className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      {kegiatan && <input type="hidden" name="id" value={kegiatan.id} />}

      <div>
        <label htmlFor="judul" className="mb-1.5 block text-sm font-semibold text-ink">
          Judul kegiatan
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          required
          defaultValue={kegiatan?.judul ?? ""}
          placeholder="mis. Peringatan Hari Santri Nasional 2026"
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
          defaultValue={kegiatan?.deskripsi ?? ""}
          placeholder="Ceritakan kegiatannya: rangkaian acara, peserta, hasil"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base leading-relaxed text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
        <PetunjukFormat />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="tanggal" className="mb-1.5 block text-sm font-semibold text-ink">
            Tanggal & jam
          </label>
          <input
            id="tanggal"
            name="tanggal"
            type="datetime-local"
            required
            defaultValue={kegiatan?.tanggalAwal ?? ""}
            className={inputCls}
          />
        </div>
        <div>
          <label htmlFor="lokasi" className="mb-1.5 block text-sm font-semibold text-ink">
            Lokasi
          </label>
          <input
            id="lokasi"
            name="lokasi"
            type="text"
            defaultValue={kegiatan?.lokasi ?? ""}
            placeholder="mis. Aula Madrasah"
            className={inputCls}
          />
        </div>
      </div>

      <div>
        {kegiatan?.gambarUrl && (
          <div className="mb-3">
            <Image
              src={kegiatan.gambarUrl}
              alt={`Foto ${kegiatan.judul}`}
              width={320}
              height={240}
              className="aspect-[4/3] w-80 rounded-2xl object-cover"
            />
          </div>
        )}
        <MasukanFoto
          label="Foto sampul"
          catatan={kegiatan ? "(kosongkan jika tidak diganti)" : undefined}
        />
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
          href="/admin/kegiatan"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-8 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
