import { Link } from "react-router-dom";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import site from "@/data/site.json";
import BrandMark from "@/components/BrandMark";

const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.48 2 2 6.48 2 12c0 4.42 2.87 8.17 6.84 9.5.5.09.68-.22.68-.48 0-.24-.01-.87-.01-1.7-2.78.6-3.37-1.34-3.37-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.08.63-1.33-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.56 9.56 0 0 1 12 6.8c.85.004 1.71.115 2.51.337 1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.85 0 1.34-.01 2.42-.01 2.75 0 .27.18.58.69.48A10.01 10.01 0 0 0 22 12c0-5.52-4.48-10-10-10z" />
  </svg>
);

// Lucide has no Reddit brand icon; use a compact mark for the footer.
const RedditMark = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 2C6.477 2 2 6.477 2 12c0 5.523 4.477 10 10 10s10-4.477 10-10C22 6.477 17.523 2 12 2zm5.792 6.066a1.36 1.36 0 0 1 1.36 1.36c0 .566-.346 1.05-.837 1.253a4.97 4.97 0 0 1-.053.691c0 3.517-4.092 6.37-9.135 6.37-5.043 0-9.135-2.853-9.135-6.37 0-.234-.02-.464-.053-.691A1.36 1.36 0 0 1 5.94 8.066 1.36 1.36 0 0 1 7.3 9.426c0 .1-.01.198-.027.294a6.3 6.3 0 0 1 3.49-1.043l.67-3.146a.45.45 0 0 1 .53-.345l2.247.476a1.36 1.36 0 1 1 .12.78l-2.016-.427-.597 2.804c1.3.05 2.53.4 3.49 1.043a1.35 1.35 0 0 1-.027-.294 1.36 1.36 0 0 1 1.36-1.36 1.36 1.36 0 0 1 1.36 1.36zm-8.64 2.55a1.02 1.02 0 1 0 0 2.04 1.02 1.02 0 0 0 0-2.04zm5.696 0a1.02 1.02 0 1 0 0 2.04 1.02 1.02 0 0 0 0-2.04zm-5.5 3.75a.45.45 0 0 0-.09.63c.86 1.1 2.49 1.83 4.37 1.83s3.51-.73 4.37-1.83a.45.45 0 1 0-.72-.54c-.68.87-2.01 1.45-3.65 1.45s-2.97-.58-3.65-1.45a.45.45 0 0 0-.63-.09z" />
  </svg>
);

const socialIcons = {
  Facebook,
  GitHub: Github,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Reddit: RedditMark,
};

const Footer = () => {
  const { company, services, legal } = site.footerLinks;
  const socials = site.socials.filter((social) => social.href);

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
            <div className="mt-6 flex flex-wrap items-center gap-2" aria-label="Social media">
              {socials.map((social) => {
                const Icon = socialIcons[social.label as keyof typeof socialIcons];
                if (!Icon) return null;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex h-9 w-9 items-center justify-center rounded-full border border-primary-foreground/15 text-primary-foreground/60 transition-colors hover:border-accent hover:text-accent"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
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
