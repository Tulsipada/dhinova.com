import { Link } from "react-router-dom";
import { Facebook, Github, Instagram, Linkedin, Youtube } from "lucide-react";
import site from "@/data/site.json";
import BrandMark from "@/components/BrandMark";

const RedditIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z" />
  </svg>
);

const socialIcons = {
  Facebook,
  GitHub: Github,
  Instagram,
  LinkedIn: Linkedin,
  YouTube: Youtube,
  Reddit: RedditIcon,
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
