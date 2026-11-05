import { LuBookOpen, LuShieldCheck, LuSparkles, LuUsers } from "react-icons/lu";
import JudulBagian from "./JudulBagian";

const daftar = [
  {
    judul: "Kurikulum Terpadu",
    deskripsi: "Perpaduan kurikulum nasional dan pendidikan agama yang seimbang.",
    Icon: LuBookOpen,
  },
  {
    judul: "Pembinaan Karakter",
    deskripsi: "Akhlak mulia, disiplin, dan tanggung jawab dibina setiap hari.",
    Icon: LuShieldCheck,
  },
  {
    judul: "Guru yang Peduli",
    deskripsi: "Guru dan staff mendampingi setiap siswa dengan perhatian.",
    Icon: LuUsers,
  },
  {
    judul: "Pengembangan Bakat",
    deskripsi: "Ekstrakurikuler beragam untuk menyalurkan minat dan bakat siswa.",
    Icon: LuSparkles,
  },
];

export default function KenapaMemilihKami() {
  return (
    <section className="bg-cream">
      <div className="mx-auto w-full max-w-[1200px] px-5 py-16 lg:px-6">
        <JudulBagian
          label="Kenapa Kami"
          judul="Kenapa Orang Tua Memilih Kami"
          deskripsi="Alasan orang tua mempercayakan pendidikan putra-putrinya kepada madrasah kami."
        />
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {daftar.map((item) => (
            <article
              key={item.judul}
              className="rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                <item.Icon className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink">{item.judul}</h3>
              <p className="mt-2 text-[15px] leading-relaxed text-muted">{item.deskripsi}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
