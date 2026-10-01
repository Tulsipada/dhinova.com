import { lazy, Suspense, useEffect } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));
const Blogs = lazy(() => import("./pages/Blogs"));
const BlogPost = lazy(() => import("./pages/BlogPost"));
const Projects = lazy(() => import("./pages/Projects"));
const ContactPage = lazy(() => import("./pages/ContactPage"));
const Whitelabel = lazy(() => import("./pages/Whitelabel"));
const Calculator = lazy(() => import("./pages/Calculator"));
const Clients = lazy(() => import("./pages/Clients"));
const Faq = lazy(() => import("./pages/Faq"));
const Careers = lazy(() => import("./pages/Careers"));
const Privacy = lazy(() => import("./pages/Privacy"));
const Terms = lazy(() => import("./pages/Terms"));
const AboutPage = lazy(() => import("./pages/AboutPage"));
const Requirements = lazy(() => import("./pages/Requirements"));
const Notifications = lazy(() => import("./pages/Notifications"));
const Announcements = lazy(() => import("./pages/Announcements"));
const ServicePage = lazy(() => import("./pages/ServicePage"));

const queryClient = new QueryClient();

const ScrollRestoration = () => {
  const { pathname, search, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      requestAnimationFrame(() => {
        document.getElementById(hash.slice(1))?.scrollIntoView();
      });
      return;
    }

    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, [pathname, search, hash]);

  return null;
};

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ScrollRestoration />
          <Suspense fallback={null}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/services/:slug" element={<ServicePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/whitelabel" element={<Whitelabel />} />
            <Route path="/calculator" element={<Calculator />} />
            <Route path="/requirements" element={<Requirements />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/faq" element={<Faq />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/blogs/:slug" element={<BlogPost />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
