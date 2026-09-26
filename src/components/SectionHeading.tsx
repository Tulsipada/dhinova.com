import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "default" | "dark";
  align?: "left" | "center";
  className?: string;
};

const SectionHeading = ({
  eyebrow,
  title,
  description,
  tone = "default",
  align = "left",
  className,
}: SectionHeadingProps) => (
  <div
    className={cn(
      "max-w-2xl",
      align === "center" && "mx-auto text-center",
      className
    )}
  >
    <p className={cn("section-eyebrow", tone === "dark" && "!text-[hsl(199_100%_70%)]")}>
      {eyebrow}
    </p>
    <h2 className={cn("section-title mb-5", tone === "dark" && "text-primary-foreground")}>{title}</h2>
    <p
      className={cn(
        "text-lg leading-relaxed text-muted-foreground",
        tone === "dark" && "text-primary-foreground/70"
      )}
    >
      {description}
    </p>
  </div>
);

export default SectionHeading;