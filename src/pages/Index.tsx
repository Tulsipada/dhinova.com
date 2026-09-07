import Hero from "@/components/Hero";
import Services from "@/components/Services";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Seo from "@/components/Seo";
import {
  SITE_DESCRIPTION,
  SITE_LEGAL_NAME,
  organizationSchema,
  websiteSchema,
} from "@/lib/seo";

const Index = () => {
  return (
    <>
      <Seo
        title={`${SITE_LEGAL_NAME} - Web, Mobile, Crypto & AI Solutions`}
        description={SITE_DESCRIPTION}
        path="/"
        keywords="web development, mobile apps, React, React Native, blockchain, cryptocurrency, AI, artificial intelligence, software development, India"
        jsonLd={[organizationSchema, websiteSchema]}
      />

      <div className="min-h-screen">
        <main>
          <Hero />
          <Services />
          <About />
          <Contact />
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
