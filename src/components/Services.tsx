import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Globe, Smartphone, Blocks, Brain } from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description: "Modern, responsive web applications built with React, ensuring exceptional user experiences and performance.",
  },
  {
    icon: Smartphone,
    title: "Mobile Apps",
    description: "Cross-platform mobile solutions using React Native, delivering native-like performance on iOS and Android.",
  },
  {
    icon: Blocks,
    title: "Blockchain & Crypto",
    description: "Innovative blockchain solutions and cryptocurrency projects that leverage decentralized technologies.",
  },
  {
    icon: Brain,
    title: "AI Solutions",
    description: "Intelligent applications powered by artificial intelligence and machine learning technologies.",
  },
];

const Services = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          <p className="text-lg text-muted-foreground">
            Comprehensive technology solutions tailored to your business needs
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Card 
                key={index} 
                className="border-border/50 hover:border-accent/50 transition-all duration-300 hover:shadow-[0_0_30px_hsl(var(--accent)/0.2)] group"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-accent/20 to-accent/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-accent" />
                  </div>
                  <CardTitle className="text-xl">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {service.description}
                  </CardDescription>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
