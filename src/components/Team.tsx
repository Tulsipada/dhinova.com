import { Github, Linkedin } from "lucide-react";
import team from "@/data/team.json";
import site from "@/data/site.json";

const Team = () => {
  const { title, subtitle } = site.teamSection;

  return (
    <section id="team" className="section-pad">
      <div className="container px-4">
        <div className="mb-16 max-w-2xl">
          <p className="section-eyebrow">People</p>
          <h2 className="section-title mb-5">{title}</h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{subtitle}</p>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article key={member.id} className="group">
              <div className="mb-6 aspect-[4/5] overflow-hidden rounded-[1.25rem] bg-gradient-to-br from-muted to-secondary">
                <img
                  src={member.image || "/dhinova.png"}
                  alt={member.name || "Team member"}
                  className={`h-full w-full transition-transform duration-700 ${
                    member.image
                      ? "object-cover group-hover:scale-105"
                      : "object-contain p-8 opacity-80"
                  }`}
                  onError={(e) => {
                    e.currentTarget.onerror = null;
                    e.currentTarget.src = "/dhinova.png";
                  }}
                />
              </div>
              {member.name ? (
                <h3 className="font-display text-xl font-bold">{member.name}</h3>
              ) : null}
              {member.role ? (
                <p className="mt-1 text-sm font-medium text-accent">{member.role}</p>
              ) : null}
              {member.bio ? (
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
              ) : null}
              {(member.linkedin || member.github) && (
                <div className="mt-4 flex items-center gap-3">
                  {member.linkedin && (
                    <a
                      href={`https://linkedin.com/in/${member.linkedin}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${member.name} on LinkedIn`}
                      className="text-muted-foreground transition-colors hover:text-foreground"
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
                      className="text-muted-foreground transition-colors hover:text-foreground"
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
