import { persistInquiry } from "./inquiry.functions";
import { inquirySchema, type Inquiry, type InquiryResult } from "./inquiry-schema";
export { NOT_SURE_OPTION, PACKAGE_INTEREST_OPTIONS, inquirySchema } from "./inquiry-schema";
export type { Inquiry, InquiryInput, InquiryResult } from "./inquiry-schema";

/** Single integration seam: delivered means persisted, not emailed. */
export async function submitInquiry(inquiry: Inquiry): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(inquiry);
  if (!parsed.success) return { delivered: false, reason: "invalid_input" };
  try {
    return await persistInquiry({ data: parsed.data });
  } catch {
    return { delivered: false, reason: "storage_failed" };
  }
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
