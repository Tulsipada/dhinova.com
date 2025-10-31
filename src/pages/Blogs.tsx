import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, User, Tag } from "lucide-react";
import Footer from "@/components/Footer";
import blogsData from "@/data/blogs.json";

interface Blog {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  image: string;
  author: string;
  date: string;
  category: string;
  tags: string[];
}

const Blogs = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    // Load blogs from JSON file
    setBlogs(blogsData as Blog[]);
  }, []);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const siteUrl = "https://dhinova.com";
  const pageUrl = `${siteUrl}/blogs`;
  const pageDescription = "Explore our blog for insights, tutorials, and updates on technology, web development, mobile apps, blockchain, AI, and software engineering.";

  // Structured Data for Blog Listing
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Dhinova Technology Blog",
    description: pageDescription,
    url: pageUrl,
    publisher: {
      "@type": "Organization",
      name: "Dhinova Technology Pvt Ltd",
      url: siteUrl,
    },
    blogPost: blogs.map((blog) => ({
      "@type": "BlogPosting",
      headline: blog.title,
      description: blog.excerpt,
      url: `${siteUrl}/blogs/${blog.slug}`,
      datePublished: new Date(blog.date).toISOString(),
      author: {
        "@type": "Organization",
        name: blog.author,
      },
      image: blog.image.startsWith("http") ? blog.image : `${siteUrl}${blog.image}`,
    })),
  };

  return (
    <>
      <Helmet>
        <title>Our Blog | Technology Insights & Tutorials | Dhinova Technology</title>
        <meta name="description" content={pageDescription} />
        <meta name="keywords" content="technology blog, web development, mobile apps, blockchain, AI, software engineering, tutorials, tech insights" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content="Our Blog | Dhinova Technology" />
        <meta property="og:description" content={pageDescription} />
        <meta property="og:site_name" content="Dhinova Technology" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content="Our Blog | Dhinova Technology" />
        <meta name="twitter:description" content={pageDescription} />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Header Section */}
        <header className="bg-gradient-to-br from-primary/95 via-primary/90 to-accent/80 py-20">
          <div className="container px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-4">
                Our Blog
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Insights, tutorials, and updates on technology, development, and innovation
              </p>
            </div>
          </div>
        </header>

        {/* Blogs Grid */}
        <main className="py-16">
          <div className="container px-4">
            {blogs.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground text-lg">No blogs available at the moment.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {blogs.map((blog) => {
                  const blogUrl = `/blogs/${blog.slug}`;
                  const blogImageUrl = blog.image.startsWith("http") ? blog.image : `${siteUrl}${blog.image}`;
                  
                  return (
                    <article key={blog.id}>
                      <Link to={blogUrl} className="block">
                        <Card className="overflow-hidden border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] group h-full flex flex-col">
                          <div className="relative h-48 overflow-hidden bg-muted">
                            <img
                              src={blog.image}
                              alt={blog.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/placeholder.svg";
                              }}
                            />
                            <div className="absolute top-4 left-4">
                              <Badge variant="secondary" className="bg-background/90">
                                {blog.category}
                              </Badge>
                            </div>
                          </div>
                          <CardHeader>
                            <CardTitle className="text-xl line-clamp-2 group-hover:text-accent transition-colors">
                              {blog.title}
                            </CardTitle>
                            <CardDescription className="line-clamp-2">
                              {blog.excerpt}
                            </CardDescription>
                          </CardHeader>
                          <CardContent className="flex-grow flex flex-col">
                            <div className="flex flex-col gap-3">
                              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                  <Calendar className="w-4 h-4" />
                                  <time dateTime={blog.date}>
                                    {formatDate(blog.date)}
                                  </time>
                                </div>
                                <div className="flex items-center gap-1">
                                  <User className="w-4 h-4" />
                                  <span>{blog.author}</span>
                                </div>
                              </div>
                              <div className="flex flex-wrap gap-2">
                                {blog.tags.slice(0, 3).map((tag, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs"
                                  >
                                    <Tag className="w-3 h-3 mr-1" />
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    </article>
                  );
                })}
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

