import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  index: string;
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  className?: string;
  id?: string;
};

export function SectionHeading({ index, eyebrow, title, intro, className, id }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-3xl", className)}>
      <p className="eyebrow flex items-center gap-3">
        <span className="text-primary-glow">{index}</span>
        <span className="h-px w-8 bg-border" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2
        id={id}
        className="font-wide mt-5 text-3xl font-extrabold uppercase leading-[0.95] tracking-tight text-balance sm:text-5xl"
      >
        {title}
      </h2>
      {intro ? (
        <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
      ) : null}
    </div>
  );
}
