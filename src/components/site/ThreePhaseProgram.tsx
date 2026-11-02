import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { BRAND, RESULT_LINE, RESULT_NAME, RESULT_WORDS } from "@/content/site";
import { DripText } from "./DripText";
import { PetalField } from "./PetalField";
import { Reveal } from "./Reveal";

const PILLARS = [
  {
    label: "Sharpen",
    title: "Presentation",
    body: "Tighten how your brand looks, reads, and lands — so people take it seriously on first contact.",
  },
  {
    label: "Build",
    title: "Promotional direction",
    body: "Decide what to say, where to say it, and who it is for. One clear direction instead of scattered posting.",
  },
  {
    label: "Pursue",
    title: "Market visibility",
    body: "Put that direction in front of the right audience and track what responds.",
  },
];

export function ThreePhaseProgram() {
  return (
    <section
      id="program"
      aria-labelledby="program-title"
      className="relative isolate overflow-hidden border-y border-border bg-surface"
    >
      <div className="bg-blue-light absolute inset-0 -z-10 opacity-70" aria-hidden="true" />
      <PetalField count={4} className="opacity-60" />

      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <p className="eyebrow flex items-center gap-3">
            <span className="text-gold">Featured program</span>
            <span className="h-px w-8 bg-gold/40" aria-hidden="true" />
            Grand opening
          </p>

          <h2 id="program-title" className="mt-8 uppercase">
            <span className="font-mono block text-xs tracking-[0.28em] text-silver sm:text-sm">
              {BRAND} Grand Opening
            </span>
            <span className="font-mono mt-3 block text-xs tracking-[0.28em] text-muted-foreground sm:text-sm">
              Introducing:
            </span>
            <span className="font-wide mt-5 block text-[2.75rem] font-black leading-[0.88] tracking-tight sm:text-7xl lg:text-8xl">
              <span className="text-silver">The</span>
              <br />
              <span className="text-glow">Three-</span>
              <br />
              <DripText className="text-glow">Phase</DripText>
            </span>
            <span className="font-wide mt-6 block text-xl font-bold tracking-[0.4em] text-gold sm:text-2xl">
              Program
            </span>
          </h2>

          <p className="mt-10 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            The Three-Phase Program is the method inside {BRAND}. It is built for businesses ready to
            sharpen how they present themselves, build a real promotional direction, and go after better
            visibility in their market.
          </p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-foreground">
            No inflated promises. Focused work, honest reporting, and a clear next move.
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button asChild variant="hero" size="xl">
              <a href="#contact">
                Enter the program <ArrowRight />
              </a>
            </Button>
            <Button asChild variant="gold" size="xl">
              <a href="#founding">Ask about the founding offer</a>
            </Button>
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5" delay={150}>
          <figure className="relative">
            <div className="shadow-glow-lg relative flex aspect-[4/5] flex-col justify-between overflow-hidden rounded-sm border border-border bg-background p-7 sm:p-10">
              <div className="bg-blue-light absolute inset-0 opacity-80" aria-hidden="true" />
              <p className="eyebrow relative">The result</p>
              <div className="relative">
                <p className="font-wide text-4xl font-black uppercase leading-[0.9] tracking-tight sm:text-5xl">
                  <span className="text-silver block">The</span>
                  <span className="text-glow block">BLVCK</span>
                  <span className="block">Effect</span>
                </p>
                <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">{RESULT_LINE}</p>
              </div>
              <ul className="relative grid grid-cols-2 gap-px overflow-hidden rounded-sm border border-border bg-border">
                {RESULT_WORDS.map((word) => (
                  <li key={word} className="font-mono whitespace-nowrap bg-background px-3 py-3 text-[0.6875rem] uppercase tracking-[0.12em] sm:px-4 sm:text-xs sm:tracking-[0.18em]">
                    <span className="text-primary-glow" aria-hidden="true">
                      ◆{" "}
                    </span>
                    {word}
                  </li>
                ))}
              </ul>
            </div>
            <figcaption className="eyebrow mt-4 flex justify-between">
              <span>{RESULT_NAME}</span>
              <span className="text-primary-glow">Now open</span>
            </figcaption>
          </figure>
        </Reveal>

        <ol className="grid gap-px overflow-hidden rounded-sm border border-border bg-border sm:grid-cols-3 lg:col-span-12">
          {PILLARS.map((pillar, i) => (
            <Reveal as="li" key={pillar.title} delay={i * 100} className="bg-surface p-7 sm:p-8">
              <p className="eyebrow text-primary-glow">{pillar.label}</p>
              <h3 className="font-wide mt-3 text-lg font-bold uppercase">{pillar.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{pillar.body}</p>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
