import { ArrowUpRight, Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PACKAGES, type PackageName } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Services({ onRequestProposal }: { onRequestProposal: (pkg: PackageName) => void }) {
  return (
    <section id="services" aria-labelledby="services-title" className="relative border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            index="03"
            eyebrow="Services"
            title="Three ways in. Pick your weight class."
            intro="The Three-Phase Program is offered in three packages. Every engagement is scoped to your business. Request a proposal and we will come back with a clear plan and pricing for your situation."
          />
        </Reveal>

        <ul className="mt-16 grid gap-5 lg:grid-cols-3">
          {PACKAGES.map((pkg, i) => (
            <Reveal
              as="li"
              key={pkg.name}
              delay={i * 120}
              className="group relative flex flex-col overflow-hidden rounded-sm border border-border bg-surface p-7 transition-all duration-500 hover:-translate-y-1 hover:border-primary/60 hover:shadow-glow sm:p-9"
            >
              <div
                aria-hidden="true"
                className="bg-blue-light pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex items-center justify-between">
                <span className="font-mono text-xs text-primary-glow">{pkg.index}</span>
                <span className="eyebrow">Package</span>
              </div>
              <h3 className="font-wide relative mt-10 text-2xl font-black uppercase leading-none tracking-tight sm:text-3xl">
                {pkg.name}
              </h3>
              <p className="relative mt-5 text-sm leading-relaxed text-muted-foreground">{pkg.summary}</p>

              <ul className="relative mt-8 flex-1 space-y-3 border-t border-border pt-6">
                {pkg.includes.map((item) => (
                  <li key={item} className="flex items-start gap-3 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <Button
                variant="lux"
                size="xl"
                className="relative mt-10 w-full justify-between"
                onClick={() => onRequestProposal(pkg.name)}
                aria-label={`Request a proposal for ${pkg.name}`}
              >
                Request a proposal <ArrowUpRight />
              </Button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
