import { Link } from "react-router-dom";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import requirements from "@/data/requirements.json";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const categories = [...new Set(requirements.map((item) => item.category))];

const Requirements = () => (
  <PageShell
    title="App Requirements"
    eyebrow="Project intake"
    description="Prepare these details before we start. A clear brief helps us estimate accurately and ship the right MVP faster."
    path="/requirements"
    keywords={`app requirements checklist, mobile app brief, software project requirements, ${site.keywords}`}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "App Requirements",
      url: `${SITE_URL}/requirements`,
    }}
  >
    <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
      <p className="text-muted-foreground">{requirements.length} checklist items across {categories.length} areas</p>
      <Button asChild className="rounded-full">
        <Link to="/contact">
          Submit your brief
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </Button>
    </div>

    <div className="space-y-10">
      {categories.map((category) => (
        <section key={category}>
          <h2 className="mb-5 font-display text-2xl font-bold">{category}</h2>
          <ul className="grid gap-4 md:grid-cols-2">
            {requirements
              .filter((item) => item.category === category)
              .map((item) => (
                <li key={item.id} className="flex gap-4 border-t border-border pt-5">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-lg font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                  </div>
                </li>
              ))}
          </ul>
        </section>
      ))}
    </div>
  </PageShell>
);

export default Requirements;
