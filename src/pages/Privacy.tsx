import { Link } from "react-router-dom";
import PageShell from "@/components/PageShell";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const sections = [
  {
    title: "Information we collect",
    body: "When you contact us, we may collect your name, email, phone number, company details, and project information you voluntarily share.",
  },
  {
    title: "How we use information",
    body: "We use contact details to respond to inquiries, prepare proposals, deliver services, and improve our website experience.",
  },
  {
    title: "Cookies and analytics",
    body: "Our site may use analytics tools to understand traffic and improve pages. You can control cookies through your browser settings.",
  },
  {
    title: "Data sharing",
    body: "We do not sell personal information. We may share data with trusted service providers only as needed to operate our business or comply with law.",
  },
  {
    title: "Contact",
    body: `For privacy questions, email ${site.email}.`,
  },
];

const Privacy = () => (
  <PageShell
    title="Privacy Policy"
    eyebrow="Legal"
    description="How Dhinova Technology Pvt Ltd collects, uses, and protects information when you use our website or contact us."
    path="/privacy"
    keywords="dhinova privacy policy, data protection"
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "WebPage",
      name: "Privacy Policy",
      url: `${SITE_URL}/privacy`,
    }}
  >
    <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[180px_minmax(0,1fr)] lg:gap-12">
      <aside className="h-fit lg:sticky lg:top-24">
        <div className="border-b border-border pb-5">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Legal centre</p>
          <div className="mt-4 flex gap-2 text-sm">
            <span className="rounded-full bg-primary px-3 py-1.5 font-medium text-primary-foreground">Privacy</span>
            <Link to="/terms" className="rounded-full border border-border px-3 py-1.5 text-muted-foreground transition-colors hover:border-accent hover:text-foreground">Terms</Link>
          </div>
        </div>
        <nav className="mt-5 space-y-2" aria-label="Privacy policy sections">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground">On this page</p>
          {sections.map((section, index) => (
            <a key={section.title} href={`#privacy-${index + 1}`} className="group flex items-start gap-3 text-sm text-muted-foreground transition-colors hover:text-foreground">
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
            <section id={`privacy-${index + 1}`} key={section.title} className="py-7 first:pt-0 last:pb-0 scroll-mt-28">
              <h2 className="font-display text-2xl font-bold">{section.title}</h2>
              <p className="mt-3 max-w-3xl leading-relaxed text-muted-foreground">{section.body}</p>
            </section>
          ))}
        </div>
      </article>
    </div>
  </PageShell>
);

export default Privacy;
