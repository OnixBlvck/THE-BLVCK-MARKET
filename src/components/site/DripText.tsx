import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

/**
 * Controlled dripping accent for campaign headings only.
 * Renders a few glossy drips beneath the text — never use on body copy.
 */
export function DripText({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn("relative inline-block", className)}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 400 60"
        preserveAspectRatio="none"
        className="animate-drip pointer-events-none absolute left-0 top-[88%] h-[0.55em] w-full text-primary-glow drop-shadow-[0_0_10px_var(--primary)]"
      >
        <path
          fill="currentColor"
          d="M0 0h400v4c-6 0-9 2-10 6-1 5-2 9-6 9s-5-4-6-9c-1-4-4-6-9-6H300c-5 0-7 3-8 8-1 9-2 20-7 20s-6-11-7-20c-1-5-3-8-8-8H196c-5 0-7 2-8 6-1 12-2 32-8 32s-7-20-8-32c-1-4-3-6-8-6H92c-5 0-7 3-8 8-1 6-2 13-6 13s-5-7-6-13c-1-5-3-8-8-8H0Z"
        />
        <circle cx="180" cy="50" r="3.2" fill="currentColor" />
      </svg>
    </span>
  );
}
