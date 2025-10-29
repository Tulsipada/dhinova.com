import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Get In Touch</h2>
            <p className="text-lg text-muted-foreground">
              Ready to start your project? Let's build something amazing together.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border/50">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Mail className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Email</h3>
              <p className="text-sm text-muted-foreground">info@dhinova.com</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border/50">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <Phone className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Phone</h3>
              <p className="text-sm text-muted-foreground">+91 (XXX) XXX-XXXX</p>
            </div>

            <div className="flex flex-col items-center text-center p-6 rounded-lg bg-card border border-border/50">
              <div className="w-12 h-12 rounded-full bg-accent/20 flex items-center justify-center mb-4">
                <MapPin className="w-6 h-6 text-accent" />
              </div>
              <h3 className="font-semibold mb-2">Location</h3>
              <p className="text-sm text-muted-foreground">India</p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary to-accent p-8 rounded-2xl text-center shadow-[0_20px_60px_-15px_hsl(var(--accent)/0.3)]">
            <h3 className="text-2xl md:text-3xl font-bold text-primary-foreground mb-4">
              Ready to Transform Your Business?
            </h3>
            <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
              Contact us today to discuss your project and discover how Dhinova can help 
              you achieve your digital transformation goals.
            </p>
            <Button variant="hero-outline" size="lg" className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary">
              Start Your Project
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
