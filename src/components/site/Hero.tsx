import { ArrowDown, ArrowRight } from "lucide-react";

import heroRose from "@/assets/hero-rose.jpg";
import { Button } from "@/components/ui/button";
import { DRAFT_HERO_HEADLINE, GRAND_OPENING_LINE, LOCKUP } from "@/content/site";
import { PetalField } from "./PetalField";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="grain relative isolate overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <img
          src={heroRose}
          alt="A glowing electric-blue rose with thorned stem against black, petals falling"
          width={1920}
          height={1088}
          fetchPriority="high"
          className="animate-breathe h-full w-full object-cover object-[72%_center] opacity-90 sm:object-right"
        />
        {/* Legibility veils */}
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/75 to-background/0" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-background/40" />
      </div>

      <PetalField />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-14 pt-32 sm:px-8 sm:pb-20 lg:justify-center lg:pb-24">
        <p className="eyebrow flex items-center gap-3">
          <span className="h-px w-10 bg-primary-glow" aria-hidden="true" />
          {LOCKUP}
        </p>

        {/* Draft homepage marketing copy — not an established brand quotation. */}
        <h1
          id="hero-title"
          className="font-wide mt-6 max-w-5xl text-[2.6rem] font-black uppercase leading-[0.9] tracking-tight sm:text-7xl lg:text-[6.25rem]"
        >
          <span className="text-silver block">{DRAFT_HERO_HEADLINE.lead}</span>
          <span className="mt-2 block">
            Make your brand <span className="text-glow">impossible</span> to ignore.
          </span>
        </h1>

        <p className="mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
          BLVCK MARKET is a marketing and business-growth operation. Strategic marketing, creative
          promotion, and brand visibility — backed by clear, measurable reporting on what is actually
          working.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Button asChild variant="hero" size="xl">
            <a href="#services">
              Explore the services <ArrowRight />
            </a>
          </Button>
          <Button asChild variant="lux" size="xl">
            <a href="#contact">Start a project</a>
          </Button>
        </div>

        <a
          href="#program"
          className="group mt-14 flex max-w-xl items-center gap-4 border-t border-border pt-6 text-left"
        >
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-border transition-colors group-hover:border-primary-glow">
            <ArrowDown className="h-4 w-4 text-primary-glow" />
          </span>
          <span className="font-mono text-[0.6875rem] uppercase leading-relaxed tracking-[0.18em] text-muted-foreground transition-colors group-hover:text-foreground">
            {GRAND_OPENING_LINE}
          </span>
        </a>
      </div>
    </section>
  );
}
