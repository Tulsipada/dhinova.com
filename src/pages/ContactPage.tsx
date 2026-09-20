import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const ContactPage = () => {
  const items = [
    { icon: Mail, label: "Email", value: site.email, href: `mailto:${site.email}` },
    { icon: Phone, label: "Phone", value: site.phone, href: `tel:${site.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: site.location },
  ];

  return (
    <PageShell
      title="Contact Us"
      eyebrow="Get in touch"
      description="Tell us about your product idea. Share goals, timelines, and constraints — we’ll outline a clear path from idea to launch."
      path="/contact"
      keywords={`contact dhinova, software development company india, ${site.keywords}`}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "ContactPage",
        name: "Contact Us",
        url: `${SITE_URL}/contact`,
        mainEntity: {
          "@type": "Organization",
          name: site.legalName,
          email: site.email,
          telephone: site.phone,
        },
      }}
    >
      <div className="grid gap-10 lg:grid-cols-2">
        <div className="space-y-6">
          {items.map((item) => {
            const Icon = item.icon;
            const body = (
              <div className="flex items-start gap-4 rounded-2xl border border-border p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/15 text-accent">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    {item.label}
                  </p>
                  <p className="mt-1 font-display text-xl font-semibold">{item.value}</p>
                </div>
              </div>
            );
            return item.href ? (
              <a key={item.label} href={item.href} className="block transition-opacity hover:opacity-90">
                {body}
              </a>
            ) : (
              <div key={item.label}>{body}</div>
            );
          })}
        </div>

        <div className="rounded-3xl bg-primary p-8 text-primary-foreground md:p-10">
          <h2 className="font-display text-3xl font-bold">Ready to start?</h2>
          <p className="mt-4 text-primary-foreground/70">
            Email us a short brief, or use the project calculator for a quick estimate before we talk.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
              <a href={`mailto:${site.email}`}>
                Email {site.email}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10">
              <Link to="/calculator">Project calculator</Link>
            </Button>
          </div>
        </div>
      </div>
    </PageShell>
  );
};

export default ContactPage;
