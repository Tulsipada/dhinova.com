import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  DEFAULT_OG_IMAGE,
  SITE_LEGAL_NAME,
  SITE_NAME,
  SITE_URL,
  absoluteImageUrl,
} from "@/lib/seo";
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
      <>
        <Seo
          title={`Blog Post Not Found | ${SITE_NAME}`}
          description="The blog post you're looking for doesn't exist."
          path={`/blogs/${slug || ""}`}
          noindex
        />
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">Blog Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The blog post you're looking for doesn't exist.
            </p>
            <Button onClick={() => navigate("/blogs")}>Back to Blogs</Button>
          </div>
        </div>
      </>
    );
  }

  const pagePath = `/blogs/${blog.slug}`;
  const pageUrl = `${SITE_URL}${pagePath}`;
  const imageUrl =
    blog.image === "/logo_bg.png" ? DEFAULT_OG_IMAGE : absoluteImageUrl(blog.image);

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
      url: SITE_URL,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_LEGAL_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/favicon.svg`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
    },
    articleSection: blog.category,
    keywords: blog.tags.join(", "),
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: SITE_URL,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blogs`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: blog.title,
        item: pageUrl,
      },
    ],
  };

  return (
    <>
      <Seo
        title={`${blog.title} | ${SITE_NAME} Blog`}
        description={blog.excerpt}
        path={pagePath}
        image={imageUrl}
        type="article"
        keywords={blog.tags.join(", ")}
        jsonLd={[structuredData, breadcrumbSchema]}
      >
        <meta name="author" content={blog.author} />
        <meta property="article:published_time" content={formatDateISO(blog.date)} />
        <meta property="article:author" content={blog.author} />
        <meta property="article:section" content={blog.category} />
        {blog.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
      </Seo>

      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="container px-4 pt-24">
          <Button variant="ghost" onClick={() => navigate("/blogs")} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blogs
          </Button>
        </div>

        <article className="container px-4 py-8">
          <header className="max-w-4xl mx-auto mb-8">
            <div className="mb-4">
              <Badge variant="secondary" className="mb-4">
                {blog.category}
              </Badge>
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-foreground">
              {blog.title}
            </h1>
            <p className="text-xl text-muted-foreground mb-6">{blog.excerpt}</p>
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <time dateTime={formatDateISO(blog.date)}>{formatDate(blog.date)}</time>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{blog.author}</span>
              </div>
            </div>
          </header>

          <div className="max-w-4xl mx-auto mb-8">
            <img
              src={blog.image}
              alt={blog.title}
              className="w-full h-auto rounded-lg object-cover"
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = "/logo_bg.png";
              }}
            />
          </div>

          <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-bold prose-p:text-muted-foreground prose-p:leading-relaxed">
            {formatContent(blog.content)}
          </div>

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
