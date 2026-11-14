import { LuBookOpen, LuCompass, LuHeartHandshake, LuShieldCheck } from "react-icons/lu";
import JudulBagian from "./JudulBagian";

const daftar = [
  {
    nomor: "01",
    judul: "Kurikulum Terpadu",
    deskripsi:
      "Perpaduan kurikulum nasional dan nilai-nilai keislaman dari Kementerian Agama, membekali siswa dengan ilmu pengetahuan umum sekaligus pondasi iman yang kokoh.",
    Icon: LuBookOpen,
  },
  {
    nomor: "02",
    judul: "Pembinaan Akhlak Mulia",
    deskripsi:
      "Karakter, sopan santun, ketertiban ibadah harian, dan akhlakul karimah dibina konsisten setiap hari dalam lingkungan madrasah yang hangat dan religius.",
    Icon: LuShieldCheck,
  },
  {
    nomor: "03",
    judul: "Pendidik yang Peduli",
    deskripsi:
      "Bukan sekadar mengajar, guru dan staff kami mendampingi perkembangan kepribadian, potensi belajar, dan keseharian setiap siswa dengan penuh perhatian.",
    Icon: LuHeartHandshake,
  },
  {
    nomor: "04",
    judul: "Pengembangan Bakat",
    deskripsi:
      "Ragam kegiatan ekstrakurikuler terarah di bidang keagamaan, olahraga, seni, dan kepemimpinan untuk menyalurkan minat dan melatih rasa percaya diri siswa.",
    Icon: LuCompass,
  },
];

export default function KenapaMemilihKami() {
  return (
    <section className="bg-cream py-20">
      <div className="mx-auto w-full max-w-300 px-5 lg:px-6">
        <JudulBagian
          label="Komitmen Pendidikan"
          judul="Kenapa Orang Tua Memilih Kami"
          deskripsi="Alasan para orang tua mempercayakan masa depan dan akhlak putra-putrinya kepada MTs Nurul Falah Gunungsindur."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {daftar.map((item) => (
            <article
              key={item.judul}
              className="group relative flex flex-col justify-between border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-accent/60 hover:shadow-[0_12px_32px_rgba(11,79,58,0.1)]"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-transparent transition-colors group-hover:bg-accent" aria-hidden="true" />
              
              <div>
                <div className="flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center border border-accent/30 bg-primary-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                    <item.Icon className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <span className="font-serif text-2xl font-bold tracking-tight text-accent/50 group-hover:text-accent">
                    {item.nomor}
                  </span>
                </div>

                <h3 className="mt-6 font-serif text-xl font-bold tracking-tight text-primary-dark">
                  {item.judul}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted">
                  {item.deskripsi}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-line/60">
                <span className="text-[11px] font-bold tracking-[0.14em] text-accent uppercase">
                  MTs Nurul Falah
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
