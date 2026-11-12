"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { adminLogin } from "@/lib/admin";

export type HasilAksi = { error?: string } | null;

export async function simpanPengaturan(_sebelumnya: HasilAksi, formData: FormData): Promise<HasilAksi> {
  const admin = await adminLogin();
  if (!admin) return { error: "Anda harus login sebagai admin." };

  const tampilkanBeritaFooter = formData.get("tampilkanBeritaFooter") === "on";

  try {
    await prisma.pengaturan.upsert({
      where: { kunci: "tampilkanBeritaFooter" },
      update: { nilai: tampilkanBeritaFooter ? "true" : "false", diubahOlehId: admin.id },
      create: { kunci: "tampilkanBeritaFooter", nilai: tampilkanBeritaFooter ? "true" : "false", diubahOlehId: admin.id },
    });
  } catch (e) {
    console.error(e);
    return { error: "Gagal menyimpan pengaturan." };
  }

  revalidatePath("/");
  revalidatePath("/admin/pengaturan");
  return null;
}
