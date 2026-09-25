import testimonials from "@/data/testimonials.json";
import site from "@/data/site.json";

const Testimonials = () => {
  const { title, subtitle } = site.testimonialsSection;

  return (
    <section id="testimonials" className="section-pad border-y border-border bg-secondary/40">
      <div className="container px-4">
        <div className="mb-16 max-w-2xl">
          <p className="section-eyebrow">Outcomes</p>
          <h2 className="section-title mb-5">{title}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-12">
          {testimonials.map((item) => (
            <blockquote key={item.id} className="flex flex-col border-t border-border pt-8">
              <p className="mb-8 flex-1 text-lg leading-relaxed text-foreground md:text-xl">
                “{item.quote}”
              </p>
              <footer className="flex items-center gap-3">
                <img
                  src={item.avatar}
                  alt=""
                  className="h-11 w-11 rounded-full object-cover bg-muted"
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/dhinova.png";
                  }}
                />
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
