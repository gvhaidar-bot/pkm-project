import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

/**
 * Wajib dipanggil di baris pertama setiap server action admin.
 * Mengalihkan ke /login bila tidak ada sesi admin yang aktif.
 */
export async function wajibAdmin() {
  const session = await auth();
  if (!session?.user?.email) redirect("/login");
  return session;
}

/** ID admin dari sesi aktif (dipakai sebagai authorId berita). */
export async function idAdmin(): Promise<number | null> {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) return null;
  const admin = await prisma.admin.findUnique({ where: { email } });
  return admin?.id ?? null;
}

/** Baca ID dari FormData; hanya bilangan bulat positif yang lolos. */
export function bacaId(nilai: FormDataEntryValue | null): number | null {
  if (typeof nilai !== "string" || !nilai) return null;
  const id = Number(nilai);
  return Number.isInteger(id) && id > 0 ? id : null;
}

/** Baca urutan dari FormData; negatif dibulatkan ke 0. */
export function bacaUrutan(nilai: FormDataEntryValue | null): number {
  const n = Number(nilai ?? 0);
  return Number.isFinite(n) ? Math.max(0, Math.floor(n)) : 0;
}

/** Kembalikan pesan galat bila teks melebihi batas, atau null bila aman. */
export function cekPanjang(
  teks: string | null | undefined,
  maks: number,
  label: string,
): string | null {
  if (teks && teks.length > maks) return `${label} maksimal ${maks} karakter.`;
  return null;
}

/**
 * Pesan galat yang aman ditampilkan ke admin.
 * Pesan mentah Prisma (nama tabel, kolom, SQL) tidak pernah diteruskan ke layar.
 */
export function pesanGalat(e: unknown, umum: string): string {
  if (e instanceof Error) {
    const pesan = e.message;
    if (pesan.includes("Unique constraint"))
      return "Data sudah ada (duplikat). Periksa judul atau slug.";
    if (
      pesan.includes("Record to update not found") ||
      pesan.includes("Record to delete does not exist")
    )
      return "Data tidak ditemukan (mungkin sudah dihapus).";
    if (
      pesan.startsWith("File foto") ||
      pesan.startsWith("Ukuran foto") ||
      pesan.startsWith("Format foto") ||
      pesan.startsWith("Folder unggahan") ||
      pesan.startsWith("Maksimal")
    )
      return pesan;
  }
  return umum;
}
