import { prisma } from "@/lib/prisma";

export default async function Statistik() {
  const [guru, program, ekstrakurikuler, fasilitas] = await Promise.all([
    prisma.guru.count({ where: { aktif: true } }),
    prisma.programAkademik.count({ where: { aktif: true } }),
    prisma.ekstrakurikuler.count({ where: { aktif: true } }),
    prisma.fasilitas.count({ where: { aktif: true } }),
  ]);

  const data = [
    { angka: guru, label: "Guru & Staff" },
    { angka: program, label: "Program Akademik" },
    { angka: ekstrakurikuler, label: "Ekstrakurikuler" },
    { angka: fasilitas, label: "Fasilitas" },
  ].filter((item) => item.angka > 0);

  if (data.length === 0) return null;

  return (
    <section className="bg-primary">
      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-2 gap-8 px-5 py-12 lg:grid-cols-4 lg:px-6">
        {data.map((item) => (
          <div key={item.label} className="text-center">
            <p className="font-serif text-5xl font-black tracking-tight text-white md:text-6xl">{item.angka}</p>
            <p className="mt-3 text-xs font-bold tracking-[0.14em] text-accent uppercase md:text-sm">{item.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
