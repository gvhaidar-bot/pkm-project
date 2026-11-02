"use client";

import { useActionState, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { buatSlug } from "@/lib/slug";
import type { HasilAksi } from "../actions";
import MasukanFoto from "@/components/admin/MasukanFoto";

export type DataBerita = {
  id: number;
  judul: string;
  slug: string;
  ringkasan: string;
  isi: string;
  gambarUrl: string | null;
  published: boolean;
};

type AksiForm = (sebelumnya: HasilAksi, formData: FormData) => Promise<HasilAksi>;

const inputCls =
  "flex min-h-11 w-full items-center rounded-2xl border border-line bg-white px-4 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none";

export default function FormBerita({ berita, aksi }: { berita?: DataBerita; aksi: AksiForm }) {
  const [hasil, jalankan, menunggu] = useActionState(aksi, null);
  const [slug, setSlug] = useState(berita?.slug ?? "");
  const slugManual = useRef(!!berita);

  function saatJudulBerubah(e: React.ChangeEvent<HTMLInputElement>) {
    if (!slugManual.current) setSlug(buatSlug(e.target.value));
  }

  return (
    <form action={jalankan} className="space-y-5 rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] sm:p-8">
      {berita && <input type="hidden" name="id" value={berita.id} />}

      <div>
        <label htmlFor="judul" className="mb-1.5 block text-sm font-semibold text-ink">
          Judul
        </label>
        <input
          id="judul"
          name="judul"
          type="text"
          required
          defaultValue={berita?.judul ?? ""}
          onChange={saatJudulBerubah}
          placeholder="Judul berita"
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
          placeholder="judul-berita"
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
          defaultValue={berita?.ringkasan ?? ""}
          placeholder="Satu-dua kalimat pembuka yang tampil di kartu berita"
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        <label htmlFor="isi" className="mb-1.5 block text-sm font-semibold text-ink">
          Isi berita
        </label>
        <textarea
          id="isi"
          name="isi"
          rows={10}
          required
          defaultValue={berita?.isi ?? ""}
          placeholder="Tulis isi berita. Pisahkan paragraf dengan satu baris kosong."
          className="w-full rounded-2xl border border-line bg-white px-4 py-3 text-base leading-relaxed text-ink transition-colors placeholder:text-muted focus:border-primary focus:outline-none"
        />
      </div>

      <div>
        {berita?.gambarUrl && (
          <div className="mb-3">
            <Image
              src={berita.gambarUrl}
              alt={`Sampul ${berita.judul}`}
              width={320}
              height={180}
              className="aspect-video w-80 rounded-2xl object-cover"
            />
          </div>
        )}
        <MasukanFoto
          label="Gambar sampul"
          catatan={berita ? "(kosongkan jika tidak diganti)" : undefined}
          teksBantuan="Format gambar, maksimal 2 MB. Rasio 16:9 disarankan."
        />
      </div>

      <div className="flex items-center pb-1">
        <label htmlFor="published" className="flex min-h-11 cursor-pointer items-center gap-3 text-base font-medium text-ink">
          <input
            id="published"
            name="published"
            type="checkbox"
            defaultChecked={berita?.published ?? false}
            className="h-5 w-5 accent-[#0B5B3E]"
          />
          Terbitkan (tampil di website)
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
          href="/admin/berita"
          className="inline-flex min-h-11 items-center rounded-full border border-line bg-white px-8 text-base font-semibold text-primary transition-colors hover:bg-primary-soft"
        >
          Batal
        </Link>
      </div>
    </form>
  );
}
