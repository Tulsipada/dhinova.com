import site from "@/data/site.json";

const About = () => {
  const { about } = site;

  return (
    <section id="about" className="section-pad relative overflow-hidden bg-primary text-primary-foreground">
      <div className="surface-grid absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="mx-auto grid max-w-6xl items-start gap-14 md:grid-cols-2 md:gap-20">
          <div>
            <p className="section-eyebrow !text-[hsl(199_100%_70%)]">Studio</p>
            <h2 className="section-title mb-8 text-balance">{about.title}</h2>
            {about.paragraphs.map((paragraph) => (
              <p key={paragraph} className="mb-5 text-lg leading-relaxed text-primary-foreground/70">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="border-t border-primary-foreground/15">
            {about.highlights.map((highlight, index) => (
              <li
                key={highlight}
                className="flex items-baseline gap-5 border-b border-primary-foreground/15 py-5"
              >
                <span className="font-display text-sm font-semibold text-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="text-base text-primary-foreground/90 md:text-lg">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
