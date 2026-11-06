/** Kerangka muat (skeleton) yang dipakai semua daftar admin. */
export default function KerangkaTabel() {
  return (
    <div className="mt-8 animate-pulse rounded-3xl bg-white p-6 shadow-[0_4px_24px_rgba(11,91,62,0.08)]">
      <div className="space-y-3">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 rounded-2xl bg-primary-soft" />
        ))}
      </div>
    </div>
  );
}
