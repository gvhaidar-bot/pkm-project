export const KATEGORI_BERITA = [
  "Pengumuman",
  "Akademik",
  "Kegiatan",
  "Prestasi",
  "Keagamaan",
  "Lainnya",
] as const;

export type KategoriBerita = (typeof KATEGORI_BERITA)[number];

export function kategoriBeritaValid(nilai: unknown): KategoriBerita {
  if (typeof nilai === "string" && (KATEGORI_BERITA as readonly string[]).includes(nilai)) {
    return nilai as KategoriBerita;
  }
  return "Lainnya";
}
