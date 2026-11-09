import { ABOUT_BAND, PROGRAM_BAND } from "@/content/site";
import { BandLabel, OutlineLink, serifHeading } from "./Primitives";

export function IntroBands() {
  return (
    <div className="border-b border-border">
      <div className="mx-auto grid max-w-[1440px] md:grid-cols-2">
        <section id="about" aria-labelledby="about-title" className="px-5 py-10 sm:px-8 md:border-r md:border-border lg:px-14">
          <BandLabel>{ABOUT_BAND.label}</BandLabel>
          <h2 id="about-title" className={`${serifHeading} mt-4 text-2xl lg:text-[2rem]`}>
            {ABOUT_BAND.heading[0]}
            <br />
            {ABOUT_BAND.heading[1]}
          </h2>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">{ABOUT_BAND.body}</p>
          <OutlineLink href="#services" className="mt-5">
            {ABOUT_BAND.cta}
          </OutlineLink>
        </section>

        <section id="program-intro" aria-labelledby="program-intro-title" className="border-t border-border px-5 py-10 sm:px-8 md:border-t-0 lg:px-14">
          <BandLabel>{PROGRAM_BAND.label}</BandLabel>
          <h2 id="program-intro-title" className={`${serifHeading} mt-4 text-2xl lg:text-[2rem]`}>
            {PROGRAM_BAND.heading}
          </h2>
          <p className="mt-4 max-w-md text-xs leading-relaxed text-muted-foreground">{PROGRAM_BAND.body}</p>
          <OutlineLink href="#program" className="mt-5">
            {PROGRAM_BAND.cta}
          </OutlineLink>
          <div className="mt-6 flex gap-2" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={`h-1.5 w-1.5 rounded-full ${i === 0 ? "bg-primary-glow" : "bg-muted-foreground/40"}`} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
