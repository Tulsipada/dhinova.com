import { readFileSync, writeFileSync, copyFileSync, existsSync } from "node:fs";
import path from "node:path";
import {
  ROOT,
  SITE_URL,
  absolute,
  escapeHtml,
  ensureDir,
  getSeoPages,
  writeSitemap,
} from "./seo-pages.mjs";

const distDir = path.resolve(ROOT, "dist");
const templatePath = path.resolve(distDir, "index.html");

function injectMeta(html, page) {
  const pageUrl = absolute(page.path);
  const image = page.image || `${SITE_URL}/logo_bg.png`;
  const title = page.title;
  const description = page.description;

  let next = html;

  next = next.replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(title)}</title>`);

  const replaceMeta = (attr, name, content) => {
    const re = new RegExp(`<meta[^>]+${attr}=["']${name}["'][^>]*>`, "i");
    const tag = `<meta ${attr}="${name}" content="${escapeHtml(content)}" />`;
    if (re.test(next)) next = next.replace(re, tag);
    else next = next.replace("</head>", `    ${tag}\n  </head>`);
  };

  replaceMeta("name", "description", description);
  replaceMeta("property", "og:title", title);
  replaceMeta("property", "og:description", description);
  replaceMeta("property", "og:url", pageUrl);
  replaceMeta("property", "og:image", image);
  replaceMeta(
    "property",
    "og:type",
    page.path.startsWith("/blogs/") && page.path !== "/blogs" ? "article" : "website"
  );
  replaceMeta("name", "twitter:title", title);
  replaceMeta("name", "twitter:description", description);
  replaceMeta("name", "twitter:image", image);
  replaceMeta("property", "og:image:alt", page.imageAlt || page.headline || title);
  replaceMeta("name", "twitter:image:alt", page.imageAlt || page.headline || title);

  if (/<link[^>]+rel=["']canonical["'][^>]*>/i.test(next)) {
    next = next.replace(
      /<link[^>]+rel=["']canonical["'][^>]*>/i,
      `<link rel="canonical" href="${escapeHtml(pageUrl)}" />`
    );
  } else {
    next = next.replace(
      "</head>",
      `    <link rel="canonical" href="${escapeHtml(pageUrl)}" />\n  </head>`
    );
  }

  return next;
}

function pageSchema(page) {
  const pageUrl = absolute(page.path);
  const isBlogPost = page.path.startsWith("/blogs/");

  if (isBlogPost) {
    const article = {
      "@type": "BlogPosting",
      headline: page.headline || page.title,
      description: page.description,
      url: pageUrl,
      image: page.image,
      datePublished: page.lastmod,
      dateModified: page.lastmod,
      author: { "@type": "Organization", name: "Dhinova Technology Pvt Ltd", url: SITE_URL },
      publisher: {
        "@type": "Organization",
        name: "Dhinova Technology Pvt Ltd",
        url: SITE_URL,
        logo: { "@type": "ImageObject", url: `${SITE_URL}/dhinova.png` },
      },
      mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
    };

    if (!Array.isArray(page.faq)) {
      return { "@context": "https://schema.org", ...article };
    }

    return {
      "@context": "https://schema.org",
      "@graph": [
        article,
        {
          "@type": "FAQPage",
          mainEntity: page.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
      ],
    };
  }

  if (page.schemaType === "FAQPage" && Array.isArray(page.faq)) {
    return {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: page.faq.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: { "@type": "Answer", text: item.answer },
      })),
      url: pageUrl,
    };
  }

  if (page.schemaType === "City" && page.city) {
    const { city } = page;
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Service",
          name: `Website and app development in ${city.name}`,
          serviceType: "Website and mobile app development",
          description: page.description,
          provider: {
            "@type": "Organization",
            name: "Dhinova Technology Pvt Ltd",
            url: `${SITE_URL}/`,
            address: {
              "@type": "PostalAddress",
              addressLocality: "Kolkata",
              addressRegion: "West Bengal",
              addressCountry: "IN",
            },
          },
          areaServed: {
            "@type": "City",
            name: city.shortName,
            containedInPlace: { "@type": "State", name: city.state },
          },
          availableLanguage: city.languages,
          url: pageUrl,
        },
        {
          "@type": "FAQPage",
          mainEntity: city.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Cities", item: absolute("/freelancer") },
            { "@type": "ListItem", position: 3, name: city.name, item: pageUrl },
          ],
        },
      ],
    };
  }

  if (page.schemaType === "CityHub" && Array.isArray(page.cities)) {
    return {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "ItemList",
          name: page.title,
          url: pageUrl,
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Kolkata", url: absolute("/blogs/affordable-freelancer-in-kolkata") },
            ...page.cities.map((city, index) => ({
              "@type": "ListItem",
              position: index + 2,
              name: city.name,
              url: absolute(`/freelancer/${city.slug}`),
            })),
          ],
        },
        {
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
            { "@type": "ListItem", position: 2, name: "Cities", item: pageUrl },
          ],
        },
      ],
    };
  }

  if (page.schemaType === "Service" && page.service) {
    const serviceSchema = {
      "@type": "Service",
      name: page.service.title,
      description: page.service.longDescription,
      serviceType: page.service.title,
      provider: {
        "@type": "Organization",
        name: "Dhinova Technology Pvt Ltd",
        url: SITE_URL,
      },
      areaServed: "Worldwide",
      url: pageUrl,
    };

    if (!Array.isArray(page.service.faqs)) {
      return { "@context": "https://schema.org", ...serviceSchema };
    }

    return {
      "@context": "https://schema.org",
      "@graph": [
        serviceSchema,
        {
          "@type": "FAQPage",
          mainEntity: page.service.faqs.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: { "@type": "Answer", text: item.answer },
          })),
        },
      ],
    };
  }

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: page.title,
    description: page.description,
    url: pageUrl,
    isPartOf: { "@type": "WebSite", "@id": `${SITE_URL}/#website`, name: "Dhinova", url: `${SITE_URL}/` },
  };
}

