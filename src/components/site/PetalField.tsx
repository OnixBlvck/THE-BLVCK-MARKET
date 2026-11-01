import type { CSSProperties } from "react";

import petal from "@/assets/petal.png";
import { cn } from "@/lib/utils";

// Deterministic layout so server and client render identically.
const PETALS = [
  { left: 58, size: 22, duration: 17, delay: 0, drift: 60, opacity: 0.85, blur: 0 },
  { left: 72, size: 16, duration: 21, delay: 4, drift: -40, opacity: 0.6, blur: 1 },
  { left: 64, size: 28, duration: 19, delay: 9, drift: 30, opacity: 0.9, blur: 0 },
  { left: 84, size: 14, duration: 24, delay: 2, drift: -70, opacity: 0.5, blur: 2 },
  { left: 48, size: 18, duration: 22, delay: 12, drift: 50, opacity: 0.55, blur: 1 },
  { left: 90, size: 20, duration: 18, delay: 7, drift: -30, opacity: 0.7, blur: 0 },
  { left: 38, size: 12, duration: 26, delay: 15, drift: 80, opacity: 0.4, blur: 2 },
  { left: 76, size: 24, duration: 20, delay: 11, drift: 20, opacity: 0.75, blur: 0 },
];

type PetalFieldProps = { className?: string; count?: number };

/** Subtle falling blue petals. Hidden entirely under prefers-reduced-motion. */
export function PetalField({ className, count = PETALS.length }: PetalFieldProps) {
  return (
    <div aria-hidden="true" className={cn("petal-layer pointer-events-none absolute inset-0 overflow-hidden", className)}>
      {PETALS.slice(0, count).map((p, i) => (
        <img
          key={i}
          src={petal}
          alt=""
          width={p.size}
          height={p.size}
          className="animate-petal absolute -top-10 opacity-0"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: "auto",
              filter: p.blur ? `blur(${p.blur}px)` : undefined,
              "--petal-duration": `${p.duration}s`,
              "--petal-delay": `${p.delay}s`,
              "--petal-drift": `${p.drift}px`,
              "--petal-opacity": p.opacity,
            } as CSSProperties
          }
        />
      ))}
    </div>
  );
}
