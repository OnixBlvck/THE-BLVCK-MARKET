import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import type { PackageName } from "@/content/site";

import { Contact, type InquiryPreset } from "@/components/site/Contact";
import { Hero } from "@/components/site/Hero";
import { IntroBands } from "@/components/site/IntroBands";
import { Services } from "@/components/site/Services";
import { ThreePhaseProgram } from "@/components/site/ThreePhaseProgram";
import { ServiceColumns } from "@/components/site/ServiceColumns";
import { SignatureBand } from "@/components/site/SignatureBand";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

const TITLE = "BLVCK MARKET — Brand Visibility, Marketing & The Three-Phase Program";
const DESCRIPTION =
  "BLVCK MARKET helps businesses become noticed, understood, seen, and explained through marketing, brand visibility, and creative promotion. The Three-Phase Program: Visibility Upgrade, Complete Takeover, Autopilot.";

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

function Index() {
  const [preset, setPreset] = useState<InquiryPreset | null>(null);

  const requestProposal = (pkg: PackageName) => {
    setPreset({ packageInterest: pkg, nonce: Date.now() });
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

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
        <IntroBands />
        <ThreePhaseProgram />
        <ServiceColumns />
        <Services onRequestProposal={requestProposal} />
        <SignatureBand />
        <Contact preset={preset} />
      </main>
      <SiteFooter />
    </>
  );
}
