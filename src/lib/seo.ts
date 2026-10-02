import site from "@/data/site.json";
import services from "@/data/services.json";

export const SITE_URL = site.url;
export const SITE_NAME = site.name;
export const SITE_BRAND = site.siteName || "Dhinova Technology";
export const SITE_LEGAL_NAME = site.legalName;
export const SITE_DESCRIPTION = site.description;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/logo_bg.png`;
export const SITE_EMAIL = site.email;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_LEGAL_NAME,
  alternateName: [SITE_BRAND, "DhiNova", SITE_NAME],
  url: SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`,
  logo: `${SITE_URL}/dhinova.png`,
  image: DEFAULT_OG_IMAGE,
  email: SITE_EMAIL,
  telephone: site.phone,
  description: SITE_DESCRIPTION,
  foundingDate: site.foundingDate,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Kolkata",
    addressRegion: "West Bengal",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: SITE_EMAIL,
    telephone: site.phone,
    availableLanguage: ["English", "Hindi"],
    areaServed: "IN",
  },
  sameAs: site.socials.filter((social) => social.href).map((social) => social.href),
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  url: SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`,
  name: SITE_NAME,
  alternateName: [SITE_BRAND, "DhiNova", SITE_LEGAL_NAME],
  publisher: {
    "@type": "Organization",
    name: SITE_LEGAL_NAME,
    url: SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`,
  },
};

export const servicesSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Dhinova software development services",
  url: `${SITE_URL}/#services`,
  itemListElement: services.map((service, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "Service",
      name: service.title,
      description: service.description,
      serviceType: service.title,
      provider: {
        "@type": "Organization",
        name: SITE_LEGAL_NAME,
        url: SITE_URL,
      },
      areaServed: "Worldwide",
      url: absoluteUrl(`/services/${service.slug}`),
    },
  })),
};

export function withTrailingSlash(path: string): string {
  if (!path.startsWith("/") || path.startsWith("//")) return path;
  const hashIndex = path.indexOf("#");
  const hash = hashIndex >= 0 ? path.slice(hashIndex) : "";
  const beforeHash = hashIndex >= 0 ? path.slice(0, hashIndex) : path;
  const queryIndex = beforeHash.indexOf("?");
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;

  if (pathname === "/" || pathname === "" || /\.[a-z0-9]+$/i.test(pathname)) {
    return `${pathname}${query}${hash}`;
  }

  const slashed = pathname.endsWith("/") ? pathname : `${pathname}/`;
  return `${slashed}${query}${hash}`;
}

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) {
    try {
      const url = new URL(path);
      if (url.origin === new URL(SITE_URL).origin) {
        return `${url.origin}${withTrailingSlash(url.pathname)}${url.search}${url.hash}`;
      }
    } catch {
      return path;
    }
    return path;
  }
  const normalized = path.startsWith("/") ? path : `/${path}`;
  const hashIndex = normalized.indexOf("#");
  const hash = hashIndex >= 0 ? normalized.slice(hashIndex) : "";
  const beforeHash = hashIndex >= 0 ? normalized.slice(0, hashIndex) : normalized;
  const queryIndex = beforeHash.indexOf("?");
  const query = queryIndex >= 0 ? beforeHash.slice(queryIndex) : "";
  const pathname = queryIndex >= 0 ? beforeHash.slice(0, queryIndex) : beforeHash;

  return `${SITE_URL}${withTrailingSlash(`${pathname}${query}${hash}`)}`;
}

export function absoluteImageUrl(image?: string): string {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith("http")) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}
