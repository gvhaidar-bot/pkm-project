"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buatSlug } from "@/lib/slug";
import { IKON_EKSTRAKURIKULER } from "@/components/ekstrakurikuler/ikon";
import type { HasilAksi } from "../actions";
import MasukanFoto from "@/components/admin/MasukanFoto";
import ToolbarFormat, { PetunjukFormat } from "@/components/admin/ToolbarFormat";

export type DataEkstrakurikuler = {
  id: number;
  nama: string;
  slug: string;
  deskripsi: string;
  tujuan: string;
  kegiatanRutin: string;
  fasilitas: string;
  gambarUrl: string | null;
  jadwal: string | null;
  lokasi: string | null;
  biaya: string | null;
  pembimbing: string | null;
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
        {ekstrakurikuler?.gambarUrl && (
          <div className="mb-3">
            <Image
              src={ekstrakurikuler.gambarUrl}
              alt={`Foto ${ekstrakurikuler.nama}`}
              width={640}
              height={360}
              className="aspect-video w-full max-w-md rounded-2xl object-cover"
            />
          </div>
        )}
        <MasukanFoto
          label="Foto kegiatan"
          catatan={ekstrakurikuler ? "(kosongkan jika tidak diganti)" : undefined}
          teksBantuan="Format gambar, maksimal 2 MB. Foto tampil sebagai spanduk lebar di halaman detail."
        />
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

      <fieldset className="rounded-2xl border border-line bg-cream/60 p-5">
        <legend className="px-2 text-sm font-bold text-ink">Informasi Penting (opsional)</legend>
        <p className="mb-4 text-sm leading-relaxed text-muted">
          Tampil di kartu &ldquo;Informasi Penting&rdquo; halaman detail. Kosongkan bila belum ada datanya.
        </p>
        <div className="space-y-4">
          <div>
            <label htmlFor="jadwal" className="mb-1.5 block text-sm font-semibold text-ink">
              Jadwal
            </label>
            <input
              id="jadwal"
              name="jadwal"
              type="text"
              defaultValue={ekstrakurikuler?.jadwal ?? ""}
              placeholder="Contoh: Setiap Sabtu, 08.00–10.00 WIB"
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
              defaultValue={ekstrakurikuler?.lokasi ?? ""}
              placeholder="Contoh: Lapangan madrasah"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="biaya" className="mb-1.5 block text-sm font-semibold text-ink">
              Biaya
            </label>
            <input
              id="biaya"
              name="biaya"
              type="text"
              defaultValue={ekstrakurikuler?.biaya ?? ""}
              placeholder="Contoh: Gratis / Rp25.000 per bulan"
              className={inputCls}
            />
          </div>
          <div>
            <label htmlFor="pembimbing" className="mb-1.5 block text-sm font-semibold text-ink">
              Pembimbing
            </label>
            <input
              id="pembimbing"
              name="pembimbing"
              type="text"
              defaultValue={ekstrakurikuler?.pembimbing ?? ""}
              placeholder="Contoh: Nama pembimbing"
              className={inputCls}
            />
          </div>
        </div>
      </fieldset>

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
