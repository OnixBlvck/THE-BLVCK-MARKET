CREATE TABLE public.contact_submissions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL CHECK (name = btrim(name) AND char_length(name) BETWEEN 1 AND 100),
  business text NOT NULL CHECK (business = btrim(business) AND char_length(business) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (email = btrim(email) AND char_length(email) BETWEEN 3 AND 255 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$'),
  website text NOT NULL DEFAULT '' CHECK (website = btrim(website) AND char_length(website) <= 300),
  "packageInterest" text NOT NULL CHECK ("packageInterest" IN ('VISIBILITY UPGRADE', 'COMPLETE TAKEOVER', 'AUTOPILOT', 'Not sure yet')),
  "foundingOffer" boolean NOT NULL DEFAULT false,
  message text NOT NULL CHECK (message = btrim(message) AND char_length(message) BETWEEN 10 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now(),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'reviewed', 'closed')),
  "contactFax" text NOT NULL DEFAULT '' CHECK ("contactFax" = '')
);
GRANT INSERT (name, business, email, website, "packageInterest", "foundingOffer", message, "contactFax") ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;
ALTER TABLE public.contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may insert valid new inquiries only"
  ON public.contact_submissions FOR INSERT TO anon
  WITH CHECK (status = 'new' AND "contactFax" = '');
CREATE INDEX contact_submissions_created_at_idx ON public.contact_submissions (created_at DESC);
COMMENT ON TABLE public.contact_submissions IS 'Private customer inquiries; public access is restricted to validated inserts. Email notifications are not configured.';