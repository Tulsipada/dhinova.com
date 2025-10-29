import { CheckCircle } from "lucide-react";

const highlights = [
  "Expert team of developers and designers",
  "Cutting-edge technology stack",
  "Agile development methodology",
  "24/7 support and maintenance",
  "Scalable and secure solutions",
  "On-time project delivery",
];

const About = () => {
  return (
    <section className="py-24 bg-background">
      <div className="container px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              About{" "}
              <span className="bg-gradient-to-r from-accent to-primary bg-clip-text text-transparent">
                Dhinova
              </span>
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Dhinova Technology Pvt Ltd is a leading software development company specializing in 
              modern web and mobile applications, blockchain technology, and artificial intelligence solutions.
            </p>
            <p className="text-lg text-muted-foreground">
              With years of experience and a passion for innovation, we help businesses transform 
              their digital presence and achieve their goals through custom-built technology solutions.
            </p>
          </div>
          
          <div className="space-y-4">
            {highlights.map((highlight, index) => (
              <div 
                key={index} 
                className="flex items-start gap-3 p-4 rounded-lg bg-card border border-border/50 hover:border-accent/30 transition-colors"
              >
                <CheckCircle className="w-6 h-6 text-accent flex-shrink-0 mt-0.5" />
                <span className="text-base">{highlight}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
