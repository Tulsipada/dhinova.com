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
    <section id="blog" className="py-24">
      <div className="container px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{title}</h2>
            <p className="text-lg text-muted-foreground">{subtitle}</p>
          </div>
          <Button asChild variant="outline" className="self-start md:self-auto group">
            <Link to={ctaHref}>
              {ctaLabel}
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {posts[0] ? (
            <article className="lg:col-span-7">
              <Link to={`/blogs/${posts[0].slug}`} className="group block">
                <div className="aspect-[16/10] overflow-hidden rounded-2xl bg-muted mb-5">
                  <img
                    src={posts[0].image}
                    alt={posts[0].title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/logo_bg.png";
                    }}
                  />
                </div>
                <p className="text-sm text-accent font-medium mb-2">{posts[0].category}</p>
                <h3 className="font-display text-3xl font-semibold mb-3 group-hover:text-accent transition-colors text-balance">
                  {posts[0].title}
                </h3>
                <p className="text-muted-foreground mb-4 leading-relaxed">{posts[0].excerpt}</p>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={posts[0].date}>{formatDate(posts[0].date)}</time>
                </div>
              </Link>
            </article>
          ) : null}

          <aside className="lg:col-span-5 space-y-8 lg:border-l lg:border-border lg:pl-10">
            <p className="font-display text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Latest posts
            </p>
            {posts.slice(1).map((post) => (
              <article key={post.id} className="pb-8 border-b border-border last:border-0 last:pb-0">
                <Link to={`/blogs/${post.slug}`} className="group block">
                  <p className="text-xs text-accent font-medium mb-2">{post.category}</p>
                  <h3 className="font-display text-xl font-semibold mb-2 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-3">{post.excerpt}</p>
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
