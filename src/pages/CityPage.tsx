import { Link, useParams } from "react-router-dom";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import citiesData from "@/data/cities.json";
import { SITE_LEGAL_NAME, SITE_URL, absoluteUrl } from "@/lib/seo";
import {
  CITY_HUB_PATH,
  affordableNote,
  cityHeading,
  cityMetaDescription,
  cityMetaTitle,
  cityPath,
  cityPricingLinks,
  cityServiceLinks,
  remoteSteps,
  type City,
} from "@/lib/cities.mjs";

const cities = citiesData as City[];

const CityPage = () => {
  const { city: slug } = useParams<{ city: string }>();
  const city = cities.find((item) => item.slug === slug);

  if (!city) {
    return (
      <PageShell
        title="City Not Found"
        description="We don't have a page for that city yet."
        path={`${CITY_HUB_PATH}/${slug || ""}`}
        noindex
      >
        <div className="mx-auto max-w-xl text-center">
          <p className="mb-6 text-muted-foreground">
            We work with businesses across India. See the full list of cities or get in touch.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Button asChild variant="outline" className="rounded-full">
              <Link to={`${CITY_HUB_PATH}/`}>All cities</Link>
            </Button>
            <Button asChild className="rounded-full">
              <Link to="/contact/">Contact us</Link>
            </Button>
          </div>
        </div>
      </PageShell>
    );
  }

  const pagePath = cityPath(city);
  const nearby = city.nearby
    .map((nearbySlug) => cities.find((item) => item.slug === nearbySlug))
    .filter((item): item is City => Boolean(item));

  return (
    <PageShell
      title={cityHeading(city)}
      metaTitle={cityMetaTitle(city)}
      eyebrow={`${city.state} · ${city.kind}`}
      description={city.intro}
      metaDescription={cityMetaDescription(city)}
      path={pagePath}
      keywords={`freelancer in ${city.shortName}, low cost website developer ${city.shortName}, app developer ${city.shortName}, web designer ${city.shortName}, affordable website ${city.shortName}`}
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "Service",
          name: `Website and app development in ${city.name}`,
          serviceType: "Website and mobile app development",
          description: cityMetaDescription(city),
          provider: {
            "@type": "Organization",
            name: SITE_LEGAL_NAME,
            url: `${SITE_URL}/`,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kolkata",
              addressRegion: "West Bengal",
              addressCountry: "IN",
            },
          },
          areaServed: { "@type": "City", name: city.shortName, containedInPlace: { "@type": "State", name: city.state } },
          availableLanguage: city.languages,
          url: absoluteUrl(pagePath),
        },
        {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: city.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Cities", item: absoluteUrl(CITY_HUB_PATH) },
            { "@type": "ListItem", position: 3, name: city.name, item: absoluteUrl(pagePath) },
          ],
        },
      ]}
    >
      <div className="mx-auto max-w-4xl">
        <p className="text-lg leading-relaxed text-muted-foreground md:text-xl">{city.localNote}</p>

        <div className="mt-12 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="font-display text-2xl font-bold">Who we build for in {city.shortName}</h2>
            <ul className="mt-5 space-y-4">
              {city.industries.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-2xl font-bold">Common first projects</h2>
            <ul className="mt-5 space-y-4">
              {city.ideas.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                  <span className="leading-relaxed text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">What "low cost" means here</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{affordableNote(city)}</p>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            Languages we can build in for {city.shortName}: {city.languages.join(", ")}.
          </p>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {cityPricingLinks.map((item) => (
              <li key={item.href}>
                <Link to={item.href} className="font-semibold text-accent">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">How we work with {city.shortName} clients from Kolkata</h2>
          <ol className="mt-5 space-y-3">
            {remoteSteps(city).map((step, index) => (
              <li key={step} className="flex items-start gap-3 leading-relaxed text-muted-foreground">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/10 text-sm font-semibold text-accent">
                  {index + 1}
                </span>
                <span>{step}</span>
              </li>
            ))}
          </ol>
        </section>

        <section className="mt-14">
          <h2 className="font-display text-2xl font-bold">Questions from {city.shortName} businesses</h2>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {city.faqs.map((item) => (
              <details key={item.question} className="group py-5">
                <summary className="cursor-pointer font-display text-lg font-semibold">{item.question}</summary>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-2xl border border-border bg-muted/40 p-8">
          <h2 className="font-display text-2xl font-bold">Start your {city.shortName} project</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Tell us what you want to build. We reply with a scope and a milestone price in rupees.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Button asChild className="rounded-full">
              <Link to="/contact/">
                Get a quote
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" className="rounded-full">
              <Link to="/calculator/">Estimate cost</Link>
            </Button>
          </div>
        </section>

        <div className="mt-14 grid gap-10 md:grid-cols-2">
          <section>
            <h2 className="font-display text-xl font-bold">Services</h2>
            <ul className="mt-4 space-y-2">
              {cityServiceLinks.map((item) => (
                <li key={item.href}>
                  <Link to={item.href} className="text-muted-foreground hover:text-accent">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section>
            <h2 className="font-display text-xl font-bold">Nearby cities</h2>
            <ul className="mt-4 space-y-2">
              {nearby.map((item) => (
                <li key={item.slug}>
                  <Link to={`${cityPath(item)}/`} className="inline-flex items-center gap-2 text-muted-foreground hover:text-accent">
                    <MapPin className="h-4 w-4" />
                    Freelancer in {item.name}
                  </Link>
                </li>
              ))}
              <li>
                <Link to={`${CITY_HUB_PATH}/`} className="font-semibold text-accent">
                  All cities
                </Link>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </PageShell>
  );
};

export default CityPage;
