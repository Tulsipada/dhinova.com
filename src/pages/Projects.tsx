import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import FallbackImage from "@/components/FallbackImage";
import projects from "@/data/projects.json";
import site from "@/data/site.json";
import { SITE_LEGAL_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";

const Projects = () => {
  const project = projects[0];

  return (
    <PageShell
      title="GreenKabadi Case Study"
      eyebrow="Portfolio"
      description="A Siliguri doorstep scrap pickup website with published rates, four languages, and local business markup."
      path="/projects"
      image={project.image}
      keywords={`GreenKabadi, scrap pickup website Siliguri, local business website, ${site.keywords}`}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "CreativeWork",
        name: project.title,
        headline: "GreenKabadi doorstep scrap pickup website",
        description: project.description,
        image: absoluteUrl(project.image),
        url: absoluteUrl("/projects"),
        creator: {
          "@type": "Organization",
          name: SITE_LEGAL_NAME,
          url: SITE_URL,
        },
        about: {
          "@type": "WebSite",
          name: "GreenKabadi",
          url: project.url,
        },
      }}
    >
      <article>
        <figure className="overflow-hidden rounded-3xl border border-border/60 bg-muted">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            <FallbackImage
              src={project.image}
              alt={project.imageAlt}
              className="h-auto w-full"
            />
          </a>
          <figcaption className="border-t border-border/60 px-5 py-3 text-sm text-muted-foreground">
            Live homepage at{" "}
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-foreground underline decoration-accent underline-offset-4 hover:text-accent"
            >
              greenkabadi.in
            </a>
          </figcaption>
        </figure>

        <div className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
          <span>
            <span className="font-semibold text-accent">{project.category}</span>
          </span>
          <span>
            {project.year} · {project.status}
          </span>
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline decoration-accent underline-offset-4 hover:text-accent"
          >
            {project.client}
          </a>
          <span>{project.location}</span>
        </div>

        <p className="mt-6 max-w-3xl text-lg leading-relaxed text-muted-foreground">{project.summary}</p>
        <p className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline decoration-accent underline-offset-4 hover:text-accent"
          >
            GreenKabadi
          </a>{" "}
          (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline decoration-accent underline-offset-4 hover:text-accent"
          >
            greenkabadi.in
          </a>
          ) lets homes, shops, and institutions in Siliguri sell scrap from their doorstep. The site shows
          today&apos;s rates, explains verified weighing and digital receipts, and points visitors to book a pickup.
        </p>

        <h2 className="mt-12 font-display text-2xl font-bold md:text-3xl">What shipped</h2>
        <ul className="mt-5 max-w-3xl list-disc space-y-3 pl-5">
          {project.highlights.map((item) => (
            <li key={item} className="leading-relaxed text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl font-bold md:text-3xl">Search setup</h2>
        <ul className="mt-5 max-w-3xl list-disc space-y-3 pl-5">
          {project.seo.map((item) => (
            <li key={item} className="leading-relaxed text-muted-foreground">
              {item}
            </li>
          ))}
        </ul>

        <h2 className="mt-12 font-display text-2xl font-bold">Stack</h2>
        <ul className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <li key={tech} className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground">
              {tech}
            </li>
          ))}
        </ul>

        <div className="mt-10 flex flex-wrap gap-6">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold hover:border-accent hover:text-accent"
          >
            View live site <ArrowUpRight className="h-4 w-4" />
          </a>
          <Link
            to="/services/web-development/"
            className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold hover:border-accent hover:text-accent"
          >
            Web development <ArrowUpRight className="h-4 w-4" />
          </Link>
          <Link
            to="/contact/"
            className="inline-flex items-center gap-2 border-b border-foreground pb-1 text-sm font-semibold hover:border-accent hover:text-accent"
          >
            Start a similar project <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    </PageShell>
  );
};

export default Projects;
