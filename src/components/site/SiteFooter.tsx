import { AFFILIATE, AFFILIATE_ROLE, BRAND, NAV_LINKS } from "@/content/site";
import { Wordmark } from "./SiteHeader";

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden border-t border-border bg-surface">
      <div className="mx-auto max-w-7xl px-5 pb-10 pt-20 sm:px-8">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Wordmark />
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted-foreground">
              Marketing, brand visibility, creative promotion, and business growth.
            </p>
          </div>
          <nav aria-label="Footer" className="lg:col-span-6">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3">
              {[...NAV_LINKS, { id: "work", label: "Work" }, { id: "founding", label: "Founding offer" }].map(
                (link) => (
                  <li key={link.id}>
                    <a
                      href={`#${link.id}`}
                      className="font-mono text-xs uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary-glow"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </nav>
        </div>

        <p
          aria-hidden="true"
          className="font-wide text-silver mt-20 select-none text-[11vw] font-black uppercase leading-[0.85] tracking-tighter lg:text-[8.5rem]"
        >
          {BRAND}
        </p>

        <div className="mt-8 flex flex-col gap-3 border-t border-border pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-2">
            <p className="eyebrow">
              {BRAND} <span className="text-primary-glow">×</span> {AFFILIATE}
            </p>
            <p className="eyebrow text-muted-foreground/70">
              {AFFILIATE} — {AFFILIATE_ROLE}
            </p>
          </div>
          <p className="eyebrow">© {new Date().getFullYear()} {BRAND}</p>
        </div>
      </div>
    </footer>
  );
}
