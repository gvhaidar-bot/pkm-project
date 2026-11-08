"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { buatSlug } from "@/lib/slug";
import { IKON_EKSTRAKURIKULER } from "@/components/ekstrakurikuler/ikon";
import type { HasilAksi } from "../actions";
import ToolbarFormat, { PetunjukFormat } from "@/components/admin/ToolbarFormat";

export type DataEkstrakurikuler = {
  id: number;
  nama: string;
  slug: string;
  deskripsi: string;
  tujuan: string;
  kegiatanRutin: string;
  fasilitas: string;
  jumlahAnggota: number | null;
  ikon: string;
  aktif: boolean;
  urutan: number;
};

type AksiForm = (sebelumnya: HasilAksi, formData: FormData) => Promise<HasilAksi>;

const inputCls =
  "flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none";

const areaCls =
  "w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none";

export default function FormEkstrakurikuler({
  ekstrakurikuler,
  aksi,
}: {
  ekstrakurikuler?: DataEkstrakurikuler;
  aksi: AksiForm;
}) {
  const [hasil, jalankan, menunggu] = useActionState(aksi, null);
  const [slug, setSlug] = useState(ekstrakurikuler?.slug ?? "");
  const slugManual = useRef(!!ekstrakurikuler);
  const deskripsiRef = useRef<HTMLTextAreaElement>(null);
  const tujuanRef = useRef<HTMLTextAreaElement>(null);
  const kegiatanRutinRef = useRef<HTMLTextAreaElement>(null);
  const fasilitasRef = useRef<HTMLTextAreaElement>(null);

  function saatNamaBerubah(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugManual.current) setSlug(buatSlug(e.target.value));
  }

  return (
    <form action={jalankan} className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      {ekstrakurikuler && <input type="hidden" name="id" value={ekstrakurikuler.id} />}

      <div>
        <label htmlFor="nama" className="mb-1.5 block text-sm font-semibold text-ink">
          Nama ekstrakurikuler
        </label>
        <input
          id="nama"
          name="nama"
          type="text"
          required
          defaultValue={ekstrakurikuler?.nama ?? ""}
          onChange={saatNamaBerubah}
          placeholder="Nama ekstrakurikuler"
          className={inputCls}
        />
      </div>

      <div>
        <label htmlFor="slug" className="mb-1.5 block text-sm font-semibold text-ink">
          Slug (alamat URL)
        </label>
        <input
          id="slug"
          name="slug"
          type="text"
          value={slug}
          onChange={(e) => {
            slugManual.current = true;
            setSlug(e.target.value);
          }}
          placeholder="nama-ekstrakurikuler"
          className={inputCls}
        />
        <p className="mt-1.5 text-sm text-muted">Terisi otomatis dari nama, bisa diubah manual.</p>
      </div>

      <div>
        <label htmlFor="deskripsi" className="mb-1.5 block text-sm font-semibold text-ink">
          Deskripsi singkat
        </label>
        <ToolbarFormat areaRef={deskripsiRef} />
        <textarea
          id="deskripsi"
          name="deskripsi"
          rows={2}
          required
          ref={deskripsiRef}
          defaultValue={ekstrakurikuler?.deskripsi ?? ""}
          placeholder="Satu-dua kalimat yang tampil di kartu"
          className={areaCls}
        />
        <PetunjukFormat />
      </div>

      <div>
        <label htmlFor="ikon" className="mb-1.5 block text-sm font-semibold text-ink">
          Ikon
        </label>
        <select
          id="ikon"
          name="ikon"
          defaultValue={ekstrakurikuler?.ikon ?? "sains"}
          className={inputCls}
        >
          {Object.entries(IKON_EKSTRAKURIKULER).map(([kunci, { label }]) => (
            <option key={kunci} value={kunci}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="jumlahAnggota" className="mb-1.5 block text-sm font-semibold text-ink">
            Jumlah anggota
          </label>
          <input
            id="jumlahAnggota"
            name="jumlahAnggota"
            type="number"
            min={0}
            defaultValue={ekstrakurikuler?.jumlahAnggota ?? ""}
            placeholder="Opsional"
            className={inputCls}
          />
          <p className="mt-1.5 text-sm text-muted">Kosongkan bila tidak ingin menampilkan badge.</p>
        </div>
        <div>
          <label htmlFor="urutan" className="mb-1.5 block text-sm font-semibold text-ink">
            Urutan tampil
          </label>
          <input
            id="urutan"
            name="urutan"
            type="number"
            min={0}
            defaultValue={ekstrakurikuler?.urutan ?? 0}
            className={inputCls}
          />
          <p className="mt-1.5 text-sm text-muted">Angka kecil tampil lebih dulu di website.</p>
        </div>
      </div>

      <div>
        <label htmlFor="tujuan" className="mb-1.5 block text-sm font-semibold text-ink">
          Tujuan kegiatan
        </label>
        <ToolbarFormat areaRef={tujuanRef} />
        <textarea
          id="tujuan"
          name="tujuan"
          rows={5}
          required
          ref={tujuanRef}
          defaultValue={ekstrakurikuler?.tujuan ?? ""}
          placeholder="Tulis satu tujuan per baris"
          className={`${areaCls} leading-relaxed`}
        />
        <PetunjukFormat tambahan="Tulis satu tujuan per baris; tiap baris tampil sebagai butir daftar." />
      </div>

      <div>
        <label htmlFor="kegiatanRutin" className="mb-1.5 block text-sm font-semibold text-ink">
          Kegiatan rutin
        </label>
        <ToolbarFormat areaRef={kegiatanRutinRef} />
        <textarea
          id="kegiatanRutin"
          name="kegiatanRutin"
          rows={5}
          required
          ref={kegiatanRutinRef}
          defaultValue={ekstrakurikuler?.kegiatanRutin ?? ""}
          placeholder="Tulis satu kegiatan per baris"
          className={`${areaCls} leading-relaxed`}
        />
        <PetunjukFormat tambahan="Tulis satu kegiatan per baris; tiap baris tampil sebagai butir daftar." />
      </div>

      <div>
        <label htmlFor="fasilitas" className="mb-1.5 block text-sm font-semibold text-ink">
          Fasilitas & dukungan
        </label>
        <ToolbarFormat areaRef={fasilitasRef} />
        <textarea
          id="fasilitas"
          name="fasilitas"
          rows={5}
          required
          ref={fasilitasRef}
          defaultValue={ekstrakurikuler?.fasilitas ?? ""}
          placeholder="Tulis satu fasilitas per baris"
          className={`${areaCls} leading-relaxed`}
        />
        <PetunjukFormat tambahan="Tulis satu fasilitas per baris; tiap baris tampil sebagai butir daftar." />
      </div>

      <div className="pb-1">
        <label htmlFor="aktif" className="flex min-h-11 cursor-pointer items-center gap-3 text-base font-medium text-ink">
          <input
            id="aktif"
            name="aktif"
            type="checkbox"
            defaultChecked={ekstrakurikuler?.aktif ?? true}
            className="h-5 w-5 accent-[#0B5B3E]"
          />
          Tampilkan di website
        </label>
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
          href="/admin/ekstrakurikuler"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-8 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
