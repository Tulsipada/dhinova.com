import { Github, Linkedin } from "lucide-react";
import team from "@/data/team.json";
import site from "@/data/site.json";
import FallbackImage from "@/components/FallbackImage";
import SectionHeading from "@/components/SectionHeading";

const Team = () => {
  const { title, subtitle } = site.teamSection;

  return (
    <section id="team" className="section-pad">
      <div className="container px-4">
        <SectionHeading eyebrow="People" title={title} description={subtitle} className="mb-16" />

        <div className="grid grid-cols-1 gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((member) => (
            <article
              key={member.id}
              className="group flex flex-col items-center text-center transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="h-28 w-28 overflow-hidden rounded-full border border-border bg-gradient-to-br from-muted to-secondary shadow-[var(--shadow-soft)] sm:h-32 sm:w-32">
                <FallbackImage
                  src={member.image || "/dhinova.png"}
                  alt={member.name || "Team member"}
                  width={256}
                  height={256}
                  loading="lazy"
                  decoding="async"
                  className={`h-full w-full transition-transform duration-500 ${
                    member.image
                      ? "object-cover group-hover:scale-105"
                      : "object-contain p-5 opacity-80"
                  }`}
                />
              </div>
              <div className="mt-5 max-w-[16rem]">
                {member.name ? <h3 className="font-display text-lg font-bold">{member.name}</h3> : null}
                {member.role ? <p className="mt-1 text-sm font-medium text-accent">{member.role}</p> : null}
                {member.bio ? (
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.bio}</p>
                ) : null}
                {(member.linkedin || member.github) && (
                  <div className="mt-3 flex items-center justify-center gap-3">
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
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
