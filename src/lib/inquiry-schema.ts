import { z } from "zod";
import { PACKAGE_NAMES } from "@/content/site";

export const NOT_SURE_OPTION = "Not sure yet";
export const PACKAGE_INTEREST_OPTIONS = [...PACKAGE_NAMES, NOT_SURE_OPTION] as const;

export const inquirySchema = z.object({
  name: z.string().trim().min(1, "Enter your name.").max(100, "Keep your name under 100 characters."),
  business: z.string().trim().min(1, "Enter your business name.").max(120, "Keep the business name under 120 characters."),
  email: z.string().trim().min(1, "Enter your email.").email("Enter a valid email address.").max(255, "Keep your email under 255 characters."),
  website: z.string().trim().max(300, "Keep this link under 300 characters.").optional().or(z.literal("")),
  packageInterest: z.enum(PACKAGE_INTEREST_OPTIONS, {
    errorMap: () => ({ message: "Choose a package or “Not sure yet”." }),
  }),
  foundingOffer: z.boolean().default(false),
  message: z.string().trim().min(10, "Tell us a little more — at least 10 characters.").max(2000, "Keep your message under 2000 characters."),
  // Decoy field: reject populated submissions, never pretend they were saved.
  contactFax: z.string().max(0, "Unable to submit this inquiry.").default(""),
});

export type InquiryInput = z.input<typeof inquirySchema>;
export type Inquiry = z.output<typeof inquirySchema>;
export type InquiryResult = { delivered: true } | { delivered: false; reason: "invalid_input" | "storage_failed" };