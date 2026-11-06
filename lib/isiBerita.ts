export type BlokIsi =
  | { jenis: "paragraf"; teks: string }
  | { jenis: "judul"; teks: string }
  | { jenis: "daftar"; berurut: boolean; butir: string[] };

export function parseIsiBerita(isi: string): BlokIsi[] {
  const blok: BlokIsi[] = [];
  for (const mentah of isi.split("\n")) {
    const baris = mentah.trim();
    if (!baris) continue;
    if (baris.startsWith("## ")) {
      const teks = baris.slice(3).trim();
      if (teks) blok.push({ jenis: "judul", teks });
      continue;
    }
    if (baris.startsWith("# ")) {
      const teks = baris.slice(2).trim();
      if (teks) blok.push({ jenis: "judul", teks });
      continue;
    }
    if (baris.startsWith("- ")) {
      const teks = baris.slice(2).trim();
      if (!teks) continue;
      const terakhir = blok[blok.length - 1];
      if (terakhir && terakhir.jenis === "daftar" && !terakhir.berurut) {
        terakhir.butir.push(teks);
      } else {
        blok.push({ jenis: "daftar", berurut: false, butir: [teks] });
      }
      continue;
    }
    const nomor = baris.match(/^(\d+)\.\s+(.+)$/);
    if (nomor) {
      const teks = nomor[2].trim();
      if (!teks) continue;
      const terakhir = blok[blok.length - 1];
      if (terakhir && terakhir.jenis === "daftar" && terakhir.berurut) {
        terakhir.butir.push(teks);
      } else {
        blok.push({ jenis: "daftar", berurut: true, butir: [teks] });
      }
      continue;
    }
    blok.push({ jenis: "paragraf", teks: baris });
  }
  return blok;
}
