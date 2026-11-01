import { useEffect, useId, useRef, useState, type ReactNode } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertTriangle, ArrowRight, Check, Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  PACKAGE_INTEREST_OPTIONS,
  formatInquiry,
  inquirySchema,
  submitInquiry,
  type Inquiry,
  type InquiryInput,
} from "@/lib/inquiry";
import { cn } from "@/lib/utils";
import { Reveal } from "./Reveal";
import { SectionHeading } from "./SectionHeading";

export type InquiryPreset = {
  packageInterest?: (typeof PACKAGE_INTEREST_OPTIONS)[number];
  foundingOffer?: boolean;
  nonce: number;
};

const FIELD_CLASS =
  "h-12 rounded-sm border-input bg-background/60 px-4 text-base transition-colors hover:border-silver/40 focus-visible:border-primary-glow focus-visible:ring-0 aria-[invalid=true]:border-destructive md:text-sm";

function Field({
  label,
  optional,
  error,
  children,
  htmlFor,
  errorId,
}: {
  label: string;
  optional?: boolean;
  error?: string;
  children: ReactNode;
  htmlFor: string;
  errorId: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor} className="eyebrow flex justify-between text-silver">
        <span>{label}</span>
        {optional ? <span className="text-muted-foreground normal-case tracking-normal">Optional</span> : null}
      </label>
      {children}
      {error ? (
        <p id={errorId} className="text-sm text-destructive">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function Contact({ preset }: { preset: InquiryPreset | null }) {
  const uid = useId();
  const statusRef = useRef<HTMLDivElement>(null);
  const [result, setResult] = useState<{ inquiry: Inquiry; delivered: boolean } | null>(null);
  const [copied, setCopied] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<InquiryInput, unknown, Inquiry>({
    resolver: zodResolver(inquirySchema),
    defaultValues: { name: "", business: "", email: "", website: "", message: "", foundingOffer: false },
  });

  useEffect(() => {
    if (!preset) return;
    setResult(null);
    if (preset.packageInterest) setValue("packageInterest", preset.packageInterest, { shouldValidate: false });
    if (preset.foundingOffer !== undefined) setValue("foundingOffer", preset.foundingOffer);
  }, [preset, setValue]);

  useEffect(() => {
    if (result) statusRef.current?.focus();
  }, [result]);

  const onSubmit = async (inquiry: Inquiry) => {
    const outcome = await submitInquiry(inquiry);
    setCopied(false);
    setResult({ inquiry, delivered: outcome.delivered });
  };

  const copyInquiry = async () => {
    if (!result) return;
    try {
      await navigator.clipboard.writeText(formatInquiry(result.inquiry));
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  const id = (name: string) => `${uid}-${name}`;
  const describe = (name: keyof InquiryInput) => (errors[name] ? id(`${name}-error`) : undefined);

  return (
    <section id="contact" aria-labelledby="contact-title" className="relative border-t border-border">
      <div className="bg-blue-light absolute inset-x-0 top-0 -z-10 h-96 opacity-60" aria-hidden="true" />
      <div className="mx-auto grid max-w-7xl gap-14 px-5 py-24 sm:px-8 sm:py-32 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <SectionHeading
            id="contact-title"
            index="08"
            eyebrow="Start a project"
            title="Tell us what you're building."
            intro="Share where your business is now and where you want it to go. We'll come back with a proposal shaped around your goals."
          />
          <ul className="mt-10 space-y-3 text-sm text-muted-foreground">
            {["Every proposal is scoped to your business", "No pricing until we understand the work", "Founding offer: ask in your message or tick the box"].map((t) => (
              <li key={t} className="flex gap-3">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary-glow" aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="lg:col-span-7" delay={120}>
          {result ? (
            <div
              ref={statusRef}
              tabIndex={-1}
              role="status"
              className="rounded-sm border border-gold/40 bg-surface p-7 outline-none sm:p-10"
            >
              {result.delivered ? (
                <>
                  <p className="eyebrow text-success">Inquiry sent</p>
                  <h3 className="font-wide mt-4 text-2xl font-black uppercase">Received.</h3>
                  <p className="mt-4 text-muted-foreground">Thanks — we'll review it and follow up.</p>
                </>
              ) : (
                <>
                  <p className="eyebrow flex items-center gap-2 text-gold">
                    <AlertTriangle className="h-4 w-4" aria-hidden="true" />
                    Not sent — online delivery not connected yet
                  </p>
                  <h3 className="font-wide mt-4 text-2xl font-black uppercase leading-tight sm:text-3xl">
                    Your inquiry is ready, {result.inquiry.name.split(" ")[0]}.
                  </h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    Everything checks out, but this form is not yet connected to an inbox, so{" "}
                    <strong className="text-foreground">nothing was sent</strong>. Copy your inquiry to keep
                    it on hand until the contact channel goes live.
                  </p>
                  <pre className="mt-6 max-h-60 overflow-auto whitespace-pre-wrap rounded-sm border border-border bg-background p-4 font-mono text-xs leading-relaxed text-silver">
                    {formatInquiry(result.inquiry)}
                  </pre>
                </>
              )}
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                {!result.delivered ? (
                  <Button variant="hero" size="xl" onClick={copyInquiry}>
                    {copied ? <Check /> : <Copy />}
                    {copied ? "Copied" : "Copy inquiry"}
                  </Button>
                ) : null}
                <Button variant="lux" size="xl" onClick={() => setResult(null)}>
                  Edit inquiry
                </Button>
                {result.delivered ? (
                  <Button
                    variant="lux"
                    size="xl"
                    onClick={() => {
                      reset();
                      setResult(null);
                    }}
                  >
                    New inquiry
                  </Button>
                ) : null}
              </div>
            </div>
          ) : (
            <form
              noValidate
              onSubmit={handleSubmit(onSubmit)}
              aria-label="Project inquiry"
              className="rounded-sm border border-border bg-surface p-6 sm:p-10"
            >
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Name" htmlFor={id("name")} errorId={id("name-error")} error={errors.name?.message}>
                  <Input
                    id={id("name")}
                    autoComplete="name"
                    className={FIELD_CLASS}
                    aria-invalid={!!errors.name}
                    aria-describedby={describe("name")}
                    {...register("name")}
                  />
                </Field>
                <Field
                  label="Business"
                  htmlFor={id("business")}
                  errorId={id("business-error")}
                  error={errors.business?.message}
                >
                  <Input
                    id={id("business")}
                    autoComplete="organization"
                    className={FIELD_CLASS}
                    aria-invalid={!!errors.business}
                    aria-describedby={describe("business")}
                    {...register("business")}
                  />
                </Field>
                <Field label="Email" htmlFor={id("email")} errorId={id("email-error")} error={errors.email?.message}>
                  <Input
                    id={id("email")}
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    className={FIELD_CLASS}
                    aria-invalid={!!errors.email}
                    aria-describedby={describe("email")}
                    {...register("email")}
                  />
                </Field>
                <Field
                  label="Website / social link"
                  optional
                  htmlFor={id("website")}
                  errorId={id("website-error")}
                  error={errors.website?.message}
                >
                  <Input
                    id={id("website")}
                    inputMode="url"
                    autoComplete="url"
                    placeholder="yourbusiness.com or @handle"
                    className={FIELD_CLASS}
                    aria-invalid={!!errors.website}
                    aria-describedby={describe("website")}
                    {...register("website")}
                  />
                </Field>

                <div className="sm:col-span-2">
                  <Field
                    label="Package interest"
                    htmlFor={id("package")}
                    errorId={id("packageInterest-error")}
                    error={errors.packageInterest?.message}
                  >
                    <select
                      id={id("package")}
                      defaultValue=""
                      className={cn(
                        FIELD_CLASS,
                        "w-full cursor-pointer appearance-none border bg-[length:12px] bg-[right_1rem_center] bg-no-repeat pr-10 text-foreground",
                      )}
                      style={{
                        backgroundImage:
                          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 12 8' fill='none' stroke='%23a8b3c7' stroke-width='1.5'><path d='M1 1l5 5 5-5'/></svg>\")",
                      }}
                      aria-invalid={!!errors.packageInterest}
                      aria-describedby={describe("packageInterest")}
                      {...register("packageInterest")}
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {PACKAGE_INTEREST_OPTIONS.map((opt) => (
                        <option key={opt} value={opt} className="bg-popover text-popover-foreground">
                          {opt}
                        </option>
                      ))}
                    </select>
                  </Field>
                </div>

                <div className="sm:col-span-2">
                  <Field
                    label="Goals / message"
                    htmlFor={id("message")}
                    errorId={id("message-error")}
                    error={errors.message?.message}
                  >
                    <Textarea
                      id={id("message")}
                      rows={6}
                      placeholder="What are you selling, who to, and what would a win look like?"
                      className={cn(FIELD_CLASS, "h-auto min-h-40 py-3")}
                      aria-invalid={!!errors.message}
                      aria-describedby={describe("message")}
                      {...register("message")}
                    />
                  </Field>
                </div>

                <label
                  htmlFor={id("founding")}
                  className="flex cursor-pointer items-start gap-3 rounded-sm border border-border p-4 transition-colors hover:border-gold/50 sm:col-span-2"
                >
                  <input
                    id={id("founding")}
                    type="checkbox"
                    className="mt-0.5 h-4 w-4 shrink-0 cursor-pointer accent-[var(--gold)]"
                    {...register("foundingOffer")}
                  />
                  <span className="text-sm leading-relaxed text-muted-foreground">
                    <span className="text-foreground">I'd like founding-client consideration.</span> First 10
                    participating businesses — 20% off the first qualifying package.
                  </span>
                </label>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-xs leading-relaxed text-muted-foreground sm:max-w-xs">
                  Online delivery for this form is not connected yet. Submitting checks your details but does
                  not send them.
                </p>
                <Button type="submit" variant="hero" size="xl" disabled={isSubmitting}>
                  Submit inquiry <ArrowRight />
                </Button>
              </div>
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
