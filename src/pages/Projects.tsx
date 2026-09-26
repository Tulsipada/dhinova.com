import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import FallbackImage from "@/components/FallbackImage";
import projects from "@/data/projects.json";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const Projects = () => {
  const categories = ["All", ...new Set(projects.map((project) => project.category))];
  const [active, setActive] = useState("All");
  const visible = useMemo(
    () => (active === "All" ? projects : projects.filter((project) => project.category === active)),
    [active]
  );

  return (
    <PageShell
      title="Completed Projects"
      eyebrow="Portfolio"
      description="Selected products and digital platforms delivered by Dhinova  -  from MVPs to production systems."
      path="/projects"
      keywords={`completed projects, software portfolio, react projects india, ${site.keywords}`}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Completed Projects",
        url: `${SITE_URL}/projects`,
        mainEntity: {
          "@type": "ItemList",
          itemListElement: projects.map((project, index) => ({
            "@type": "ListItem",
            position: index + 1,
            name: project.title,
            description: project.description,
            url: project.url || `${SITE_URL}/projects`,
          })),
        },
      }}
    >
      <div className="mb-10 flex flex-wrap gap-x-6 gap-y-3 border-y border-border py-5">
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            onClick={() => setActive(category)}
            className={`relative py-1 text-sm font-semibold transition-colors ${
              active === category
                ? "text-foreground after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-accent"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-x-8 gap-y-14 md:grid-cols-2">
        {visible.map((project) => (
          <article key={project.id} className="group">
            <div className="aspect-[16/10] overflow-hidden rounded-3xl border border-border/60 bg-muted">
              <FallbackImage
                src={project.image || "/dhinova.png"}
                alt={project.title}
                className="h-full w-full object-contain p-10 transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="pt-6">
              <div className="mb-3 flex items-center justify-between gap-3 text-sm">
                <span className="font-semibold text-accent">{project.category}</span>
                <span className="text-muted-foreground">
                  {project.year} · {project.status}
                </span>
              </div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">{project.title}</h2>
              <p className="mt-3 text-muted-foreground">{project.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
              {project.url ? (
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold hover:border-accent hover:text-accent"
                >
                  View project <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : (
                <Link
                  to="/contact"
                  className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold hover:border-accent hover:text-accent"
                >
                  Discuss a similar build <ArrowUpRight className="h-4 w-4" />
                </Link>
              )}
            </div>
          </article>
        ))}
      </div>
    </PageShell>
  );
};

export default Projects;
