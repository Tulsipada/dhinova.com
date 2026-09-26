import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import PageShell from "@/components/PageShell";
import FallbackImage from "@/components/FallbackImage";
import { Button } from "@/components/ui/button";
import { DEFAULT_OG_IMAGE, SITE_LEGAL_NAME, SITE_NAME, SITE_URL } from "@/lib/seo";
import site from "@/data/site.json";
import blogsData from "@/data/blogs.json";

type Blog = (typeof blogsData)[number];

const formatDate = (dateString: string) =>
  new Date(dateString).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

const readingMinutes = (content: string) =>
  Math.max(3, Math.round(content.trim().split(/\s+/).length / 180));

const categoryTone: Record<string, string> = {
  "Web Development": "from-sky-500/15 via-transparent to-violet-500/10",
  "Mobile Development": "from-emerald-500/15 via-transparent to-cyan-500/10",
  Blockchain: "from-amber-500/15 via-transparent to-orange-500/10",
  "AI & Machine Learning": "from-fuchsia-500/15 via-transparent to-violet-500/10",
  "Software Engineering": "from-blue-500/15 via-transparent to-slate-500/10",
  DevOps: "from-teal-500/15 via-transparent to-emerald-500/10",
};

const Blogs = () => {
  const blogs = useMemo(
    () =>
      [...blogsData].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      ) as Blog[],
    []
  );

  const categories = useMemo(
    () => ["All", ...new Set(blogs.map((blog) => blog.category))],
    [blogs]
  );

  const [active, setActive] = useState("All");
  const [query, setQuery] = useState("");

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return blogs.filter((blog) => {
      const matchesCategory = active === "All" || blog.category === active;
      const matchesQuery =
        !q ||
        blog.title.toLowerCase().includes(q) ||
        blog.excerpt.toLowerCase().includes(q) ||
        blog.tags.some((tag) => tag.toLowerCase().includes(q));
      return matchesCategory && matchesQuery;
    });
  }, [active, blogs, query]);

  const [featured, ...rest] = visible;
  const pageDescription = site.blogSection.subtitle;

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: `${SITE_NAME} Blog`,
    description: pageDescription,
    url: `${SITE_URL}/blogs`,
    publisher: {
      "@type": "Organization",
      name: SITE_LEGAL_NAME,
      url: SITE_URL,
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      url: `${SITE_URL}/blogs/${blog.slug}`,
      datePublished: new Date(blog.date).toISOString(),
      author: {
        "@type": "Organization",
        name: blog.author,
      },
      image: blog.image === "/logo_bg.png" ? DEFAULT_OG_IMAGE : `${SITE_URL}${blog.image}`,
    })),
  };

  return (
    <PageShell
      title={site.blogSection.title}
      eyebrow="Insights"
      description={pageDescription}
      path="/blogs"
      keywords={`software blog, react tutorials, ai development india, ${site.keywords}`}
      jsonLd={structuredData}
      headerAside={
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 backdrop-blur">
          <div>
            <p className="text-2xl font-display font-bold leading-none">{blogs.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">articles</p>
          </div>
        </div>
      }
      afterHeader={
        <div className="sticky top-16 z-30 border-b border-border/80 bg-background/90 backdrop-blur-md">
          <div className="container px-4 py-4">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
              <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:px-0">
                {categories.map((category) => {
                  const count =
                    category === "All"
                      ? blogs.length
                      : blogs.filter((b) => b.category === category).length;
                  const isActive = active === category;
                  return (
                    <button
                      key={category}
                      type="button"
                      onClick={() => setActive(category)}
                      className={`shrink-0 rounded-xl px-3.5 py-2 text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground shadow-sm"
                          : "bg-muted/70 text-muted-foreground hover:bg-muted hover:text-foreground"
                      }`}
                    >
                      {category}
                      <span
                        className={`ml-2 text-xs font-medium ${
                          isActive ? "text-primary-foreground/70" : "text-muted-foreground/70"
                        }`}
                      >
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              <label className="relative block w-full lg:max-w-xs">
                <span className="sr-only">Search articles</span>
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search articles…"
                  className="w-full rounded-xl border border-border bg-background py-2.5 pl-10 pr-3 text-sm outline-none transition-shadow placeholder:text-muted-foreground focus:border-accent focus:ring-2 focus:ring-accent/20"
                />
              </label>
            </div>
          </div>
        </div>
      }
    >
      {blogs.length === 0 ? (
        <p className="py-20 text-center text-lg text-muted-foreground">
          No blogs available at the moment.
        </p>
      ) : visible.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-border px-6 py-16 text-center">
          <p className="font-display text-xl font-bold">No matching articles</p>
          <p className="mt-2 text-muted-foreground">Try another category or clear the search.</p>
          <button
            type="button"
            onClick={() => {
              setActive("All");
              setQuery("");
            }}
            className="mt-6 text-sm font-semibold text-accent hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <>
          <p className="mb-8 text-sm text-muted-foreground">
            Showing{" "}
            <span className="font-semibold text-foreground">{visible.length}</span>{" "}
            {visible.length === 1 ? "article" : "articles"}
            {active !== "All" ? (
              <>
                {" "}
                in <span className="font-semibold text-foreground">{active}</span>
              </>
            ) : null}
          </p>

          {featured ? (
            <article className="animate-rise mb-12 md:mb-16">
              <Link
                to={`/blogs/${featured.slug}`}
                className="group grid overflow-hidden rounded-[1.75rem] border border-border bg-muted/30 transition-colors hover:border-accent/40 lg:grid-cols-12"
              >
                <div
                  className={`relative aspect-[16/10] bg-gradient-to-br ${
                    categoryTone[featured.category] ?? "from-muted to-secondary"
                  } lg:col-span-7 lg:aspect-auto lg:min-h-[340px]`}
                >
                  <div className="surface-grid absolute inset-0 opacity-20" />
                  <FallbackImage
                    src={featured.image}
                    alt={featured.title}
                    className="relative z-10 h-full w-full object-contain p-12 transition-transform duration-700 group-hover:scale-105 md:p-16"
                  />
                </div>

                <div className="flex flex-col justify-center p-7 md:p-10 lg:col-span-5">
                  <div className="mb-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                    <span className="rounded-lg bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
                      Featured
                    </span>
                    <span className="font-medium text-muted-foreground">{featured.category}</span>
                    <span className="text-muted-foreground/30">·</span>
                    <time dateTime={featured.date} className="text-muted-foreground">
                      {formatDate(featured.date)}
                    </time>
                    <span className="text-muted-foreground/30">·</span>
                    <span className="text-muted-foreground">
                      {readingMinutes(featured.content)} min
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-bold text-balance transition-colors group-hover:text-accent md:text-3xl lg:text-4xl">
                    {featured.title}
                  </h2>
                  <p className="mt-4 line-clamp-3 leading-relaxed text-muted-foreground">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-sm font-semibold">
                    Read article
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </article>
          ) : null}

          {rest.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {rest.map((blog, index) => (
                <article
                  key={blog.id}
                  className="animate-rise group"
                  style={{ animationDelay: `${Math.min(index, 5) * 0.06}s` }}
                >
                  <Link
                    to={`/blogs/${blog.slug}`}
                    className="flex h-full flex-col overflow-hidden rounded-3xl border border-border bg-background transition-all hover:-translate-y-0.5 hover:border-accent/35 hover:shadow-[0_18px_40px_-28px_rgba(15,23,42,0.35)]"
                  >
                    <div
                      className={`relative aspect-[16/10] bg-gradient-to-br ${
                        categoryTone[blog.category] ?? "from-muted to-secondary"
                      }`}
                    >
                      <FallbackImage
                        src={blog.image}
                        alt={blog.title}
                        className="h-full w-full object-contain p-8 transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5 md:p-6">
                      <div className="mb-3 flex flex-wrap items-center gap-2 text-xs">
                        <span className="font-semibold text-accent">{blog.category}</span>
                        <span className="text-muted-foreground/40">·</span>
                        <time dateTime={blog.date} className="text-muted-foreground">
                          {formatDate(blog.date)}
                        </time>
                        <span className="text-muted-foreground/40">·</span>
                        <span className="text-muted-foreground">
                          {readingMinutes(blog.content)} min
                        </span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-balance transition-colors group-hover:text-accent md:text-xl">
                        {blog.title}
                      </h3>
                      <p className="mt-2 line-clamp-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                        {blog.excerpt}
                      </p>
                      <div className="mt-5 flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                        <ul className="flex flex-wrap gap-1.5">
                          {blog.tags.slice(0, 2).map((tag) => (
                            <li
                              key={tag}
                              className="rounded-md bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
                            >
                              {tag}
                            </li>
                          ))}
                        </ul>
                        <span className="inline-flex items-center gap-1 text-xs font-semibold text-foreground/70 group-hover:text-accent">
                          Read
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </article>
              ))}
            </div>
          ) : null}

          <div className="relative mt-16 overflow-hidden rounded-[1.75rem] bg-primary px-7 py-10 text-primary-foreground md:mt-20 md:px-12 md:py-14">
            <div className="pointer-events-none absolute -right-10 top-0 h-44 w-44 rounded-full bg-accent/25 blur-3xl" />
            <div className="relative z-10 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">
                  Next step
                </p>
                <h2 className="mt-3 font-display text-2xl font-bold md:text-3xl">
                  Ready to turn an idea into a product?
                </h2>
                <p className="mt-3 text-sm text-primary-foreground/65 md:text-base">
                  Tell us what you want to build  -  we’ll reply with scope and an INR estimate.
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="shrink-0 rounded-full bg-accent text-accent-foreground hover:bg-accent/90"
              >
                <Link to="/contact">
                  Talk to us
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </>
      )}
    </PageShell>
  );
};

export default Blogs;
