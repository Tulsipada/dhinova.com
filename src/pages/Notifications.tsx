import notifications from "@/data/notifications.json";
import PageShell from "@/components/PageShell";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const priorityStyles: Record<string, string> = {
  High: "text-accent",
  Medium: "text-foreground",
  Low: "text-muted-foreground",
};

const Notifications = () => (
  <PageShell
    title="Notifications"
    eyebrow="Updates"
    description="Operational notices, partner updates, and timely messages from the Dhinova team."
    path="/notifications"
    keywords={`dhinova notifications, product updates, ${site.keywords}`}
    jsonLd={{
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: "Notifications",
      url: `${SITE_URL}/notifications`,
    }}
  >
    <div className="mx-auto max-w-3xl divide-y divide-border border-y border-border">
      {notifications.map((item) => (
        <article key={item.id} className="py-7">
          <div className="mb-3 flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.16em]">
            <span className="text-accent">{item.type}</span>
            <span className={priorityStyles[item.priority] ?? "text-muted-foreground"}>
              {item.priority}
            </span>
            <time dateTime={item.date} className="text-muted-foreground">
              {new Date(item.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "short",
                day: "numeric",
              })}
            </time>
          </div>
          <h2 className="font-display text-2xl font-bold">{item.title}</h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
        </article>
      ))}
    </div>
  </PageShell>
);

export default Notifications;
