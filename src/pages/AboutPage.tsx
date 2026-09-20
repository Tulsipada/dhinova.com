import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const AboutPage = () => (
  <PageShell
    title="About Dhinova"
    eyebrow="Company"
    description={site.about.paragraphs[0]}
    path="/about"
    keywords={`about dhinova, software company india, ${site.keywords}`}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: "About Dhinova",
      url: `${SITE_URL}/about`,
      mainEntity: {
        "@type": "Organization",
        name: site.legalName,
        url: SITE_URL,
        email: site.email,
      },
    }}
  >
    <div className="grid gap-12 lg:grid-cols-2">
      <div>
        {site.about.paragraphs.map((paragraph) => (
          <p key={paragraph} className="mb-5 text-lg leading-relaxed text-muted-foreground">
            {paragraph}
          </p>
        ))}
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild className="rounded-full">
            <Link to="/projects">
              See our work
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="outline" className="rounded-full">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </div>
      <ul className="border-t border-border">
        {site.about.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-3 border-b border-border py-4">
            <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
            <span>{highlight}</span>
          </li>
        ))}
      </ul>
    </div>
  </PageShell>
);

export default AboutPage;
