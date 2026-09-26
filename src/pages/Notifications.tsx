import { useMemo, useState } from "react";
import { Bell, CalendarDays, CheckCircle2, Filter } from "lucide-react";
import PageShell from "@/components/PageShell";
import notifications from "@/data/notifications.json";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

const priorityStyles: Record<string, string> = {
  High: "border-accent/30 bg-accent/10 text-accent",
  Medium: "border-border bg-muted/60 text-foreground",
  Low: "border-border bg-background text-muted-foreground",
};

const Notifications = () => {
  const [activeType, setActiveType] = useState("All");
  const types = ["All", ...new Set(notifications.map((item) => item.type))];
  const visibleNotifications = useMemo(
    () =>
      activeType === "All"
        ? notifications
        : notifications.filter((item) => item.type === activeType),
    [activeType],
  );

  return (
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
      headerAside={
        <div className="flex items-center gap-3 rounded-2xl border border-border bg-background/80 px-4 py-3 backdrop-blur">
          <Bell className="h-5 w-5 text-accent" />
          <div>
            <p className="font-display text-2xl font-bold leading-none">{notifications.length}</p>
            <p className="mt-1 text-xs text-muted-foreground">total updates</p>
          </div>
        </div>
      }
      afterHeader={
        <div className="border-b border-border bg-background/90 backdrop-blur-md">
          <div className="container flex flex-wrap items-center gap-3 px-4 py-4">
            <div className="mr-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              <Filter className="h-4 w-4" /> Filter
            </div>
            {types.map((type) => (
              <button
                key={type}
                type="button"
                aria-pressed={activeType === type}
                onClick={() => setActiveType(type)}
                className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
                  activeType === type
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-background text-muted-foreground hover:border-accent hover:text-foreground"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      }
    >
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_260px]">
        <section aria-live="polite" className="space-y-4">
          {visibleNotifications.length ? (
            visibleNotifications.map((item) => (
              <article
                key={item.id}
                className="group rounded-2xl border border-border bg-card p-6 transition-colors hover:border-accent/45 md:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em]">
                    <span className="rounded-full bg-accent/10 px-2.5 py-1 text-accent">{item.type}</span>
                    <span className={`rounded-full border px-2.5 py-1 ${priorityStyles[item.priority] ?? priorityStyles.Low}`}>
                      {item.priority}
                    </span>
                  </div>
                  {item.priority === "High" ? <span className="h-2 w-2 rounded-full bg-accent" aria-label="High priority" /> : null}
                </div>
                <h2 className="mt-5 font-display text-2xl font-bold transition-colors group-hover:text-accent">{item.title}</h2>
                <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">{item.body}</p>
                <time dateTime={item.date} className="mt-6 flex items-center gap-2 text-sm text-muted-foreground">
                  <CalendarDays className="h-4 w-4" />
                  {new Date(item.date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })}
                </time>
              </article>
            ))
          ) : (
            <div className="border-y border-border py-16 text-center">
              <p className="font-display text-xl font-semibold">No updates in this category</p>
              <p className="mt-2 text-sm text-muted-foreground">Choose another filter to see more notifications.</p>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-2xl border border-border bg-primary p-6 text-primary-foreground lg:sticky lg:top-24">
          <CheckCircle2 className="h-6 w-6 text-accent" />
          <h2 className="mt-5 font-display text-xl font-bold">Stay in the loop</h2>
          <p className="mt-3 text-sm leading-relaxed text-primary-foreground/70">
            Follow this page for product changes, partner capacity, and planned maintenance notices.
          </p>
        </aside>
      </div>
    </PageShell>
  );
};

export default Notifications;
