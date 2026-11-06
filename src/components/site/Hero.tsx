import heroRose from "@/assets/hero-rose.jpg";
import { BRAND, HERO_TAGLINE } from "@/content/site";
import { DripText } from "./DripText";

export function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative isolate overflow-hidden border-b border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center px-5 pb-8 pt-4 sm:px-8">
        <h1
          id="hero-title"
          className="text-silver relative z-10 text-center font-gothic text-[3.2rem] leading-none sm:text-7xl lg:text-[6.5rem]"
        >
          <DripText>{BRAND}</DripText>
        </h1>

        <div className="relative -mt-4 aspect-[4/3] w-[min(82vw,26rem)] lg:-mt-8 lg:w-[30rem]">
          <div
            aria-hidden="true"
            className="absolute inset-[15%] -z-10 rounded-full bg-primary/30 blur-3xl"
          />
          <img
            src={heroRose}
            alt="The BLVCK MARKET blue rose"
            width={1920}
            height={1088}
            fetchPriority="high"
            className="h-full w-full object-cover object-[72%_center] [mask-image:radial-gradient(ellipse_at_center,black_45%,transparent_72%)]"
          />
        </div>

        <p className="mt-2 text-center font-mono text-[0.625rem] uppercase tracking-[0.42em] text-muted-foreground sm:text-[0.6875rem]">
          {HERO_TAGLINE}
        </p>
        <span className="mt-3 h-px w-10 bg-primary-glow" aria-hidden="true" />
      </div>
    </section>
  );
}
