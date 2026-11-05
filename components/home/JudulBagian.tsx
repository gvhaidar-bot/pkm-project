type Props = { label: string; judul: string; deskripsi?: string };

export default function JudulBagian({ label, judul, deskripsi }: Props) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-xs font-bold tracking-[0.12em] text-primary uppercase">{label}</p>
      <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-ink md:text-4xl">{judul}</h2>
      {deskripsi ? <p className="mt-3 text-base leading-relaxed text-muted">{deskripsi}</p> : null}
    </div>
  );
}
