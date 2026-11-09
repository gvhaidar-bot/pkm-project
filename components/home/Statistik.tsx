import { prisma } from "@/lib/prisma";

export default async function Statistik() {
  const [guru, program, ekstrakurikuler, fasilitas] = await Promise.all([
    prisma.guru.count({ where: { aktif: true } }),
    prisma.programAkademik.count({ where: { aktif: true } }),
    prisma.ekstrakurikuler.count({ where: { aktif: true } }),
    prisma.fasilitas.count({ where: { aktif: true } }),
  ]);

  const data = [
    { angka: guru, label: "Guru & Tenaga Pendidik", sub: "Membimbing dengan Dedikasi" },
    { angka: program, label: "Program Akademik", sub: "Kurikulum Terpadu & Terarah" },
    { angka: ekstrakurikuler, label: "Kegiatan Ekstrakurikuler", sub: "Penyaluran Bakat & Minat" },
    { angka: fasilitas, label: "Sarana Fasilitas", sub: "Mendukung Belajar Siswa" },
  ].filter((item) => item.angka > 0);

  if (data.length === 0) return null;

  return (
    <section className="border-y-2 border-accent bg-primary text-white">
      <div className="mx-auto w-full max-w-300 px-5 py-14 lg:px-6">
        <div className="grid grid-cols-2 gap-8 divide-line/10 lg:grid-cols-4 lg:divide-x">
          {data.map((item, idx) => (
            <div
              key={item.label}
              className={`text-center ${idx > 0 ? "lg:pl-6" : ""} ${idx % 2 === 1 ? "pl-4 sm:pl-0" : ""}`}
            >
              <p className="font-serif text-5xl font-black tracking-tight text-white md:text-6xl">
                {item.angka}
              </p>
              <p className="mt-2.5 text-xs font-bold tracking-[0.16em] text-accent uppercase md:text-sm">
                {item.label}
              </p>
              <p className="mt-1 hidden text-xs text-white/70 sm:block">
                {item.sub}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
