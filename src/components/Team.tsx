import { Github, Linkedin } from "lucide-react";
import team from "@/data/team.json";
import site from "@/data/site.json";

const Team = () => {
  const { title, subtitle } = site.teamSection;

  return (
    <section id="team" className="py-24">
      <div className="container px-4">
        <div className="max-w-2xl mb-14">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{title}</h2>
          <p className="text-lg text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {team.map((member) => (
            <article key={member.id} className="group">
              <div className="aspect-[4/5] mb-5 overflow-hidden rounded-2xl bg-muted">
                <img
                  src={member.image || "/logo_bg.png"}
                  alt={member.name}
                  className={`w-full h-full transition-transform duration-500 ${
                    member.image
                      ? "object-cover group-hover:scale-105"
                      : "object-contain p-6"
                  }`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/logo_bg.png";
                  }}
                />
              </div>
              <h3 className="font-display text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>
              {(member.linkedin || member.github) && (
                <div className="flex items-center gap-3 mt-4">
                  {member.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={`https://github.com/${member.github}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on GitHub`}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Github className="h-4 w-4" />
                    </a>
                  )}
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
