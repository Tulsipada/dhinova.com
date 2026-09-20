import PageShell from "@/components/PageShell";
import faq from "@/data/faq.json";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const Faq = () => (
  <PageShell
    title="Frequently Asked Questions"
    eyebrow="FAQ"
    description="Quick answers about Dhinova services, timelines, whitelabel partnerships, and how we work with clients."
    path="/faq"
    keywords={`dhinova faq, software development questions, ${site.keywords}`}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
      url: `${SITE_URL}/faq`,
    }}
  >
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {faq.map((item) => (
        <details key={item.id} className="group py-6">
          <summary className="cursor-pointer list-none font-display text-xl font-semibold marker:content-none">
            <span className="flex items-start justify-between gap-4">
              {item.question}
              <span className="text-accent transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="mt-4 leading-relaxed text-muted-foreground">{item.answer}</p>
        </details>
      ))}
    </div>
  </PageShell>
);

export default Faq;
