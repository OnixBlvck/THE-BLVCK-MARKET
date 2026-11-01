import { z } from "zod";

import { PACKAGE_NAMES } from "@/content/site";

export const NOT_SURE_OPTION = "Not sure yet";

export const PACKAGE_INTEREST_OPTIONS = [...PACKAGE_NAMES, NOT_SURE_OPTION] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100, "Keep your name under 100 characters."),
  business: z
    .string()
    .trim()
    .min(1, "Enter your business name.")
    .max(120, "Keep the business name under 120 characters."),
  email: z
    .string()
    .trim()
    .min(1, "Enter your email.")
    .email("Enter a valid email address.")
    .max(255, "Keep your email under 255 characters."),
  website: z.string().trim().max(300, "Keep this link under 300 characters.").optional().or(z.literal("")),
  packageInterest: z.enum(PACKAGE_INTEREST_OPTIONS, {
    errorMap: () => ({ message: "Choose a package or “Not sure yet”." }),
  }),
  foundingOffer: z.boolean().default(false),
  message: z
    .string()
    .trim()
    .min(10, "Tell us a little more — at least 10 characters.")
    .max(2000, "Keep your message under 2000 characters."),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;

export type InquiryResult = { delivered: true } | { delivered: false; reason: "not_configured" };

/**
 * INTEGRATION SEAM — inquiry delivery is NOT connected.
 *
 * Nothing is sent anywhere yet. Replace this body with a real delivery call
 * (e.g. a server function that stores the inquiry and/or emails the team)
 * once a destination is approved. Callers already handle both outcomes.
 */
export async function submitInquiry(inquiry: Inquiry): Promise<InquiryResult> {
  void inquiry;
  return { delivered: false, reason: "not_configured" };
}

export function formatInquiry(inquiry: Inquiry): string {
  return [
    `Name: ${inquiry.name}`,
    `Business: ${inquiry.business}`,
    `Email: ${inquiry.email}`,
    inquiry.website ? `Website / social: ${inquiry.website}` : null,
    `Package interest: ${inquiry.packageInterest}`,
    inquiry.foundingOffer ? "Asking about the founding offer: Yes" : null,
    "",
    inquiry.message,
  ]
    .filter((line) => line !== null)
    .join("\n");
}
