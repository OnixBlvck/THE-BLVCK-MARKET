/**
 * BLVCK MARKET homepage content.
 *
 * Approved, fixed wording: brand name, affiliation lockup, the grand-opening
 * program line, the three package names, and the founding-offer terms.
 * Everything else is draft homepage marketing copy — not an established
 * slogan or quotation — and can be revised freely.
 */

export const BRAND = "BLVCK MARKET";
export const AFFILIATE = "VONTEVISUALZ";
export const LOCKUP = `${BRAND} × ${AFFILIATE}`;

/** Approved program wording — preserve exactly. */
export const PROGRAM_NAME = "THE BLACK FACTORY PHASE";
export const GRAND_OPENING_LINE = "BLVCK MARKET GRAND OPENING INTRODUCING: THE BLACK FACTORY PHASE PROGRAM";

/** DRAFT homepage marketing copy — not an established brand quotation. */
export const DRAFT_HERO_HEADLINE = {
  lead: "THE MARKET MOVES.",
  close: "MAKE YOUR BRAND IMPOSSIBLE TO IGNORE.",
};

export type SectionId =
  | "home"
  | "black-factory"
  | "about"
  | "services"
  | "method"
  | "insights"
  | "founding"
  | "work"
  | "contact";

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "black-factory", label: "The Black Factory Phase" },
  { id: "services", label: "Services" },
  { id: "method", label: "Method" },
  { id: "insights", label: "Insights" },
  { id: "contact", label: "Contact" },
];

export const PACKAGE_NAMES = [
  "VISIBILITY UPGRADE",
  "COMPLETE TAKEOVER",
  "VISIBILITY AUTOPILOT",
] as const;

export type PackageName = (typeof PACKAGE_NAMES)[number];

export const PACKAGES: {
  index: string;
  name: PackageName;
  summary: string;
  includes: string[];
}[] = [
  {
    index: "01",
    name: "VISIBILITY UPGRADE",
    summary: "A sharp, focused reset of how your brand shows up — and where it should go next.",
    includes: [
      "Brand and presence review",
      "Marketing presentation improvements",
      "Visibility recommendations",
      "A focused promotional direction",
    ],
  },
  {
    index: "02",
    name: "COMPLETE TAKEOVER",
    summary: "A broader campaign engagement for brands ready to move with full creative and strategic weight.",
    includes: [
      "Creative direction",
      "Promotional strategy",
      "Campaign development",
      "Outreach planning",
      "Performance reporting",
    ],
  },
  {
    index: "03",
    name: "VISIBILITY AUTOPILOT",
    summary: "Ongoing support that keeps your promotion, prospecting, and tracking moving month over month.",
    includes: [
      "Ongoing promotional support",
      "Prospect research",
      "Outreach workflow planning",
      "Lead tracking",
      "Recurring performance monitoring",
    ],
  },
];

export const CAPABILITIES = [
  "Brand presentation and creative direction",
  "Promotional campaign planning and execution support",
  "Audience and market opportunity research",
  "Competitor and positioning analysis",
  "Prospect research and qualification",
  "Targeted business outreach planning and workflows",
  "Lead and inquiry tracking",
  "Campaign performance analysis and reporting",
  "Marketing recommendations based on evidence",
];

export const AUDIENCES = [
  "Small businesses",
  "Independent brands",
  "Local businesses",
  "Growing companies",
];

export const METHOD_STEPS = [
  {
    name: "Discover",
    body: "We learn your business, your customers, your offer, and where you show up today.",
  },
  {
    name: "Diagnose",
    body: "We pinpoint what is holding visibility back — presentation, positioning, channels, or follow-through.",
  },
  {
    name: "Develop",
    body: "We build the creative direction, campaign plan, and outreach approach that fits your goals.",
  },
  {
    name: "Deploy",
    body: "The campaign goes live on the channels you use, with clear roles for who does what.",
  },
  {
    name: "Measure",
    body: "We review what the available data shows, report it plainly, and recommend the next move.",
  },
];

export const REPORT_ITEMS = [
  {
    title: "Reach & engagement",
    body: "Campaign reach and engagement, where platform data is available.",
  },
  { title: "Audience response", body: "How people are reacting — comments, saves, shares, replies." },
  { title: "Inquiries & leads", body: "New inquiries and leads logged during the campaign window." },
  { title: "Channel & source", body: "Which channels and sources the attention is coming from." },
  { title: "Creative performance", body: "Which visuals, messages, and formats are pulling their weight." },
  { title: "Competitor observations", body: "What comparable businesses are doing in your market." },
  { title: "Next-step recommendations", body: "Clear, evidence-based moves for the next phase." },
];

export const FOUNDING_OFFER = {
  eligibility: "First 10 participating businesses",
  discount: "20% off the first qualifying package",
};
