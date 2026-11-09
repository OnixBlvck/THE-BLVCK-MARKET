CREATE TYPE public.app_role AS ENUM ('owner', 'admin', 'client');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT, INSERT, DELETE ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;
CREATE OR REPLACE FUNCTION public.is_staff(_user_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role IN ('owner','admin'))
$$;

CREATE POLICY "Read own roles or staff reads all" ON public.user_roles FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Owner grants non-owner roles" ON public.user_roles FOR INSERT TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'owner') AND role <> 'owner');
CREATE POLICY "Owner revokes non-owner roles" ON public.user_roles FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'owner') AND role <> 'owner');

CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL DEFAULT '',
  full_name text NOT NULL DEFAULT '' CHECK (char_length(full_name) <= 100),
  business text NOT NULL DEFAULT '' CHECK (char_length(business) <= 120),
  phone text NOT NULL DEFAULT '' CHECK (char_length(phone) <= 40),
  timezone text NOT NULL DEFAULT 'UTC' CHECK (char_length(timezone) <= 64),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.profiles TO authenticated;
GRANT UPDATE (full_name, business, phone, timezone) ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own profile or staff read" ON public.profiles FOR SELECT TO authenticated
  USING (id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Own profile or staff update" ON public.profiles FOR UPDATE TO authenticated
  USING (id = auth.uid() OR public.is_staff(auth.uid()))
  WITH CHECK (id = auth.uid() OR public.is_staff(auth.uid()));

CREATE TABLE public.notification_preferences (
  user_id uuid PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  in_app boolean NOT NULL DEFAULT true,
  email boolean NOT NULL DEFAULT false,
  sms boolean NOT NULL DEFAULT false,
  push boolean NOT NULL DEFAULT false,
  affirmations_opt_in boolean NOT NULL DEFAULT false,
  delivery_time time NOT NULL DEFAULT '09:00',
  consent_at timestamptz,
  unsubscribed_at timestamptz,
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.notification_preferences TO authenticated;
GRANT UPDATE (in_app, email, sms, push, affirmations_opt_in, delivery_time, consent_at, unsubscribed_at, updated_at) ON public.notification_preferences TO authenticated;
GRANT ALL ON public.notification_preferences TO service_role;
ALTER TABLE public.notification_preferences ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own prefs or staff read" ON public.notification_preferences FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Own prefs update" ON public.notification_preferences FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (NEW.id, coalesce(NEW.email, ''), left(coalesce(NEW.raw_user_meta_data->>'full_name', ''), 100));
  INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'client');
  INSERT INTO public.notification_preferences (user_id) VALUES (NEW.id);
  RETURN NEW;
END;
$$;
CREATE TRIGGER on_auth_user_created AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Consultations / booking requests
CREATE TABLE public.consultations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  package_interest text NOT NULL DEFAULT 'Not sure yet' CHECK (package_interest IN ('VISIBILITY UPGRADE','COMPLETE TAKEOVER','AUTOPILOT','Not sure yet')),
  preferred_at timestamptz,
  scheduled_at timestamptz,
  notes text NOT NULL DEFAULT '' CHECK (char_length(notes) <= 2000),
  status text NOT NULL DEFAULT 'requested' CHECK (status IN ('requested','confirmed','completed','cancelled')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.consultations TO authenticated;
GRANT ALL ON public.consultations TO service_role;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Client reads own consultations" ON public.consultations FOR SELECT TO authenticated
  USING (client_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Client requests own consultation" ON public.consultations FOR INSERT TO authenticated
  WITH CHECK ((client_id = auth.uid() AND status = 'requested' AND scheduled_at IS NULL) OR public.is_staff(auth.uid()));
CREATE POLICY "Staff manage consultations" ON public.consultations FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete consultations" ON public.consultations FOR DELETE TO authenticated
  USING (public.is_staff(auth.uid()));

-- Projects
CREATE TABLE public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 160),
  package text NOT NULL CHECK (package IN ('VISIBILITY UPGRADE','COMPLETE TAKEOVER','AUTOPILOT')),
  phase smallint NOT NULL DEFAULT 1 CHECK (phase BETWEEN 1 AND 3),
  progress smallint NOT NULL DEFAULT 0 CHECK (progress BETWEEN 0 AND 100),
  status text NOT NULL DEFAULT 'planning' CHECK (status IN ('planning','active','on_hold','completed','cancelled')),
  summary text NOT NULL DEFAULT '' CHECK (char_length(summary) <= 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.projects TO authenticated;
GRANT ALL ON public.projects TO service_role;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Client reads own projects" ON public.projects FOR SELECT TO authenticated
  USING (client_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Staff insert projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update projects" ON public.projects FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete projects" ON public.projects FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

-- Messages
CREATE TABLE public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  sender_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  body text NOT NULL CHECK (char_length(btrim(body)) BETWEEN 1 AND 4000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.messages TO authenticated;
GRANT ALL ON public.messages TO service_role;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own thread or staff" ON public.messages FOR SELECT TO authenticated
  USING (client_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Send as self in own thread or staff" ON public.messages FOR INSERT TO authenticated
  WITH CHECK (sender_id = auth.uid() AND (client_id = auth.uid() OR public.is_staff(auth.uid())));
CREATE POLICY "Staff delete messages" ON public.messages FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

-- In-app notifications
CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 160),
  body text NOT NULL DEFAULT '' CHECK (char_length(body) <= 2000),
  read_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.notifications TO authenticated;
GRANT UPDATE (read_at) ON public.notifications TO authenticated;
GRANT ALL ON public.notifications TO service_role;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own notifications or staff" ON public.notifications FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Mark own notifications read" ON public.notifications FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());
CREATE POLICY "Staff create notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete notifications" ON public.notifications FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

-- Files / deliverables (objects live in the private client-files bucket)
CREATE TABLE public.client_files (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  kind text NOT NULL DEFAULT 'upload' CHECK (kind IN ('upload','deliverable','asset')),
  file_name text NOT NULL CHECK (char_length(file_name) BETWEEN 1 AND 255),
  storage_path text NOT NULL UNIQUE CHECK (split_part(storage_path, '/', 1) = client_id::text),
  size_bytes bigint NOT NULL DEFAULT 0,
  uploaded_by uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, DELETE ON public.client_files TO authenticated;
GRANT ALL ON public.client_files TO service_role;
ALTER TABLE public.client_files ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read own files or staff" ON public.client_files FOR SELECT TO authenticated
  USING (client_id = auth.uid() OR public.is_staff(auth.uid()));
CREATE POLICY "Client uploads own, staff any" ON public.client_files FOR INSERT TO authenticated
  WITH CHECK (uploaded_by = auth.uid() AND ((client_id = auth.uid() AND kind = 'upload') OR public.is_staff(auth.uid())));
CREATE POLICY "Staff delete files" ON public.client_files FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

-- Invoices: provider references only, never card data
CREATE TABLE public.invoices (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  description text NOT NULL CHECK (char_length(btrim(description)) BETWEEN 1 AND 300),
  amount_cents integer NOT NULL CHECK (amount_cents >= 0),
  currency text NOT NULL DEFAULT 'USD' CHECK (currency ~ '^[A-Z]{3}$'),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','issued','paid','void')),
  provider text NOT NULL DEFAULT 'none' CHECK (provider IN ('none','stripe','paddle')),
  provider_reference text NOT NULL DEFAULT '' CHECK (char_length(provider_reference) <= 200),
  paid_at timestamptz,
  due_date date,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.invoices TO authenticated;
GRANT ALL ON public.invoices TO service_role;
ALTER TABLE public.invoices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Client reads own non-draft invoices" ON public.invoices FOR SELECT TO authenticated
  USING ((client_id = auth.uid() AND status <> 'draft') OR public.is_staff(auth.uid()));
CREATE POLICY "Staff insert invoices" ON public.invoices FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update invoices" ON public.invoices FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete draft invoices" ON public.invoices FOR DELETE TO authenticated USING (public.is_staff(auth.uid()) AND status = 'draft');

CREATE OR REPLACE FUNCTION public.guard_invoice_paid()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF current_user NOT IN ('service_role', 'postgres', 'supabase_admin') THEN
    IF NEW.status = 'paid' AND (TG_OP = 'INSERT' OR OLD.status IS DISTINCT FROM 'paid') THEN
      RAISE EXCEPTION 'Invoices can only be marked paid by a verified payment provider confirmation';
    END IF;
    IF TG_OP = 'UPDATE' AND OLD.status = 'paid' AND NEW.status <> 'paid' THEN
      RAISE EXCEPTION 'Paid status is controlled by the payment provider';
    END IF;
    IF TG_OP = 'INSERT' OR NEW.paid_at IS DISTINCT FROM OLD.paid_at THEN
      IF NEW.paid_at IS NOT NULL AND (TG_OP = 'INSERT' OR OLD.paid_at IS NULL) THEN
        RAISE EXCEPTION 'paid_at is set only by provider confirmation';
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER guard_invoice_paid BEFORE INSERT OR UPDATE ON public.invoices
  FOR EACH ROW EXECUTE FUNCTION public.guard_invoice_paid();

-- Tasks
CREATE TABLE public.tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL CHECK (char_length(btrim(title)) BETWEEN 1 AND 200),
  details text NOT NULL DEFAULT '' CHECK (char_length(details) <= 2000),
  status text NOT NULL DEFAULT 'todo' CHECK (status IN ('todo','in_progress','done')),
  due_date date,
  client_id uuid REFERENCES public.profiles(id) ON DELETE SET NULL,
  project_id uuid REFERENCES public.projects(id) ON DELETE SET NULL,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.tasks TO authenticated;
GRANT ALL ON public.tasks TO service_role;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff only tasks" ON public.tasks FOR ALL TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Affirmations
CREATE TABLE public.affirmation_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE CHECK (char_length(btrim(name)) BETWEEN 1 AND 80),
  description text NOT NULL DEFAULT '' CHECK (char_length(description) <= 500),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.affirmation_categories TO authenticated;
GRANT ALL ON public.affirmation_categories TO service_role;
ALTER TABLE public.affirmation_categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed-in read categories" ON public.affirmation_categories FOR SELECT TO authenticated USING (true);
CREATE POLICY "Staff write categories" ON public.affirmation_categories FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update categories" ON public.affirmation_categories FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete categories" ON public.affirmation_categories FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE TABLE public.affirmations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id uuid REFERENCES public.affirmation_categories(id) ON DELETE SET NULL,
  body text NOT NULL CHECK (char_length(btrim(body)) BETWEEN 1 AND 1000),
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','approved','archived')),
  publish_at timestamptz,
  approved_by uuid,
  approved_at timestamptz,
  created_by uuid NOT NULL DEFAULT auth.uid(),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.affirmations TO authenticated;
GRANT ALL ON public.affirmations TO service_role;
ALTER TABLE public.affirmations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Clients read approved published affirmations" ON public.affirmations FOR SELECT TO authenticated
  USING ((status = 'approved' AND (publish_at IS NULL OR publish_at <= now())) OR public.is_staff(auth.uid()));
CREATE POLICY "Staff insert affirmations" ON public.affirmations FOR INSERT TO authenticated WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff update affirmations" ON public.affirmations FOR UPDATE TO authenticated USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));
CREATE POLICY "Staff delete affirmations" ON public.affirmations FOR DELETE TO authenticated USING (public.is_staff(auth.uid()));

CREATE OR REPLACE FUNCTION public.stamp_affirmation_approval()
RETURNS trigger LANGUAGE plpgsql SET search_path = public AS $$
BEGIN
  IF NEW.status = 'approved' AND (TG_OP = 'INSERT' OR OLD.status IS DISTINCT FROM 'approved') THEN
    NEW.approved_by := auth.uid();
    NEW.approved_at := now();
  ELSIF NEW.status <> 'approved' THEN
    NEW.approved_by := NULL;
    NEW.approved_at := NULL;
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER stamp_affirmation_approval BEFORE INSERT OR UPDATE ON public.affirmations
  FOR EACH ROW EXECUTE FUNCTION public.stamp_affirmation_approval();

CREATE TABLE public.affirmation_favorites (
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  affirmation_id uuid NOT NULL REFERENCES public.affirmations(id) ON DELETE CASCADE,
  created_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, affirmation_id)
);
GRANT SELECT, INSERT, DELETE ON public.affirmation_favorites TO authenticated;
GRANT ALL ON public.affirmation_favorites TO service_role;
ALTER TABLE public.affirmation_favorites ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own favorites read" ON public.affirmation_favorites FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Own favorites add" ON public.affirmation_favorites FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());
CREATE POLICY "Own favorites remove" ON public.affirmation_favorites FOR DELETE TO authenticated USING (user_id = auth.uid());

CREATE TABLE public.affirmation_views (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  affirmation_id uuid NOT NULL REFERENCES public.affirmations(id) ON DELETE CASCADE,
  viewed_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.affirmation_views TO authenticated;
GRANT ALL ON public.affirmation_views TO service_role;
ALTER TABLE public.affirmation_views ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own views read" ON public.affirmation_views FOR SELECT TO authenticated USING (user_id = auth.uid());
CREATE POLICY "Own views add" ON public.affirmation_views FOR INSERT TO authenticated WITH CHECK (user_id = auth.uid());

CREATE TABLE public.delivery_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  affirmation_id uuid REFERENCES public.affirmations(id) ON DELETE SET NULL,
  channel text NOT NULL CHECK (channel IN ('in_app','email','sms','push')),
  status text NOT NULL CHECK (status IN ('delivered','failed','skipped_not_connected','skipped_no_consent')),
  provider_response text NOT NULL DEFAULT '' CHECK (char_length(provider_response) <= 1000),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT ON public.delivery_log TO authenticated;
GRANT ALL ON public.delivery_log TO service_role;
ALTER TABLE public.delivery_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own deliveries or staff read" ON public.delivery_log FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.is_staff(auth.uid()));
-- Staff may only record in-app deliveries; external channels require a provider (service role).
CREATE POLICY "Staff record in-app deliveries" ON public.delivery_log FOR INSERT TO authenticated
  WITH CHECK (public.is_staff(auth.uid()) AND (channel = 'in_app' OR status IN ('skipped_not_connected','skipped_no_consent')));

-- Activity log (written only by triggers)
CREATE TABLE public.activity_log (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id uuid,
  entity text NOT NULL,
  entity_id uuid,
  action text NOT NULL,
  detail text NOT NULL DEFAULT '',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.activity_log TO authenticated;
GRANT ALL ON public.activity_log TO service_role;
ALTER TABLE public.activity_log ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Staff read activity" ON public.activity_log FOR SELECT TO authenticated USING (public.is_staff(auth.uid()));
CREATE INDEX activity_log_created_idx ON public.activity_log (created_at DESC);

CREATE OR REPLACE FUNCTION public.log_activity()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE
  rec jsonb := to_jsonb(coalesce(NEW, OLD));
  detail text := '';
BEGIN
  IF TG_OP = 'UPDATE' AND (to_jsonb(NEW)->>'status') IS DISTINCT FROM (to_jsonb(OLD)->>'status') THEN
    detail := 'status: ' || coalesce(to_jsonb(OLD)->>'status', '—') || ' → ' || coalesce(to_jsonb(NEW)->>'status', '—');
  ELSIF TG_TABLE_NAME = 'user_roles' THEN
    detail := 'role: ' || coalesce(rec->>'role', '') || ' user: ' || coalesce(rec->>'user_id', '');
  END IF;
  INSERT INTO public.activity_log (actor_id, entity, entity_id, action, detail)
  VALUES (auth.uid(), TG_TABLE_NAME, nullif(rec->>'id', '')::uuid, lower(TG_OP), detail);
  RETURN coalesce(NEW, OLD);
END;
$$;
CREATE TRIGGER log_consultations AFTER INSERT OR UPDATE OR DELETE ON public.consultations FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER log_projects AFTER INSERT OR UPDATE OR DELETE ON public.projects FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER log_invoices AFTER INSERT OR UPDATE OR DELETE ON public.invoices FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER log_files AFTER INSERT OR DELETE ON public.client_files FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER log_tasks AFTER INSERT OR UPDATE OR DELETE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER log_affirmations AFTER INSERT OR UPDATE OR DELETE ON public.affirmations FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER log_roles AFTER INSERT OR DELETE ON public.user_roles FOR EACH ROW EXECUTE FUNCTION public.log_activity();
CREATE TRIGGER log_inquiries AFTER UPDATE OR DELETE ON public.contact_submissions FOR EACH ROW EXECUTE FUNCTION public.log_activity();

-- Existing inquiries: staff manage, clients see inquiries sent from their verified email
GRANT SELECT ON public.contact_submissions TO authenticated;
GRANT UPDATE (status) ON public.contact_submissions TO authenticated;
CREATE POLICY "Staff read inquiries; clients read own by verified email" ON public.contact_submissions FOR SELECT TO authenticated
  USING (public.is_staff(auth.uid()) OR (lower(email) = lower(coalesce(auth.jwt()->>'email', '')) AND coalesce((auth.jwt()->'user_metadata'->>'email_verified')::boolean, false)));
CREATE POLICY "Staff update inquiry status" ON public.contact_submissions FOR UPDATE TO authenticated
  USING (public.is_staff(auth.uid())) WITH CHECK (public.is_staff(auth.uid()));

-- Private storage access for the client-files bucket: first folder = client id
CREATE POLICY "client-files read own or staff" ON storage.objects FOR SELECT TO authenticated
  USING (bucket_id = 'client-files' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid())));
CREATE POLICY "client-files upload own or staff" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'client-files' AND ((storage.foldername(name))[1] = auth.uid()::text OR public.is_staff(auth.uid())));
CREATE POLICY "client-files staff delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'client-files' AND public.is_staff(auth.uid()));
