import { Link } from "react-router-dom";
import site from "@/data/site.json";
import BrandMark from "@/components/BrandMark";

const Footer = () => {
  const { company, services, legal } = site.footerLinks;

  return (
    <footer className="relative overflow-hidden bg-primary py-16 text-primary-foreground">
      <div className="surface-grid absolute inset-0 opacity-[0.06]" />
      <div className="container relative z-10 px-4">
        <div className="grid gap-12 border-b border-primary-foreground/10 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <BrandMark className="mb-4" textClassName="text-xl" />
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/55">{site.tagline}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block border-b border-accent/80 pb-1 text-sm font-semibold text-primary-foreground transition-colors hover:text-accent"
            >
              {site.email}
            </a>
          </div>

          {[
            { title: "Company", items: company },
            { title: "Services", items: services },
            { title: "Legal", items: legal },
          ].map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/40">
                {group.title}
              </p>
              <nav className="flex flex-col gap-3 text-sm text-primary-foreground/70" aria-label={group.title}>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    className="transition-colors hover:text-primary-foreground"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
            </div>
          ))}
        </div>

        <div className="flex flex-col gap-2 pt-7 text-sm text-primary-foreground/40 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {site.footer.copyright}
          </p>
          <p>{site.legalName}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
