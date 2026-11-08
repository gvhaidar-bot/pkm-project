"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { LuBold, LuHeading2, LuList, LuListOrdered } from "react-icons/lu";
import { buatSlug } from "@/lib/slug";
import type { HasilAksi } from "../actions";
import MasukanFoto from "@/components/admin/MasukanFoto";

export type DataProgramAkademik = {
  id: number;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string;
  gambarUrl: string | null;
  unggulan: boolean;
  aktif: boolean;
  urutan: number;
};

type AksiForm = (sebelumnya: HasilAksi, formData: FormData) => Promise<HasilAksi>;

const inputCls =
  "flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none";

export default function FormProgramAkademik({
  program,
  aksi,
}: {
  program?: DataProgramAkademik;
  aksi: AksiForm;
}) {
  const [hasil, jalankan, menunggu] = useActionState(aksi, null);
  const [slug, setSlug] = useState(program?.slug ?? "");
  const slugManual = useRef(!!program);
  const isiRef = useRef<HTMLTextAreaElement>(null);

  function awalanBarisBaru() {
    const area = isiRef.current;
    if (!area) return "";
    const sebelum = area.value.slice(0, area.selectionStart ?? area.value.length);
    return sebelum === "" || sebelum.endsWith("\n") ? "" : "\n";
  }

  function sisipkan(teks: string, pilihDari?: number, pilihSampai?: number) {
    const area = isiRef.current;
    if (!area) return;
    const awal = area.selectionStart ?? area.value.length;
    const akhir = area.selectionEnd ?? area.value.length;
    area.value = area.value.slice(0, awal) + teks + area.value.slice(akhir);
    area.focus();
    const dari = pilihDari !== undefined ? awal + pilihDari : awal + teks.length;
    const sampai = pilihSampai !== undefined ? awal + pilihSampai : dari;
    area.setSelectionRange(dari, sampai);
  }

  function tambahJudul() {
    const p = awalanBarisBaru();
    const judul = "Judul bagian";
    sisipkan(`${p}## ${judul}\n`, p.length + 3, p.length + 3 + judul.length);
  }

  function buatTebal() {
    const area = isiRef.current;
    if (!area) return;
    const awal = area.selectionStart ?? area.value.length;
    const akhir = area.selectionEnd ?? area.value.length;
    const teks = area.value.slice(awal, akhir) || "teks tebal";
    sisipkan(`**${teks}**`, 2, 2 + teks.length);
  }

  function tambahPoin() {
    const p = awalanBarisBaru();
    sisipkan(`${p}- `, p.length + 2, p.length + 2);
  }

  function tambahNomor() {
    const p = awalanBarisBaru();
    sisipkan(`${p}1. `, p.length + 3, p.length + 3);
  }

  function saatJudulBerubah(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugManual.current) setSlug(buatSlug(e.target.value));
  }

  return (
    <form action={jalankan} className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      {program && <input type="hidden" name="id" value={program.id} />}

      <div>
        <label htmlFor="judul" className="mb-1.5 block text-sm font-semibold text-ink">
          Judul program
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          required
          defaultValue={program?.judul ?? ""}
          onChange={saatJudulBerubah}
          placeholder="Nama program akademik"
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
          placeholder="nama-program"
          className={inputCls}
        />
        <p className="mt-1.5 text-sm text-muted">Terisi otomatis dari judul, bisa diubah manual.</p>
      </div>

      <div>
        <label htmlFor="ringkasan" className="mb-1.5 block text-sm font-semibold text-ink">
          Ringkasan
        </label>
        <textarea
          id="ringkasan"
          name="ringkasan"
          rows={3}
          required
          defaultValue={program?.ringkasan ?? ""}
          placeholder="Satu-dua kalimat yang tampil di kartu program"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="isi" className="mb-1.5 block text-sm font-semibold text-ink">
          Isi / deskripsi lengkap
        </label>
        <div className="mb-2 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={tambahJudul}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            <LuHeading2 className="h-4 w-4" aria-hidden="true" />
            Judul Bagian
          </button>
          <button
            type="button"
            onClick={buatTebal}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            <LuBold className="h-4 w-4" aria-hidden="true" />
            Tebal
          </button>
          <button
            type="button"
            onClick={tambahPoin}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            <LuList className="h-4 w-4" aria-hidden="true" />
            Poin
          </button>
          <button
            type="button"
            onClick={tambahNomor}
            className="inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft"
          >
            <LuListOrdered className="h-4 w-4" aria-hidden="true" />
            Nomor
          </button>
        </div>
        <textarea
          id="isi"
          name="isi"
          rows={10}
          required
          ref={isiRef}
          defaultValue={program?.isi ?? ""}
          placeholder="Tulis isi program. Tekan Enter untuk membuat paragraf baru."
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base leading-relaxed text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
        <p className="mt-1.5 text-sm leading-relaxed text-muted">
          Opsional: tombol di atas menyisipkan judul bagian, teks tebal, daftar poin, atau daftar bernomor.
          Judul bagian tampil sebagai subjudul hijau, daftar poin tampil sebagai daftar centang emas. Formatnya
          terlihat sebagai{" "}
          <code className="rounded bg-primary-soft px-1 py-0.5 text-[13px] font-semibold text-primary">## Judul</code>
          ,{" "}
          <code className="rounded bg-primary-soft px-1 py-0.5 text-[13px] font-semibold text-primary">**teks**</code>
          ,{" "}
          <code className="rounded bg-primary-soft px-1 py-0.5 text-[13px] font-semibold text-primary">- poin</code>{" "}
          dan{" "}
          <code className="rounded bg-primary-soft px-1 py-0.5 text-[13px] font-semibold text-primary">1. poin</code>
          . Tulis paragraf biasa saja juga bisa.
        </p>
      </div>

      <div>
        {program?.gambarUrl && (
          <div className="mb-3">
            <Image
              src={program.gambarUrl}
              alt={`Sampul ${program.judul}`}
              width={320}
              height={240}
              className="aspect-[4/3] w-80 rounded-2xl object-cover"
            />
          </div>
        )}
        <MasukanFoto
          label="Gambar sampul"
          catatan={program ? "(kosongkan jika tidak diganti)" : undefined}
          teksBantuan="Format gambar, maksimal 2 MB. Rasio 4:3 disarankan."
        />
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
          defaultValue={program?.urutan ?? 0}
          className={inputCls}
        />
        <p className="mt-1.5 text-sm text-muted">Angka kecil tampil lebih dulu di website.</p>
      </div>

      <div className="space-y-1 pb-1">
        <label htmlFor="unggulan" className="flex min-h-11 cursor-pointer items-center gap-3 text-base font-medium text-ink">
          <input
            id="unggulan"
            name="unggulan"
            type="checkbox"
            defaultChecked={program?.unggulan ?? false}
            className="h-5 w-5 accent-[#0B5B3E]"
          />
          Tandai sebagai unggulan (badge di kartu)
        </label>
        <label htmlFor="aktif" className="flex min-h-11 cursor-pointer items-center gap-3 text-base font-medium text-ink">
          <input
            id="aktif"
            name="aktif"
            type="checkbox"
            defaultChecked={program?.aktif ?? true}
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
          href="/admin/program-akademik"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-8 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
