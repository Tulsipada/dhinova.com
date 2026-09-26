import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";
import heroBg from "@/assets/hero-bg.jpg";

const Hero = () => {
  const { hero, tagline } = site;

  return (
    <section className="relative flex min-h-[min(900px,100svh)] items-center overflow-hidden pt-20">
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

      <div className="container relative z-10 px-4 py-16 md:py-24">
        <div className="grid items-center gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.8fr)] lg:gap-20">
          <div className="max-w-3xl">
            <div className="animate-rise mb-7 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-white/60 md:text-sm">
              <span className="h-px w-10 bg-accent" />
              {tagline}
            </div>
            <p className="animate-rise mb-5 font-display text-4xl font-extrabold leading-none tracking-tight text-brand-gradient md:text-6xl">
              {hero.brand}
            </p>
            <h1 className="animate-rise-delay-1 max-w-3xl font-display text-4xl font-bold leading-[1.05] text-white/95 text-balance md:text-6xl lg:text-7xl">
              {hero.headline}
            </h1>
            <p className="animate-rise-delay-2 mt-7 max-w-xl text-base leading-relaxed text-white/70 md:text-lg">
              {hero.subheadline}
            </p>
            <div className="animate-rise-delay-2 mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
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
                <a href={hero.secondaryCta.href}>
                  {hero.secondaryCta.label}
                  <ArrowUpRight className="ml-1 h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          <div className="animate-rise-delay-2 relative hidden lg:block">
            <div className="absolute -inset-10 rounded-full bg-accent/10 blur-3xl" />
            <div className="relative overflow-hidden rounded-[1.75rem] border border-white/15 bg-[hsl(218_54%_8%/0.72)] p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-10 flex items-center justify-between border-b border-white/10 pb-5">
                <div className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/15 text-accent">
                    <Sparkles className="h-4 w-4" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">Product engineering</p>
                    <p className="mt-1 text-xs text-white/45">From idea to reliable release</p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 text-xs font-medium text-emerald-300">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-300" /> Active
                </span>
              </div>
              <div className="space-y-4">
                {[
                  { label: "Product strategy", icon: Sparkles },
                  { label: "Web and mobile builds", icon: Code2 },
                  { label: "AI and automation", icon: CheckCircle2 },
                ].map((item, index) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-4 py-4">
                      <span className="font-display text-xs text-accent/80">0{index + 1}</span>
                      <Icon className="h-4 w-4 text-white/70" />
                      <span className="text-sm text-white/85">{item.label}</span>
                      <CheckCircle2 className="ml-auto h-4 w-4 text-emerald-300/80" />
                    </div>
                  );
                })}
              </div>
              <div className="mt-8 flex items-end justify-between border-t border-white/10 pt-5">
                <div>
                  <p className="text-3xl font-bold text-white">04</p>
                  <p className="mt-1 text-xs text-white/45">Core disciplines</p>
                </div>
                <span className="text-xs font-medium text-white/45">Dhinova / 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 z-10 h-24 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default Hero;
