import { parseIsiBerita } from "@/lib/isiBerita";

export function Teks({ teks }: { teks: string }) {
  const bagian = teks.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {bagian.map((b, i) =>
        b.length > 4 && b.startsWith("**") && b.endsWith("**") ? (
          <strong key={i} className="font-bold text-ink">
            {b.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{b}</span>
        ),
      )}
    </>
  );
}

export default function TeksBerformat({
  teks,
  kelasTeks = "text-base leading-relaxed text-ink",
  kelasJudul = "text-lg font-bold text-ink",
}: {
  teks: string;
  kelasTeks?: string;
  kelasJudul?: string;
}) {
  const blok = parseIsiBerita(teks);
  return (
    <div className="space-y-3">
      {blok.map((b, i) => {
        if (b.jenis === "judul") {
          return (
            <h3 key={i} className={`break-words pt-1 ${kelasJudul}`}>
              <Teks teks={b.teks} />
            </h3>
          );
        }
        if (b.jenis === "daftar") {
          const butir = b.butir.map((item, j) => (
            <li key={j} className={`break-words ${kelasTeks}`}>
              <Teks teks={item} />
            </li>
          ));
          return b.berurut ? (
            <ol key={i} className="list-decimal space-y-1.5 pl-6">
              {butir}
            </ol>
          ) : (
            <ul key={i} className="list-disc space-y-1.5 pl-6">
              {butir}
            </ul>
          );
        }
        return (
          <p key={i} className={`break-words ${kelasTeks}`}>
            <Teks teks={b.teks} />
          </p>
        );
      })}
    </div>
  );
}

export function CuplikanBerformat({ teks, className }: { teks: string; className?: string }) {
  const bersih = teks
    .split("\n")
    .map((baris) => baris.trim().replace(/^#{1,2}\s+/, "").replace(/^[-•*]\s+/, "").replace(/^\d+\.\s+/, ""))
    .filter(Boolean)
    .join(" ");
  return (
    <p className={className}>
      <Teks teks={bersih} />
    </p>
  );
}
