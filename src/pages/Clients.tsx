import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import clients from "@/data/clients.json";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const Clients = () => (
  <PageShell
    title="Happy Clients"
    eyebrow="Trusted partners"
    description="Teams that chose Dhinova to design, build, and ship products across web, mobile, AI, and blockchain."
    path="/clients"
    keywords={`dhinova clients, software development testimonials, happy clients india, ${site.keywords}`}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Happy Clients",
      url: `${SITE_URL}/clients`,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: clients.map((client, index) => ({
          "@type": "ListItem",
          position: index + 1,
          name: client.name,
          description: client.result,
        })),
      },
    }}
  >
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <p className="text-muted-foreground">{clients.length} client partnerships featured</p>
      <Button asChild variant="outline" className="rounded-full">
        <Link to="/projects">
          View completed projects
          <ArrowRight className="ml-2 h-4 w-4" />
        </Link>
      </Button>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {clients.map((client) => (
        <article key={client.id} className="rounded-3xl border border-border p-7">
          <p className="text-sm font-semibold text-accent">{client.industry}</p>
          <h2 className="mt-2 font-display text-2xl font-bold">{client.name}</h2>
          <p className="mt-4 text-muted-foreground">{client.result}</p>
          <blockquote className="mt-6 border-t border-border pt-5 text-sm leading-relaxed">
            “{client.quote}”
          </blockquote>
        </article>
      ))}
    </div>
  </PageShell>
);

export default Clients;
