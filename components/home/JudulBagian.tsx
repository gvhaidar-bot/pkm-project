type Props = {
  label?: string;
  judul: string;
  deskripsi?: string;
  tema?: "terang" | "gelap";
};

export default function JudulBagian({ label, judul, deskripsi, tema = "terang" }: Props) {
  const isGelap = tema === "gelap";

  return (
    <div className="mx-auto max-w-3xl text-center">
      {label && (
        <span
          className={`inline-block text-xs font-bold tracking-[0.18em] uppercase ${
            isGelap ? "text-accent" : "text-accent-soft"
          }`}
        >
          {label}
        </span>
      )}
      <h2
        className={`font-serif text-3xl leading-tight font-black tracking-tight md:text-5xl ${
          label ? "mt-2.5" : ""
        } ${isGelap ? "text-white" : "text-primary-dark"}`}
      >
        {judul}
      </h2>
      <div className="mx-auto mt-4 flex items-center justify-center gap-2" aria-hidden="true">
        <span className="h-0.5 w-12 bg-accent" />
        <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
        <span className="h-0.5 w-12 bg-accent" />
      </div>
      {deskripsi && (
        <p
          className={`mt-4 text-base leading-relaxed md:text-lg ${
            isGelap ? "text-white/85" : "text-muted"
          }`}
        >
          {deskripsi}
        </p>
      )}
    </div>
  );
}
