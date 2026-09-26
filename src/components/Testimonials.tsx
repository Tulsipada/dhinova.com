import testimonials from "@/data/testimonials.json";
import site from "@/data/site.json";
import { Quote } from "lucide-react";
import SectionHeading from "@/components/SectionHeading";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Testimonials = () => {
  const { title, subtitle } = site.testimonialsSection;

  return (
    <section id="testimonials" className="section-pad border-y border-border bg-secondary/40">
      <div className="container px-4">
        <SectionHeading eyebrow="Outcomes" title={title} description={subtitle} className="mb-16" />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="flex flex-col rounded-lg border border-border bg-background p-7 transition-colors hover:border-accent/40 md:p-8">
              <Quote className="mb-6 h-7 w-7 text-accent/70" />
              <p className="mb-8 flex-1 text-lg leading-relaxed text-foreground md:text-xl">
                “{item.quote}”
              </p>
              <footer className="flex items-center gap-3">
                <Avatar className="h-11 w-11 bg-accent/10 text-accent">
                  {item.avatar && item.avatar !== "/logo_bg.png" ? (
                    <AvatarImage src={item.avatar} alt={item.name} />
                  ) : null}
                  <AvatarFallback>
                    {item.name
                      .split(" ")
                      .map((namePart) => namePart[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <cite className="block font-display font-semibold not-italic">{item.name}</cite>
                  <span className="text-sm text-muted-foreground">
                    {item.role}
                    {item.company ? `, ${item.company}` : ""}
                  </span>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
