import { ArrowUpRight, Mail, Phone, MapPin } from "lucide-react";
import site from "@/data/site.json";
import SectionHeading from "@/components/SectionHeading";

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
          <SectionHeading eyebrow="Contact" title={contact.title} description={contact.subtitle} className="mb-14" />

          <div className="mb-12 grid border-y border-border md:grid-cols-3">
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

        </div>
      </div>
    </section>
  );
};

export default Contact;
