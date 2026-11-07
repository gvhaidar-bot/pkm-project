"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

export default function TampilSaatScroll({
  children,
  tunda = 0,
  className = "",
}: {
  children: ReactNode;
  tunda?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [tampil, setTampil] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pengamat = new IntersectionObserver(
      ([entri]) => {
        if (entri.isIntersecting) {
          setTampil(true);
          pengamat.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" },
    );
    pengamat.observe(el);
    return () => pengamat.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${tunda}ms` }}
      className={`${className} transition-all duration-700 ease-out will-change-transform ${
        tampil ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
      }`}
    >
      {children}
    </div>
  );
}
