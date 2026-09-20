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
    <div className="mx-auto max-w-3xl space-y-10">
      <p className="text-sm text-muted-foreground">Last updated: September 20, 2026</p>
      {sections.map((section) => (
        <section key={section.title}>
          <h2 className="font-display text-2xl font-bold">{section.title}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{section.body}</p>
        </section>
      ))}
    </div>
  </PageShell>
);

export default Terms;
