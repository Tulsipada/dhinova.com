import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import careers from "@/data/careers.json";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const Careers = () => (
  <PageShell
    title="Careers"
    eyebrow="Join the team"
    description="Build meaningful products with a distributed engineering culture focused on craft, clarity, and ownership."
    path="/careers"
    keywords={`dhinova careers, react jobs india, remote software jobs, ${site.keywords}`}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Careers at Dhinova",
      url: `${SITE_URL}/careers`,
    }}
  >
    <div className="mb-10 rounded-3xl border border-border bg-muted/40 p-8">
      <h2 className="font-display text-2xl font-bold">Why Dhinova?</h2>
      <p className="mt-3 max-w-3xl text-muted-foreground">
        Work on real client products across web, mobile, AI, and blockchain. We value clean delivery,
        honest communication, and engineers who care about outcomes.
      </p>
    </div>

    <div className="space-y-4">
      {careers.map((role) => (
        <article
          key={role.id}
          className="flex flex-col gap-4 rounded-3xl border border-border p-6 md:flex-row md:items-center md:justify-between"
        >
          <div>
            <h3 className="font-display text-2xl font-bold">{role.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              {role.type} · {role.location}
            </p>
            <p className="mt-3 max-w-2xl text-muted-foreground">{role.summary}</p>
          </div>
          <Button asChild className="shrink-0 rounded-full">
            <a href={`mailto:${site.email}?subject=Application: ${role.title}`}>
              Apply
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </article>
      ))}
    </div>

    <p className="mt-10 text-muted-foreground">
      Don’t see a fit?{" "}
      <Link to="/contact" className="font-semibold text-foreground underline-offset-4 hover:underline">
        Send an open application
      </Link>
      .
    </p>
  </PageShell>
);

export default Careers;
