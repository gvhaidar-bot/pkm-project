import { prisma } from "@/lib/prisma";
import FormPengaturan from "./_components/FormPengaturan";

export const metadata = {
  title: "Pengaturan — Panel Admin",
  description: "Atur tampilan website MTs Nurul Falah Serpong.",
};

async function muatPengaturan() {
  try {
    const data = await prisma.pengaturan.findUnique({
      where: { kunci: "tampilkanBeritaFooter" },
    });
    return data?.nilai !== "false";
  } catch {
    return true;
  }
}

export default async function PengaturanPage() {
  const tampilkanBeritaFooter = await muatPengaturan();

  return (
    <div className="mx-auto w-full max-w-3xl px-5 py-8 lg:px-6">
      <h1 className="text-2xl font-extrabold tracking-tight text-ink">Pengaturan</h1>
      <p className="mt-1 text-base text-muted">Atur tampilan website MTs Nurul Falah Serpong.</p>
      <FormPengaturan tampilkanBeritaFooter={tampilkanBeritaFooter} />
    </div>
  );
}
