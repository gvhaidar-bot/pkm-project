import Image from "next/image";
import Link from "next/link";
import HeroActions from "./hero/HeroActions";

/**
 * Hero beranda: foto lebar penuh dengan judul di atasnya, mengikuti
 * referensi Figma "Responsive School Website Template" (struktur dan
 * ritme halaman), dengan palet dan tipografi tetap dari DESIGN.md.
 * Di bawah foto ada tiga blok tautan cepat bernomor (01/02/03) ala
 * template yang sama. Carousel foto dihapus sesuai DESIGN.md.
 */
const tautanCepat = [
  {
    nomor: "01",
    judul: "Profil Sekolah",
    deskripsi: "Sejarah, visi-misi, dan guru kami.",
    href: "/profil",
    kelas: "bg-primary text-white hover:bg-primary-dark",
  },
  {
    nomor: "02",
    judul: "Berita",
    deskripsi: "Kabar dan pengumuman terbaru madrasah.",
    href: "/berita",
    kelas: "bg-accent text-primary-dark hover:bg-accent-soft",
  },
  {
    nomor: "03",
    judul: "Galeri",
    deskripsi: "Foto kegiatan dan suasana belajar.",
    href: "/galeri",
    kelas: "bg-primary-dark text-white hover:bg-ink",
  },
];

const Hero = () => {
  return (
    <section className="bg-cream text-ink">
      <div className="relative overflow-hidden">
        <Image
          src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=2000&auto=format&fit=crop"
          alt="Siswa mengangkat tangan di kelas"
          width={2000}
          height={1100}
          priority
          className="aspect-[16/10] w-full object-cover sm:aspect-[16/8]"
        />
        <div
          className="absolute inset-0 bg-primary-dark/70"
          aria-hidden="true"
        />
        <div className="absolute inset-0 mx-auto flex w-full max-w-[1200px] flex-col justify-center px-5 py-16 lg:px-6">
          <p className="text-xs font-bold tracking-[0.12em] text-accent-soft uppercase">
            Website Promosi Sekolah
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl leading-tight font-extrabold tracking-tight text-white md:text-[2.75rem] md:leading-[1.15]">
            Mengenal Madrasah Tsanawiyah, Sekolah untuk Buah Hati Anda
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-cream/90 md:text-lg">
            Kenali profil sekolah, program unggulan, fasilitas, dan prestasi kami — semua
            informasi yang orang tua butuhkan, dalam satu tempat.
          </p>
          <HeroActions />
        </div>
      </div>

      <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 gap-5 px-5 py-10 sm:grid-cols-3 lg:px-6">
        {tautanCepat.map((item) => (
          <Link
            key={item.nomor}
            href={item.href}
            className={`block rounded-3xl p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)] transition-colors ${item.kelas}`}
          >
            <p className="text-xs font-bold tracking-[0.2em] opacity-70">{item.nomor}</p>
            <h2 className="mt-2 text-xl font-extrabold tracking-tight">{item.judul}</h2>
            <p className="mt-1 text-base opacity-80">{item.deskripsi}</p>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default Hero;
