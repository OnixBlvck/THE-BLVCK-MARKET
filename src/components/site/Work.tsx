import { Button } from "@/components/ui/button";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className="relative border-t border-border bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal>
          <SectionHeading
            id="work-title"
            index="07"
            eyebrow="Work"
            title="Campaign work will be featured here."
            intro="We are just opening. Real campaigns will be shown here once they have run and the clients have approved sharing them — nothing staged, nothing borrowed."
          />
        </Reveal>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((slot, i) => (
            <Reveal
              as="li"
              key={slot}
              delay={i * 100}
              className="flex aspect-[4/5] flex-col justify-between rounded-sm border border-dashed border-border p-6 sm:aspect-[3/4]"
            >
              <span className="font-mono text-xs text-muted-foreground">Slot 0{slot}</span>
              <div>
                <span className="mb-5 block h-2 w-2 rotate-45 border border-primary-glow" aria-hidden="true" />
                <p className="font-wide text-lg font-bold uppercase text-muted-foreground">Reserved</p>
                <p className="mt-2 text-sm text-muted-foreground">Awaiting a featured campaign.</p>
              </div>
            </Reveal>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">Want your brand in one of these slots?</p>
          <Button asChild variant="lux" size="lg" className="h-11">
            <a href="#contact">Start a project</a>
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
