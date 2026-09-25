import { Link } from "react-router-dom";
import announcements from "@/data/announcements.json";
import PageShell from "@/components/PageShell";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const Announcements = () => (
  <PageShell
    title="Announcements"
    eyebrow="Newsroom"
    description="Company news, service launches, hiring updates, and milestones from Dhinova Technology."
    path="/announcements"
    keywords={`dhinova announcements, company news, software studio updates, ${site.keywords}`}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Announcements",
      url: `${SITE_URL}/announcements`,
    }}
  >
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {announcements.map((item) => (
        <article key={item.id} className="flex flex-col border-t border-border pt-6">
          <div className="mb-3 flex items-center justify-between gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
            <span className="text-accent">{item.tag}</span>
            <time dateTime={item.date} className="text-muted-foreground">
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          <h2 className="font-display text-2xl font-bold">{item.title}</h2>
          <p className="mt-3 flex-1 leading-relaxed text-muted-foreground">{item.excerpt}</p>
          <p className="mt-4 text-sm leading-relaxed text-foreground/80">{item.body}</p>
        </article>
      ))}
    </div>

    <p className="mt-12 text-muted-foreground">
      Looking for roles?{" "}
      <Link to="/careers" className="font-semibold text-foreground underline-offset-4 hover:underline">
        Visit Careers
      </Link>
      .
    </p>
  </PageShell>
);

export default Announcements;
