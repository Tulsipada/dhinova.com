import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import services from "@/data/services.json";
import site from "@/data/site.json";
import { SITE_LEGAL_NAME, SITE_URL } from "@/lib/seo";

const ServicePage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const service = services.find((item) => item.slug === slug);

  if (!service) {
    return (
      <PageShell
        title="Service Not Found"
        description="The service page you requested is not available."
        path={`/services/${slug || ""}`}
        noindex
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-6 text-muted-foreground">
            That service does not exist. Browse our capabilities or start a project conversation.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button onClick={() => navigate("/#services")} variant="outline" className="rounded-full">
              View services
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  const pagePath = `/services/${service.slug}`;
  const hire = "hire" in service ? service.hire : undefined;
  const faqs = "faqs" in service ? service.faqs : undefined;
  const mobileCluster = ["ios", "android", "mobile", "web"];
  const related = (
    mobileCluster.includes(service.id)
      ? services.filter((item) => item.id !== service.id && mobileCluster.includes(item.id))
      : services.filter((item) => item.id !== service.id)
  ).slice(0, 3);

  return (
    <PageShell
      title={service.title}
      eyebrow="Services"
      description={service.longDescription}
      path={pagePath}
      keywords={service.keywords}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: service.title,
          description: service.longDescription,
          serviceType: service.title,
          provider: {
            "@type": "Organization",
            name: SITE_LEGAL_NAME,
            url: SITE_URL,
          },
          areaServed: "Worldwide",
          url: `${SITE_URL}${pagePath}`,
        },
        ...(faqs
          ? [
              {
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: faqs.map((item) => ({
                  "@type": "Question",
                  name: item.question,
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: item.answer,
                  },
                })),
              },
            ]
          : []),
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
            { "@type": "ListItem", position: 2, name: "Services", item: `${SITE_URL}/#services` },
            {
              "@type": "ListItem",
              position: 3,
              name: service.title,
              item: `${SITE_URL}${pagePath}`,
            },
          ],
        },
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 -ml-3 rounded-full">
          <Link to="/#services">
            <ArrowLeft className="mr-2 h-4 w-4" />
            All services
          </Link>
        </Button>

        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">
          {service.description}
        </p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl font-bold">What you get</h2>
            <ul className="mt-5 space-y-4">
              {service.benefits.map((benefit) => (
                <li key={benefit} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="leading-relaxed text-muted-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Outcomes</h2>
            <ul className="mt-5 space-y-4">
              {service.outcomes.map((outcome) => (
                <li key={outcome} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="leading-relaxed text-muted-foreground">{outcome}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        {hire ? (
          <section id={hire.id} className="mt-14 scroll-mt-28">
            <h2 className="font-display text-2xl font-bold">{hire.heading}</h2>
            {hire.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
                {paragraph}
              </p>
            ))}
          </section>
        ) : null}

        {faqs ? (
          <section className="mt-14">
            <h2 className="font-display text-2xl font-bold">Common questions</h2>
            <div className="mt-5 divide-y divide-border border-y border-border">
              {faqs.map((item) => (
                <details key={item.question} className="group py-5">
                  <summary className="cursor-pointer font-display text-lg font-semibold">
                    {item.question}
                  </summary>
                  <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{item.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ) : null}

        <section className="mt-14 rounded-2xl border border-border bg-muted/40 p-8">
          <h2 className="font-display text-2xl font-bold">Ready to start?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Tell us about your product goals. {site.name} will outline scope, timeline, and a clear
            delivery plan for {service.title.toLowerCase()}.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link to="/contact">
                Start a project
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/calculator">Estimate cost</Link>
            </Button>
          </div>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Related services</h2>
          <ul className="mt-5 divide-y divide-border border-y border-border">
            {related.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/services/${item.slug}`}
                  className="group flex items-center justify-between gap-4 py-5 transition-colors hover:text-accent"
                >
                  <span>
                    <span className="block font-display text-lg font-semibold">{item.title}</span>
                    <span className="mt-1 block text-sm text-muted-foreground">{item.description}</span>
                  </span>
                  <ArrowRight className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </PageShell>
  );
};

export default ServicePage;
