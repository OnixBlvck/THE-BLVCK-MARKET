import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { FOUNDING_OFFER } from "@/content/site";
import { Reveal } from "./Reveal";

export function FoundingOffer({ onClaim }: { onClaim: () => void }) {
  return (
    <section id="founding" aria-labelledby="founding-title" className="relative border-t border-border">
      <div className="mx-auto max-w-7xl px-5 py-24 sm:px-8 sm:py-32">
        <Reveal className="relative overflow-hidden rounded-sm border border-gold/30 bg-surface">
          <div className="bg-blue-light absolute inset-0 opacity-60" aria-hidden="true" />
          <div className="relative grid gap-12 p-7 sm:p-12 lg:grid-cols-12 lg:p-16">
            <div className="lg:col-span-7">
              <p className="eyebrow flex items-center gap-3">
                <span className="text-gold">06</span>
                <span className="h-px w-8 bg-gold/40" aria-hidden="true" />
                Founding client offer
              </p>
              <h2
                id="founding-title"
                className="font-wide mt-6 text-3xl font-black uppercase leading-[0.95] tracking-tight sm:text-5xl"
              >
                Get in early. <span className="text-gold">Get it sharper.</span>
              </h2>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
                BLVCK MARKET is opening its doors with a founding-client offer for the businesses that move
                first.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <Button variant="hero" size="xl" onClick={onClaim}>
                  Claim founding-client consideration <ArrowRight />
                </Button>
              </div>
            </div>

            <dl className="grid content-start gap-px overflow-hidden rounded-sm border border-border bg-border lg:col-span-5">
              <div className="bg-background p-6 sm:p-8">
                <dt className="eyebrow">Who qualifies</dt>
                <dd className="font-wide mt-3 text-2xl font-black uppercase leading-tight">
                  {FOUNDING_OFFER.eligibility}
                </dd>
              </div>
              <div className="bg-background p-6 sm:p-8">
                <dt className="eyebrow">The offer</dt>
                <dd className="font-wide mt-3 text-2xl font-black uppercase leading-tight text-gold">
                  {FOUNDING_OFFER.discount}
                </dd>
              </div>
              <div className="bg-background p-6 text-xs leading-relaxed text-muted-foreground sm:p-8">
                <dt className="sr-only">Terms</dt>
                <dd>
                  One-time discount, applied to the first qualifying BLVCK MARKET package only. Not
                  recurring and not unlimited — available only to the first 10 participating businesses.
                  Eligibility is confirmed in your proposal.
                </dd>
              </div>
            </dl>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
