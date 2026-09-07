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
    <section id="services" className="py-24">
      <div className="container px-4">
        <div className="max-w-2xl mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {services.map((service) => {
            const Icon = iconMap[service.icon] ?? Globe;
            return (
              <article
                key={service.id}
                className="group relative py-2 pr-4 border-t border-border/80 pt-8"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-display text-2xl font-semibold mb-2">{service.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
