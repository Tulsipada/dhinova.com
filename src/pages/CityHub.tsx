import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import citiesData from "@/data/cities.json";
import { SITE_URL, absoluteUrl } from "@/lib/seo";
import {
  CITY_HUB,
  CITY_HUB_PATH,
  KOLKATA_LINK,
  REGION_ORDER,
  cityPath,
  type City,
} from "@/lib/cities.mjs";

const cities = citiesData as City[];

const CityHub = () => {
  const byRegion = REGION_ORDER.map((region) => ({
    region,
    items: cities.filter((city) => city.region === region),
  })).filter((group) => group.items.length > 0 || group.region === "East");

  return (
    <PageShell
      title={CITY_HUB.title}
      metaTitle={CITY_HUB.metaTitle}
      eyebrow="Cities we serve"
      description={CITY_HUB.intro}
      metaDescription={CITY_HUB.metaDescription}
      path={CITY_HUB_PATH}
      keywords="low cost freelancer india, affordable website developer india, freelance app developer india, website developer in every state capital"
      jsonLd={[
        {
          "@context": "https://schema.org",
          "@type": "ItemList",
          name: CITY_HUB.title,
          url: absoluteUrl(CITY_HUB_PATH),
          itemListElement: [
            { "@type": "ListItem", position: 1, name: KOLKATA_LINK.name, url: absoluteUrl(KOLKATA_LINK.href) },
            ...cities.map((city, index) => ({
              "@type": "ListItem",
              position: index + 2,
              name: city.name,
              url: absoluteUrl(cityPath(city)),
            })),
          ],
        },
        {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Cities", item: absoluteUrl(CITY_HUB_PATH) },
          ],
        },
      ]}
    >
      <div className="mx-auto max-w-5xl space-y-12">
        {byRegion.map((group) => (
          <section key={group.region}>
            <h2 className="font-display text-2xl font-bold">{group.region} India</h2>
            <ul className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {group.region === "East" ? (
                <li>
                  <Link
                    to={KOLKATA_LINK.href}
                    className="flex items-start gap-3 rounded-2xl border border-accent/40 p-4 transition-colors hover:border-accent"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>
                      <span className="block font-semibold">Freelancer in {KOLKATA_LINK.name}</span>
                      <span className="block text-sm text-muted-foreground">{KOLKATA_LINK.state} · Our home city</span>
                    </span>
                  </Link>
                </li>
              ) : null}
              {group.items.map((city) => (
                <li key={city.slug}>
                  <Link
                    to={`${cityPath(city)}/`}
                    className="flex items-start gap-3 rounded-2xl border border-border p-4 transition-colors hover:border-accent"
                  >
                    <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                    <span>
                      <span className="block font-semibold">Freelancer in {city.name}</span>
                      <span className="block text-sm text-muted-foreground">{city.state}</span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}

        <section className="rounded-2xl border border-border bg-muted/40 p-8">
          <h2 className="font-display text-2xl font-bold">Don't see your city?</h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            We work with businesses anywhere in India. Tell us what you want to build and we'll reply with a scope
            and a milestone price.
          </p>
          <Button asChild className="mt-6 rounded-full">
            <Link to="/contact/">
              Get a quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </section>
      </div>
    </PageShell>
  );
};

export default CityHub;
