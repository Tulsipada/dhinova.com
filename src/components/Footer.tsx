import { Link } from "react-router-dom";
import site from "@/data/site.json";

const Footer = () => {
  const { company, services, legal } = site.footerLinks;

  return (
    <footer className="bg-primary py-14 text-primary-foreground">
      <div className="container px-4">
        <div className="grid gap-10 border-b border-primary-foreground/15 pb-12 md:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-1">
            <h3 className="font-display text-2xl font-bold">{site.legalName}</h3>
            <p className="mt-3 max-w-sm text-sm text-primary-foreground/60">{site.tagline}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-5 inline-block border-b border-accent pb-1 text-sm font-semibold"
            >
              {site.email}
            </a>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50">
              Company
            </p>
            <nav className="flex flex-col gap-3 text-sm text-primary-foreground/75" aria-label="Company">
              {company.map((item) => (
                <Link key={item.href} to={item.href} className="hover:text-primary-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50">
              Services
            </p>
            <nav className="flex flex-col gap-3 text-sm text-primary-foreground/75" aria-label="Services">
              {services.map((item) => (
                <Link key={item.href} to={item.href} className="hover:text-primary-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-primary-foreground/50">
              Legal
            </p>
            <nav className="flex flex-col gap-3 text-sm text-primary-foreground/75" aria-label="Legal">
              {legal.map((item) => (
                <Link key={item.href} to={item.href} className="hover:text-primary-foreground">
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <div className="pt-6 text-sm text-primary-foreground/50">
          &copy; {new Date().getFullYear()} {site.footer.copyright}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
