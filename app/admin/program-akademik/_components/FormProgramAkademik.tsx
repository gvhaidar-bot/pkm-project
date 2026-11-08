"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buatSlug } from "@/lib/slug";
import type { HasilAksi } from "../actions";
import MasukanFoto from "@/components/admin/MasukanFoto";
import ToolbarFormat, { PetunjukFormat } from "@/components/admin/ToolbarFormat";

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
        <ToolbarFormat areaRef={isiRef} />
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
        <PetunjukFormat tambahan="Judul bagian tampil sebagai subjudul hijau, daftar poin tampil sebagai daftar centang emas." />
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
