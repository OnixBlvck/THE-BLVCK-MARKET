import { Info } from "lucide-react";

import { REPORT_ITEMS } from "@/content/site";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

// Purely decorative shapes for the illustrative preview — not data.
const BAR_SHAPE = [38, 52, 44, 66, 58, 74, 62, 80, 70, 86, 78, 92];
const SOURCE_SHAPE = [
  { label: "Channel A", w: "w-[72%]" },
  { label: "Channel B", w: "w-[48%]" },
  { label: "Channel C", w: "w-[30%]" },
  { label: "Referral", w: "w-[18%]" },
];

function IllustrativeDashboard() {
  return (
    <figure
      aria-label="Illustrative report preview — not live client data"
      className="shadow-glow-lg relative overflow-hidden rounded-sm border border-border bg-surface"
    >
      <div className="flex items-center gap-2 border-b border-gold/30 bg-gold/10 px-5 py-3">
        <Info className="h-4 w-4 shrink-0 text-gold" aria-hidden="true" />
        <p className="font-mono text-[0.6875rem] uppercase tracking-[0.16em] text-gold">
          Illustrative preview — not live client data
        </p>
      </div>

      <div className="grid gap-px bg-border sm:grid-cols-3" aria-hidden="true">
        {["Reach", "Engagement", "Inquiries"].map((label) => (
          <div key={label} className="bg-surface p-5">
            <p className="eyebrow">{label}</p>
            <p className="font-wide mt-3 text-3xl font-black text-muted-foreground/50">—</p>
            <div className="mt-3 h-1 w-full rounded-full bg-muted">
              <div className="h-1 w-1/2 rounded-full bg-primary/40" />
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-px bg-border lg:grid-cols-5" aria-hidden="true">
        <div className="bg-surface p-5 lg:col-span-3">
          <p className="eyebrow">Audience response over time</p>
          <div className="mt-6 flex h-36 items-end gap-1.5">
            {BAR_SHAPE.map((h, i) => (
              <div
                key={i}
                className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/30 to-primary-glow/80"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="bg-surface p-5 lg:col-span-2">
          <p className="eyebrow">Source breakdown</p>
          <ul className="mt-6 space-y-4">
            {SOURCE_SHAPE.map((s) => (
              <li key={s.label}>
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{s.label}</span>
                  <span>—</span>
                </div>
                <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted">
                  <div className={`h-1.5 rounded-full bg-silver/60 ${s.w}`} />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-border bg-surface p-5" aria-hidden="true">
        <p className="eyebrow">Next-step recommendations</p>
        <div className="mt-4 space-y-2">
          <div className="h-2 w-11/12 rounded-full bg-muted" />
          <div className="h-2 w-8/12 rounded-full bg-muted" />
          <div className="h-2 w-9/12 rounded-full bg-muted" />
        </div>
      </div>
    </figure>
  );
}

export function Reporting() {
  return (
    <section id="insights" aria-labelledby="insights-title" className="relative border-t border-border bg-ink">
      <div className="mx-auto grid max-w-7xl gap-16 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="insights-title"
            index="05"
            eyebrow="Insights & reporting"
            title="Know what moved. Know what didn't."
            intro="Reports are built from the data your channels actually provide. Here is the kind of information a client report can include."
          />
          <ul className="mt-10 divide-y divide-border border-y border-border">
            {REPORT_ITEMS.map((item) => (
              <li key={item.title} className="py-4">
                <h3 className="font-wide text-sm font-bold uppercase">{item.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-xs leading-relaxed text-muted-foreground">
            What is available depends on each platform and the access you grant. Reporting tools are set
            up per client — nothing is connected by default.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-7 lg:pt-24" delay={150}>
          <IllustrativeDashboard />
        </Reveal>
      </div>
    </section>
  );
}
