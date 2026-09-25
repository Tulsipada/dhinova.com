import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import BrandMark from "@/components/BrandMark";
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
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-[hsl(218_54%_8%/0.78)] text-white backdrop-blur-xl supports-[backdrop-filter]:bg-[hsl(218_54%_8%/0.62)]">
      <div className="container flex h-[4.25rem] items-center justify-between gap-4 px-4">
        <BrandMark />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Primary">
          {site.nav.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={resolveHref(item.href)}
                className="text-sm text-white/70 transition-colors hover:text-white"
              >
                {item.label}
              </a>
            )
          )}
          <Button asChild variant="hero" size="sm" className="rounded-full px-5">
            <Link to="/contact">{site.hero.primaryCta.label}</Link>
          </Button>
        </nav>

        <button
          type="button"
          className="p-2 text-white md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="space-y-2 border-t border-white/10 bg-[hsl(218_54%_8%)] px-4 py-4 md:hidden">
          {site.nav.map((item) =>
            item.href.startsWith("/") ? (
              <Link
                key={item.label}
                to={item.href}
                className="block py-2 text-white/90"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={resolveHref(item.href)}
                className="block py-2 text-white/90"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            )
          )}
          <Button asChild variant="hero" size="sm" className="mt-2 w-full rounded-full">
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
