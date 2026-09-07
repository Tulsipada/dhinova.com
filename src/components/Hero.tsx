import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const { hero, name, tagline } = site;

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pt-16">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="absolute inset-0"
          style={{ background: "var(--gradient-hero)", opacity: 0.93 }}
        />
      </div>

      <div className="absolute inset-0 z-[1] opacity-50 pointer-events-none">
        <div className="absolute -top-24 right-10 w-72 h-72 rounded-full bg-[hsl(202_100%_50%/0.35)] blur-3xl animate-float" />
        <div className="absolute bottom-10 left-10 w-56 h-56 rounded-full bg-[hsl(271_76%_51%/0.28)] blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 py-24">
        <div className="max-w-3xl">
          <h1 className="animate-rise font-display text-5xl md:text-7xl font-bold leading-[1.05] tracking-tight mb-4">
            <span className="text-white">Dhi</span>
            <span className="text-brand-gradient">Nova</span>
          </h1>
          <p className="animate-rise-delay-1 text-sm md:text-base uppercase tracking-[0.28em] text-white/75 mb-8">
            {tagline}
          </p>
          <p className="animate-rise-delay-1 font-display text-2xl md:text-4xl font-semibold text-white/95 text-balance mb-5">
            {hero.headline}
          </p>
          <p className="animate-rise-delay-2 text-lg md:text-xl text-white/80 max-w-2xl mb-10">
            {hero.subheadline}
          </p>
          <div className="animate-rise-delay-2 flex flex-col sm:flex-row gap-4">
            <Button asChild variant="hero" size="lg" className="group">
              <a href={hero.primaryCta.href}>
                {hero.primaryCta.label}
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button asChild variant="hero-outline" size="lg">
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>
          <span className="sr-only">{name}</span>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-background to-transparent z-10" />
    </section>
  );
};

export default Hero;
