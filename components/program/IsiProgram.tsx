import { LuCheck } from "react-icons/lu";
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

export default function IsiProgram({ isi }: { isi: string }) {
  const blok = parseIsiBerita(isi);
  return (
    <div className="mt-4 space-y-6">
      {blok.map((b, i) => {
        if (b.jenis === "judul") {
          return (
            <h2 key={i} className="font-serif text-xl font-bold break-words text-primary-dark border-b border-line/60 pb-2">
              <Teks teks={b.teks} />
            </h2>
          );
        }
        if (b.jenis === "daftar") {
          if (b.berurut) {
            return (
              <ol key={i} className="list-decimal space-y-2.5 pl-6 marker:font-bold marker:text-accent">
                {b.butir.map((item, j) => (
                  <li key={j} className="text-sm leading-relaxed break-words text-muted">
                    <Teks teks={item} />
                  </li>
                ))}
              </ol>
            );
          }
          return (
            <ul key={i} className="space-y-3">
              {b.butir.map((item, j) => (
                <li key={j} className="flex items-start gap-2.5 text-sm leading-relaxed break-words text-muted">
                  <LuCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <span>
                    <Teks teks={item} />
                  </span>
                </li>
              ))}
            </ul>
          );
        }
        return (
          <p key={i} className="text-sm leading-relaxed break-words text-muted">
            <Teks teks={b.teks} />
          </p>
        );
      })}
    </div>
  );
}
