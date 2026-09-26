import site from "@/data/site.json";
import SectionHeading from "@/components/SectionHeading";

const About = () => {
  const { about } = site;

  return (
    <section id="about" className="section-pad relative overflow-hidden bg-primary text-primary-foreground">
      <div className="surface-grid absolute inset-0 opacity-[0.08]" />
      <div className="pointer-events-none absolute -right-20 top-10 h-72 w-72 rounded-full bg-accent/20 blur-3xl" />

      <div className="container relative z-10 px-4">
        <div className="mx-auto grid max-w-7xl items-start gap-14 md:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] md:gap-20">
          <div>
            <SectionHeading
              eyebrow="Studio"
              title={about.title}
              description={about.paragraphs[0]}
              tone="dark"
            />
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-primary-foreground/70">
              {about.paragraphs[1]}
            </p>
          </div>

          <div className="border-t border-primary-foreground/15">
            <div className="flex items-center justify-between border-b border-primary-foreground/15 py-5">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/45">
                How we work
              </span>
              <span className="font-display text-sm text-accent">01 / 06</span>
            </div>
            <ul>
              {about.highlights.map((highlight, index) => (
                <li
                  key={highlight}
                  className="group flex items-baseline gap-5 border-b border-primary-foreground/15 py-5 transition-colors hover:border-accent/60"
                >
                  <span className="font-display text-sm font-semibold text-accent/70 transition-colors group-hover:text-accent">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base text-primary-foreground/90 md:text-lg">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
