import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import site from "@/data/site.json";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  const resolveHref = (href: string) => {
    if (href.startsWith("#") && !isHome) return `/${href}`;
    return href;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-border/70 bg-background/95 backdrop-blur-md">
      <div className="container px-4 h-16 flex items-center justify-between gap-4">
        <Link to="/" className="flex items-center gap-2.5 shrink-0" aria-label={site.name}>
          <img
            src="/dhinova.png"
            alt=""
            width={40}
            height={40}
            className="h-10 w-10 rounded-lg object-contain"
          />
          <span className="font-display text-lg font-bold tracking-tight">
            <span className="text-foreground">Dhi</span>
            <span className="text-brand-gradient">Nova</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8" aria-label="Primary">
          {site.nav.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={resolveHref(item.href)}
                className="text-sm text-foreground/75 hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            )
          )}
          <Button asChild variant="hero" size="sm">
            <Link to="/contact">{site.hero.primaryCta.label}</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="md:hidden text-foreground p-2"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="md:hidden border-t border-border bg-background px-4 py-4 space-y-3">
          {site.nav.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                className="block text-foreground/90 py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={resolveHref(item.href)}
                className="block text-foreground/90 py-2"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
          <Button asChild variant="hero" size="sm" className="w-full">
            <Link to="/contact" onClick={() => setOpen(false)}>
              {site.hero.primaryCta.label}
            </Link>
          </Button>
        </div>
      ) : null}
    </header>
  );
};

export default Navbar;
