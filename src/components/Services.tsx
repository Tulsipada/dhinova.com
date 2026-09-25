import { Globe, Smartphone, Blocks, Brain, type LucideIcon } from "lucide-react";
import services from "@/data/services.json";
import site from "@/data/site.json";

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
        <div className="mb-16 max-w-2xl">
          <p className="section-eyebrow">Capabilities</p>
          <h2 className="section-title mb-5">{title}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-x-12 md:grid-cols-2">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] ?? Globe;
            return (
              <article
                key={service.id}
                className="group border-t border-border py-8 transition-colors hover:border-accent/50"
              >
                <div className="mb-5 flex items-center justify-between gap-4">
                  <span className="font-display text-sm font-semibold text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon className="h-5 w-5 text-accent transition-transform duration-300 group-hover:scale-110" />
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
