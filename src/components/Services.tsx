import { Globe, Smartphone, Blocks, Brain, type LucideIcon } from "lucide-react";
import services from "@/data/services.json";
import site from "@/data/site.json";
import SectionHeading from "@/components/SectionHeading";

const iconMap: Record<string, LucideIcon> = {
  globe: Globe,
  smartphone: Smartphone,
  blocks: Blocks,
  brain: Brain,
};

const Services = () => {
  const { title, subtitle } = site.servicesSection;

  return (
    <section id="services" className="section-pad">
      <div className="container px-4">
        <SectionHeading eyebrow="Capabilities" title={title} description={subtitle} className="mb-16" />

        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Globe;
            return (
              <article
                key={service.id}
                className="group relative overflow-hidden rounded-lg border border-border bg-card p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent/45 hover:shadow-[var(--shadow-soft)] md:p-8"
              >
                <div className="mb-10 flex items-center justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-muted-foreground transition-colors group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
                    <Icon className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
                  </span>
                </div>
                <h3 className="mb-3 font-display text-2xl font-bold md:text-3xl">{service.title}</h3>
                <p className="max-w-md leading-relaxed text-muted-foreground">{service.description}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
