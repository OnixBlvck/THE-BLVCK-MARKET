import { beforeEach, describe, expect, it, vi } from "vitest";

import * as site from "@/content/site";
import { BRAND, FOUNDING_OFFER, GRAND_OPENING_LINE, PACKAGES, PROGRAM_NAME, RESULT_NAME } from "@/content/site";
import { PACKAGE_INTEREST_OPTIONS, inquirySchema, submitInquiry } from "@/lib/inquiry";

const { persist } = vi.hoisted(() => ({ persist: vi.fn() }));
vi.mock("@/lib/inquiry.functions", () => ({ persistInquiry: persist }));
beforeEach(() => persist.mockReset());

const valid = {
  name: "Jordan Lee",
  business: "Northside Coffee",
  email: "jordan@example.com",
  website: "",
  packageInterest: "COMPLETE TAKEOVER",
  foundingOffer: true,
  message: "We want more local foot traffic this spring.",
};

describe("BLVCK MARKET content rules", () => {
  it("offers exactly the three approved packages, in order", () => {
    expect(PACKAGES.map((p) => p.name)).toEqual(["VISIBILITY UPGRADE", "COMPLETE TAKEOVER", "AUTOPILOT"]);
  });

  it("keeps the approved grand-opening program wording", () => {
    expect(GRAND_OPENING_LINE).toBe("BLVCK MARKET GRAND OPENING INTRODUCING: THE THREE-PHASE PROGRAM");
  });

  it("names the business BLVCK MARKET and the program The Three-Phase Program", () => {
    expect(BRAND).toBe("BLVCK MARKET");
    expect(PROGRAM_NAME).toBe("THE THREE-PHASE PROGRAM");
  });

  it("never uses prohibited brand wording in site content or any page/component source", () => {
    // Guard list: these words must never appear on the site.
    const prohibited = /factory|tattoo|inknior|ink nior/i;
    expect(JSON.stringify(site)).not.toMatch(prohibited);
    const sources = import.meta.glob(["/src/routes/**/*.tsx", "/src/components/site/**/*.tsx", "/src/content/**/*.ts"], {
      query: "?raw",
      import: "default",
      eager: true,
    }) as Record<string, string>;
    expect(Object.keys(sources).length).toBeGreaterThan(5);
    for (const [file, text] of Object.entries(sources)) {
      expect(`${file}: ${text}`).not.toMatch(prohibited);
    }
  });

  it("never presents FastCutEdits or ONYX BLVCK as BLVCK MARKET services", () => {
    const all = JSON.stringify(site);
    expect(all).not.toMatch(/fastcut|onyx/i);
  });

  it("keeps THE BLVCK EFFECT as the result, not a package", () => {
    expect(RESULT_NAME).toBe("THE BLVCK EFFECT");
    expect(PACKAGES.map((p) => p.name)).not.toContain(RESULT_NAME);
  });

  it("states the founding offer terms exactly", () => {
    expect(FOUNDING_OFFER.eligibility).toBe("First 10 participating businesses");
    expect(FOUNDING_OFFER.discount).toBe("20% off the first qualifying package");
  });
});

describe("Inquiry form", () => {
  it("lists the three packages plus Not sure yet", () => {
    expect([...PACKAGE_INTEREST_OPTIONS]).toEqual([
      "VISIBILITY UPGRADE",
      "COMPLETE TAKEOVER",
      "AUTOPILOT",
      "Not sure yet",
    ]);
  });

  it("accepts a complete inquiry with no website", () => {
    expect(inquirySchema.safeParse(valid).success).toBe(true);
  });

  it("rejects an invalid email", () => {
    expect(inquirySchema.safeParse({ ...valid, email: "not-an-email" }).success).toBe(false);
  });

  it("rejects a package that is not offered", () => {
    expect(inquirySchema.safeParse({ ...valid, packageInterest: "PLATINUM" }).success).toBe(false);
  });

  it("requires name, business, and message", () => {
    for (const field of ["name", "business", "message"] as const) {
      expect(inquirySchema.safeParse({ ...valid, [field]: "  " }).success).toBe(false);
    }
  });

  it("only confirms delivery after storage confirms success", async () => {
    persist.mockResolvedValue({ delivered: true });
    const parsed = inquirySchema.parse(valid);
    expect(await submitInquiry(parsed)).toEqual({ delivered: true });
    expect(persist).toHaveBeenCalledWith({ data: { ...valid, contactFax: "" } });
  });

  it("does not confirm a failed insert", async () => {
    persist.mockResolvedValue({ delivered: false, reason: "storage_failed" });
    expect(await submitInquiry(inquirySchema.parse(valid))).toEqual({ delivered: false, reason: "storage_failed" });
  });

  it("handles network failures without a success claim", async () => {
    persist.mockRejectedValue(new Error("offline"));
    expect(await submitInquiry(inquirySchema.parse(valid))).toEqual({ delivered: false, reason: "storage_failed" });
  });

  it("rejects populated honeypots before calling storage", async () => {
    expect(await submitInquiry({ ...valid, contactFax: "spam" })).toEqual({ delivered: false, reason: "invalid_input" });
    expect(persist).not.toHaveBeenCalled();
  });

  it("enforces all maximum field lengths", () => {
    const limits = { name: 100, business: 120, email: 255, website: 300, message: 2000 };
    for (const [field, limit] of Object.entries(limits)) {
      expect(inquirySchema.safeParse({ ...valid, [field]: "x".repeat(limit + 1) }).success).toBe(false);
    }
  });
});
