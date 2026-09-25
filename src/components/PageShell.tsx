import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Seo from "@/components/Seo";
import { SITE_NAME } from "@/lib/seo";

type PageShellProps = {
  title: string;
  description: string;
  path: string;
  eyebrow?: string;
  keywords?: string;
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  headerAside?: ReactNode;
  afterHeader?: ReactNode;
  children: ReactNode;
};

const PageShell = ({
  title,
  description,
  path,
  eyebrow,
  keywords,
  jsonLd,
  headerAside,
  afterHeader,
  children,
}: PageShellProps) => (
  <>
    <Seo
      title={`${title} | ${SITE_NAME}`}
      description={description}
      path={path}
      keywords={keywords}
      jsonLd={jsonLd}
    />
    <div className="min-h-screen">
      <Navbar />
      <header className="relative overflow-hidden border-b border-border pb-10 pt-28 md:pb-12 md:pt-32">
        <div className="surface-grid absolute inset-0 opacity-40" />
        <div className="pointer-events-none absolute -right-16 top-10 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="container relative z-10 px-4">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="max-w-3xl">
              {eyebrow ? <p className="section-eyebrow">{eyebrow}</p> : null}
              <h1 className="section-title">{title}</h1>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground md:mt-5 md:text-lg">
                {description}
              </p>
            </div>
            {headerAside ? <div className="shrink-0">{headerAside}</div> : null}
          </div>
        </div>
      </header>
      {afterHeader}
      <main className="pb-24 pt-10 md:pt-12">
        <div className="container px-4">{children}</div>
      </main>
      <Footer />
    </div>
  </>
);

export default PageShell;
