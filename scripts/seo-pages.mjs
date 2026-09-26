import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const SITE_URL = "https://dhinova.com";

const readJson = (relativePath) =>
  JSON.parse(readFileSync(path.resolve(ROOT, relativePath), "utf-8"));

export const escapeHtml = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const absolute = (assetPath = "/") => {
  if (!assetPath) return `${SITE_URL}/`;
  if (assetPath.startsWith("http")) return assetPath;
  return `${SITE_URL}${assetPath.startsWith("/") ? assetPath : `/${assetPath}`}`;
};

const navHtml = () => {
  const site = readJson("src/data/site.json");
  const links = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Clients", href: "/clients" },
    { label: "Whitelabel", href: "/whitelabel" },
    { label: "Calculator", href: "/calculator" },
    { label: "App Requirements", href: "/requirements" },
    { label: "Notifications", href: "/notifications" },
    { label: "Announcements", href: "/announcements" },
    { label: "Blog", href: "/blogs" },
    { label: "FAQ", href: "/faq" },
    { label: "Careers", href: "/careers" },
    { label: "Contact", href: "/contact" },
    { label: "Privacy", href: "/privacy" },
    { label: "Terms", href: "/terms" },
  ];
  return `<nav aria-label="Primary">${links
    .map((item) => `<a href="${escapeHtml(absolute(item.href))}">${escapeHtml(item.label)}</a>`)
    .join(" · ")}</nav><p>${escapeHtml(site.legalName)}  -  ${escapeHtml(site.tagline)}</p>`;
};

const markdownishToHtml = (content = "") =>
  content
    .split(/\n\n+/)
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (trimmed.startsWith("## ")) {
        return `<h2>${escapeHtml(trimmed.slice(3))}</h2>`;
      }
      return `<p>${escapeHtml(trimmed)}</p>`;
    })
    .join("\n");

