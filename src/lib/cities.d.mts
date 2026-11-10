export type CityFaq = { question: string; answer: string };

export type City = {
  slug: string;
  name: string;
  shortName: string;
  state: string;
  region: string;
  kind: string;
  languages: string[];
  intro: string;
  industries: string[];
  ideas: string[];
  localNote: string;
  faqs: CityFaq[];
  nearby: string[];
};

export type LinkItem = { label: string; href: string };

export const CITY_HUB_PATH: string;
export const CITY_HUB: { title: string; metaTitle: string; metaDescription: string; intro: string };
export const KOLKATA_LINK: { name: string; state: string; href: string };
export const REGION_ORDER: string[];
export function cityPath(city: Pick<City, "slug">): string;
export function cityMetaTitle(city: Pick<City, "shortName">): string;
export function cityHeading(city: Pick<City, "name">): string;
export function cityMetaDescription(city: Pick<City, "shortName" | "languages">): string;
export function remoteSteps(city: Pick<City, "shortName">): string[];
export function affordableNote(city: Pick<City, "shortName">): string;
export const cityServiceLinks: LinkItem[];
export const cityPricingLinks: LinkItem[];
