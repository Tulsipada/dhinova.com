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

export default Privacy;
