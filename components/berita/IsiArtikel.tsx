import { parseIsiBerita } from "@/lib/isiBerita";

function Teks({ teks }: { teks: string }) {
  const bagian = teks.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {bagian.map((b, i) =>
        b.length > 4 && b.startsWith("**") && b.endsWith("**") ? (
          <strong key={i} className="font-bold text-primary-dark">
            {b.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{b}</span>
        ),
      )}
    </>
  );
}

export default function IsiArtikel({ isi }: { isi: string }) {
  const blok = parseIsiBerita(isi);
  return (
    <div className="mx-auto mt-10 max-w-3xl space-y-6">
      {blok.map((b, i) => {
        if (b.jenis === "judul") {
          return (
            <h2 key={i} className="pt-4 font-serif text-2xl font-bold tracking-tight break-words text-primary-dark border-b border-line/60 pb-2">
              <Teks teks={b.teks} />
            </h2>
          );
        }
        if (b.jenis === "daftar") {
          const butir = b.butir.map((item, j) => (
            <li key={j} className="text-base leading-[1.8] break-words text-ink/90 sm:text-lg">
              <Teks teks={item} />
            </li>
          ));
          return b.berurut ? (
            <ol key={i} className="list-decimal space-y-2 pl-6 marker:font-bold marker:text-accent">
              {butir}
            </ol>
          ) : (
            <ul key={i} className="list-disc space-y-2 pl-6 marker:text-accent">
              {butir}
            </ul>
          );
        }
        return (
          <p key={i} className="text-base leading-[1.85] break-words text-ink/85 sm:text-lg">
            <Teks teks={b.teks} />
          </p>
        );
      })}
    </div>
  );
}
