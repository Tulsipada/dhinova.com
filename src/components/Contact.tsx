import { Link } from "react-router-dom";
import { ArrowRight, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import site from "@/data/site.json";

const Contact = () => {
  const { contact, email, phone, location } = site;

  const items = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: location },
  ];

  return (
    <section id="contact" className="section-pad">
      <div className="container px-4">
        <div className="mx-auto max-w-6xl">
          <div className="mb-14 max-w-2xl">
            <p className="section-eyebrow">Contact</p>
            <h2 className="section-title mb-5">{contact.title}</h2>
            <p className="text-lg leading-relaxed text-muted-foreground">{contact.subtitle}</p>
          </div>

          <div className="mb-12 grid border-y border-border md:grid-cols-3">
            {items.map((item, index) => {
              const Icon = item.icon;
              const body = (
                <>
                  <Icon className="mb-4 h-5 w-5 text-accent" />
                  <h3 className="mb-1 font-display text-lg font-bold">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </>
              );

              const className = `p-7 transition-colors hover:bg-secondary/60 ${
                index < items.length - 1 ? "border-b border-border md:border-b-0 md:border-r" : ""
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

          <div className="relative overflow-hidden rounded-[1.75rem] bg-primary px-8 py-10 text-primary-foreground md:flex md:items-center md:justify-between md:gap-12 md:px-12 md:py-14">
            <div className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-accent/25 blur-3xl" />
            <div className="relative z-10 max-w-2xl">
              <h3 className="mb-3 font-display text-3xl font-bold md:text-4xl">{contact.ctaTitle}</h3>
              <p className="text-primary-foreground/65">{contact.ctaBody}</p>
            </div>
            <Button
              asChild
              size="lg"
              className="relative z-10 mt-8 shrink-0 rounded-full bg-brand-gradient px-8 text-white hover:opacity-95 md:mt-0"
            >
              <Link to="/contact">
                {contact.ctaLabel}
                <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
