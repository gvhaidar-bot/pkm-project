import { parseIsiBerita } from "@/lib/isiBerita";

function Teks({ teks }: { teks: string }) {
  // Support both **bold** and *italic*
  const bagian = teks.split(/(\*\*[^*]+\*\*|\*[^*]+\*)/g);
  return (
    <>
      {bagian.map((b, i) => {
        if (b.length > 4 && b.startsWith("**") && b.endsWith("**")) {
          return (
            <strong key={i} className="font-bold text-primary-dark">
              {b.slice(2, -2)}
            </strong>
          );
        }
        if (b.length > 2 && b.startsWith("*") && b.endsWith("*")) {
          return (
            <em key={i} className="italic text-primary-dark">
              {b.slice(1, -1)}
            </em>
          );
        }
        return <span key={i}>{b}</span>;
      })}
    </>
  );
}

export default function IsiArtikel({ isi }: { isi: string }) {
  const blok = parseIsiBerita(isi);
  return (
    <div className="space-y-6 pt-2">
      {blok.map((b, i) => {
        if (b.jenis === "judul") {
          return (
            <div key={i} className="pt-6 pb-2 first:pt-0">
              <div className="mb-2.5 flex items-center gap-2" aria-hidden="true">
                <span className="h-0.5 w-8 bg-accent" />
                <span className="h-1.5 w-1.5 rotate-45 bg-accent" />
              </div>
              <h2 className="font-serif text-2xl font-black tracking-tight text-primary-dark sm:text-3xl break-words">
                <Teks teks={b.teks} />
              </h2>
            </div>
          );
        }

        if (b.jenis === "kutipan") {
          return (
            <blockquote
              key={i}
              className="my-7 border-l-4 border-accent bg-primary-soft/30 p-6 font-serif text-base italic leading-relaxed text-primary-dark sm:text-lg"
            >
              <div className="flex items-start gap-3">
                <span className="font-serif text-3xl font-black leading-none text-accent select-none">
                  “
                </span>
                <div className="flex-1">
                  <Teks teks={b.teks} />
                </div>
              </div>
            </blockquote>
          );
        }

        if (b.jenis === "daftar") {
          return b.berurut ? (
            <ol key={i} className="my-5 space-y-3.5 pl-1">
              {b.butir.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3.5 text-base leading-relaxed text-ink/90 sm:text-lg break-words"
                >
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center border border-accent/40 bg-primary-soft font-serif text-xs font-bold text-primary shadow-xs">
                    {j + 1}
                  </span>
                  <span className="flex-1 pt-0.5 leading-relaxed">
                    <Teks teks={item} />
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <ul key={i} className="my-5 space-y-3 pl-1">
              {b.butir.map((item, j) => (
                <li
                  key={j}
                  className="flex items-start gap-3.5 text-base leading-relaxed text-ink/90 sm:text-lg break-words"
                >
                  <span
                    className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-accent"
                    aria-hidden="true"
                  />
                  <span className="flex-1 leading-relaxed">
                    <Teks teks={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }

        return (
          <p
            key={i}
            className="text-base leading-[1.88] text-ink/85 sm:text-lg break-words"
          >
            <Teks teks={b.teks} />
          </p>
        );
      })}
    </div>
  );
}
