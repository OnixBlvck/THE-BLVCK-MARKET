import { Crosshair, Eye, KeyRound, PenTool } from "lucide-react";

import { SERVICE_COLUMNS } from "@/content/site";
import { serifHeading } from "./Primitives";

const ICONS = { eye: Eye, pen: PenTool, target: Crosshair, key: KeyRound } as const;

export function ServiceColumns() {
  return (
    <section id="services" aria-label="Services" className="border-b border-border">
      <ul className="mx-auto grid max-w-[1440px] sm:grid-cols-2 lg:grid-cols-4">
        {SERVICE_COLUMNS.map((s, i) => {
          const Icon = ICONS[s.icon];
          return (
            <li
              key={s.title}
              className={`flex flex-col items-center px-6 py-9 text-center ${i > 0 ? "border-t border-border sm:border-t-0" : ""} ${i % 2 === 1 ? "sm:border-l sm:border-border" : ""} ${i >= 2 ? "sm:border-t lg:border-t-0" : ""} ${i === 2 ? "lg:border-l lg:border-border" : ""}`}
            >
              <span className="grid h-12 w-12 place-items-center rounded-full border border-foreground/40">
                <Icon className="h-5 w-5 text-silver" strokeWidth={1.25} aria-hidden="true" />
              </span>
              <h3 className={`${serifHeading} mt-5 text-sm`}>{s.title}</h3>
              <p className="mt-3 max-w-[15rem] text-xs leading-relaxed text-muted-foreground">{s.body}</p>
              <a
                href="#contact"
                aria-label={`Learn more about ${s.title.toLowerCase()}`}
                className="mt-4 font-mono text-[0.625rem] uppercase tracking-[0.24em] text-primary-glow hover:underline"
              >
                Learn more
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
