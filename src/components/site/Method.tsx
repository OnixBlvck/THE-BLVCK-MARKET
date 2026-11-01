import { METHOD_STEPS } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Method() {
  return (
    <section id="method" aria-labelledby="method-title" className="relative overflow-hidden border-t border-border">
      <div className="hairline-grid absolute inset-0 -z-10 opacity-40 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionHeading
            id="method-title"
            index="04"
            eyebrow="Method"
            title={
              <>
                Discover <span className="text-primary-glow">→</span> Diagnose{" "}
                <span className="text-primary-glow">→</span> Develop <span className="text-primary-glow">→</span>{" "}
                Deploy <span className="text-primary-glow">→</span> Measure
              </>
            }
            intro="Five steps, in order, every time. No guesswork dressed up as strategy."
          />
        </Reveal>

        <ol className="mt-16 grid gap-px overflow-hidden rounded-sm border border-border bg-border md:grid-cols-5">
          {METHOD_STEPS.map((step, i) => (
            <Reveal
              as="li"
              key={step.name}
              delay={i * 90}
              className="group relative bg-background p-7 transition-colors hover:bg-surface md:min-h-72"
            >
              <span className="font-mono text-xs text-muted-foreground">Step 0{i + 1}</span>
              <h3 className="font-wide mt-8 text-2xl font-black uppercase tracking-tight transition-colors group-hover:text-primary-glow">
                {step.name}
              </h3>
              <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-0 bg-primary-glow transition-all duration-500 group-hover:w-full"
              />
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
