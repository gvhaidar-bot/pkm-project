import {
  LuBookOpen,
  LuCalculator,
  LuCpu,
  LuHeart,
  LuMegaphone,
  LuPalette,
  LuSun,
  LuTrophy,
} from "react-icons/lu";
import type { IconType } from "react-icons";

export const IKON_EKSTRAKURIKULER: Record<string, { label: string; Icon: IconType }> = {
  sains: { label: "Sains & Akademik", Icon: LuCalculator },
  seni: { label: "Seni & Kreativitas", Icon: LuPalette },
  wirausaha: { label: "Kewirausahaan", Icon: LuSun },
  bahasa: { label: "Bahasa & Literasi", Icon: LuBookOpen },
  organisasi: { label: "Organisasi Siswa", Icon: LuMegaphone },
  sosial: { label: "Sosial & Keagamaan", Icon: LuHeart },
  olahraga: { label: "Olahraga", Icon: LuTrophy },
  teknologi: { label: "Teknologi", Icon: LuCpu },
};

export function IkonEkstrakurikuler({ ikon, className }: { ikon: string; className?: string }) {
  const entri = IKON_EKSTRAKURIKULER[ikon] ?? IKON_EKSTRAKURIKULER.sains;
  return <entri.Icon className={className} aria-hidden={true} />;
}
