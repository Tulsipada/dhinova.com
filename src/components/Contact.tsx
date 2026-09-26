import { ArrowRight, ArrowUpRight, Mail, MessageCircle, Phone, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import site from "@/data/site.json";
import SectionHeading from "@/components/SectionHeading";

const Contact = () => {
  const { contact, email, phone, location } = site;
  const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hello Dhinova, I would like to discuss a project.")}`;

  const items = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: location },
  ];

  return (
    <section id="contact" className="section-pad">
      <div className="container px-4">
        <div className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:items-start lg:gap-16">
          <div className="space-y-8">
            <SectionHeading eyebrow="Contact" title={contact.title} description={contact.subtitle} className="mb-10" />
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 text-sm font-semibold text-accent transition-colors hover:text-foreground"
            >
              Tell us what you are building
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <div className="rounded-2xl bg-primary p-6 text-primary-foreground md:p-8">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">Start a conversation</p>
                  <h3 className="mt-2 font-display text-2xl font-bold">Have a project in mind?</h3>
                </div>
                <MessageCircle className="h-6 w-6 text-accent" />
              </div>
              <p className="mt-3 max-w-xl text-sm leading-relaxed text-primary-foreground/70">
                Share your goals, timeline, and constraints. We will help you shape the next practical step.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-0.5">
                  Start a project <ArrowRight className="h-4 w-4" />
                </Link>
                <a href={whatsappUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:border-accent hover:text-accent">
                  WhatsApp us
                </a>
              </div>
            </div>
          </div>

          <div className="grid self-start overflow-hidden rounded-2xl border border-border bg-card md:grid-cols-3 lg:mt-1 lg:block">
            {items.map((item, index) => {
              const Icon = item.icon;
              const body = (
                <>
                  <div className="mb-8 flex items-center justify-between">
                    <Icon className="h-5 w-5 text-accent" />
                    {item.href ? <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /> : null}
                  </div>
                  <h3 className="mb-1 font-display text-lg font-bold">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </>
              );

              const className = `group p-7 transition-colors hover:bg-secondary/60 ${
                index < items.length - 1 ? "border-b border-border lg:border-b" : ""
              }`;

              return item.href ? (
                <a key={item.label} href={item.href} className={`block ${className}`}>
                  {body}
                </a>
              ) : (
                <div key={item.label} className={className}>
                  {body}
                </div>
              );
            })}
          </div>
          </div>
        </div>
    </section>
  );
};

export default Contact;
