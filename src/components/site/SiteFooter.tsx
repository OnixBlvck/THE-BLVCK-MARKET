import { AFFILIATE, BRAND, FOOTER_TAGLINE, NAV_LINKS } from "@/content/site";
import { VEmblem } from "./Primitives";

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center gap-6 px-5 py-6 text-center sm:px-8 lg:flex-row lg:justify-between lg:text-left">
        <div className="flex items-center gap-3">
          <VEmblem className="text-3xl" />
          <div>
            <p className="font-heading text-sm tracking-[0.2em]">{BRAND}</p>
            <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground">{FOOTER_TAGLINE}</p>
          </div>
        </div>
        <nav aria-label="Footer">
          <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground hover:text-primary-glow"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-1 lg:text-right">
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground">
            {BRAND} <span className="text-primary-glow">×</span> {AFFILIATE}
          </p>
          <p className="font-mono text-[0.5625rem] uppercase tracking-[0.2em] text-muted-foreground">
            © {new Date().getFullYear()} {BRAND}
          </p>
        </div>
      </div>
    </footer>
  );
}
