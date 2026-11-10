// Shared copy + helpers for the city landing pages (/freelancer/<city>/).
// Used by both the React pages and scripts/seo-pages.mjs so the prerendered
// HTML that Google crawls matches what the app renders.

export const CITY_HUB_PATH = "/freelancer";

export const CITY_HUB = {
  title: "Affordable Website & App Freelancer Across India",
  metaTitle: "Low-Cost Website & App Freelancer Across India | Dhinova",
  metaDescription:
    "Dhinova is a Kolkata-based web and app development team that works remotely with businesses in every Indian state capital and metro, at freelancer prices.",
  intro:
    "Dhinova is based in Kolkata and works remotely with businesses across India. You get freelancer pricing and a small, named team: one milestone at a time, a live demo before each payment, and full source code at the end. Pick your city to see what businesses there usually build with us.",
};

// Kolkata already has a strong-ranking blog post, so the hub links there
// instead of creating a competing /freelancer/kolkata/ page.
export const KOLKATA_LINK = {
  name: "Kolkata",
  state: "West Bengal",
  href: "/blogs/affordable-freelancer-in-kolkata/",
};

export const REGION_ORDER = ["East", "Northeast", "North", "West", "Central", "South"];

export const cityPath = (city) => `${CITY_HUB_PATH}/${city.slug}`;

export const cityMetaTitle = (city) =>
  `Affordable Web & App Freelancer in ${city.shortName} | Dhinova`;

export const cityHeading = (city) => `Affordable website & app freelancer in ${city.name}`;

export const cityMetaDescription = (city) =>
  `Low-cost website and app development for ${city.shortName} businesses. Dhinova works remotely from Kolkata, with milestone pricing, live demos, and ${city.languages[0]} pages if you need them.`;

// Sections that are the same on every city page. City-specific copy comes from
// src/data/cities.json and makes up most of each page.
export const remoteSteps = (city) => [
  `A short video call to understand your ${city.shortName} business and what the first version must do.`,
  "A written scope and a milestone price in rupees - no hourly billing surprises.",
  "A live demo link at the end of every milestone that you can open on your own phone.",
  "You approve each milestone before paying for the next one.",
  "Full source code, domain, and hosting access handed over to you at the end.",
];

export const affordableNote = (city) =>
  `Low cost means a focused first version, not cut corners. For a ${city.shortName} business, that usually means a few well-built pages or one complete app flow, launched first. Extra languages, payment integrations, and admin panels can follow as separate milestones once the first version is earning its keep.`;

export const cityServiceLinks = [
  { label: "Web development", href: "/services/web-development/" },
  { label: "Android app development", href: "/services/android-app-development/" },
  { label: "iOS app development", href: "/services/ios-app-development/" },
  { label: "SEO & growth", href: "/services/seo-growth/" },
];

export const cityPricingLinks = [
  { label: "Website development cost in India (2026)", href: "/blogs/website-development-cost-in-india-2026-complete-pricing-guide/" },
  { label: "WordPress vs custom website", href: "/blogs/wordpress-vs-custom-website-which-is-right-for-your-business-in-india/" },
  { label: "Project cost calculator", href: "/calculator/" },
];
