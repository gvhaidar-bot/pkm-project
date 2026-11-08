type Props = { label?: string; judul: string; deskripsi?: string };

export default function JudulBagian({ judul, deskripsi }: Props) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <h2 className="text-4xl leading-[1.1] font-black tracking-tight text-ink md:text-5xl">{judul}</h2>
      <span className="mx-auto mt-5 block h-1 w-16 bg-accent" aria-hidden="true" />
      {deskripsi ? <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">{deskripsi}</p> : null}
    </div>
  );
}
