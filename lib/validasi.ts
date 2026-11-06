export function cekPanjang(label: string, nilai: string | null | undefined, maks: number): string | null {
  if (nilai && nilai.length > maks) return `${label} maksimal ${maks} karakter.`;
  return null;
}
