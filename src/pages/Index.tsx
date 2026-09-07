import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Team from "@/components/Team";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import site from "@/data/site.json";
import { organizationSchema, websiteSchema } from "@/lib/seo";

const Index = () => {
  return (
    <>
      <Seo
        title={`${site.legalName} - Web, Mobile, Crypto & AI Solutions`}
        description={site.description}
        path="/"
        keywords={site.keywords}
        jsonLd={[organizationSchema, websiteSchema]}
      />

      <div className="min-h-screen">
        <Navbar />
        <main>
          <Hero />
          <Services />
          <About />
          <Team />
          <Testimonials />
          <BlogPreview />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
