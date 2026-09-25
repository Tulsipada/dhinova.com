import { Link } from "react-router-dom";
import { ArrowRight, Calendar } from "lucide-react";
import blogs from "@/data/blogs.json";
import site from "@/data/site.json";
import { Button } from "@/components/ui/button";

const BlogPreview = () => {
  const { title, subtitle, ctaLabel, ctaHref } = site.blogSection;
  const posts = [...blogs]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 3);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <section id="blog" className="section-pad">
      <div className="container px-4">
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="max-w-2xl">
            <p className="section-eyebrow">Insights</p>
            <h2 className="section-title mb-5">{title}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
          </div>
          <Button asChild variant="outline" className="group self-start rounded-full px-6 md:self-auto">
            <Link to={ctaHref}>
              {ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12">
          {posts[0] ? (
            <article className="lg:col-span-7">
              <Link to={`/blogs/${posts[0].slug}`} className="group block">
                <div className="mb-6 aspect-[16/10] overflow-hidden rounded-[1.5rem] bg-gradient-to-br from-muted to-secondary">
                  <img
                    src={posts[0].image}
                    alt={posts[0].title}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/dhinova.png";
                      e.currentTarget.className = "h-full w-full object-contain p-16";
                    }}
                  />
                </div>
                <p className="mb-2 text-sm font-semibold text-accent">{posts[0].category}</p>
                <h3 className="mb-3 font-display text-3xl font-bold text-balance transition-colors group-hover:text-accent">
                  {posts[0].title}
                </h3>
                <p className="mb-4 leading-relaxed text-muted-foreground">{posts[0].excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <time dateTime={posts[0].date}>{formatDate(posts[0].date)}</time>
                </div>
              </Link>
            </article>
          ) : null}

          <aside className="space-y-8 lg:col-span-5 lg:border-l lg:border-border lg:pl-10">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Latest posts
            </p>
            {posts.slice(1).map((post) => (
              <article key={post.id} className="border-b border-border pb-8 last:border-0 last:pb-0">
                <Link to={`/blogs/${post.slug}`} className="group block">
                  <p className="mb-2 text-xs font-semibold text-accent">{post.category}</p>
                  <h3 className="mb-2 font-display text-xl font-bold transition-colors group-hover:text-accent">
                    {post.title}
                  </h3>
                  <p className="mb-3 line-clamp-2 text-sm text-muted-foreground">{post.excerpt}</p>
                  <time dateTime={post.date} className="text-xs text-muted-foreground">
                    {formatDate(post.date)}
                  </time>
                </Link>
              </article>
            ))}
          </aside>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
