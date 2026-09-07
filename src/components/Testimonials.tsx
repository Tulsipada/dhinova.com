import { Quote } from "lucide-react";
import testimonials from "@/data/testimonials.json";
import site from "@/data/site.json";

const Testimonials = () => {
  const { title, subtitle } = site.testimonialsSection;

  return (
    <section id="testimonials" className="py-24 bg-muted/40">
      <div className="container px-4">
        <div className="max-w-2xl mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <blockquote
              key={item.id}
              className="relative pt-2"
            >
              <Quote className="w-8 h-8 text-accent/40 mb-4" aria-hidden />
              <p className="text-lg leading-relaxed text-foreground mb-8">“{item.quote}”</p>
              <footer className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt=""
                  className="w-11 h-11 rounded-full object-cover bg-muted"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
                <div>
                  <cite className="not-italic font-display font-semibold block">{item.name}</cite>
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
