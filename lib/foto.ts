export function urlFotoUtama(foto: { url: string; utama: boolean }[]): string | null {
  if (foto.length === 0) return null;
  return (foto.find((f) => f.utama) ?? foto[0]).url;
}
