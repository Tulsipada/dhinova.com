import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const benefits = [
  "Silent delivery under your agency brand",
  "Dedicated engineering squads for web, mobile, AI, and blockchain",
  "Fixed or milestone pricing with clear status reporting",
  "NDA-first collaboration and secure handoff packages",
  "Flexible capacity for overflow and rush projects",
];

const Whitelabel = () => (
  <PageShell
    title="Whitelabel Solutions"
    eyebrow="Partner program"
    description="Scale your agency delivery with Dhinova as your silent product engineering partner — white-labeled code, design, and launch support."
    path="/whitelabel"
    keywords={`whitelabel software development, white label web development india, agency partnership, ${site.keywords}`}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "Service",
      name: "Whitelabel Software Development",
      provider: { "@type": "Organization", name: site.legalName, url: SITE_URL },
      areaServed: "Worldwide",
      url: `${SITE_URL}/whitelabel`,
    }}
  >
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-3xl font-bold">Built for agencies & consultants</h2>
        <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
          Keep the client relationship. We ship the product. Dhinova provides production-ready
          engineering while you stay the face of delivery.
        </p>
        <ul className="mt-8 space-y-4">
          {benefits.map((item) => (
            <li key={item} className="flex items-start gap-3 border-b border-border pb-4">
              <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="rounded-3xl border border-border bg-muted/40 p-8 md:p-10">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Next step</p>
        <h3 className="mt-3 font-display text-2xl font-bold">Partner with Dhinova</h3>
        <p className="mt-4 text-muted-foreground">
          Share your pipeline and preferred engagement model. We’ll propose capacity, rates, and a
          branded delivery workflow.
        </p>
        <Button asChild size="lg" className="mt-8 rounded-full">
          <Link to="/contact">
            Talk partnership
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  </PageShell>
);

export default Whitelabel;
