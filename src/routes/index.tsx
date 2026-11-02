import { useCallback, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { About } from "@/components/site/About";
import { ThreePhaseProgram } from "@/components/site/ThreePhaseProgram";
import { Contact, type InquiryPreset } from "@/components/site/Contact";
import { FoundingOffer } from "@/components/site/FoundingOffer";
import { Hero } from "@/components/site/Hero";
import { Method } from "@/components/site/Method";
import { Reporting } from "@/components/site/Reporting";
import { Services } from "@/components/site/Services";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Work } from "@/components/site/Work";
import type { PackageName } from "@/content/site";

const TITLE = "BLVCK MARKET — Marketing, Brand Visibility & Creative Promotion";
const DESCRIPTION =
  "BLVCK MARKET helps businesses sharpen their presentation, plan campaigns, reach customers, and understand performance. Introducing The Three-Phase Program.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: TITLE },
      { name: "twitter:description", content: DESCRIPTION },
    ],
  }),
  component: Index,
});

function scrollToContact() {
  const target = document.getElementById("contact");
  if (!target) return;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  target.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
  window.history.replaceState(null, "", "#contact");
}

function Index() {
  const [preset, setPreset] = useState<InquiryPreset | null>(null);

  const requestProposal = useCallback((pkg: PackageName) => {
    setPreset({ packageInterest: pkg, nonce: Date.now() });
    scrollToContact();
  }, []);

  const claimFounding = useCallback(() => {
    setPreset({ foundingOffer: true, nonce: Date.now() });
    scrollToContact();
  }, []);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
      >
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ThreePhaseProgram />
        <About />
        <Services onRequestProposal={requestProposal} />
        <Method />
        <Reporting />
        <FoundingOffer onClaim={claimFounding} />
        <Work />
        <Contact preset={preset} />
      </main>
      <SiteFooter />
    </>
  );
}
