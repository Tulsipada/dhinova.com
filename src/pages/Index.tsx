import { lazy, Suspense } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Footer from "@/components/Footer";

const Team = lazy(() => import("@/components/Team"));
const Testimonials = lazy(() => import("@/components/Testimonials"));
const BlogPreview = lazy(() => import("@/components/BlogPreview"));
const Contact = lazy(() => import("@/components/Contact"));
import Seo from "@/components/Seo";
import site from "@/data/site.json";
import { organizationSchema, servicesSchema, websiteSchema } from "@/lib/seo";

const Index = () => {
  return (
    <>
      <Seo
        title="Dhinova | iOS, Android & Web App Development Company"
        description={site.description}
        path="/"
        keywords={site.keywords}
        jsonLd={[organizationSchema, websiteSchema, servicesSchema]}
      />

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <Suspense fallback={null}>
            <Team />
            <Testimonials />
            <BlogPreview />
            <Contact />
          </Suspense>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
