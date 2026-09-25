import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const { hero, tagline } = site;

  return (
    <section className="relative flex min-h-[100svh] items-end overflow-hidden pt-20">
      <div
        className="absolute inset-0 z-0 scale-105 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div
        className="absolute inset-0 z-0"
        style={{ background: "var(--gradient-hero)", opacity: 0.78 }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="animate-soft-pulse absolute -right-20 top-16 h-[26rem] w-[26rem] rounded-full bg-[hsl(199_100%_46%/0.18)] blur-3xl" />
        <div className="animate-drift absolute -bottom-28 left-[-12%] h-[20rem] w-[20rem] rounded-full bg-[hsl(262_72%_52%/0.14)] blur-3xl" />
      </div>

      <div className="container relative z-10 px-4 pb-20 pt-16 md:pb-28">
        <div className="max-w-4xl">
          <p className="animate-rise mb-6 font-display text-5xl font-extrabold leading-none tracking-tight text-brand-gradient md:text-7xl lg:text-8xl">
            DhiNova
          </p>
          <p className="animate-rise-delay-1 mb-8 text-xs font-semibold uppercase tracking-[0.28em] text-white/55 md:text-sm">
            {tagline}
          </p>
          <h1 className="animate-rise-delay-1 mb-5 max-w-3xl font-display text-2xl font-bold leading-tight text-white/95 text-balance md:text-4xl lg:text-5xl">
            {hero.headline}
          </h1>
          <p className="animate-rise-delay-2 mb-10 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
            {hero.subheadline}
          </p>
          <div className="animate-rise-delay-2 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Button asChild variant="hero" size="lg" className="group h-12 rounded-full px-8">
              <Link to={hero.primaryCta.href.startsWith("/") ? hero.primaryCta.href : "/contact"}>
                {hero.primaryCta.label}
                <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button
              asChild
              variant="hero-outline"
              size="lg"
              className="h-12 rounded-full border-white/30 px-8 text-white hover:bg-white/10"
            >
              <a href={hero.secondaryCta.href}>{hero.secondaryCta.label}</a>
            </Button>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