function injectBody(html, page) {
  const content = `
    <div id="prerender" data-prerendered="true">
      ${page.body}
    </div>
  `;

  if (/<div id="root"><\/div>/i.test(html)) {
    return html.replace(
      /<div id="root"><\/div>/i,
      `<div id="root">${content}</div>`
    );
  }

  return html.replace("</body>", `${content}\n  </body>`);
}

function writePage(page, template) {
  let html = injectMeta(template, page);
  if (page.path !== "/") {
    html = html.replace(/\s*<script type="application\/ld\+json">[\s\S]*?<\/script>/gi, "");
    const schema = JSON.stringify(pageSchema(page)).replace(/</g, "\\u003c");
    html = html.replace("</head>", `    <script type="application/ld+json">${schema}</script>\n  </head>`);
  }
  html = injectBody(html, page);

  if (page.path === "/") {
    writeFileSync(path.resolve(distDir, "index.html"), html);
    return path.resolve(distDir, "index.html");
  }

  const outDir = path.resolve(distDir, page.path.replace(/^\//, ""));
  ensureDir(outDir);
  const outFile = path.resolve(outDir, "index.html");
  writeFileSync(outFile, html);
  return outFile;
}

function main() {
  if (!existsSync(templatePath)) {
    console.error("dist/index.html not found. Run vite build first.");
    process.exit(1);
  }

  const template = readFileSync(templatePath, "utf-8");
  const pages = getSeoPages();

  for (const page of pages) {
    const out = writePage(page, template);
    console.log(`✓ Prerendered ${page.path} -> ${path.relative(ROOT, out)}`);
  }

  // GitHub Pages SPA fallback
  copyFileSync(path.resolve(distDir, "index.html"), path.resolve(distDir, "404.html"));
  console.log("✓ Copied index.html to 404.html");

  writeSitemap(path.resolve(ROOT, "public/sitemap.xml"));
  writeSitemap(path.resolve(distDir, "sitemap.xml"));
  console.log(`✓ Sitemap generated with ${pages.length} URLs`);
  console.log(`✓ Prerender complete for ${pages.length} pages (${SITE_URL})`);
}

main();
