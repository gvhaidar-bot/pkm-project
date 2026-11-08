"use client";

import { LuBold, LuHeading2, LuList, LuListOrdered } from "react-icons/lu";
import type { RefObject } from "react";

const tombolCls =
  "inline-flex min-h-9 items-center gap-1.5 rounded-full border border-line bg-white px-3.5 text-sm font-semibold text-primary transition-colors hover:bg-primary-soft";

export default function ToolbarFormat({ areaRef }: { areaRef: RefObject<HTMLTextAreaElement | null> }) {
  function awalanBarisBaru() {
    const area = areaRef.current;
    if (!area) return "";
    const sebelum = area.value.slice(0, area.selectionStart ?? area.value.length);
    return sebelum === "" || sebelum.endsWith("\n") ? "" : "\n";
  }

  function sisipkan(teks: string, pilihDari?: number, pilihSampai?: number) {
    const area = areaRef.current;
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
    const area = areaRef.current;
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

  return (
    <div className="mb-2 flex flex-wrap gap-2">
      <button type="button" onClick={tambahJudul} className={tombolCls}>
        <LuHeading2 className="h-4 w-4" aria-hidden="true" />
        Judul Bagian
      </button>
      <button type="button" onClick={buatTebal} className={tombolCls}>
        <LuBold className="h-4 w-4" aria-hidden="true" />
        Tebal
      </button>
      <button type="button" onClick={tambahPoin} className={tombolCls}>
        <LuList className="h-4 w-4" aria-hidden="true" />
        Poin
      </button>
      <button type="button" onClick={tambahNomor} className={tombolCls}>
        <LuListOrdered className="h-4 w-4" aria-hidden="true" />
        Nomor
      </button>
    </div>
  );
}

export function PetunjukFormat({ tambahan }: { tambahan?: string }) {
  return (
    <p className="mt-1.5 text-sm leading-relaxed text-muted">
      Opsional: tombol di atas menyisipkan judul bagian, teks tebal, daftar poin, atau daftar bernomor.
      {tambahan ? ` ${tambahan} ` : " "}
      Formatnya terlihat sebagai{" "}
      <code className="rounded bg-primary-soft px-1 py-0.5 text-[13px] font-semibold text-primary">## Judul</code>
      ,{" "}
      <code className="rounded bg-primary-soft px-1 py-0.5 text-[13px] font-semibold text-primary">**teks**</code>
      ,{" "}
      <code className="rounded bg-primary-soft px-1 py-0.5 text-[13px] font-semibold text-primary">- poin</code>{" "}
      dan{" "}
      <code className="rounded bg-primary-soft px-1 py-0.5 text-[13px] font-semibold text-primary">1. poin</code>
      . Tulis paragraf biasa saja juga bisa.
    </p>
  );
}
