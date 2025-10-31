import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
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

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Find blog by slug
    const foundBlog = (blogsData as Blog[]).find((b) => b.slug === slug);
    if (foundBlog) {
      setBlog(foundBlog);
    }
    setLoading(false);
  }, [slug]);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatDateISO = (dateString: string) => {
    return new Date(dateString).toISOString();
  };

  const formatContent = (content: string) => {
    // Simple markdown-like formatting
    return content.split("\n").map((line, index) => {
      if (line.startsWith("## ")) {
        return (
          <h2 key={index} className="text-3xl font-bold mt-8 mb-4 text-foreground">
            {line.substring(3)}
          </h2>
        );
      } else if (line.startsWith("### ")) {
        return (
          <h3 key={index} className="text-2xl font-semibold mt-6 mb-3 text-foreground">
            {line.substring(4)}
          </h3>
        );
      } else if (line.trim() === "") {
        return <br key={index} />;
      } else {
        return (
          <p key={index} className="mb-4 text-lg leading-relaxed text-muted-foreground">
            {line}
          </p>
        );
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
          <p className="text-muted-foreground mb-6">The blog post you're looking for doesn't exist.</p>
          <Button onClick={() => navigate("/blogs")}>Back to Blogs</Button>
        </div>
      </div>
    );
  }

  const siteUrl = "https://dhinova.com";
  const pageUrl = `${siteUrl}/blogs/${blog.slug}`;
  const imageUrl = blog.image.startsWith("http") ? blog.image : `${siteUrl}${blog.image}`;

  // Structured Data (JSON-LD)
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: blog.title,
    description: blog.excerpt,
    image: imageUrl,
    datePublished: formatDateISO(blog.date),
    dateModified: formatDateISO(blog.date),
    author: {
      "@type": "Organization",
      name: blog.author,
      url: siteUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Dhinova Technology Pvt Ltd",
      url: siteUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    articleSection: blog.category,
    keywords: blog.tags.join(", "),
  };

  // Article structured data
  const articleStructuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.excerpt,
    image: imageUrl,
    datePublished: formatDateISO(blog.date),
    dateModified: formatDateISO(blog.date),
    author: {
      "@type": "Organization",
      name: blog.author,
    },
    publisher: {
      "@type": "Organization",
      name: "Dhinova Technology Pvt Ltd",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/favicon.ico`,
      },
    },
    mainEntityOfPage: pageUrl,
    articleSection: blog.category,
    keywords: blog.tags.join(", "),
  };

  return (
    <>
      <Helmet>
        {/* Primary Meta Tags */}
        <title>{blog.title} | Dhinova Technology Blog</title>
        <meta name="title" content={blog.title} />
        <meta name="description" content={blog.excerpt} />
        <meta name="keywords" content={blog.tags.join(", ")} />
        <meta name="author" content={blog.author} />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="article" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={blog.title} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:site_name" content="Dhinova Technology" />
        <meta property="article:published_time" content={formatDateISO(blog.date)} />
        <meta property="article:author" content={blog.author} />
        <meta property="article:section" content={blog.category} />
        {blog.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={pageUrl} />
        <meta name="twitter:title" content={blog.title} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={imageUrl} />

        {/* Canonical URL */}
        <link rel="canonical" href={pageUrl} />

        {/* Structured Data */}
        <script type="application/ld+json">{JSON.stringify(structuredData)}</script>
        <script type="application/ld+json">{JSON.stringify(articleStructuredData)}</script>
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Back Button */}
        <div className="container px-4 pt-8">
          <Button
            variant="ghost"
            onClick={() => navigate("/blogs")}
            className="mb-4"
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </div>

        {/* Blog Header */}
        <article className="container px-4 py-8">
          <header className="max-w-4xl mx-auto mb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                {blog.category}
              </Badge>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {blog.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">
              {blog.excerpt}
            </p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={formatDateISO(blog.date)}>
                  {formatDate(blog.date)}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
            </div>
          </header>

          {/* Featured Image */}
          <div className="max-w-4xl mx-auto mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-lg object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/placeholder.svg";
              }}
            />
          </div>

          {/* Blog Content */}
          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed">
            {formatContent(blog.content)}
          </div>

          {/* Tags */}
          <footer className="max-w-4xl mx-auto mt-12 pt-8 border-t">
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Tag className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-muted-foreground">Tags:</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {blog.tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="text-sm">
                  {tag}
                </Badge>
              ))}
            </div>
          </footer>

          {/* Back to Blogs Link */}
          <div className="max-w-4xl mx-auto mt-8">
            <Link to="/blogs">
              <Button variant="outline">
                <ArrowLeft className="mr-2 h-4 w-4" />
                View All Blogs
              </Button>
            </Link>
          </div>
        </article>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
