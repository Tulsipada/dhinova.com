import { CheckCircle } from "lucide-react";
import site from "@/data/site.json";

const About = () => {
  const { about } = site;

  return (
    <section id="about" className="py-24 bg-primary text-primary-foreground">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-14 items-start max-w-6xl mx-auto">
          <div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6 text-balance">
              {about.title}
            </h2>
            {about.paragraphs.map((paragraph, index) => (
              <p key={index} className="text-lg text-primary-foreground/80 mb-5 leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          <ul className="space-y-3">
            {about.highlights.map((highlight, index) => (
              <li
                key={index}
                className="flex items-start gap-3 py-3 border-b border-primary-foreground/15"
              >
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-base text-primary-foreground/90">{highlight}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default About;
