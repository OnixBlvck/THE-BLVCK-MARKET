import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { inquirySchema, type InquiryResult } from "./inquiry-schema";

export async function storeInquiry(input: unknown): Promise<InquiryResult> {
  const parsed = inquirySchema.safeParse(input);
  if (!parsed.success) return { delivered: false, reason: "invalid_input" };

  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) return { delivered: false, reason: "storage_failed" };

  try {
    // Stateless, anonymous, insert-only client. No service-role credentials.
    const client = createClient<Database>(url, key, {
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) {
            headers.delete("Authorization");
          }
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });
    const inquiry = parsed.data;
    const { error, status } = await client.from("contact_submissions").insert({
      name: inquiry.name,
      business: inquiry.business,
      email: inquiry.email,
      website: inquiry.website ?? "",
      packageInterest: inquiry.packageInterest,
      foundingOffer: inquiry.foundingOffer,
      message: inquiry.message,
      contactFax: inquiry.contactFax,
    });
    // Do not append .select(): anonymous callers must not read stored inquiries.
    if (error || status !== 201) return { delivered: false, reason: "storage_failed" };
    return { delivered: true };
  } catch {
    // No customer data or provider errors are exposed to the browser or logs.
    return { delivered: false, reason: "storage_failed" };
  }
}