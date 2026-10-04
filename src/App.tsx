import { lazy, Suspense, useEffect, type ComponentType } from "react";
import { HelmetProvider } from "react-helmet-async";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Navigate, Routes, Route, useLocation } from "react-router-dom";
import Index from "./pages/Index";
import PageLoader from "./components/PageLoader";

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

const slashedRoutes = (path: string, Page: ComponentType) => {
  const paths = path === "/" ? ["/"] : [path, path.endsWith("/") ? path : `${path}/`];
  return paths.map((routePath) => <Route key={routePath} path={routePath} element={<Page />} />);
};

const TrailingSlashRedirect = () => {
  const { pathname, search, hash } = useLocation();
  if (pathname !== "/" && !pathname.endsWith("/") && !/\.[a-z0-9]+$/i.test(pathname)) {
    return <Navigate to={`${pathname}/${search}${hash}`} replace />;
  }
  return null;
};

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
          <TrailingSlashRedirect />
          <ScrollRestoration />
          <Suspense fallback={<PageLoader />}>
          <Routes>
            {slashedRoutes("/", Index)}
            {slashedRoutes("/services/:slug", ServicePage)}
            {slashedRoutes("/about", AboutPage)}
            {slashedRoutes("/projects", Projects)}
            {slashedRoutes("/clients", Clients)}
            {slashedRoutes("/whitelabel", Whitelabel)}
            {slashedRoutes("/calculator", Calculator)}
            {slashedRoutes("/requirements", Requirements)}
            {slashedRoutes("/notifications", Notifications)}
            {slashedRoutes("/announcements", Announcements)}
            {slashedRoutes("/contact", ContactPage)}
            {slashedRoutes("/faq", Faq)}
            {slashedRoutes("/careers", Careers)}
            {slashedRoutes("/privacy", Privacy)}
            {slashedRoutes("/terms", Terms)}
            {slashedRoutes("/blogs", Blogs)}
            {slashedRoutes("/blogs/:slug", BlogPost)}
            <Route path="*" element={<NotFound />} />
          </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
