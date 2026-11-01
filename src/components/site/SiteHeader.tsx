import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { LOCKUP, NAV_LINKS } from "@/content/site";
import { cn } from "@/lib/utils";

export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-wide inline-flex items-center gap-2 text-sm font-black tracking-[0.18em]", className)}>
      <span className="h-2 w-2 rotate-45 bg-primary-glow shadow-glow" aria-hidden="true" />
      BLVCK<span className="text-primary-glow">MARKET</span>
    </span>
  );
}

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-all duration-500",
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-xl" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-6 px-5 sm:px-8">
        <a href="#home" className="rounded-sm" aria-label="BLVCK MARKET — back to top">
          <Wordmark />
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <li key={link.id}>
                <a
                  href={`#${link.id}`}
                  className="font-mono text-[0.6875rem] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild variant="hero" className="hidden h-10 px-5 sm:inline-flex">
            <a href="#contact">Start a project</a>
          </Button>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex w-full flex-col border-border bg-background p-0 sm:max-w-sm">
              <div className="flex h-16 items-center px-6">
                <SheetTitle asChild>
                  <span>
                    <Wordmark />
                  </span>
                </SheetTitle>
              </div>
              <nav aria-label="Mobile" className="flex-1 px-6 pt-6">
                <ul className="flex flex-col">
                  {NAV_LINKS.map((link, i) => (
                    <li key={link.id} className="border-b border-border">
                      <a
                        href={`#${link.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-baseline gap-4 py-5 transition-colors hover:text-primary-glow"
                      >
                        <span className="font-mono text-xs text-muted-foreground">0{i + 1}</span>
                        <span className="font-wide text-lg font-bold uppercase">{link.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="space-y-4 p-6">
                <Button asChild variant="hero" size="xl" className="w-full">
                  <a href="#contact" onClick={() => setOpen(false)}>
                    Start a project
                  </a>
                </Button>
                <p className="eyebrow text-center">{LOCKUP}</p>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
