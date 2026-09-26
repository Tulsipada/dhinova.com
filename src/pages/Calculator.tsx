import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";
import { SITE_URL } from "@/lib/seo";

/* Starter Indian baselines  -  typical mid estimate stays ~₹1-2L */
const projectTypes = [
  { id: "web", label: "Web Application", base: 95000 },
  { id: "mobile", label: "Mobile App", base: 120000 },
  { id: "ai", label: "AI Feature / Product", base: 110000 },
  { id: "blockchain", label: "Blockchain / Web3", base: 130000 },
  { id: "whitelabel", label: "Whitelabel Engagement", base: 85000 },
] as const;

const complexityOptions = [
  { id: "simple", label: "Simple MVP", multiplier: 1 },
  { id: "standard", label: "Standard Product", multiplier: 1.45 },
  { id: "complex", label: "Complex / Enterprise", multiplier: 2.1 },
] as const;

const timelineOptions = [
  { id: "relaxed", label: "Flexible (12+ weeks)", multiplier: 0.95 },
  { id: "normal", label: "Standard (8-12 weeks)", multiplier: 1 },
  { id: "fast", label: "Fast-track (under 8 weeks)", multiplier: 1.25 },
] as const;

const formatInr = (value: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);

const Calculator = () => {
  const [type, setType] = useState<(typeof projectTypes)[number]["id"]>("web");
  const [complexity, setComplexity] = useState<(typeof complexityOptions)[number]["id"]>("standard");
  const [timeline, setTimeline] = useState<(typeof timelineOptions)[number]["id"]>("normal");
  const [screens, setScreens] = useState(12);

  const estimate = useMemo(() => {
    const base = projectTypes.find((item) => item.id === type)?.base ?? 95000;
    const complexityMul =
      complexityOptions.find((item) => item.id === complexity)?.multiplier ?? 1;
    const timelineMul = timelineOptions.find((item) => item.id === timeline)?.multiplier ?? 1;
    const screenFactor = 1 + Math.max(0, screens - 8) * 0.035;
    const mid = Math.round(base * complexityMul * timelineMul * screenFactor);
    return { low: Math.round(mid * 0.82), mid, high: Math.round(mid * 1.28) };
  }, [type, complexity, timeline, screens]);

  return (
    <PageShell
      title="Project Cost Calculator"
      eyebrow="Estimate"
      description="Get a quick ballpark for your web, mobile, AI, or blockchain project. Final quotes are tailored after a short discovery call."
      path="/calculator"
      keywords={`software project cost calculator, app development cost india, web development estimate, ${site.keywords}`}
      jsonLd={{
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Dhinova Project Cost Calculator",
        url: `${SITE_URL}/calculator`,
        applicationCategory: "BusinessApplication",
        offers: { "@type": "Offer", priceCurrency: "INR" },
      }}
    >
      <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-8 rounded-3xl border border-border p-6 md:p-8">
          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Project type
            </legend>
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setType(item.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                    type === item.id
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Complexity
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {complexityOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setComplexity(item.id)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium ${
                    complexity === item.id
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <fieldset>
            <legend className="mb-3 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Timeline
            </legend>
            <div className="grid gap-2 sm:grid-cols-3">
              {timelineOptions.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTimeline(item.id)}
                  className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium ${
                    timeline === item.id
                      ? "border-accent bg-accent/10 text-foreground"
                      : "border-border text-muted-foreground"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="screens"
              className="mb-3 block text-sm font-semibold uppercase tracking-wider text-muted-foreground"
            >
              Approx. screens / modules: {screens}
            </label>
            <input
              id="screens"
              type="range"
              min={4}
              max={40}
              value={screens}
              onChange={(e) => setScreens(Number(e.target.value))}
              className="w-full accent-[hsl(var(--accent))]"
            />
          </div>
        </div>

        <div className="rounded-3xl bg-primary p-8 text-primary-foreground md:p-10">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-accent">Estimated range</p>
          <p className="mt-4 font-display text-4xl font-bold md:text-5xl">{formatInr(estimate.mid)}</p>
          <p className="mt-3 text-primary-foreground/70">
            Typical range: {formatInr(estimate.low)} - {formatInr(estimate.high)}
          </p>
          <p className="mt-6 text-sm text-primary-foreground/60">
            Indicative Indian market pricing in INR (excl. 18% GST). Final quote depends on scope,
            integrations, design depth, and compliance needs.
          </p>
          <Button asChild size="lg" className="mt-8 rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
            <Link to="/contact">
              Get a precise quote
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </PageShell>
  );
};

export default Calculator;
