REVOKE ALL PRIVILEGES ON TABLE public.contact_submissions FROM anon, authenticated;
GRANT INSERT (name, business, email, website, "packageInterest", "foundingOffer", message, "contactFax") ON public.contact_submissions TO anon;
GRANT ALL ON public.contact_submissions TO service_role;
CREATE FUNCTION public.set_inquiry_submission_metadata()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  NEW.created_at := now();
  NEW.status := 'new';
  RETURN NEW;
END;
$$;
CREATE TRIGGER set_inquiry_submission_metadata
BEFORE INSERT ON public.contact_submissions
FOR EACH ROW EXECUTE FUNCTION public.set_inquiry_submission_metadata();