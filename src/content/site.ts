/**
 * BLVCK MARKET homepage content.
 *
 * Brand architecture:
 * - BLVCK MARKET is the business and the website.
 * - The Three-Phase Program is the program/methodology inside BLVCK MARKET.
 * - THE BLVCK EFFECT describes the transformation/results — not a brand or package.
 * - VONTEVISUALZ is the creative partner / production hub.
 *
 * Approved, fixed wording: brand name, affiliation lockup, program name,
 * and the three package names.
 * Everything else is draft homepage marketing copy — not an established
 * slogan or quotation — and can be revised freely.
 */

export const BRAND = "BLVCK MARKET";
export const AFFILIATE = "VONTEVISUALZ";
export const LOCKUP = `${BRAND} × ${AFFILIATE}`;
export const AFFILIATE_ROLE = "Creative partner & production hub";

/** Program/methodology inside BLVCK MARKET — not the business name. */
export const PROGRAM_NAME = "THE THREE-PHASE PROGRAM";
export const GRAND_OPENING_LINE = `${BRAND} GRAND OPENING INTRODUCING: ${PROGRAM_NAME}`;

/** Describes the transformation/results — not a separate brand or package. */
export const RESULT_NAME = "THE BLVCK EFFECT";
export const RESULT_LINE = "Helping businesses become noticed, understood, seen, and explained.";
export const RESULT_WORDS = ["Noticed", "Understood", "Seen", "Explained"];

/** DRAFT homepage marketing copy — not an established brand quotation. */
export const DRAFT_HERO_HEADLINE = {
  lead: "THE MARKET MOVES.",
  close: "MAKE YOUR BRAND IMPOSSIBLE TO IGNORE.",
};

export type SectionId = "home" | "about" | "services" | "program" | "partnerships" | "contact";

export const NAV_LINKS: { id: SectionId; label: string }[] = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "program", label: "Program" },
  { id: "partnerships", label: "Partnerships" },
  { id: "contact", label: "Contact" },
];

/** Homepage layout copy (draft wording following the supplied layout reference). */
export const HEADER_CTA = `JOIN THE ${BRAND}`;
export const HERO_TAGLINE = "EXCLUSIVE. INTENTIONAL. TRANSFORMATIVE.";

export const ABOUT_BAND = {
  label: "About",
  heading: ["WE BUILD LEGACIES", "IN THE DARK."],
  body: `${BRAND} is a private creative intelligence and brand development studio. We engineer identity, influence, and impact for businesses ready to be noticed.`,
  cta: "Our story",
};

export const PROGRAM_BAND = {
  label: PROGRAM_NAME,
  heading: "A JOURNEY. A SYSTEM. A BECOMING.",
  body: `Three phases that move your business from unseen to understood. The result is ${RESULT_NAME}.`,
  cta: "View the phases",
};

export const SERVICE_COLUMNS = [
  { icon: "eye", title: "BRAND INTELLIGENCE", body: "Research into your market, audience, and competitors before a single move is made." },
  { icon: "pen", title: "CREATIVE DEVELOPMENT", body: "Visual direction and promotional creative that make your brand recognizable." },
  { icon: "target", title: "STRATEGIC ACTIVATION", body: "Campaigns and outreach planned, launched, and tracked with intent." },
  { icon: "key", title: "PRIVATE ADVISORY", body: "Direct guidance on positioning, priorities, and what the data says next." },
] as const;

export const SIGNATURE_BAND = {
  label: "Featured",
  heading: "SIGNATURE MARK",
  body: "The Blue Rose. Symbol of transformation, rarity, and unseen power.",
  script: "Blvck Market",
};

export const PARTNERSHIPS_BAND = {
  label: "Partnerships",
  heading: "ALIGN. ELEVATE. EXPAND.",
  body: `${BRAND} works alongside ${AFFILIATE}, its creative partner and production hub.`,
  cta: "View partners",
};

export const FOOTER_TAGLINE = "Noticed. Understood. Seen. Explained.";

export const INQUIRY_COPY = {
  receivedLabel: "Inquiry received",
  receivedHeading: "Received.",
  receivedBody: "Your inquiry has been securely saved for review. Email notifications are not configured yet.",
  failed: "Your inquiry could not be saved. Your details are still here — please try again.",
  privacy: "Your inquiry is saved privately for review. Email notifications are not configured yet.",
  submitting: "Saving inquiry…",
};

export const PACKAGE_NAMES = [
  "VISIBILITY UPGRADE",
  "COMPLETE TAKEOVER",
  "AUTOPILOT",
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
    name: "AUTOPILOT",
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
