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
  children: ReactNode;
};

const PageShell = ({
  title,
  description,
  path,
  eyebrow,
  keywords,
  jsonLd,
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
      <header className="border-b border-border pb-12 pt-28">
        <div className="container px-4">
          <div className="max-w-3xl">
            {eyebrow ? (
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-accent">
                {eyebrow}
              </p>
            ) : null}
            <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">{title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {description}
            </p>
          </div>
        </div>
      </header>
      <main className="pb-20 pt-12">
        <div className="container px-4">{children}</div>
      </main>
      <Footer />
    </div>
  </>
);

export default PageShell;
