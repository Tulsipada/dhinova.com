import { Link } from "react-router-dom";
import { Calendar, User, Tag } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import { Badge } from "@/components/ui/badge";
import { DEFAULT_OG_IMAGE, SITE_LEGAL_NAME, SITE_NAME, SITE_URL } from "@/lib/seo";
import site from "@/data/site.json";
import blogsData from "@/data/blogs.json";

type Blog = (typeof blogsData)[number];

const Blogs = () => {
  const blogs = [...blogsData].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  ) as Blog[];

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

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

  const [featured, ...rest] = blogs;

  return (
    <>
      <Seo
        title={`${site.blogSection.title} | ${SITE_NAME}`}
        description={pageDescription}
        path="/blogs"
        keywords={site.keywords}
        jsonLd={structuredData}
      />

      <div className="min-h-screen">
        <Navbar />
        <header
          className="pt-28 pb-16 text-primary-foreground"
          style={{ background: "var(--gradient-hero)" }}
        >
          <div className="container px-4">
            <div className="max-w-3xl">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {site.blogSection.title}
              </h1>
              <p className="text-lg text-primary-foreground/85">{pageDescription}</p>
            </div>
          </div>
        </header>

        <main className="py-16">
          <div className="container px-4">
            {blogs.length === 0 ? (
              <p className="text-center text-muted-foreground text-lg py-20">
                No blogs available at the moment.
              </p>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div className="lg:col-span-8 space-y-10">
                  {featured ? (
                    <article>
                      <Link to={`/blogs/${featured.slug}`} className="group block">
                        <div className="aspect-[16/9] overflow-hidden rounded-2xl bg-muted mb-5">
                          <img
                            src={featured.image}
                            alt={featured.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            onError={(e) => {
                              e.currentTarget.onerror = null;
                              e.currentTarget.src = "/logo_bg.png";
                            }}
                          />
                        </div>
                        <Badge variant="secondary" className="mb-3">
                          {featured.category}
                        </Badge>
                        <h2 className="font-display text-3xl font-semibold mb-3 group-hover:text-accent transition-colors">
                          {featured.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">{featured.excerpt}</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                          <span className="inline-flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            <time dateTime={featured.date}>{formatDate(featured.date)}</time>
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {featured.author}
                          </span>
                        </div>
                      </Link>
                    </article>
                  ) : null}

                  <div className="grid sm:grid-cols-2 gap-8">
                    {rest.map((blog) => (
                      <article key={blog.id}>
                        <Link to={`/blogs/${blog.slug}`} className="group block">
                          <div className="aspect-[16/10] overflow-hidden rounded-xl bg-muted mb-4">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                              onError={(e) => {
                                e.currentTarget.onerror = null;
                                e.currentTarget.src = "/logo_bg.png";
                              }}
                            />
                          </div>
                          <p className="text-xs text-accent font-medium mb-2">{blog.category}</p>
                          <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                            {blog.title}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
                            {blog.excerpt}
                          </p>
                          <time dateTime={blog.date} className="text-xs text-muted-foreground">
                            {formatDate(blog.date)}
                          </time>
                        </Link>
                      </article>
                    ))}
                  </div>
                </div>

                <aside className="lg:col-span-4 space-y-8">
                  <div className="rounded-2xl bg-muted/50 p-6 border border-border/60">
                    <h2 className="font-display text-lg font-semibold mb-4">Categories</h2>
                    <ul className="space-y-2">
                      {[...new Set(blogs.map((b) => b.category))].map((category) => (
                        <li
                          key={category}
                          className="text-sm text-muted-foreground border-b border-border/50 py-2 last:border-0"
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-muted/50 p-6 border border-border/60">
                    <h2 className="font-display text-lg font-semibold mb-4">Recent</h2>
                    <ul className="space-y-4">
                      {blogs.slice(0, 5).map((blog) => (
                        <li key={blog.id}>
                          <Link
                            to={`/blogs/${blog.slug}`}
                            className="text-sm font-medium hover:text-accent transition-colors"
                          >
                            {blog.title}
                          </Link>
                          <p className="text-xs text-muted-foreground mt-1">
                            {formatDate(blog.date)}
                          </p>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="rounded-2xl bg-muted/50 p-6 border border-border/60">
                    <h2 className="font-display text-lg font-semibold mb-4">Popular tags</h2>
                    <div className="flex flex-wrap gap-2">
                      {[...new Set(blogs.flatMap((b) => b.tags))].slice(0, 12).map((tag) => (
                        <Badge key={tag} variant="outline" className="text-xs">
                          <Tag className="w-3 h-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>
            )}
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
};

export default Blogs;
