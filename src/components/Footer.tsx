import { Link } from "react-router-dom";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import site from "@/data/site.json";
import BrandMark from "@/components/BrandMark";

const socialIcons = { Facebook, GitHub: Github, Instagram, LinkedIn: Linkedin, YouTube: Youtube };

const Footer = () => {
  const { company, services, legal } = site.footerLinks;

  return (
    <footer className="relative overflow-hidden border-t border-primary-foreground/10 bg-primary py-16 text-primary-foreground">
      <div className="surface-grid absolute inset-0 opacity-[0.06]" />
      <div className="container relative z-10 px-4">
        <div className="grid gap-12 border-b border-primary-foreground/10 pb-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <BrandMark className="mb-5" textClassName="text-xl" />
            <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/55">{site.tagline}</p>
            <a
              href={`mailto:${site.email}`}
              className="mt-6 inline-block border-b border-accent/80 pb-1 text-sm font-semibold text-primary-foreground transition-colors hover:text-accent"
            >
              {site.email}
            </a>
            <div className="mt-6 flex items-center gap-2" aria-label="Social media">
              {site.socials.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                if (!Icon) return null;
                return social.href ? (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/60 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                ) : (
                  <span
                    key={social.label}
                    title={`${social.label} URL coming soon`}
                    aria-label={`${social.label} URL coming soon`}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/10 text-primary-foreground/35"
                  >
                    <Icon className="h-4 w-4" />
                  </span>
                );
              })}
            </div>
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
