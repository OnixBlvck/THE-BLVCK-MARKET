import { AUDIENCES, CAPABILITIES } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

const HOW_IT_WORKS = [
  "You tell us where the business is and where you want it to go.",
  "We review your presence, your market, and your competition.",
  "You get a proposal with a clear scope — then we build and run the work together.",
  "We report what the data shows and recommend what comes next.",
];

export function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="relative">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionHeading
            id="about-title"
            index="02"
            eyebrow="The rundown"
            title={
              <>
                Marketing with <span className="font-serif font-normal normal-case italic text-primary-glow">intent</span>.
                Visibility with receipts.
              </>
            }
            intro="BLVCK MARKET helps businesses improve how they present themselves, reach potential customers, plan campaigns, spot market opportunities, and understand what their marketing is actually doing."
          />
        </Reveal>

        <div className="mt-16 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <h3 className="eyebrow">Who we work with</h3>
            <ul className="mt-6 space-y-3">
              {AUDIENCES.map((a) => (
                <li key={a} className="font-wide flex items-center gap-3 text-xl font-bold uppercase sm:text-2xl">
                  <span className="h-1.5 w-1.5 rotate-45 bg-primary-glow" aria-hidden="true" />
                  {a}
                </li>
              ))}
            </ul>

            <h3 className="eyebrow mt-14">How it works</h3>
            <ol className="mt-6 space-y-5">
              {HOW_IT_WORKS.map((step, i) => (
                <li key={step} className="flex gap-4 text-sm leading-relaxed text-muted-foreground">
                  <span className="font-mono text-xs text-primary-glow">0{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal className="lg:col-span-8" delay={120}>
            <h3 className="eyebrow">Capabilities</h3>
            <ul className="mt-6 grid border-t border-border sm:grid-cols-2">
              {CAPABILITIES.map((c, i) => (
                <li
                  key={c}
                  className="group flex items-start gap-4 border-b border-border py-5 transition-colors hover:bg-surface sm:odd:pr-6 sm:even:border-l sm:even:pl-6"
                >
                  <span className="font-mono pt-0.5 text-xs text-muted-foreground transition-colors group-hover:text-primary-glow">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base leading-snug">{c}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
