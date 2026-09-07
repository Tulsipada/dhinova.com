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
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = "/placeholder.svg";
                  }}
                />
              </div>
              <h3 className="font-display text-xl font-semibold">{member.name}</h3>
              <p className="text-sm text-accent font-medium mt-1">{member.role}</p>
              <p className="text-sm text-muted-foreground mt-3 leading-relaxed">{member.bio}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
