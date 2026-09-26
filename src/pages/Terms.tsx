import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const sections = [
  {
    title: "Services",
    body: "Dhinova provides software design and development services. Project scope, timelines, and fees are defined in written proposals or agreements.",
  },
  {
    title: "Intellectual property",
    body: "Unless otherwise agreed, client-owned deliverables transfer after full payment. Dhinova retains rights to pre-existing tools, libraries, and know-how.",
  },
  {
    title: "Website content",
    body: "Content on this website is for general information. Estimates and examples are illustrative and not contractual offers.",
  },
  {
    title: "Limitation of liability",
    body: "To the fullest extent permitted by law, Dhinova is not liable for indirect or consequential damages arising from use of this website.",
  },
  {
    title: "Contact",
    body: `Questions about these terms: ${site.email}.`,
  },
];

const Terms = () => (
  <PageShell
    title="Terms of Service"
    eyebrow="Legal"
    description="Terms governing use of the Dhinova website and engagement for software services."
    path="/terms"
    keywords="dhinova terms of service, website terms"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Terms of Service",
      url: `${SITE_URL}/terms`,
    }}
  >
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
      <aside className="h-fit lg:sticky lg:top-24">
        <div className="border-b border-border pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Legal centre</p>
          <div className="mt-4 flex gap-2 text-sm">
            <Link to="/privacy" className="rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-accent hover:text-foreground">Privacy</Link>
            <span className="rounded-full bg-primary px-3 py-1.5 font-medium text-primary-foreground">Terms</span>
          </div>
        </div>
        <nav className="mt-5 space-y-2" aria-label="Terms of service sections">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">On this page</p>
          {sections.map((section, index) => (
            <a key={section.title} href={`#terms-${index + 1}`} className="group flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
              <span className="font-mono text-xs text-accent/70">{String(index + 1).padStart(2, "0")}</span>
              <span className="group-hover:translate-x-0.5 transition-transform">{section.title}</span>
            </a>
          ))}
        </nav>
      </aside>
      <article className="border-y border-border bg-card/60 px-1 py-7 md:px-8 md:py-9">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-6">
          <p className="text-sm text-muted-foreground">Last updated: September 20, 2026</p>
          <span className="rounded-full border border-border px-3 py-1 text-xs font-medium text-muted-foreground">{sections.length} sections</span>
        </div>
        <div className="mt-8 divide-y divide-border">
          {sections.map((section, index) => (
            <section id={`terms-${index + 1}`} key={section.title} className="py-7 first:pt-0 last:pb-0 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold">{section.title}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  </PageShell>
);

export default Terms;
