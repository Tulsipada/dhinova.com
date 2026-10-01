import { Link } from "react-router-dom";
import { ArrowRight, ArrowUpRight, CheckCircle2, Code2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";

const Hero = () => {
  const { hero, offer, tagline } = site;

  return (
    <section
      className={`relative flex overflow-hidden pt-[4.75rem] ${
        offer.enabled
          ? "min-h-0 items-start md:min-h-[min(900px,100svh)] md:items-center"
          : "min-h-[min(720px,100svh)] items-center md:min-h-[min(900px,100svh)]"
      }`}
    >
      <img
        src="/hero-bg.webp"
        alt=""
        width={1280}
        height={720}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 z-0 h-full w-full scale-105 object-cover"
      />
      <div
        className="absolute inset-0 z-0"
        style={{ background: "var(--gradient-hero)", opacity: 0.78 }}
      />
      <div className="pointer-events-none absolute inset-0 z-[1] overflow-hidden">
        <div className="animate-soft-pulse absolute -right-20 top-16 h-[26rem] w-[26rem] rounded-full bg-[hsl(199_100%_46%/0.18)] blur-3xl" />
        <div className="animate-drift absolute -bottom-28 left-[-12%] h-[20rem] w-[20rem] rounded-full bg-[hsl(262_72%_52%/0.14)] blur-3xl" />
      </div>

      <div className="container relative z-10 w-full px-4 pb-14 pt-4 md:pb-24 md:pt-8">
        {offer.enabled ? (
          <div className="mb-6 flex justify-center md:mb-10">
            <Link
              to={offer.ctaHref}
              className="group inline-flex max-w-full items-center gap-2 rounded-full border border-accent/40 bg-black/30 px-3.5 py-2.5 text-center text-xs text-white/85 shadow-lg shadow-black/10 backdrop-blur-sm transition-colors hover:border-accent/75 hover:bg-black/45 sm:gap-3 sm:px-5 sm:py-3 sm:text-sm md:text-base"
            >
              <Sparkles className="h-3.5 w-3.5 shrink-0 text-accent motion-safe:animate-pulse sm:h-4 sm:w-4" />
              <span className="truncate">
                <strong className="mr-1 inline-block text-accent motion-safe:animate-pulse">
                  {offer.discount}% off
                </strong>
                {offer.title}
              </span>
              <ArrowRight className="h-3.5 w-3.5 shrink-0 text-accent transition-transform group-hover:translate-x-0.5 sm:h-4 sm:w-4" />
            </Link>
          </div>
        ) : null}

        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(340px,0.8fr)] lg:gap-20">
          <div className="max-w-3xl">
            <div className="animate-rise mb-4 flex items-center gap-2.5 text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-white/60 sm:gap-3 sm:text-xs sm:tracking-[0.2em] md:mb-7 md:text-sm md:tracking-[0.24em]">
              <span className="h-px w-6 shrink-0 bg-accent sm:w-10" />
              <span className="min-w-0 leading-snug">{tagline}</span>
            </div>
            <p className="animate-rise mb-3 font-display text-[2.35rem] font-extrabold leading-none tracking-tight text-brand-gradient sm:text-5xl md:mb-5 md:text-6xl">
              {hero.brand}
            </p>
            <h1 className="animate-rise-delay-1 max-w-3xl font-display text-[1.85rem] font-bold leading-[1.1] text-white/95 text-balance sm:text-4xl md:text-6xl md:leading-[1.05] lg:text-7xl">
              {hero.headline}
            </h1>
            <p className="animate-rise-delay-2 mt-4 max-w-xl text-[0.95rem] leading-relaxed text-white/70 sm:text-base md:mt-7 md:text-lg">
              {hero.subheadline}
            </p>
            <div className="animate-rise-delay-2 mt-7 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:items-center">
              <Button asChild variant="hero" size="lg" className="group h-11 rounded-full px-7 sm:h-12 sm:px-8">
                <Link to={hero.primaryCta.href.startsWith("/") ? hero.primaryCta.href : "/contact"}>
                  {hero.primaryCta.label}
                  <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button
                asChild
                variant="hero-outline"
                size="lg"
                className="h-11 rounded-full border-white/30 px-7 text-white hover:bg-white/10 sm:h-12 sm:px-8"
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

      <div className="absolute inset-x-0 bottom-0 z-10 h-16 bg-gradient-to-t from-background to-transparent md:h-24" />
    </section>
  );
};

export default Hero;
