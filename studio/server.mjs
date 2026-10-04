import { readFileSync, writeFileSync } from "node:fs";
import { createServer } from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";
import { sanitizeBlogHtml } from "../src/lib/blogHtml.mjs";
import { writeSitemap } from "../scripts/seo-pages.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const BLOGS_PATH = path.resolve(ROOT, "src/data/blogs.json");
const SITEMAP_PATH = path.resolve(ROOT, "public/sitemap.xml");
const PAGE = path.resolve(__dirname, "index.html");
const HOST = "127.0.0.1";
const PORT = 4317;
const AUTHOR = "Dhinova Team";

const readPosts = () => JSON.parse(readFileSync(BLOGS_PATH, "utf8"));

const byLatest = (a, b) => {
  const byDate = String(b.date).localeCompare(String(a.date));
  if (byDate) return byDate;
  return (Number(b.id) || 0) - (Number(a.id) || 0);
};

const writePosts = (posts) => {
  writeFileSync(BLOGS_PATH, `${JSON.stringify(posts, null, 2)}\n`, "utf8");
  writeSitemap(SITEMAP_PATH);
};

const dropLinksTo = (posts, slug) => {
  const href = `/blogs/${slug}/`;
  for (const post of posts) {
    if (!Array.isArray(post.related)) continue;
    post.related = post.related.filter((item) => item.href !== href);
    if (!post.related.length) delete post.related;
  }
};

const today = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

const slugify = (value) =>
  String(value || "")
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);

const uniqueSlug = (posts, base, currentId) => {
  const root = base || "post";
  let slug = root;
  let n = 2;
  while (posts.some((post) => post.slug === slug && post.id !== currentId)) {
    slug = `${root}-${n}`;
    n += 1;
  }
  return slug;
};

const asText = (value, max) => String(value || "").replace(/\s+/g, " ").trim().slice(0, max);

const asList = (value) => {
  const items = Array.isArray(value)
    ? value
    : String(value || "")
        .split(",")
        .map((item) => item.trim());
  return items.map((item) => asText(item, 80)).filter(Boolean);
};

const asLinks = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      href: asText(item?.href, 240),
      label: asText(item?.label, 120),
    }))
    .filter((item) => item.href.startsWith("/") && item.label);
};

const asFaqs = (value) => {
  if (!Array.isArray(value)) return [];
  return value
    .map((item) => ({
      question: asText(item?.question, 200),
      answer: asText(item?.answer, 600),
    }))
    .filter((item) => item.question && item.answer);
};

const buildPost = (body, posts) => {
  const title = asText(body.title, 160);
  const excerpt = asText(body.excerpt, 220);
  const content = sanitizeBlogHtml(body.content || "");
  const category = asText(body.category, 60) || "Notes";
  if (!title) return { error: "Add a title." };
  if (!excerpt) return { error: "Add a short excerpt." };
  if (!content.replace(/<[^>]+>/g, "").trim()) return { error: "Write the article before saving." };

  const original = posts.find((post) => post.slug && post.slug === String(body.originalSlug || ""));
  const id = original?.id ?? Math.max(0, ...posts.map((post) => Number(post.id) || 0)) + 1;
  const slug = original ? original.slug : uniqueSlug(posts, slugify(title) || "post", id);

  const post = {
    id,
    slug,
    title,
    excerpt,
    content,
    image: asText(body.image, 400) || "/logo_bg.png",
    author: AUTHOR,
    date: original?.date || today(),
    category,
    tags: asList(body.tags).slice(0, 8),
  };

  const related = asLinks(body.related);
  const faqs = asFaqs(body.faqs);
  if (related.length) post.related = related;
  if (faqs.length) post.faqs = faqs;
  return { post, existing: Boolean(original) };
};

const linkFrom = (posts, fromSlug, post) => {
  const source = posts.find((item) => item.slug === fromSlug);
  if (!source || source.slug === post.slug) return;
  const href = `/blogs/${post.slug}/`;
  const related = Array.isArray(source.related) ? source.related : [];
  if (related.some((item) => item.href === href)) return;
  source.related = [{ href, label: post.title }, ...related];
};

const send = (res, status, payload) => {
  const body = JSON.stringify(payload);
  res.writeHead(status, {
    "Content-Type": "application/json; charset=utf-8",
    "Content-Length": Buffer.byteLength(body),
    "Cache-Control": "no-store",
  });
  res.end(body);
};

const localHost = (req) => {
  const host = String(req.headers.host || "").replace(/:\d+$/, "");
  return host === "127.0.0.1" || host === "localhost";
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    req.on("data", (chunk) => {
      size += chunk.length;
      if (size > 1_000_000) {
        reject(new Error("too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });

const server = createServer(async (req, res) => {
  if (!localHost(req)) {
    res.writeHead(403, { "Content-Type": "text/plain; charset=utf-8" });
    res.end("This studio only runs on your computer.");
    return;
  }

  const url = new URL(req.url || "/", `http://${HOST}`);

  if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
    const html = readFileSync(PAGE);
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-store",
    });
    res.end(html);
    return;
  }

  if (req.method === "GET" && url.pathname === "/api/posts") {
    send(res, 200, { posts: readPosts().sort(byLatest) });
    return;
  }

  if (req.method === "POST" && url.pathname === "/api/posts") {
    try {
      const body = JSON.parse(await readBody(req));
      const posts = readPosts();
      const result = buildPost(body, posts);
      if (result.error) {
        send(res, 400, { error: result.error });
        return;
      }
      const next = result.existing
        ? posts.map((post) => (post.id === result.post.id ? result.post : post))
        : [...posts, result.post];
      if (body.linkFromSlug) linkFrom(next, String(body.linkFromSlug), result.post);
      writePosts(next);
      send(res, 200, { post: result.post, updated: result.existing, sitemap: "/sitemap.xml" });
    } catch {
      send(res, 400, { error: "Could not save that article." });
    }
    return;
  }

  if (req.method === "DELETE" && url.pathname === "/api/posts") {
    try {
      const body = JSON.parse(await readBody(req));
      const slug = String(body.slug || "");
      const posts = readPosts();
      const existing = posts.find((post) => post.slug === slug);
      if (!existing) {
        send(res, 404, { error: "That article is not in the file." });
        return;
      }
      const next = posts.filter((post) => post.slug !== slug);
      dropLinksTo(next, slug);
      writePosts(next);
      send(res, 200, { deleted: slug });
    } catch {
      send(res, 400, { error: "Could not delete that article." });
    }
    return;
  }

  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
});

server.listen(PORT, HOST, () => {
  const address = `http://${HOST}:${PORT}/`;
  console.log(`Blog studio running at ${address}`);
  console.log("Local only. Saving writes src/data/blogs.json. Push main to publish.");
  if (process.platform === "win32") {
    spawn("cmd", ["/c", "start", "", address], { detached: true, stdio: "ignore" }).unref();
  }
});
