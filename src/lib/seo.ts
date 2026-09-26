import site from "@/data/site.json";
import services from "@/data/services.json";

export const SITE_URL = site.url;
export const SITE_NAME = site.name;
export const SITE_LEGAL_NAME = site.legalName;
export const SITE_DESCRIPTION = site.description;
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;
export const SITE_EMAIL = site.email;

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_LEGAL_NAME,
  alternateName: SITE_NAME,
  url: SITE_URL.endsWith("/") ? SITE_URL : `${SITE_URL}/`,
  logo: `${SITE_URL}/dhinova.png`,
  image: DEFAULT_OG_IMAGE,
  email: SITE_EMAIL,
  description: SITE_DESCRIPTION,
  address: {
    "@type": "PostalAddress",
    addressCountry: "IN",
  },
  contactPoint: {
    "@type": "ContactPoint",
    contactType: "customer service",
    email: SITE_EMAIL,
    telephone: site.phone,
    availableLanguage: ["English", "Hindi"],
  },
  sameAs: [],
};

export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: SITE_NAME,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  publisher: {
    "@type": "Organization",
    name: SITE_LEGAL_NAME,
    url: SITE_URL,
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
      url: `${SITE_URL}/#services`,
    },
  })),
};

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http")) return path;
  const normalized = path.startsWith("/") ? path : `/${path}`;
  if (normalized === "/") return `${SITE_URL}/`;
  return `${SITE_URL}${normalized}`;
}

export function absoluteImageUrl(image?: string): string {
  if (!image) return DEFAULT_OG_IMAGE;
  if (image.startsWith("http")) return image;
  return `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}`;
}
