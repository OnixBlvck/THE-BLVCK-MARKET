import heroRose from "@/assets/hero-rose.jpg";
import { PARTNERSHIPS_BAND, SIGNATURE_BAND } from "@/content/site";
import { BandLabel, OutlineLink, serifHeading } from "./Primitives";

export function SignatureBand() {
  return (
    <div className="border-b border-border">
      <div className="mx-auto grid max-w-[1440px] items-center lg:grid-cols-3">
        <section aria-labelledby="signature-title" className="px-5 py-10 sm:px-8 lg:px-14">
          <BandLabel>{SIGNATURE_BAND.label}</BandLabel>
          <h2 id="signature-title" className={`${serifHeading} mt-4 text-2xl`}>
            {SIGNATURE_BAND.heading}
          </h2>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">{SIGNATURE_BAND.body}</p>
        </section>

        <div className="flex flex-col items-center border-y border-border px-5 py-8 lg:border-x lg:border-y-0">
          <p aria-label={SIGNATURE_BAND.script} className="text-glow font-script text-5xl leading-none sm:text-6xl">
            {SIGNATURE_BAND.script}
          </p>
          <img
            src={heroRose}
            alt=""
            width={1920}
            height={1088}
            loading="lazy"
            className="mt-2 h-16 w-20 object-cover object-[72%_center] [mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_70%)]"
          />
        </div>

        <section id="partnerships" aria-labelledby="partnerships-title" className="px-5 py-10 sm:px-8 lg:px-14">
          <BandLabel>{PARTNERSHIPS_BAND.label}</BandLabel>
          <h2 id="partnerships-title" className={`${serifHeading} mt-4 text-2xl`}>
            {PARTNERSHIPS_BAND.heading}
          </h2>
          <p className="mt-3 max-w-xs text-xs leading-relaxed text-muted-foreground">{PARTNERSHIPS_BAND.body}</p>
          <OutlineLink href="#contact" className="mt-5">
            {PARTNERSHIPS_BAND.cta}
          </OutlineLink>
        </section>
      </div>
    </div>
  );
}
