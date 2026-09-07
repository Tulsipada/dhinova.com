import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";
import site from "@/data/site.json";

const Contact = () => {
  const { contact, email, phone, location } = site;

  const items = [
    { icon: Mail, label: "Email", value: email, href: `mailto:${email}` },
    { icon: Phone, label: "Phone", value: phone, href: `tel:${phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: location },
  ];

  return (
    <section id="contact" className="py-24 bg-muted/40">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">{contact.title}</h2>
            <p className="text-lg text-muted-foreground">{contact.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-14">
            {items.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <div className="w-12 h-12 rounded-full bg-accent/15 text-accent flex items-center justify-center mb-4">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-display font-semibold mb-1">{item.label}</h3>
                  <p className="text-sm text-muted-foreground">{item.value}</p>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex flex-col items-center text-center p-2 hover:opacity-90 transition-opacity"
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="flex flex-col items-center text-center p-2">
                  {content}
                </div>
              );
            })}
          </div>

          <div
            className="p-8 md:p-10 rounded-3xl text-center text-white"
            style={{ background: "var(--gradient-brand)", boxShadow: "var(--shadow-brand)" }}
          >
            <h3 className="font-display text-2xl md:text-3xl font-bold mb-4">{contact.ctaTitle}</h3>
            <p className="text-white/90 mb-6 max-w-2xl mx-auto">{contact.ctaBody}</p>
            <Button
              asChild
              variant="hero-outline"
              size="lg"
              className="border-white text-white hover:bg-white hover:text-primary"
            >
              <a href={contact.ctaHref}>{contact.ctaLabel}</a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
