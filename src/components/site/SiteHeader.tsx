import { useState } from "react";
import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { BRAND, HEADER_CTA, LOCKUP, NAV_LINKS } from "@/content/site";
import { cn } from "@/lib/utils";
import { OutlineLink, VEmblem } from "./Primitives";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex items-center gap-2 font-heading text-sm tracking-[0.2em]", className)}>
      <VEmblem className="text-2xl" />
      {BRAND}
    </span>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="relative z-30 border-b border-border">
      <div className="mx-auto flex h-14 max-w-[1440px] items-center justify-between gap-6 px-5 sm:px-8">
        <div className="flex items-center gap-8">
          <a href="#home" aria-label={`${BRAND} — back to top`} className="rounded-sm">
            <VEmblem className="text-3xl" />
          </a>
          <nav aria-label="Primary" className="hidden lg:block">
            <ul className="flex items-center gap-6">
              {NAV_LINKS.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className="font-mono text-[0.625rem] uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <OutlineLink href="#contact" className="hidden sm:inline-flex">
            {HEADER_CTA}
          </OutlineLink>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button type="button" aria-label="Open menu" className="grid h-8 w-8 place-items-center text-foreground hover:text-primary-glow">
                <Menu className="h-5 w-5" />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col border-border bg-background p-0 sm:max-w-sm">
              <div className="flex h-14 items-center px-6">
                <SheetTitle asChild>
                  <span>
                    <Wordmark />
                  </span>
                </SheetTitle>
              </div>
              <nav aria-label="Menu" className="flex-1 px-6 pt-4">
                <ul>
                  {NAV_LINKS.map((link) => (
                    <li key={link.id} className="border-b border-border">
                      <a
                        href={`#${link.id}`}
                        onClick={() => setOpen(false)}
                        className="block py-4 font-heading text-lg uppercase tracking-[0.12em] transition-colors hover:text-primary-glow"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="space-y-4 p-6">
                <OutlineLink href="#contact" className="w-full justify-center">
                  {HEADER_CTA}
                </OutlineLink>
                <p className="eyebrow text-center">{LOCKUP}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
