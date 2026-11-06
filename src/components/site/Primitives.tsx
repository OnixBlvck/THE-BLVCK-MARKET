import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/** Typographic V emblem placeholder (no supplied V logo asset yet). */
export function VEmblem({ className }: { className?: string }) {
  return (
    <span aria-hidden="true" className={cn("text-silver font-gothic leading-none", className)}>
      V
    </span>
  );
}

export function BandLabel({ children }: { children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-mono text-[0.625rem] uppercase tracking-[0.28em] text-primary-glow">
      {children}
      <span className="h-px w-6 bg-primary-glow" aria-hidden="true" />
    </p>
  );
}

export function OutlineLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <a
      href={href}
      className={cn(
        "inline-flex h-8 items-center border border-foreground/40 px-4 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-foreground transition-colors hover:border-primary-glow hover:text-primary-glow",
        className,
      )}
    >
      {children}
    </a>
  );
}

export const serifHeading = "font-heading text-silver uppercase leading-[1.1] tracking-[0.04em]";