export function getSeoPages() {
  const site = readJson("src/data/site.json");
  const services = readJson("src/data/services.json");
  const projects = readJson("src/data/projects.json");
  const clients = readJson("src/data/clients.json");
  const blogs = readJson("src/data/blogs.json");
  const faq = readJson("src/data/faq.json");
  const careers = readJson("src/data/careers.json");
  const team = readJson("src/data/team.json");
  const testimonials = readJson("src/data/testimonials.json");
  const requirements = readJson("src/data/requirements.json");
  const notifications = readJson("src/data/notifications.json");
  const announcements = readJson("src/data/announcements.json");

  const pages = [
    {
      path: "/",
      title: "Dhinova | Web, Mobile, AI & Blockchain Development",
      description: site.description,
      changefreq: "weekly",
      priority: "1.0",
      body: `
        ${navHtml()}
        <main>
          <h1>${escapeHtml(site.hero.headline)}</h1>
          <p>${escapeHtml(site.hero.subheadline)}</p>
          <p>${escapeHtml(site.description)}</p>
          <h2>${escapeHtml(site.servicesSection.title)}</h2>
          <p>${escapeHtml(site.servicesSection.subtitle)}</p>
          <ul>${services
            .map(
              (service) =>
                `<li><h3>${escapeHtml(service.title)}</h3><p>${escapeHtml(service.description)}</p></li>`
            )
            .join("")}</ul>
          <h2>${escapeHtml(site.about.title)}</h2>
          ${site.about.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
          <h2>${escapeHtml(site.teamSection.title)}</h2>
          <ul>${team
            .map(
              (member) =>
                `<li><h3>${escapeHtml(member.name)}</h3><p>${escapeHtml(member.role)}</p><p>${escapeHtml(member.bio)}</p></li>`
            )
            .join("")}</ul>
          <h2>${escapeHtml(site.testimonialsSection.title)}</h2>
          <ul>${testimonials
            .map(
              (item) =>
                `<li><blockquote>${escapeHtml(item.quote)}</blockquote><p>${escapeHtml(item.name)}  -  ${escapeHtml(item.role)}</p></li>`
            )
            .join("")}</ul>
          <h2>${escapeHtml(site.blogSection.title)}</h2>
          <ul>${blogs
            .slice(0, 6)
            .map(
              (blog) =>
                `<li><a href="${escapeHtml(absolute(`/blogs/${blog.slug}`))}">${escapeHtml(blog.title)}</a><p>${escapeHtml(blog.excerpt)}</p></li>`
            )
            .join("")}</ul>
          <h2>${escapeHtml(site.contact.title)}</h2>
          <p>${escapeHtml(site.contact.subtitle)}</p>
          <p>Email: <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a> · Phone: <a href="tel:${escapeHtml(site.phone.replace(/\s/g, ""))}">${escapeHtml(site.phone)}</a> · ${escapeHtml(site.location)}</p>
        </main>
      `,
    },
    {
      path: "/about",
      title: `About Dhinova | ${site.name}`,
      description: site.about.paragraphs[0],
      changefreq: "monthly",
      priority: "0.9",
      body: `
        ${navHtml()}
        <main>
          <h1>${escapeHtml(site.about.title)}</h1>
          ${site.about.paragraphs.map((p) => `<p>${escapeHtml(p)}</p>`).join("")}
          <h2>Why teams choose us</h2>
          <ul>${site.about.highlights.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul>
          <h2>Team</h2>
          <ul>${team
            .map(
              (member) =>
                `<li><h3>${escapeHtml(member.name)}</h3><p>${escapeHtml(member.role)}</p><p>${escapeHtml(member.bio)}</p></li>`
            )
            .join("")}</ul>
        </main>
      `,
    },
    {
      path: "/projects",
      title: `Completed Projects | ${site.name}`,
      description: "Selected products and digital platforms delivered by Dhinova  -  from MVPs to production systems.",
      changefreq: "weekly",
      priority: "0.9",
      body: `
        ${navHtml()}
        <main>
          <h1>Completed Projects</h1>
          <p>Selected products and digital platforms delivered by Dhinova.</p>
          <ul>${projects
            .map(
              (project) => `
                <li>
                  <h2>${escapeHtml(project.title)}</h2>
                  <p>${escapeHtml(project.category)} · ${escapeHtml(project.year)} · ${escapeHtml(project.status)}</p>
                  <p>${escapeHtml(project.description)}</p>
                  <p>${escapeHtml(project.technologies.join(", "))}</p>
                  ${project.url ? `<p><a href="${escapeHtml(project.url)}">View project</a></p>` : ""}
                </li>`
            )
            .join("")}</ul>
        </main>
      `,
    },
    {
      path: "/clients",
      title: `Happy Clients | ${site.name}`,
      description: "Teams that chose Dhinova to design, build, and ship products across web, mobile, AI, and blockchain.",
      changefreq: "monthly",
      priority: "0.8",
      body: `
        ${navHtml()}
        <main>
          <h1>Happy Clients</h1>
          <p>Teams that chose Dhinova to design, build, and ship digital products.</p>
          <ul>${clients
            .map(
              (client) => `
                <li>
                  <h2>${escapeHtml(client.name)}</h2>
                  <p>${escapeHtml(client.industry)}</p>
                  <p>${escapeHtml(client.result)}</p>
                  <blockquote>${escapeHtml(client.quote)}</blockquote>
                </li>`
            )
            .join("")}</ul>
        </main>
      `,
    },
    {
      path: "/whitelabel",
      title: `Whitelabel Solutions | ${site.name}`,
      description:
        "Scale your agency delivery with Dhinova as your silent product engineering partner  -  white-labeled code, design, and launch support.",
      changefreq: "monthly",
      priority: "0.8",
      body: `
        ${navHtml()}
        <main>
          <h1>Whitelabel Solutions</h1>
          <p>Scale your agency delivery with Dhinova as your silent product engineering partner.</p>
          <ul>
            <li>Silent delivery under your agency brand</li>
            <li>Dedicated engineering squads for web, mobile, AI, and blockchain</li>
            <li>Fixed or milestone pricing with clear status reporting</li>
            <li>NDA-first collaboration and secure handoff packages</li>
          </ul>
          <p><a href="${escapeHtml(absolute("/contact"))}">Talk partnership</a></p>
        </main>
      `,
    },
    {
      path: "/calculator",
      title: `Project Cost Calculator | ${site.name}`,
      description:
        "Get a quick ballpark for your web, mobile, AI, or blockchain project. Final quotes are tailored after a short discovery call.",
      changefreq: "monthly",
      priority: "0.8",
      body: `
        ${navHtml()}
        <main>
          <h1>Project Cost Calculator</h1>
          <p>Estimate ballpark pricing for web, mobile, AI, blockchain, and whitelabel engagements.</p>
          <p>Use the interactive calculator on this page, then <a href="${escapeHtml(absolute("/contact"))}">contact us</a> for a precise proposal.</p>
          <ul>
            <li>Web Application</li>
            <li>Mobile App</li>
            <li>AI Feature / Product</li>
            <li>Blockchain / Web3</li>
            <li>Whitelabel Engagement</li>
          </ul>
        </main>
      `,
    },
    {
      path: "/requirements",
      title: `App Requirements | ${site.name}`,
      description:
        "Prepare these details before we start. A clear brief helps us estimate accurately and ship the right MVP faster.",
      changefreq: "monthly",
      priority: "0.8",
      body: `
        ${navHtml()}
        <main>
          <h1>App Requirements</h1>
          <p>Checklist for product, design, technical, delivery, and compliance details.</p>
          <ul>${requirements
            .map(
              (item) =>
                `<li><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.category)}</p><p>${escapeHtml(item.description)}</p></li>`
            )
            .join("")}</ul>
        </main>
      `,
    },
    {
      path: "/notifications",
      title: `Notifications | ${site.name}`,
      description: "Operational notices, partner updates, and timely messages from the Dhinova team.",
      changefreq: "weekly",
      priority: "0.7",
      body: `
        ${navHtml()}
        <main>
          <h1>Notifications</h1>
          <ul>${notifications
            .map(
              (item) =>
                `<li><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.type)} · ${escapeHtml(item.date)}</p><p>${escapeHtml(item.body)}</p></li>`
            )
            .join("")}</ul>
        </main>
      `,
    },
    {
      path: "/announcements",
      title: `Announcements | ${site.name}`,
      description: "Company news, service launches, hiring updates, and milestones from Dhinova Technology.",
      changefreq: "weekly",
      priority: "0.7",
      body: `
        ${navHtml()}
        <main>
          <h1>Announcements</h1>
          <ul>${announcements
            .map(
              (item) =>
                `<li><h2>${escapeHtml(item.title)}</h2><p>${escapeHtml(item.tag)} · ${escapeHtml(item.date)}</p><p>${escapeHtml(item.excerpt)}</p><p>${escapeHtml(item.body)}</p></li>`
            )
            .join("")}</ul>
        </main>
      `,
    },
    {
      path: "/contact",
      title: `Contact Us | ${site.name}`,
      description: site.contact.subtitle,
      changefreq: "monthly",
      priority: "0.9",
      body: `
        ${navHtml()}
        <main>
          <h1>${escapeHtml(site.contact.title)}</h1>
          <p>${escapeHtml(site.contact.subtitle)}</p>
          <ul>
            <li>Email: <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a></li>
            <li>Phone: <a href="tel:${escapeHtml(site.phone.replace(/\s/g, ""))}">${escapeHtml(site.phone)}</a></li>
            <li>Location: ${escapeHtml(site.location)}</li>
          </ul>
        </main>
      `,
    },
    {
      path: "/faq",
      title: `FAQ | ${site.name}`,
      description: "Quick answers about Dhinova services, timelines, whitelabel partnerships, and how we work with clients.",
      changefreq: "monthly",
      priority: "0.7",
      body: `
        ${navHtml()}
        <main>
          <h1>Frequently Asked Questions</h1>
          ${faq
            .map(
              (item) =>
                `<section><h2>${escapeHtml(item.question)}</h2><p>${escapeHtml(item.answer)}</p></section>`
            )
            .join("")}
        </main>
      `,
    },
    {
      path: "/careers",
      title: `Careers | ${site.name}`,
      description:
        "Build meaningful products with a distributed engineering culture focused on craft, clarity, and ownership.",
      changefreq: "monthly",
      priority: "0.7",
      body: `
        ${navHtml()}
        <main>
          <h1>Careers at Dhinova</h1>
          <p>Join a team shipping web, mobile, AI, and blockchain products.</p>
          <ul>${careers
            .map(
              (role) =>
                `<li><h2>${escapeHtml(role.title)}</h2><p>${escapeHtml(role.type)} · ${escapeHtml(role.location)}</p><p>${escapeHtml(role.summary)}</p></li>`
            )
            .join("")}</ul>
          <p>Apply via <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a></p>
        </main>
      `,
    },
    {
      path: "/privacy",
      title: `Privacy Policy | ${site.name}`,
      description: "How Dhinova Technology Pvt Ltd collects, uses, and protects information when you use our website or contact us.",
      changefreq: "yearly",
      priority: "0.4",
      body: `
        ${navHtml()}
        <main>
          <h1>Privacy Policy</h1>
          <p>When you contact us, we may collect your name, email, phone number, company details, and project information you voluntarily share.</p>
          <p>We use contact details to respond to inquiries, prepare proposals, deliver services, and improve our website experience.</p>
          <p>We do not sell personal information. For privacy questions, email <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a>.</p>
        </main>
      `,
    },
    {
      path: "/terms",
      title: `Terms of Service | ${site.name}`,
      description: "Terms governing use of the Dhinova website and engagement for software services.",
      changefreq: "yearly",
      priority: "0.4",
      body: `
        ${navHtml()}
        <main>
          <h1>Terms of Service</h1>
          <p>Dhinova provides software design and development services. Project scope, timelines, and fees are defined in written proposals or agreements.</p>
          <p>Content on this website is for general information. Estimates and examples are illustrative and not contractual offers.</p>
          <p>Questions: <a href="mailto:${escapeHtml(site.email)}">${escapeHtml(site.email)}</a></p>
        </main>
      `,
    },
    {
      path: "/blogs",
      title: `${site.blogSection.title} | ${site.name}`,
      description: site.blogSection.subtitle,
      changefreq: "weekly",
      priority: "0.9",
      body: `
        ${navHtml()}
        <main>
          <h1>${escapeHtml(site.blogSection.title)}</h1>
          <p>${escapeHtml(site.blogSection.subtitle)}</p>
          <ul>${blogs
            .map(
              (blog) => `
                <li>
                  <h2><a href="${escapeHtml(absolute(`/blogs/${blog.slug}`))}">${escapeHtml(blog.title)}</a></h2>
                  <p>${escapeHtml(blog.category)} · ${escapeHtml(blog.date)} · ${escapeHtml(blog.author)}</p>
                  <p>${escapeHtml(blog.excerpt)}</p>
                </li>`
            )
            .join("")}</ul>
        </main>
      `,
    },
  ];

  for (const blog of blogs) {
    pages.push({
      path: `/blogs/${blog.slug}`,
      title: `${blog.title} | ${site.name} Blog`,
      description: blog.excerpt,
      changefreq: "monthly",
      priority: "0.8",
      lastmod: blog.date,
      image: absolute(blog.image === "/logo_bg.png" || !blog.image ? "/og-image.jpg" : blog.image),
      body: `
        ${navHtml()}
        <main>
          <article>
            <p><a href="${escapeHtml(absolute("/blogs"))}">Back to Blog</a></p>
            <p>${escapeHtml(blog.category)}</p>
            <h1>${escapeHtml(blog.title)}</h1>
            <p>${escapeHtml(blog.excerpt)}</p>
            <p>${escapeHtml(blog.author)} · <time datetime="${escapeHtml(blog.date)}">${escapeHtml(blog.date)}</time></p>
            <img src="${escapeHtml(absolute(blog.image || "/dhinova.png"))}" alt="${escapeHtml(blog.title)}" width="1200" height="630" />
            ${markdownishToHtml(blog.content)}
            <p>Tags: ${blog.tags.map((tag) => escapeHtml(tag)).join(", ")}</p>
          </article>
        </main>
      `,
    });
  }

  return pages;
}

export function generateSitemapXml(pages = getSeoPages()) {
  const urls = pages
    .map((page) => {
      const loc = page.path === "/" ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
      const lastmod = page.lastmod ? `\n    <lastmod>${page.lastmod}</lastmod>` : "";
      return `  <url>\n    <loc>${loc}</loc>${lastmod}\n    <changefreq>${page.changefreq}</changefreq>\n    <priority>${page.priority}</priority>\n  </url>`;
    })
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`;
}

export function writeSitemap(targetPath) {
  const xml = generateSitemapXml();
  writeFileSync(targetPath, xml);
  return targetPath;
}

export function ensureDir(dirPath) {
  if (!existsSync(dirPath)) mkdirSync(dirPath, { recursive: true });
}

export { SITE_URL, ROOT, absolute };
