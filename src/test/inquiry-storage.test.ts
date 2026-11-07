import { beforeEach, describe, expect, it, vi } from "vitest";
import { storeInquiry } from "@/lib/inquiry.server";

const { insert, createClient } = vi.hoisted(() => ({ insert: vi.fn(), createClient: vi.fn() }));
vi.mock("@supabase/supabase-js", () => ({ createClient }));
const valid = {
  name: "Jordan Lee", business: "Northside Coffee", email: "jordan@example.com", website: "",
  packageInterest: "AUTOPILOT", foundingOffer: true, message: "We want to discuss a campaign.", contactFax: "",
};

beforeEach(() => {
  vi.stubEnv("SUPABASE_URL", "https://database.example.test");
  vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "sb_publishable_test");
  insert.mockReset();
  createClient.mockReset().mockReturnValue({ from: () => ({ insert }) });
});

describe("Server inquiry storage", () => {
  it("confirms only a database 201 with no error and inserts approved fields", async () => {
    insert.mockResolvedValue({ status: 201, error: null });
    expect(await storeInquiry({ ...valid, status: "closed", created_at: "2000-01-01" })).toEqual({ delivered: true });
    expect(insert).toHaveBeenCalledWith(valid);
    expect(createClient).toHaveBeenCalledWith("https://database.example.test", "sb_publishable_test", expect.objectContaining({
      auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false },
    }));
  });
  it("does not claim received when the database refuses the insert", async () => {
    insert.mockResolvedValue({ status: 403, error: { message: "permission denied" } });
    expect(await storeInquiry(valid)).toEqual({ delivered: false, reason: "storage_failed" });
  });
  it("rejects invalid server input even when client validation is bypassed", async () => {
    expect(await storeInquiry({ ...valid, email: "invalid" })).toEqual({ delivered: false, reason: "invalid_input" });
    expect(insert).not.toHaveBeenCalled();
  });
  it("rejects honeypot submissions on the server", async () => {
    expect(await storeInquiry({ ...valid, contactFax: "bot" })).toEqual({ delivered: false, reason: "invalid_input" });
    expect(insert).not.toHaveBeenCalled();
  });
  it("reports missing configuration honestly", async () => {
    vi.stubEnv("SUPABASE_PUBLISHABLE_KEY", "");
    expect(await storeInquiry(valid)).toEqual({ delivered: false, reason: "storage_failed" });
    expect(insert).not.toHaveBeenCalled();
  });
});