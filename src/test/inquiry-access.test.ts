// @vitest-environment node
import { describe, expect, it } from "vitest";

const url = process.env["SUPABASE_URL"];
const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
const payload = { name: "Policy test", business: "Verification only", email: "policy-test@example.com", packageInterest: "AUTOPILOT", message: "This invalid entry must never be stored." };

describe.skipIf(!url || !key)("Live anonymous inquiry permissions", () => {
  async function request(method: string, body?: object) {
    if (!url || !key) throw new Error("Database configuration unavailable");
    return fetch(`${url.replace(/\/$/, "")}/rest/v1/contact_submissions?id=eq.00000000-0000-0000-0000-000000000000`, {
      method,
      headers: { apikey: key, "Content-Type": "application/json", Prefer: "return=minimal" },
      ...(body ? { body: JSON.stringify(body) } : {}),
    });
  }
  for (const method of ["GET", "PATCH", "DELETE"]) {
    it(`denies anonymous ${method} access`, async () => {
      const response = await request(method, method === "PATCH" ? { message: "Unauthorized modification" } : undefined);
      expect([401, 403]).toContain(response.status);
    });
  }
  for (const [field, value] of Object.entries({ packageInterest: "INVALID", contactFax: "bot", status: "closed", created_at: "2000-01-01", email: "invalid", message: "short" })) {
    it(`rejects anonymous inserts with invalid or protected ${field}`, async () => {
      const response = await request("POST", { ...payload, [field]: value });
      expect(response.status).toBeGreaterThanOrEqual(400);
    });
  }
});